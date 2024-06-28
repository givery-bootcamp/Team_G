import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { Inter, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["900", "500", "400"],
  subsets: ["latin"],
  variable: "--font-zen-kaku-gothic-new",
});

export const metadata: Metadata = {
  title: "Team Aoi",
  description: "Team Aoi app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body className={(inter.className, zenKakuGothicNew.variable)}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
