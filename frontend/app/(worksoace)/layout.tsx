import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/context/AuthProvider";
import { FilesProvider } from "@/context/FilesProvider";
import { getCurrentUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <AuthProvider initialUser={user}>
      <FilesProvider>
      <Layout>
        {children} <Toaster position="top-right" richColors closeButton />
      </Layout>
      </FilesProvider>
    </AuthProvider>
  );
}
