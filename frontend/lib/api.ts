import { env } from "@/config/env";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { UploadPayload } from "@/types/file";
import axios from "axios";

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
  createUploadUrl: async (payload: UploadPayload) => {
    const response = await api.post("/files/upload-url", payload);
    return response.data;
  },

  uploadToStorage: async (
    uploadUrl: string,
    file: File,
    onProgress: (progress: number) => void,
  ) => {
    const response = await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },

      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;

        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );

        onProgress(percent);
      },
    });

    return response.data;
  },

  completeUpload: async (id: string) => {
    const response = await api.post(`/files/${id}/complete`);
    return response.data;
  },

  getFile: async (id: string) => {
    const response = await api.get(`/files/${id}`);
    return response.data;
  },

  getFiles: async () => {
    const response = await api.get("/files");
    return response.data;
  },

  updateFileVisibility: async (
    id: string,
    visibility: "public" | "private",
  ) => {
    const response = await api.patch(`/files/${id}/visibility`, {
      visibility,
    });

    return response.data;
  },

  updateFavoriteFile: async (id: string, favorite: boolean) => {
    const response = await api.patch(`/files/${id}/favorite`, {
      favorite,
    });

    return response.data;
  },

  deleteFile: async (id: string) => {
    const response = await api.delete(`/files/${id}`);
    return response.data;
  },

  downloadFile: async (id: string) => {
    const response = await api.get(`/files/${id}/download`);
    return response.data;
  },

  getPublicFile: async (id: string) => {
    const response = await api.get(`/public/files/${id}`);
    return response.data;
  },
};
