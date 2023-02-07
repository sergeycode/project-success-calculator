import {
  Container,
  Box,
  Heading,
  Text,
  Flex,
  Wrap,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PrimaryButton, SecondaryButton } from 'components/UI/Button';
import CalculatorContactHandler from '../../Forms/CalculatorContactHandler';
import ArrowRight from 'components/Icons/ArrowRight';
import slugify from 'helpers/slugify';
import median from 'helpers/median';
import { useRouter } from 'next/router';

const tools1 = ['Basecamp', 'Trello', 'Asana', 'Jira'];

const tools2 = ['Private Slack Channel'];

const tools3 = ['Emails'];

const tools4 = ['Text Messages', 'Phone Calls'];

const AllTools = () => {
  const toolsOptions: {
    title: string;
    icon: string;
    point: number;
  }[] = [];
  tools1.map((item) => {
    toolsOptions.push({
      title: item,
      icon: '',
      point: 4,
    });
  });

  tools2.map((item) => {
    toolsOptions.push({
      title: item,
      icon: '',
      point: 3,
    });
  });

  tools3.map((item) => {
    toolsOptions.push({
      title: item,
      icon: '',
      point: 2,
    });
  });

  tools4.map((item) => {
    toolsOptions.push({
      title: item,
      icon: '',
      point: 1,
    });
  });

  return toolsOptions.sort((a, b) =>
    slugify(a.title) > slugify(b.title)
      ? 1
      : slugify(b.title) > slugify(a.title)
      ? -1
      : 0
  );
};

interface StepData {
  name: string;
  title: string;
  multiple: boolean;
  long: boolean;
  items: {
    title: string;
    point: number;
    icon: string;
  }[];
}

const stepData: StepData[] = [
  {
    name: 'scope',
    title: 'Do you have a defined project scope:',
    multiple: false,
    long: false,
    items: [
      {
        title: 'Detailed description with deliverables and timelines',
        icon: '/images/calculator/',
        point: 4,
      },
      {
        title: 'Good description',
        icon: '/images/calculator/',
        point: 3,
      },
      {
        title: 'I have a design',
        icon: '/images/calculator/',
        point: 2,
      },
      {
        title: 'I have an idea',
        icon: '/images/calculator/',
        point: 1,
      },
    ],
  },
  {
    name: 'tools',
    title:
      'What kind of project management tools do you use (select multiple):',
    multiple: true,
    long: false,
    items: AllTools(),
  },
  {
    name: 'qa',
    title: 'How will you manage Quality Assurance:',
    multiple: false,
    long: false,
    items: [
      {
        title: 'I have Dedicated QA team',
        point: 4,
        icon: '/images/calculator/',
      },
      {
        title: 'My marketing/design team will do it',
        point: 3,
        icon: '/images/calculator/',
      },
      {
        title: 'I will do it myself',
        point: 2,
        icon: '/images/calculator/',
      },
      {
        title: 'I just want it to look good',
        point: 1,
        icon: '/images/calculator/',
      },
    ],
  },
  {
    name: 'budget',
    title: 'What is your budget:',
    multiple: false,
    long: true,
    items: [
      {
        title: '> $50 000',
        point: 4,
        icon: '/images/calculator/',
      },
      {
        title: '$30 000',
        point: 3,
        icon: '/images/calculator/',
      },
      {
        title: '$5000',
        point: 2,
        icon: '/images/calculator/',
      },
      {
        title: '$1000',
        point: 1,
        icon: '/images/calculator/',
      },
    ],
  },
];

const Result = ({
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
          fontWeight="semibold"
          mb="6"
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

const estimateIncludes = [
  'Project Scope Definition',
  'PM Tools',
  'Project Change Frequency',
  'QA Management',
  'Budget',
];

const scopeCoef = [0.1, 0.6, 0.8, 1];

const toolsCoef = [0.1, 0.6, 0.8, 1];

const qaCoef = [0.1, 0.6, 0.8, 1];

const budgetCoef = [0.1, 0.6, 0.8, 1];

interface Answer {
  scope: {
    name: string;
    point: number;
  };
  tools: {
    name: string;
    point: number;
  }[];
  qa: {
    name: string;
    point: number;
  };
  budget: {
    name: string;
    point: number;
  };
}

export default function Calculator({
  withStart,
  theme,
}: {
  withStart: boolean;
  theme: {
    primary: string;
    secondary: string;
    text: string;
    dark: string;
    light: string;
    border: string;
    boxShadow: string;
  };
}) {
  const [step, setStep] = useState<number>(1);
  const [answer, setAnswer] = useState<Answer>({
    scope: {
      name: '',
      point: 0,
    },
    tools: [],
    qa: {
      name: '',
      point: 0,
    },
    budget: {
      name: '',
      point: 0,
    },
  });
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  const router = useRouter();
  const submitted = router.query.s;

  const maxSteps: number = stepData.length;
  const barWidth: string = (step / maxSteps) * 100 + '%';

  useEffect(() => {
    if (sessionStorage?.successCalculator) {
      setCompleted(true);
      setStarted(true);
      setAnswer(JSON.parse(sessionStorage.successCalculator));
    }
    if (router.query.s !== '1') {
      setToggleForm(true);
    }
    if (sessionStorage?.successCalculatorSubmitted && router.query.s !== '1') {
      setToggleForm(false);
      router.replace(
        {
          query: { ...router.query, s: '1' },
        },
        undefined,
        { shallow: true }
      );
    }
    if (!withStart) {
      setStarted(true);
    }
  }, [setCompleted, router, withStart]);

  const handleAnswerClick = (
    event: React.MouseEvent<HTMLElement>,
    answerKey: string,
    multiple: boolean
  ) => {
    const value = event.currentTarget.dataset.value;
    const point = event.currentTarget.dataset.point;

    if (multiple) {
      setAnswer({
        ...answer,
        // add/remove on click
        [answerKey]: answer[answerKey as keyof Answer].some(
          (v) => v.name === value
        )
          ? answer[answerKey as keyof Answer].filter((f) => f.name !== value)
          : answer[answerKey as keyof Answer].concat([
              {
                name: value,
                point: point,
              },
            ]),
      });
    } else {
      setAnswer({
        ...answer,
        [answerKey]: {
          name: value,
          point: point,
        },
      });
    }
  };

  const handleReset = () => {
    setAnswer({
      scope: {
        name: '',
        point: 0,
      },
      tools: [],
      qa: {
        name: '',
        point: 0,
      },
      budget: {
        name: '',
        point: 0,
      },
    });
    setCompleted(false);
    setStep(1);
    sessionStorage.removeItem('successCalculator');
    if (sessionStorage?.successCalculatorSubmitted) {
      setToggleForm(false);
    }
  };

  const currentStepData = (stepData: StepData[], step: number) =>
    stepData[step - 1];

  const nextStep = () => {
    console.log(answer);
    if (step < maxSteps) {
      setStep(step + 1);
    }
    if (step === maxSteps) {
      setCompleted(true);
      sessionStorage.successCalculator = JSON.stringify(answer);
    }
  };

  const filledStep = (multiple: boolean) => {
    // get current answer key (ex. scope)
    const key = Object.keys(answer)[step - 1];
    // get current stepData name (ex. 'scope')
    const name = stepData[step - 1].name;

    const filledValue = multiple
      ? answer[key as keyof Answer].length > 0
      : answer[key as keyof Answer].name.length > 0;

    // check if on current step and answer is filled (toString - can be string or array)
    if (key === name && filledValue) {
      return true;
    } else {
      return false;
    }
  };

  const data = currentStepData(stepData, step);

  const calculateResults = () => {
    const storedAnswer: Answer = JSON.parse(sessionStorage.successCalculator);

    const maxPoints = 100;

    const successByScope: number =
      maxPoints * scopeCoef[storedAnswer.scope.point - 1];

    const toolsMedian: number = median(
      storedAnswer.tools.map((tool) => tool.point)
    );

    const successByTools: number = successByScope * toolsCoef[toolsMedian - 1];

    const successByQA: number =
      successByTools * qaCoef[storedAnswer.qa.point - 1];

    const successByBudget: number =
      successByQA * budgetCoef[storedAnswer.budget.point - 1];

    return successByBudget.toLocaleString();
  };

  return (
    <Box bgColor="#F8F8F8">
      <Container py={{ base: '12', lg: '24' }} id="get-started">
        {withStart && (
          <Box textAlign="center" display={started ? 'none' : 'block'}>
            <Image
              src="/images/calculator/calculator-start.svg"
              alt=""
              width="456"
              height="322"
            />
            <Heading
              as="h2"
              textAlign="center"
              mt={{ base: '9', lg: '12' }}
              mb={{ base: '3', lg: '6' }}
              fontSize={{ base: '2rem', lg: '2.625rem' }}
            >
              Will Your Project Be Successful
            </Heading>
            <Text
              fontSize={{ base: '1.125rem', lg: '1.5rem' }}
              lineHeight={{ base: '1.375rem', lg: '1.75rem' }}
              color={theme.dark}
              fontWeight="semibold"
              maxW="66.5rem"
              mx="auto"
              mb={{ base: '8', lg: '12' }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              explicabo in? Quisquam, adipisci! Laboriosam quos corrupti
              deleniti enim obcaecati minus fuga laborum illo placeat libero
              cum, illum deserunt. Hic, consectetur.
            </Text>
            <PrimaryButton
              minW={{ base: '100%', md: '20rem' }}
              position="relative"
              onClick={() => setStarted(true)}
            >
              Try Free Calculator
              <ArrowRight
                display={{ base: 'none', lg: 'block' }}
                position={{ lg: 'absolute' }}
                right={{ lg: '4' }}
              />
            </PrimaryButton>
          </Box>
        )}
        <Box display={started ? 'block' : 'none'}>
          <Heading
            as="h2"
            textAlign="center"
            mb={{ base: '3', lg: '6' }}
            fontSize={{ base: '2rem', lg: '2.625rem' }}
          >
            Project Success Calculator
          </Heading>
          <Box
            bgColor="white"
            boxShadow={theme.boxShadow}
            border={theme.border}
            p={{ base: '1.5rem', lg: '3rem' }}
            display={completed ? 'none' : 'block'}
          >
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
              <Box w="100%" h="100%" bgColor={theme.primary} />
              <Box
                w={barWidth}
                h="100%"
                bgColor={theme.secondary}
                position="absolute"
                top="0"
                left="0"
                transition="width 0.3s ease-in-out"
              />
            </Box>
            <Heading
              as="h3"
              textAlign="center"
              fontSize="md"
              fontWeight="semibold"
              mb={{ base: '4', lg: '5' }}
              color={theme.text}
            >
              {data.title}
            </Heading>
            <Box
              maxH={{ base: '20rem', lg: '23rem' }}
              overflow="scroll"
              p={{
                base: '0.0625rem 1rem',
                lg: data.multiple ? '0.0625rem 1rem' : '0.0625rem',
              }}
              maxW="43.875rem"
              mx="auto"
              sx={{
                '::-webkit-scrollbar': {
                  webkitAppearance: 'none',
                  width: { base: '3px', lg: '6px' },
                  height: '0',
                },
                ' ::-webkit-scrollbar-thumb': {
                  borderRadius: '0',
                  backgroundColor: theme.text,
                },
              }}
            >
              <Grid
                gap={{ base: '4', lg: '5' }}
                gridTemplateColumns={{
                  lg: `repeat(2, ${data.multiple ? '1fr' : '10rem'})`,
                }}
                justifyContent={{ lg: 'center' }}
              >
                {data.items.map((item, itemIndex) => {
                  const activeLink = data.multiple
                    ? answer[data.name as keyof Answer].some(
                        (v) => v.name === item.title
                      )
                    : answer[data.name as keyof Answer].name.includes(
                        item.title
                      );
                  return (
                    <Button
                      key={itemIndex}
                      display="flex"
                      position="relative"
                      alignItems="center"
                      px={{ base: '4', lg: data.multiple ? '4' : '0' }}
                      h={{ lg: data.multiple ? 'auto' : '10rem' }}
                      minH={{
                        base: '4.125rem',
                        lg: data.multiple ? '2.75rem' : '0',
                      }}
                      whiteSpace="normal"
                      _hover={{
                        textDecoration: 'none',
                      }}
                      border={theme.border}
                      borderColor={activeLink ? theme.secondary : theme.text}
                      borderRadius={0}
                      outline={
                        activeLink
                          ? `0.0625rem solid ${theme.secondary}`
                          : 'none'
                      }
                      _active={{
                        bgColor: 'transparate',
                      }}
                      _focus={{
                        outline: `0.0625rem solid ${
                          activeLink && theme.secondary
                        }`,
                      }}
                      bgColor={{
                        base: activeLink ? theme.primary : 'white',
                        lg: 'white',
                      }}
                      onClick={(event) =>
                        handleAnswerClick(event, data.name, data.multiple)
                      }
                      isDisabled={
                        data.multiple &&
                        !activeLink &&
                        answer[data.name as keyof Answer].length > 4
                      }
                      data-value={item.title}
                      data-point={item.point}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w={{ base: '4', lg: '4' }}
                        h={{ base: '4', lg: '4' }}
                        mr={{ base: '3', lg: data.multiple ? '3' : '0' }}
                        borderWidth={data.multiple ? '0.0625rem' : '0.125rem'}
                        borderStyle="solid"
                        borderColor={activeLink ? theme.secondary : '#DADADA'}
                        flexShrink={0}
                        position={{ lg: data.multiple ? 'static' : 'absolute' }}
                        top={{ lg: '3' }}
                        right={{ lg: '3' }}
                      >
                        <Box
                          w={data.multiple ? '1.1875rem' : '0.4375rem'}
                          h={data.multiple ? '1.1875rem' : '0.4375rem'}
                          bgColor={activeLink ? theme.secondary : 'transparent'}
                          flexShrink={0}
                        />
                        <Box
                          display={data.multiple ? 'block' : 'none'}
                          position="absolute"
                        >
                          <svg width="12px" height="8px" viewBox="0 0 14 10">
                            <g
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g id="check_circle_24px" fill="#FFFFFF">
                                <path
                                  d="M0.7,5.7 L4.29,9.29 C4.68,9.68 5.32,9.68 5.7,9.29 L13.29,1.7 C13.68,1.31 13.68,0.68 13.29,0.29 C12.9,-0.1 12.27,-0.1 11.88,0.29 L5,7.17 L2.11,4.29 C1.72,3.9 1.09,3.9 0.7,4.29 C0.51275,4.4768 0.40751,4.7305 0.40751,4.995 C0.40751,5.2595 0.51275,5.5132 0.7,5.7 Z"
                                  id="Path"
                                />
                              </g>
                            </g>
                          </svg>
                        </Box>
                      </Box>
                      <Flex
                        flexDirection={{
                          base: 'row',
                          lg: data.multiple ? 'row' : 'column',
                        }}
                        w="100%"
                        h="100%"
                        alignItems="center"
                        justifyContent={{
                          base: 'space-between',
                          lg: data.multiple ? 'space-between' : 'flex-end',
                        }}
                      >
                        {item.icon && (
                          <Box
                            display={{
                              base: 'none',
                              lg: data.multiple ? 'none' : 'block',
                            }}
                          >
                            <Image
                              src={item.icon}
                              alt="12"
                              width="64"
                              height="64"
                            />
                          </Box>
                        )}
                        <Box
                          mt={{ lg: data.multiple ? '0' : '2' }}
                          minH={{ lg: data.multiple ? '0' : '2.125rem' }}
                          fontSize={{
                            base: '1.125rem',
                            lg: data.multiple ? '1rem' : '0.875rem',
                          }}
                          lineHeight={{
                            base: '1.25rem',
                            lg: data.multiple ? '1.375rem' : '1.125rem',
                          }}
                          fontWeight="semibold"
                        >
                          {item.title}
                        </Box>
                        {item.icon && (
                          <Box
                            display={{
                              base: 'flex',
                              lg: data.multiple ? 'flex' : 'none',
                            }}
                            alignItems="center"
                            justifyContent="center"
                            width="2.5rem"
                            height="2.5rem"
                            bgColor={activeLink ? 'white' : ''}
                            borderRadius="50%"
                            flexShrink={0}
                          >
                            <Image
                              src={item.icon}
                              alt=""
                              width="24"
                              height="24"
                            />
                          </Box>
                        )}
                      </Flex>
                    </Button>
                  );
                })}
              </Grid>
            </Box>
            <Box
              display="flex"
              flexDirection={{ base: 'column', lg: 'row' }}
              mt={{ base: '4', lg: '12' }}
              justifyContent="center"
            >
              {step != 1 && (
                <SecondaryButton
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
                </SecondaryButton>
              )}
              <PrimaryButton
                minW={{ base: '100%', md: '10.25rem' }}
                position="relative"
                mb={{ base: '4', lg: '0' }}
                ml={{ base: '0', lg: '4' }}
                onClick={() => nextStep()}
                isDisabled={!filledStep(data.multiple)}
              >
                {step === maxSteps ? 'Continue' : 'Next'}{' '}
                <ArrowRight
                  display={{ base: 'none', lg: 'block' }}
                  position={{ lg: 'absolute' }}
                  right={{ lg: '4' }}
                />
              </PrimaryButton>
            </Box>
          </Box>
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
                      <Result
                        icon="/images/calculator/world.svg"
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
                    <SecondaryButton
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
                    </SecondaryButton>
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
                      <Box
                        py="2rem"
                        mb="6"
                        textAlign="center"
                        mx="auto"
                        maxW="450px"
                      >
                        <Box
                          fontSize="2rem"
                          line-height="2.25rem"
                          fontWeight="bold"
                          color="grey.900"
                        >
                          <Box color={theme.secondary}>Thank you</Box>
                          <Box>for your interest.</Box>
                        </Box>
                        <Text
                          mt="6"
                          lineHeight="shorter"
                          fontSize={{ base: 'md', lg: 'lg' }}
                        >
                          We will be in touch shortly to answer any questions
                          you may have after reviewing the results of your
                          project calculations.
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
        </Box>
      </Container>
    </Box>
  );
}
