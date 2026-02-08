import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider"; 
import  Footer from "@/components/footer"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      {/* 1. Added suppressHydrationWarning to <html> (Required by next-themes) */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}>
        {/* 2. Wrap everything in the ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar /> 
          <main className="grow">{children}</main>
          <Footer/>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}