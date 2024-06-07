export function compareDate(now, target) {
  const nowDate = new Date(now);
  const targetDate = new Date(target);
  return nowDate > targetDate;
}

export function isArticleWithinTimeRange(articleDate, filterOptions) {
  const [startTime, endTime] = filterOptions;

  const start = startTime ? new Date(startTime).getTime() : null;
  const end = endTime ? new Date(endTime).getTime() : null;
  const articleTime = new Date(articleDate).getTime();

  if (start !== null && end !== null) {
    return articleTime >= start && articleTime <= end;
  }
  if (start !== null) {
    return articleTime >= start;
  }
  if (end !== null) {
    return articleTime <= end;
  }
  return true;
}
