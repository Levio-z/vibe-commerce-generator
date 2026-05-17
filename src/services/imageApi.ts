/**
 * 豆包文生图API服务
 * 模型: doubao-seedream-4-0-250828
 *
 * 配置说明：
 * - 复制 .env.example 为 .env
 * - 在 .env 中填入你的 API Key
 */

const API_KEY = import.meta.env.VITE_DOUBAN_API_KEY || '';
const API_ENDPOINT = import.meta.env.VITE_DOUBAN_API_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v3/images/generations';

export interface GenerationConfig {
  model?: string;
  size?: string;
  watermark?: boolean;
  response_format?: 'url' | 'b64_json';
}

export interface GenerationProgress {
  type: string;
  image_index: number;
  url?: string;
  size?: string;
  error?: {
    code: string;
    message: string;
  };
  usage?: {
    generated_images: number;
    total_tokens: number;
  };
}

export interface GenerateOptions {
  prompt: string;
  image?: string; // 参考图URL或Base64
  config?: GenerationConfig;
  onProgress?: (progress: GenerationProgress) => void;
  onComplete?: (images: string[], usage?: GenerationProgress['usage']) => void;
  onError?: (error: { code: string; message: string }) => void;
}

const defaultConfig: GenerationConfig = {
  model: 'doubao-seedream-4-0-250828',
  size: '2048x2048',
  watermark: false,
  response_format: 'url',
};

/**
 * 生成图片 - 流式版本
 */
export async function generateImage(options: GenerateOptions): Promise<void> {
  const { prompt, image, config = {}, onProgress, onComplete, onError } = options;
  const finalConfig = { ...defaultConfig, ...config };

  // 检查API Key
  if (!API_KEY) {
    onError?.({
      code: 'MissingAPIKey',
      message: '请在 .env 文件中配置 VITE_DOUBAN_API_KEY'
    });
    return;
  }

  const requestBody: Record<string, unknown> = {
    model: finalConfig.model,
    prompt,
    size: finalConfig.size,
    watermark: finalConfig.watermark,
    response_format: finalConfig.response_format,
    stream: true,
    sequential_image_generation: 'disabled',
  };

  if (image) {
    requestBody.image = image;
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        code: errorData.error?.code || 'RequestFailed',
        message: errorData.error?.message || `请求失败: ${response.status}`,
      };
    }

    const images: string[] = [];
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    if (!reader) {
      throw { code: 'StreamError', message: '无法读取响应流' };
    }

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();

          if (data === '[DONE]' || !data) continue;

          try {
            const event = JSON.parse(data) as GenerationProgress;

            // 处理部分成功
            if (event.type === 'image_generation.partial_succeeded' && event.url) {
              images.push(event.url);
              onProgress?.({
                type: 'partial_succeeded',
                image_index: event.image_index,
                url: event.url,
                size: event.size,
              });
            }

            // 处理部分失败
            if (event.type === 'image_generation.partial_failed') {
              onProgress?.({
                type: 'partial_failed',
                image_index: event.image_index,
                error: event.error,
              });
            }

            // 处理完成
            if (event.type === 'image_generation.completed') {
              onComplete?.(images, event.usage);
            }
          } catch {
            // 忽略解析错误
          }
        }
      }
    }
  } catch (error) {
    onError?.(error as { code: string; message: string });
  }
}

/**
 * 生成图片 - 非流式版本（简化版）
 */
export async function generateImageSimple(
  prompt: string,
  image?: string,
  config?: GenerationConfig
): Promise<{ url: string; size: string }> {
  const finalConfig = { ...defaultConfig, ...config };

  const requestBody: Record<string, unknown> = {
    model: finalConfig.model,
    prompt,
    size: finalConfig.size,
    watermark: finalConfig.watermark,
    response_format: finalConfig.response_format,
    stream: false,
    sequential_image_generation: 'disabled',
  };

  if (image) {
    requestBody.image = image;
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      code: errorData.error?.code || 'RequestFailed',
      message: errorData.error?.message || `请求失败: ${response.status}`,
    };
  }

  const data = await response.json();

  if (data.error) {
    throw {
      code: data.error.code || 'GenerationFailed',
      message: data.error.message || '图片生成失败',
    };
  }

  return {
    url: data.data?.[0]?.url || data.data?.[0]?.b64_json,
    size: data.data?.[0]?.revised_prompt ? '2048x2048' : '2048x2048',
  };
}
