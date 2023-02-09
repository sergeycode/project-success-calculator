import { Box } from '@chakra-ui/react';

export default function StepIndicator({
  step,
  maxSteps,
  primaryColor,
  secondaryColor,
}: {
  step: number;
  maxSteps: number;
  primaryColor: string;
  secondaryColor: string;
}) {
  const barWidth: number = (step / maxSteps) * 100;

  return (
    <>
      <Box
        fontSize="md"
        lineHeight="1.5rem"
        textAlign="center"
        fontWeight="semibold"
      >
        Step {step} of {maxSteps}
      </Box>
      <Box
        position="relative"
        mt="6"
        mb={{ base: '8', lg: '12' }}
        mx="auto"
        w="100%"
        h="2"
        maxW="36.25rem"
        overflow="hidden"
      >
        <Box w="100%" h="100%" bgColor={primaryColor} />
        <Box
          w={`${barWidth}%`}
          h="100%"
          bgColor={secondaryColor}
          position="absolute"
          top="0"
          left="0"
          transition="width 0.3s ease-in-out"
        />
      </Box>
    </>
  );
}
