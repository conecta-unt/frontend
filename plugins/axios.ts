import axios from "axios";
import { useRouter } from "#imports";
import { API_URL } from "~/config/api";

export default defineNuxtPlugin(() => {
  const router = useRouter();

  const instance = axios.create({
    baseURL: API_URL || "",
    withCredentials: true,
  });

  let isRefreshing = false;
  let failedQueue: { resolve: Function; reject: Function }[] = [];

  function processQueue(error: any) {
    failedQueue.forEach(({ reject, resolve }) => {
      error ? reject(error) : resolve();
    });
    failedQueue = [];
  }

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;
      const status = error.response?.status;

      if (status === 401 && !original._retry) {
        original._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => instance(original));
        }

        isRefreshing = true;

        try {
          await axios.get(`${API_URL}/auth/session/refresh-token`, {
            withCredentials: true,
          });

          isRefreshing = false;
          processQueue(null);
          return instance(original);
        } catch (err) {
          isRefreshing = false;
          processQueue(err as Error);

          router.push("/auth/login");
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: instance,
    },
  };
});
