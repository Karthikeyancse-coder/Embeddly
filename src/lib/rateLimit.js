// src/lib/rateLimit.js

const ipRequestMap = new Map();

/**
 * Token bucket rate limiter.
 * @param {string} ip - The client IP.
 * @param {number} limit - Maximum requests allowed per window (default: 5).
 * @param {number} windowMs - Time window in milliseconds (default: 60,000ms = 1 minute).
 */
export function checkRateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const clientData = ipRequestMap.get(ip) || { count: 0, resetTime: now + windowMs };

  // If window has passed, reset counter
  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count += 1;
  }

  ipRequestMap.set(ip, clientData);

  // Periodic cleanup to avoid memory bloat
  if (ipRequestMap.size > 5000) {
    for (const [key, val] of ipRequestMap.entries()) {
      if (now > val.resetTime) ipRequestMap.delete(key);
    }
  }

  const isLimited = clientData.count > limit;
  const remaining = Math.max(0, limit - clientData.count);

  return { isLimited, remaining, resetTime: clientData.resetTime };
}
