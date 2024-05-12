import { Nunito } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import "./globals.css";
import SearchModal from "@/components/modals/search-modal";
import ScrollToTop from "@/components/scroll-to-top";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Store",
  description: "Store - The place for all your purchases.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <SearchModal />
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
