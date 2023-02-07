import { extendTheme } from '@chakra-ui/react';
import { Open_Sans, Roboto_Mono } from '@next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });

const theme = extendTheme({
  fonts: {
    heading: openSans.style.fontFamily,
    body: robotoMono.style.fontFamily,
  },
  colors: {
    transparent: 'transparent',
    dark: '#333',
    white: '#fff',
    teal: '#006C77',
    lightTeal: '#82C5BE',
    grey: '#6B7280',
    lightGrey: '#EDF6F9',
    peach: '#FFDDD2',
    lightPeach: '#FFF1ED',
    sand: '#E29578',
  },
  styles: {
    global: {
      body: {
        color: 'dark',
      },
      p: {
        color: 'grey',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: ['100%', '540px', '720px', '960px', '1140px'],
      },
    },
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
});

export default theme;
