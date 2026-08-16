"use client";
import FileTable from "@/components/FileTable";
import { PageHeading } from "@/components/PageHeading";
import { useFiles } from "@/context/FilesProvider";

export default function SharedFilePage() {
  const { files, setFiles } = useFiles();
  const sharedFiles = files.filter((file) => file.visibility === "public");
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading
        eyebrow="Public"
        title="Shared Files"
        description="Your public files, always close at hand."
      />
      <FileTable
        files={sharedFiles}
        title="Shared files"
        onFilesChange={setFiles}
      />
    </div>
  );
}
