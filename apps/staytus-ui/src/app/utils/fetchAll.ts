import { Response } from '@staytus/types';
import axios from 'axios';

const fetchAll = async (url: string, result: any[]) => {
  const response = await axios.get<Response<any>>(url);

  response.data.results.forEach((element) => {
    result.push(element);
  });

  if (response.data.next) {
    await fetchAll(response.data.next, result);
  }

  return result;
};
export default fetchAll;
