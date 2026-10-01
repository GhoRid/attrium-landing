import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { ContactModalProvider } from "@/store/contactModal.store";
import "./globals.css";

export const metadata: Metadata = {
  title: "아트리움",
  description:
    "주보 생성, 헌금, 함께 기도드리기, 공지사항까지 — 교회 운영을 하나로 이어주는 Attrium.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ContactModalProvider>
          <Header />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}
