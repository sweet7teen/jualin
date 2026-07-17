import type { Metadata } from "next";
import { ThemeProvider, FOUCScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Belidisini",
  description: "SaaS Marketplace Platform",
  manifest: "/manifest.json",
  other: {
    "theme-color": "#171717",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <FOUCScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors animate-fade-in">
        <ThemeProvider>
          {children}
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}

function ServiceWorkerRegister() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ("serviceWorker" in navigator) {
            window.addEventListener("load", function() {
              navigator.serviceWorker.register("/sw.js");
            });
          }
        `,
      }}
    />
  );
}
