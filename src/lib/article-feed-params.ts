import { topics } from "@/lib/topics";

export type QueryValue = string | string[] | undefined;
export type FeedSearchParams = { q?: QueryValue; topic?: QueryValue };

// Match URLSearchParams.get: the first value wins, including an empty first value.
export function normalizeArticleFeedParams(params: FeedSearchParams) {
  const first = (value: QueryValue) => (Array.isArray(value) ? value[0] : value) ?? "";
  const topic = first(params.topic);
  return {
    topic: topics.includes(topic) ? topic : "All",
    query: first(params.q).trim(),
  };
}
