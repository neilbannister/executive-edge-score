/**
 * Fetches AI-personalized content from the backend API.
 * Returns personalized heroMessage, ilanaLetter, opportunityCost, and actionPlan.
 * Throws on failure (caller should handle fallback to static content).
 */
export async function fetchPersonalizedContent(payload) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch('/api/personalize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}
