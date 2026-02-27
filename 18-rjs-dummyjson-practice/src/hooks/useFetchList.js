import { useEffect, useState } from "react";
import { api } from "../libs/axios";

/**
 * BE: /products/search?q=&limit=5&skip=0&sortBy=&order=
 * Expected: /products/search?q=&page=1&limit=5&skip=0&sortBy=&order=
 */
const useFetchList = (path, query, config = {}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      // we have page, but BE needs skip
      const skip = (query.page - 1) * query.limit;
      query.skip = skip;

      // convert object -> string
      const queryString = new URLSearchParams(query).toString();
      const res = await api.get(`/${path}/search?${queryString}`, config);

      console.log(new Date().toLocaleTimeString(), `=> /${path}/search?${queryString}`);
      setData(res.data[path]);
    })();
  }, [path, JSON.stringify(query), JSON.stringify(config)]);

  return [data];
}

export default useFetchList;