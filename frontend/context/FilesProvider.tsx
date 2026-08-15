"use client"
import { ApiFile, FilesContextType, StoredFile } from "@/types/file";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import { fileApi } from "@/lib/api";
import { getFileType } from "@/lib/getFileType";
import { calculateFileSize } from "@/lib/calculateFileSize";

const FilesContext = createContext<FilesContextType | null>(null);

export const FilesProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fileApi.getFiles();

      const formattedFiles: StoredFile[] = res.data.map((file: ApiFile) => ({
        id: file.id,

        name: file.original_name,

        type: getFileType(file.mime_type),

        size: Number(file.size),

        sizeLabel: calculateFileSize(Number(file.size)),

        updatedAt: file.updated_at,

        owner: user.name,

        visibility: file.visibility,

        favorite: file.favorite,

        shared: file.visibility === "public",

        recent:
          Date.now() - new Date(file.updated_at).getTime() <
          7 * 24 * 60 * 60 * 1000,
      }));

      setFiles(formattedFiles);
    } catch (error: any) {
      console.error("Failed to fetch files", error);
    } finally {
      setLoading(false);
    }
  }, [user.name]);
  useEffect(() => {
    fetchFiles();
  }, [user.name]);

  return (
    <FilesContext.Provider value={{ files, setFiles, loading, fetchFiles }}>
      {children}
    </FilesContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFiles must be used inside FilesProvider");
  }
  return context;
};
