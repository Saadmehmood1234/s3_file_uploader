export function getFileTypeImage(type: string) {
  const normalizedType = type.toUpperCase();

  switch (normalizedType) {
    case "PDF":
      return "/file-types/pdf.jpeg";

    case "DOCX":
      return "/file-types/docx.jpeg";

    case "XLSX":
      return "/file-types/xlsx.png";

    case "TXT":
      return "/file-types/txt.png";

    case "ZIP":
      return "/file-types/zip.png";

    case "MP3":
      return "/file-types/mp3.png";
    case "WAV":
      return "/file-types/wav.jpeg";
    case "OGG":
      return "/file-types/ogg.png";
    case "M4A":
      return "/file-types/m4a.png";

    case "MP4":
      return "/file-types/mp4.png";
    case "WEBM":
      return "/file-types/webm.png";
    case "MOV":
      return "/file-types/mov.png";
    case "AVI":
      return "/file-types/avi.png";

    default:
      return "/file-types/all-files.avif";
  }
}
