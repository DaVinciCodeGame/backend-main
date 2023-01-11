import axios, { AxiosRequestConfig } from 'axios';

export default abstract class AjaxRepository {
  private readonly axios;

  constructor() {
    this.axios = axios;
  }

  protected get(url: string, config?: AxiosRequestConfig) {
    if (config) return this.axios.get(url, config);
    return this.axios.get(url);
  }

  protected delete(url: string, config?: AxiosRequestConfig) {
    if (config) return this.axios.delete(url, config);
    return this.axios.delete(url);
  }

  protected post(url: string, data?: any, config?: AxiosRequestConfig) {
    if (config) return this.axios.post(url, data, config);
    if (data) return this.axios.post(url, data);
    return this.axios.post(url);
  }

  protected put(url: string, data?: any, config?: AxiosRequestConfig) {
    if (config) return this.axios.put(url, data, config);
    if (data) return this.axios.put(url, data);
    return this.axios.put(url);
  }
}
