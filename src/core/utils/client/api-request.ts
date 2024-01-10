import axios, { AxiosResponse } from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const mockApiRequest = <T>(data: T) => {
  const response: AxiosResponse = {
    data,
    status: 200,
    statusText: 'ok',
    headers: {'set-cookie': undefined},
    config: {}
  };
  return new Promise<AxiosResponse<T, any>>(resolve => resolve(response));
}

export default apiRequest;
