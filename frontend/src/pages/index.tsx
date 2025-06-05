"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // Realiza o redirecionamento para o dashboard após o componente ser montado
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1>Conteúdo principal</h1>
        </main>
      </div>
    </SidebarProvider>
  );
}
