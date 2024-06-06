/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInstance";

export async function getRequest(URL: string) {
  const response = await axiosInstance.get(URL);
  return response.data;
}

export async function postRequest(URL: string, payload: any) {
  const response = await axiosInstance.post(URL, payload);
  return response.data;
}

export async function patchRequest(URL: string, payload: any) {
  const response = await axiosInstance.patch(URL, payload);
  return response;
}

export async function deleteRequest(URL: string) {
  const response = await axiosInstance.delete(URL);
  return response;
}
