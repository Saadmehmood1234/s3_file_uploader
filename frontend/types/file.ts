export interface UploadPayload {
  fileName: string;
  mimeType: string;
  size: number;
}

export type FileVisibility = "public" | "private";

export type StoredFileType =
  | "PDF"
  | "TXT"
  | "XLSX"
  | "DOCX"
  | "ZIP"
  | "JPG"
  | "JPEG"
  | "PNG"
  | "WEBP"
  | "GIF"
  | "MP3"
  | "WAV"
  | "OGG"
  | "M4A"
  | "MP4"
  | "WEBM"
  | "MOV"
  | "AVI";

export interface StoredFile{
  id: string;
  name: string;
  type:StoredFileType;
  size: number;
  sizeLabel: string;
  updatedAt: string;
  owner: string;
  visibility: FileVisibility;
  favorite: boolean;
  shared: boolean;
  recent: boolean;
};


export interface ApiFile {
  id: string;
  original_name: string;
  mime_type: string;
  size: string;
  status: "pending" | "uploaded" | "failed";
  visibility: "public" | "private";
  favorite:boolean;
  created_at: string;
  updated_at: string;
}

export interface FilesContextType {
  files: StoredFile[];
  setFiles: React.Dispatch<React.SetStateAction<StoredFile[]>>;
  loading: boolean;
  fetchFiles: () => Promise<void>;
}