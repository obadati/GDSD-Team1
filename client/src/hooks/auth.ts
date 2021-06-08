export const useAuth = (): boolean => {
  return Boolean(
    localStorage.getItem("auth-user") &&
      JSON.parse(localStorage.getItem("auth-user") as any).token
  );
};
