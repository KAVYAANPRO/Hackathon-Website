const rateLimitStore = new Map<string, number[]>();

/**
 * Simple sliding-window rate limiter for public form endpoints.
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60_000
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = (rateLimitStore.get(identifier) ?? []).filter(
    (ts) => ts > windowStart
  );

  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0] ?? now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000)
    );
    rateLimitStore.set(identifier, timestamps);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  rateLimitStore.set(identifier, timestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}
