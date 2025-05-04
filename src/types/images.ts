export type GenerationStatus =
  | 'starting'
  | 'processing'
  | 'succeeded'
  | 'failed';

export type AspectRatioType = 'square' | 'landscape' | 'portrait';

export interface GeneratedImage {
  id: string;
  user_id: string;
  storage_path: string;
  public_url: string;
  created_at: string;
  prompt: string;
  model_id: string;
  prediction_id: string;
  size: number;
  mime_type: string;
  is_favorite: boolean;
  generation_params: {
    num_outputs: number;
    aspect_ratio: string;
    num_inference_steps: number;
    safety_tolerance: number;
    prompt_upsampling: boolean;
    output_quality: number;
  };
  aspect_ratio_type: AspectRatioType;
}

export interface ImageUploadResult {
  path: string;
  url: string;
  size: number;
  mime_type: string;
}

export interface FluxModelInput {
  prompt: string;
  num_outputs: number;
  aspect_ratio: string;
  output_format: string;
  num_inference_steps: number;
  safety_tolerance: number;
  prompt_upsampling: boolean;
  output_quality: number;
}
