import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://erabuild.example"),
  title: {
    default: "ERA Build — სამშენებლო მასალებისა და ხელსაწყოების მარკეტი",
    template: "%s | ERA Build",
  },
  description:
    "სამშენებლო მასალების, ხელსაწყოებისა და აღჭურვილობის პროფესიონალური ონლაინ მარკეტი. კონტრაქტორის ფასები, ათასობით პროდუქტი და სწრაფი მიწოდება.",
  keywords: [
    "სამშენებლო მასალები",
    "სამშენებლო მარკეტი",
    "ხელსაწყოები",
    "ცემენტი",
    "არმატურა",
    "ელექტრო ხელსაწყოები",
    "construction materials",
  ],
  openGraph: {
    title: "ERA Build — სამშენებლო მასალებისა და ხელსაწყოების მარკეტი",
    description:
      "ათასობით სამშენებლო პროდუქტი კონტრაქტორის ფასებში და სწრაფი მიწოდებით.",
    type: "website",
    siteName: "ERA Build",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Set theme before paint to avoid flash.
const themeScript = `
(function(){try{var t=localStorage.getItem('era_theme');if(t)t=JSON.parse(t);if(!t)t='dark';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka" className={`${geistSans.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
