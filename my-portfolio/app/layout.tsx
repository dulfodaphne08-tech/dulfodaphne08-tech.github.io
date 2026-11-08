import './globals.css'
import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'framer-motion'
import AmbientExperience from './components/AmbientExperience'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'
import { Playfair_Display, Montserrat, Anton } from 'next/font/google'
import Script from 'next/script'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700', '900'], variable: '--font-playfair' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-montserrat' })
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' })

export const metadata = {
  title: 'Daphne Dulfo | Portfolio',
  description: 'The portfolio of Daphne Dulfo, a BSIT student and aspiring IT professional.',
}

const themeInitScript = `try {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const theme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
} catch {
  document.documentElement.dataset.theme =
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${montserrat.variable} ${anton.variable} font-sans bg-[#f4f4f5]`}>
        <Script id="theme-init" strategy="beforeInteractive">{themeInitScript}</Script>
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
              <AmbientExperience />
              <Cursor />
              <Navbar />
              <main className="relative z-10">{children}</main>
              <Footer />
            </ReactLenis>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  )
}