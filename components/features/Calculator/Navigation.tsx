import { Box, Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import ArrowRight from 'components/Icons/ArrowRight';

export default function Navigation({
  step,
  setStep,
  nextStep,
  maxSteps,
  isDisabled,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  nextStep: () => void;
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
      {step != 1 && (
        <Button
          variant="secondary"
          minW={{ base: '100%', md: '10.25rem' }}
          position="relative"
          order={{ base: 1, lg: 0 }}
          onClick={() => setStep(step - 1)}
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
      )}
      <Button
        variant="primary"
        minW={{ base: '100%', md: '10.25rem' }}
        position="relative"
        mb={{ base: '4', lg: '0' }}
        ml={{ base: '0', lg: '4' }}
        onClick={() => nextStep()}
        isDisabled={isDisabled}
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
