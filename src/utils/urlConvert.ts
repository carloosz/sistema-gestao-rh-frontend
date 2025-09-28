import { baseURL } from '@/services/api';

export function urlConvert(url: string) {
  const api_url = baseURL?.replace('/api/', '');
  return `${api_url}${url}?v=${Date.now()}`;
}
