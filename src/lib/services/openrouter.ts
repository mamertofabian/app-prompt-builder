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
        'HTTP-Referer': siteUrl || 'http://localhost:5173',
        'X-Title': siteName || 'DevGuide Generator',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5-exp',
        messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const data: OpenRouterResponse = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from AI service');
    }

    return content;
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate content');
  }
}