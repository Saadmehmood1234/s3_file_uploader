export interface UploadPayload {
  fileName: string;
  mimeType: string;
  size: number;
}

export type FileVisibility = "public" | "private";

export type StoredFileType =
  | "PDF"
  | "TXT"
  | "CSV"
  | "DOCX"
  | "DOC"
  | "XLSX"
  | "XLS"
  | "PPTX"
  | "PPT"
  | "JSON"
  | "XML"
  | "MD"
  | "ZIP"
  | "RAR"
  | "7Z"
  | "TAR"
  | "GZ"
  | "JPG"
  | "JPEG"
  | "PNG"
  | "WEBP"
  | "AVIF"
  | "GIF"
  | "SVG"
  | "BMP"
  | "TIFF"
  | "ICO"
  | "MP3"
  | "WAV"
  | "OGG"
  | "M4A"
  | "AAC"
  | "FLAC"
  | "MP4"
  | "WEBM"
  | "MOV"
  | "AVI"
  | "MKV"
  | "OTHER";

export interface StoredFile{
  id: string;
  name: string;
  type:StoredFileType;
  size: number;
  sizeLabel: string;
  updatedAt: string;
  owner: string;
  visibility: FileVisibility;
  isImportant: boolean;
  shared: boolean;
  recent: boolean;
};


export interface ApiFile {
  id: string;
  original_name: string;
  mime_type: string;
  size: string;
  visibility: "public" | "private";
  is_important: boolean;
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