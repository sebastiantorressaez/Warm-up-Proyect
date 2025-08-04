import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export function formatArticleDate(dateStr: string) {
  const date = dayjs(dateStr);

  if (date.isToday()) return date.format("h:mm A");
  if (date.isYesterday()) return "Yesterday";

  return date.format("MMM D");
}
