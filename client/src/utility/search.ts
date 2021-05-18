import fuse from "fuse.js";

const DEFAULT_SEARCH_THRESHOLD = 0.4;

/**
 *
 * @param list List to search in
 * @param keys Keys to search for
 * @param searchThreshold search intensity for exact match
 */
export const configureSearcher = (
  list: any[],
  keys: string[],
  searchThreshold = DEFAULT_SEARCH_THRESHOLD
) => {
  return new fuse(list, {
    threshold: searchThreshold,
    keys,
    shouldSort: true,
    includeMatches: false,
  });
};
