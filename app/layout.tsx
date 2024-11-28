import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./context/theme";
import { VendorProvider } from "./context/vendors";
import { AuthProvider } from "./context/authContext";
import { ConditionalSidebarLayout } from "@/components/ui/ConditionalSidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cybernx",
  description: "Cybernx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <VendorProvider>
            <ThemeProvider>
              {/* <div className={`h-screen overflow-hidden`}>
                <div className="bg-gray-100 dark:bg-gray-900 h-screen flex transition-colors duration-300 overflow-hidden">
                  <div className="flex flex-grow overflow-hidden"> */}
                    <ConditionalSidebarLayout>{children}</ConditionalSidebarLayout>
                  {/* </div>
                </div>
              </div> */}
            </ThemeProvider>
          </VendorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

