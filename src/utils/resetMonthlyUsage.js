export function resetIfNeeded(user) {
  const now = Date.now();
  const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

  if (!user.lastReset || now - user.lastReset > THIRTY_DAYS) {
    user.simulationCount = 0;
    user.lastReset = now;
  }
}
