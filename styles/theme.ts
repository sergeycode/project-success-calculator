import { extendTheme } from '@chakra-ui/react';
import { Open_Sans, Roboto_Mono } from '@next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });

const customButtonProps = {
  fontSize: '1.125rem',
  borderRadius: '0',
  fontWeight: '700',
  textTransform: 'uppercase',
  border: '.125rem solid #333',
  boxShadow: '.1875rem .1875rem 0 0 #333',
  minW: '10.5rem',
  h: '3.75rem',
  _hover: {
    background: 'white',
    boxShadow: '.375rem .375rem 0 0 #333',
  },
  transition: 'all .2s cubic-bezier(0.55, 0.15, 0.55, 0.85)',
};

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
    Button: {
      variants: {
        primary: {
          ...customButtonProps,
          bgColor: 'lightTeal',
        },
        secondary: {
          ...customButtonProps,
          bgColor: 'white',
          _hover: {
            background: 'lightPeach',
            boxShadow: '.375rem .375rem 0 0 #333',
          },
        },
        danger: {
          bgColor: 'peach',
          _hover: {
            background: 'lightPeach',
            boxShadow: '.375rem .375rem 0 0 #333',
          },
        },
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
