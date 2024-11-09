interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateWithAI(prompt: string, systemPrompt?: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const siteName = import.meta.env.VITE_SITE_NAME;

  if (!apiKey) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const messages = [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      { role: 'user', content: prompt }
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': siteUrl,
        'X-Title': siteName,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate content');
    }

    const data: OpenRouterResponse = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate content. Please check your API configuration.');
  }
}