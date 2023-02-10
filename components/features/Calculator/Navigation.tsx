import { Box, Button } from '@chakra-ui/react';

import ArrowRight from 'components/Icons/ArrowRight';

export default function Navigation({
  step,
  handleStep,
  maxSteps,
  isDisabled,
}: {
  step: number;
  handleStep: (prev?: boolean) => void;
  maxSteps: number;
  isDisabled: boolean;
}) {
  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', lg: 'row' }}
      mt={{ base: '4', lg: '12' }}
      justifyContent="center"
    >
      <Button
        variant="secondary"
        minW={{ base: '100%', md: '10.25rem' }}
        position="relative"
        order={{ base: 1, lg: 0 }}
        onClick={() => handleStep(true)}
        isDisabled={step === 1}
        display={step === 1 ? 'none' : 'flex'}
        data-testid="prev"
      >
        Previous{' '}
        <ArrowRight
          display={{ base: 'none', lg: 'block' }}
          position={{ lg: 'absolute' }}
          left={{ lg: '4' }}
          transform="rotate(180deg)"
          transition="none"
        />
      </Button>
      <Button
        variant="primary"
        minW={{ base: '100%', md: '10.25rem' }}
        position="relative"
        mb={{ base: '4', lg: '0' }}
        ml={{ base: '0', lg: '4' }}
        onClick={() => handleStep()}
        isDisabled={isDisabled}
        data-testid="next"
      >
        {step === maxSteps ? 'Finish' : 'Next'}
        <ArrowRight
          display={{ base: 'none', lg: 'block' }}
          position={{ lg: 'absolute' }}
          right={{ lg: '4' }}
        />
      </Button>
    </Box>
  );
}
