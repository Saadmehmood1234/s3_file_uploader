"use client";
import FileTable from "@/components/FileTable";
import { PageHeading } from "@/components/PageHeading";
import { useFiles } from "@/context/FilesProvider";
export default function FavoriteFilePage() {
  const { files, setFiles } = useFiles();

  const importantFiles = files.filter((file) => file.isImportant);
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading
        eyebrow="Important"
        title="Important Files"
        description="Your most important files, always close at hand."
      />
      <FileTable
        files={importantFiles}
        title="Important files"
        onFilesChange={setFiles}
      />
    </div>
  );
}
