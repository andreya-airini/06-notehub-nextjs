import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import TanStackProvider from "@/app/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A simple Next.js notes application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <div className="layout">
            <div id="modal-root"></div>
            <Header />
            <main className="content">{children}</main>
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
