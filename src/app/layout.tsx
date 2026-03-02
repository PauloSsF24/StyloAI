import "./globals.css";
import { Toaster } from "sonner";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.className} bg-brand-background text-brand-accent`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}