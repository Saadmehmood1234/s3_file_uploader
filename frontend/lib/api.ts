
import axios, {
  AxiosProgressEvent,
} from "axios";

import { env } from "@/config/env";
import {
  ApiFile,
  UploadPayload,
} from "@/types/file";
import {
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface UploadUrlData {
  file: ApiFile;
  uploadUrl: string;
}

interface DownloadData {
  downloadUrl: string;
  expiredIn: number;
}

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
});

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const response = await api.post("/auth/signup", payload);
    return response.data;
  },

  login: async (payload: LoginPayload) => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  verify: async (token: string) => {
    const response = await api.get("/auth/verify", {
      params: { token },
    });

    return response.data;
  },

  user: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};


export const fileApi = {
  createUploadUrl: async (
    payload: UploadPayload,
  ): Promise<ApiResponse<UploadUrlData>> => {
    const response =
      await api.post<ApiResponse<UploadUrlData>>(
        "/files/upload-url",
        payload,
      );

    return response.data;
  },

  uploadToStorage: async (
    uploadUrl: string,
    file: File,
    onProgress: (progress: number) => void,
  ): Promise<void> => {
    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },

      onUploadProgress: (
        progressEvent: AxiosProgressEvent,
      ) => {
        if (!progressEvent.total) return;

        const percent = Math.round(
          (progressEvent.loaded * 100) /
            progressEvent.total,
        );

        onProgress(percent);
      },
    });
  },

  completeUpload: async (
    id: string,
  ): Promise<ApiResponse<ApiFile>> => {
    const response =
      await api.post<ApiResponse<ApiFile>>(
        `/files/${id}/complete`,
      );

    return response.data;
  },

  getFile: async (
    id: string,
  ): Promise<ApiResponse<ApiFile>> => {
    const response =
      await api.get<ApiResponse<ApiFile>>(
        `/files/${id}`,
      );

    return response.data;
  },

  getFiles: async (): Promise<
    ApiResponse<ApiFile[]>
  > => {
    const response =
      await api.get<ApiResponse<ApiFile[]>>(
        "/files",
      );

    return response.data;
  },

  updateFileVisibility: async (
    id: string,
    visibility: "public" | "private",
  ): Promise<ApiResponse<ApiFile>> => {
    const response =
      await api.patch<ApiResponse<ApiFile>>(
        `/files/${id}/visibility`,
        {
          visibility,
        },
      );

    return response.data;
  },

  updateFavoriteFile: async (
    id: string,
    favorite: boolean,
  ): Promise<ApiResponse<ApiFile>> => {
    const response =
      await api.patch<ApiResponse<ApiFile>>(
        `/files/${id}/favorite`,
        {
          favorite,
        },
      );

    return response.data;
  },

  deleteFile: async (
    id: string,
  ): Promise<ApiResponse<null>> => {
    const response =
      await api.delete<ApiResponse<null>>(
        `/files/${id}`,
      );

    return response.data;
  },

  downloadFile: async (
    id: string,
  ): Promise<ApiResponse<DownloadData>> => {
    const response =
      await api.get<ApiResponse<DownloadData>>(
        `/files/${id}/download`,
      );

    return response.data;
  },

  getPublicFile: async (
    id: string,
  ): Promise<ApiResponse<DownloadData>> => {
    const response =
      await api.get<ApiResponse<DownloadData>>(
        `/public/files/${id}`,
      );

    return response.data;
  },
};