/**
 * Reduced example of the field-aware offline/cloud merge strategy.
 */
const unique = values => [...new Set(values || [])];

function newestRecord(localRecord, remoteRecord) {
  if (!localRecord) return remoteRecord;
  if (!remoteRecord) return localRecord;
  return String(remoteRecord.updatedAt) > String(localRecord.updatedAt)
    ? remoteRecord
    : localRecord;
}

function mergeRecordMap(localMap = {}, remoteMap = {}) {
  const keys = unique([...Object.keys(localMap), ...Object.keys(remoteMap)]);
  return Object.fromEntries(keys.map(key => [
    key,
    newestRecord(localMap[key], remoteMap[key])
  ]));
}

export function mergeProgress(local, remote) {
  return {
    attempted: unique([...(local.attempted || []), ...(remote.attempted || [])]),
    mastered: unique([...(local.mastered || []), ...(remote.mastered || [])]),
    cardsSeen: unique([...(local.cardsSeen || []), ...(remote.cardsSeen || [])]),
    drafts: mergeRecordMap(local.drafts, remote.drafts),
    review: mergeRecordMap(local.review, remote.review),
    onboardingComplete: Boolean(local.onboardingComplete || remote.onboardingComplete)
  };
}

