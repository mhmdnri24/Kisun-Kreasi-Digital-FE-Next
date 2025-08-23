import AuthGuard from "@/components/AuthGuard";
import AppLayout from "@/components/app";

export default function ProtectLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>
    <AppLayout>
      {children}
    </AppLayout>
  </AuthGuard>;
}