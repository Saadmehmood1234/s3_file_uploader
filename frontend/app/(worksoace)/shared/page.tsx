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
        eyebrow="Pinned"
        title="Favorites"
        description="Your most important files, always close at hand."
      />
      <FileTable
        files={sharedFiles}
        title="Recent files"
        onFilesChange={setFiles}
      />
    </div>
  );
}
