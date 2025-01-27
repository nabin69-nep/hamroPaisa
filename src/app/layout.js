import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {
  title: "Hamro Paisa",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="" >
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden bg-center bg-[url('/Images/bg1.jpg')] bg-cover bg-no-repeat`}
      >
        {children}
      </body>
    </html>
  );
}
