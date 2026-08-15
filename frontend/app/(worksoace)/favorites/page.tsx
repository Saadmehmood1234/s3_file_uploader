"use client";
import FileTable from "@/components/FileTable";
import { PageHeading } from "@/components/PageHeading";
import { useFiles } from "@/context/FilesProvider";
export default function FavoriteFilePage() {
  const { files, setFiles } = useFiles();

  const favorateFile = files.filter(
  (file) => file.favorite,
);
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading
        eyebrow="Pinned"
        title="Favorites"
        description="Your most important files, always close at hand."
      />
      <FileTable files={favorateFile} title="Recent files" onFilesChange={setFiles} />
    </div>
  );
}
