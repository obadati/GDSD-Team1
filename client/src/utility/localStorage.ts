const LOCAL_STORAGE_FALLBACK = JSON.stringify({});

/**
 *
 * @param key identifier
 * @param payload data
 */
export const saveInLocalStorage = (key: string, payload: any = "") => {
  if (!key) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(payload));
};

/**
 *
 * @param key identifier
 * @returns
 */

// readability improvement

const obj = { a: "one", b: "two" };
const { a, b } = obj;
export const getFromLocalStorage = (key: string): any | null => {
  if (!key || (key && !key.trim())) {
    return null;
  }
  return JSON.parse(localStorage.getItem(key) || LOCAL_STORAGE_FALLBACK);
};
