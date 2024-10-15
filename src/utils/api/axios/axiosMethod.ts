import axios from './axiosInstance';

export const getRequest = (URL: string, config?: any) =>
  axios.get(`/${URL}`, config).then((response) => response);

export const postRequest = (URL: string, payload: any, config?: any) =>
  axios.post(`/${URL}`, payload, config).then((response) => response);

export const putRequest = (URL: string, payload: any, config?: any) =>
  axios.put(`/${URL}`, payload, config).then((response) => response);

export const deleteRequest = (URL: string, config?: any) =>
  axios.delete(`/${URL}`, config).then((response) => response);

export const patchRequest = (URL: string, payload: any, config?: any) =>
  axios.patch(`/${URL}`, payload, config).then((response) => response);

export default {};
