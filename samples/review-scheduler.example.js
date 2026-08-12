/**
 * Reduced portfolio example of the production review policy.
 * The complete application and curriculum are intentionally not included.
 */
export function scheduleReview(previousInterval = 0, grade, today = new Date()) {
  const interval = grade === "again"
    ? 1
    : grade === "hard"
      ? Math.max(3, Math.ceil(Math.max(previousInterval, 1) * 1.5))
      : Math.max(7, Math.max(previousInterval, 3) * 2);

  const due = new Date(today);
  due.setDate(due.getDate() + interval);

  return {
    grade,
    interval,
    due: due.toISOString().slice(0, 10),
    updatedAt: new Date().toISOString()
  };
}

