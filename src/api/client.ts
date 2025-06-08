import { $fetch } from 'ofetch';
// import type { FetchOptions } from 'ofetch'; 

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const upFetch = $fetch.create({
  baseURL: baseUrl,
  async onRequest({ options }) {
    const token = localStorage.getItem('token');
    if (token) {
      options.headers = new Headers(options.headers);
      options.headers.set('Authorization', `Bearer ${token}`);
    }
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  },
});