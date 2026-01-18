import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "@/app/globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const fontSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontGeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontGeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "US Macro Dashboard",
  description: "Real-time macroeconomic data visualization and analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontGeistSans.variable} ${fontGeistMono.variable} dark`}>
      <body className="bg-neutral-950 text-neutral-200 antialiased font-sans">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="flex h-12 items-center gap-4 border-b border-neutral-800 px-4 sticky top-0 bg-neutral-950 z-10">
                <SidebarTrigger className="text-neutral-400 hover:text-neutral-100 transition-colors" />
                <div className="h-4 w-px bg-neutral-800" />
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Macro Terminal v1.0</span>
              </header>
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
