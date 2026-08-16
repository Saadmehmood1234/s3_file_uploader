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
  visibility: "public" | "private";
  favorite: boolean;
  status: "pending" | "uploaded" | "failed";
  created_at: string;
  updated_at: string;
}

export interface FilesContextType {
  files: StoredFile[];
  setFiles: React.Dispatch<React.SetStateAction<StoredFile[]>>;
  loading: boolean;
  fetchFiles: () => Promise<void>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UploadUrlData {
  file: ApiFile;
  uploadUrl: string;
}

export interface DownloadData {
  id:string
  downloadUrl: string;
  mimeType:string;
  name:string;
  size:string
}