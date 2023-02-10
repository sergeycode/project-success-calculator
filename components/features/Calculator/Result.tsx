import {
  Box,
  Heading,
  Text,
  Flex,
  Wrap,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Image from 'next/image';

import CalculatorContactHandler from 'components/Forms/CalculatorContactHandler';
import ArrowRight from 'components/Icons/ArrowRight';

const ResultBox = ({
  icon,
  title,
  rate,
  border,
}: {
  icon: string;
  title: string;
  rate: string | React.ReactNode;
  border: string;
}) => (
  <Box p="2.5rem 2rem" border={border}>
    <Flex>
      <Image src={icon} alt="" width="72" height="72" />
      <Box ml="5">
        <Box
          fontSize={{ base: '1.125rem', lg: '1.375rem' }}
          fontWeight="bold"
          fontFamily="heading"
        >
          {title}
        </Box>
        <Box
          fontSize={{ base: '1.5rem', lg: '2rem' }}
          fontWeight="bold"
          display="flex"
        >
          {rate}%
        </Box>
      </Box>
    </Flex>
  </Box>
);

export default function Result({
  theme,
  completed,
  toggleForm,
  calculateResults,
  estimateIncludes,
  handleReset,
  submitted,
}: {
  theme: {
    primary: string;
    secondary: string;
    text: string;
    dark: string;
    light: string;
    border: string;
    boxShadow: string;
  };
  completed: boolean;
  toggleForm: boolean;
  calculateResults: () => string;
  estimateIncludes: string[];
  handleReset: () => void;
  submitted: string;
}) {
  return (
    <Box
      bgColor="white"
      border={theme.border}
      boxShadow={theme.boxShadow}
      overflow="hidden"
      display={!completed ? 'none' : 'block'}
    >
      <Grid gridTemplateColumns={{ lg: toggleForm ? '1fr 1fr' : 'none' }}>
        <GridItem>
          <Box p={{ base: '1.5rem', lg: '2.5rem 2rem 2.5rem 2rem' }}>
            <Heading
              as="h3"
              fontSize={{ base: '1.5rem', lg: '2rem' }}
              textAlign="center"
              mb={{ base: '6', lg: '10' }}
            >
              Results
            </Heading>
            <Grid
              gridTemplateColumns={{
                lg: !toggleForm ? '1fr 1fr' : 'none',
              }}
              gap="6"
              mb={{ base: '6', lg: '10' }}
            >
              <GridItem>
                <ResultBox
                  icon="/images/calculator/icons/success.svg"
                  title="Project Success Rate"
                  rate={completed ? calculateResults() : '0'}
                  border={theme.secondary}
                />
              </GridItem>
            </Grid>
            <Heading as="h4" fontSize="1rem" mb={{ base: '3', lg: '6' }}>
              What is included in the estimate
            </Heading>
            <Box mx="auto">
              <Wrap spacing={4}>
                {estimateIncludes.map((item) => (
                  <Box
                    key={item}
                    mx={!toggleForm ? 'auto' : '0'}
                    display="inline-block"
                    p="0.25rem 0.875rem"
                    color={theme.dark}
                    bgColor={theme.primary}
                    border={theme.border}
                    fontSize="sm"
                    flexShrink={0}
                  >
                    {item}
                  </Box>
                ))}
              </Wrap>
            </Box>
            <Box
              display="flex"
              flexDirection={{ base: 'column', lg: 'row' }}
              mt={{ base: '4', lg: toggleForm ? '4' : '12' }}
              justifyContent="center"
            >
              <Button
                variant="secondary"
                minW={{ base: '100%', md: '16rem' }}
                position="relative"
                order={{ base: 1, lg: 0 }}
                onClick={() => handleReset()}
              >
                <ArrowRight
                  mr="3"
                  transform="rotate(180deg)"
                  transition="none"
                />
                Start Over
              </Button>
            </Box>
          </Box>
        </GridItem>
        {toggleForm && (
          <GridItem
            bgColor={theme.light}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box py={{ lg: '2rem' }}>
              {submitted === '1' ? (
                <Box py="2rem" mb="6" textAlign="center" mx="auto" maxW="450px">
                  <Box fontSize="4xl" fontWeight="bold" color="grey.900">
                    <Box fontFamily="heading" color={theme.secondary}>
                      Thank you
                    </Box>
                    <Box fontFamily="heading">for your interest.</Box>
                  </Box>
                  <Text
                    mt="6"
                    lineHeight="shorter"
                    fontSize={{ base: 'md', lg: 'lg' }}
                  >
                    We will be in touch shortly to talk more about your project.
                  </Text>
                </Box>
              ) : (
                <CalculatorContactHandler
                  title="Ready to Start Your Project?"
                  theme={theme}
                  buttonText="Submit"
                  completed={completed}
                />
              )}
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}
