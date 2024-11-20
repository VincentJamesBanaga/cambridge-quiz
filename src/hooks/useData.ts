import { useEffect } from "react";

// Context
import { useAppContext } from "./useAppContext";

const useData = () => {
  const { loading, setLoading, data, setData } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const responseData = await fetch(
          "/api/interview.mock.data/payload.json"
        ).then((res) => res.json());

        setLoading(false);
        setData({ type: "SET_DATA", payload: responseData });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getData();
  }, [setData, setLoading]);

  return { data, loading };
};

export default useData;
