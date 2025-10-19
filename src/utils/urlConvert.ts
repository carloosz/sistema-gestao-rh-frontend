import { baseURL } from '@/services/api';

export function urlConvert(url: string) {
  const api_url = baseURL?.replace('/api/', '');
  console.log(`${api_url}${url}?v=${Date.now()}`);
  return `${api_url}${url}?v=${Date.now()}`;
}
