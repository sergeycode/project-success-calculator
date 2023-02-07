import Head from 'next/head';
import Calculator from '@/components/features/Calculator';

const calculatorTheme = {
  primary: 'lightTeal',
  secondary: 'teal',
  text: 'grey',
  dark: 'black',
  light: 'lightPeach',
  border: '.125rem solid #333',
  boxShadow: '.1875rem .1875rem 0 0 #333',
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Success Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Calculator theme={calculatorTheme} withStart={false} />
    </>
  );
}
