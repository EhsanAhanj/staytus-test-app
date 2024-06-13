import { api } from '.';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (args: AxiosRequestConfig<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AxiosResponse<any, any>>();
  const [error, setError] = useState();
  useEffect(() => {
    api(args)
      .then((response) => {
        setIsLoading(false);
        setData(response);
      })
      .catch((ex) => {
        setIsLoading(false);
        setError(ex);
      });
  }, []);

  return { data, error, isLoading };
};

export default useFetch;
