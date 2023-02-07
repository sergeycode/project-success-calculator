import NextLink from 'next/link';
import { Button, Link } from '@chakra-ui/react';
import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export interface ButtonProps extends ChakraButtonProps {
  href?: string;
}

export const PrimaryButton = ({ ...props }: ButtonProps) => {
  const ButtonType = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href?: string | undefined;
  }) => {
    if (href) {
      return (
        <NextLink href={href} passHref>
          <Link
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            {...props}
          >
            {children}
          </Link>
        </NextLink>
      );
    } else {
      return <Button {...props}>{children}</Button>;
    }
  };

  return (
    <ButtonType
      fontSize="1.125rem"
      borderRadius="0"
      fontWeight="700"
      textTransform="uppercase"
      border=".125rem solid #333"
      bgColor="lightTeal"
      boxShadow=".1875rem .1875rem 0 0 #333"
      minW="10.5rem"
      h="3.75rem"
      _hover={{
        background: 'white',
        boxShadow: '.375rem .375rem 0 0 #333',
      }}
      transition="all .2s cubic-bezier(0.55, 0.15, 0.55, 0.85)"
      {...props}
    >
      {props.children}
    </ButtonType>
  );
};

export const SecondaryButton = ({ ...props }: ButtonProps) => {
  return (
    <PrimaryButton
      bgColor="white"
      _hover={{
        background: 'lightPeach',
        boxShadow: '.375rem .375rem 0 0 #333',
      }}
      {...props}
    >
      {props.children}
    </PrimaryButton>
  );
};

export const DangerButton = ({ ...props }: ButtonProps) => {
  return (
    <PrimaryButton
      bgColor="peach"
      _hover={{
        background: 'lightPeach',
        boxShadow: '.375rem .375rem 0 0 #333',
      }}
      {...props}
    >
      {props.children}
    </PrimaryButton>
  );
};
