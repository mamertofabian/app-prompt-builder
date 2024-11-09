interface Env {
  OPENROUTER_API_KEY: string;
  SITE_URL: string;
  SITE_NAME: string;
}

export const env: Env = {
  OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY || '',
  SITE_URL: import.meta.env.VITE_SITE_URL || '',
  SITE_NAME: import.meta.env.VITE_SITE_NAME || ''
};

export function validateEnv(): string[] {
  const errors: string[] = [];
  
  if (!env.OPENROUTER_API_KEY) {
    errors.push('OpenRouter API key is not configured');
  }
  
  if (!env.SITE_URL) {
    errors.push('Site URL is not configured');
  }
  
  if (!env.SITE_NAME) {
    errors.push('Site name is not configured');
  }
  
  return errors;
}