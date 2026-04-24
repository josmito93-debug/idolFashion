import localFont from 'next/font/local'
import { Inter, JetBrains_Mono } from 'next/font/google'

export const gcVank = localFont({
  src: '../../public/fonts/GC-Vank.ttf',
  variable: '--font-gc-vank',
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

// New Detail Fonts for Comparison
export const aestica = localFont({
  src: '../../public/fonts/details font/Main file/Aestica.ttf',
  variable: '--font-aestica',
})

export const vongks = localFont({
  src: '../../public/fonts/details font/vongks-elegant-serif-font-2026-04-07-06-13-36-utc/Vongks.ttf',
  variable: '--font-vongks',
})

export const domica = localFont({
  src: '../../public/fonts/details font/DomicaSauvage/Web-TT/Domica Sauvage-Regular.ttf',
  variable: '--font-domica',
})

export const calya = localFont({
  src: '../../public/fonts/editorial/Calya.ttf',
  variable: '--font-calya',
})

export const glamour = localFont({
  src: '../../public/fonts/editorial/Glamour.ttf',
  variable: '--font-glamour',
})

export const modal = localFont({
  src: '../../public/fonts/editorial/Modal.ttf',
  variable: '--font-modal',
})
