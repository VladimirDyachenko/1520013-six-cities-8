import { useEffect, useState } from 'react';
import { BACKEND_URL, HttpCode } from '../utils/const';

type UseFetchReturn<T> = {
  data: T | null;
  errorCode: number | null;
}

const useFetch = <T>(endPoint: string): UseFetchReturn<T>  => {
  const [data, setData] = useState<T | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}${endPoint}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
          setErrorCode(null);
        } else {
          setData(null);
          setErrorCode(res.status);
        }

      } catch (error) {
        setData(null);
        // Ничего лучше 400 я не придумал, пока будет так
        setErrorCode(HttpCode.BadRequest);
      }

    };

    fetchData();

  }, [endPoint]);

  return { data, errorCode };
};

export { useFetch };
