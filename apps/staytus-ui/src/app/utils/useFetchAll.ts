import { api } from '.';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

function useFetchAll<T>(args: AxiosRequestConfig<any>[]): {
  data: T | undefined;
  error?: AxiosError<unknown, any>;
  isLoading: boolean;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState();
  useEffect(() => {
    setIsLoading(true);
    Promise.all(args.map((el) => api(el)))
      .then((response) => {
        setIsLoading(false);

        setData(response as T);
      })
      .catch((ex) => {
        setIsLoading(false);

        setError(ex);
      });
  }, []);

  return { data, error, isLoading };
}

export default useFetchAll;
