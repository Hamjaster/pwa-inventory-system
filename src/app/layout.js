import { Inter } from "next/font/google";
import "./globals.css";
import MainFrame from "@/components/MainFrame";
const inter = Inter({ subsets: ["latin"] });
import ReduxProvider from "@/components/Providers";

export const metadata = {
  title: 'Sky Solar',
  description: 'Created by Hamza Shah',
  manifest: '/manifest.json',
  themeColor: '#0062ca'
}


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          <MainFrame>
            {children}
          </MainFrame>
        </body>
      </ReduxProvider>
    </html>
  );
}
