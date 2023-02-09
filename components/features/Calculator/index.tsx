import {
  Container,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Grid,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ArrowRight from 'components/Icons/ArrowRight';
import Result from './Result';
import StepIndicator from './StepIndicator';
import Navigation from './Navigation';

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
  items: {
    title: string;
    point: number;
    icon: string;
  }[];
}

const stepData: StepData[] = [
  {
    name: 'scope',
    title: 'Do you have a clearly defined project scope:',
    multiple: false,
    items: [
      {
        title: 'Detailed description',
        icon: '/images/calculator/icons/detailed-description.svg',
        point: 4,
      },
      {
        title: 'Good description',
        icon: '/images/calculator/icons/good-description.svg',
        point: 3,
      },
      {
        title: 'I have a design',
        icon: '/images/calculator/icons/design.svg',
        point: 2,
      },
      {
        title: 'I have an idea',
        icon: '/images/calculator/icons/idea.svg',
        point: 1,
      },
    ],
  },
  {
    name: 'tools',
    title:
      'What kind of project management tools do you use (select multiple):',
    multiple: true,
    items: AllTools(),
  },
  {
    name: 'qa',
    title: 'How will you manage Quality Assurance:',
    multiple: false,
    items: [
      {
        title: 'QA team',
        point: 4,
        icon: '/images/calculator/icons/qa.svg',
      },
      {
        title: 'Marketing or design team',
        point: 3,
        icon: '/images/calculator/icons/design-team.svg',
      },
      {
        title: 'I will QA myself',
        point: 2,
        icon: '/images/calculator/icons/qa-self.svg',
      },
      {
        title: 'I just want it to look good',
        point: 1,
        icon: '/images/calculator/icons/look-good.svg',
      },
    ],
  },
  {
    name: 'budget',
    title: 'What is your budget:',
    multiple: false,
    items: [
      {
        title: '> $50 000',
        point: 4,
        icon: '/images/calculator/icons/50k.svg',
      },
      {
        title: '$30 000',
        point: 3,
        icon: '/images/calculator/icons/30k.svg',
      },
      {
        title: '$5000',
        point: 2,
        icon: '/images/calculator/icons/5k.svg',
      },
      {
        title: '$1000',
        point: 1,
        icon: '/images/calculator/icons/1k.svg',
      },
    ],
  },
];

const estimateIncludes = [
  'Project Scope Definition',
  'PM Tools',
  'Project Change Frequency',
  'QA Management',
  'Budget',
];

const scopeCoef = [0.5, 0.7, 0.9, 1];

const toolsCoef = [0.4, 0.7, 0.9, 1];

const qaCoef = [0.4, 0.5, 0.8, 1];

const budgetCoef = [0.4, 0.7, 0.9, 1];

interface AnswerItem {
  name: string;
  point: number;
}

interface Answer {
  scope: AnswerItem;
  tools: AnswerItem[];
  qa: AnswerItem;
  budget: AnswerItem;
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
  const submitted: string = router.query.s as string;

  const maxSteps: number = stepData.length;

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
    const value = String(event.currentTarget.dataset.value);
    const point = Number(event.currentTarget.dataset.point);

    if (multiple) {
      setAnswer({
        ...answer,
        // add/remove on click
        [answerKey]: (answer[answerKey as keyof Answer] as AnswerItem[]).some(
          (s) => s.name === value
        )
          ? (answer[answerKey as keyof Answer] as AnswerItem[]).filter(
              (f) => f.name !== value
            )
          : (answer[answerKey as keyof Answer] as AnswerItem[]).concat({
              name: value,
              point: point,
            }),
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
      ? (answer[key as keyof Answer] as AnswerItem[]).length > 0
      : (answer[key as keyof Answer] as AnswerItem).name.length > 0;

    // check if on current step and answer is filled (toString - can be string or array)
    if (key === name && filledValue) {
      return true;
    } else {
      return false;
    }
  };

  const data: StepData = currentStepData(stepData, step);

  const calculateResults: () => string = () => {
    const storedAnswer: Answer = JSON.parse(sessionStorage.successCalculator);

    const maxPoints = 100;

    const successByScope: number =
      maxPoints * scopeCoef[storedAnswer.scope.point - 1];

    const toolsMedian: number = median(
      storedAnswer.tools.map((tool) => tool.point)
    );

    const roundedMedian: number = Math.round(toolsMedian);

    const successByTools: number =
      successByScope * toolsCoef[roundedMedian - 1];

    const successByQA: number =
      successByTools * qaCoef[storedAnswer.qa.point - 1];

    const successByBudget: number =
      successByQA * budgetCoef[storedAnswer.budget.point - 1];

    const roundResult: number = Math.round(successByBudget);

    // debug
    // console.log(`successByScope: ${successByScope}`);
    // console.log(`toolsMedian: ${toolsMedian}`);
    // console.log(`roundedMedian: ${roundedMedian}`);
    // console.log(`successByTools: ${successByTools}`);
    // console.log(`successByQA: ${successByQA}`);
    // console.log(`successByBudget: ${successByBudget}`);
    // console.log(`roundResult: ${roundResult}`);

    return roundResult.toLocaleString();
  };

  return (
    <Box bgColor="#F8F8F8">
      <Container py={{ base: '12', lg: '24' }} id="get-started">
        {withStart && (
          <Box textAlign="center" display={started ? 'none' : 'block'}>
            <Box
              maxW="100%"
              w="600px"
              h="400px"
              mx="auto"
              boxShadow={theme.boxShadow}
              position="relative"
              border={theme.border}
              overflow="hidden"
            >
              <Image
                src="/images/calculator/success-calculator-home.svg"
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Heading
              as="h1"
              mt={{ base: '9', lg: '12' }}
              mb={{ base: '3', lg: '6' }}
              fontSize={{ base: '2rem', lg: '2.625rem' }}
              fontWeight="extrabold"
            >
              Introducing the{' '}
              <Box as="span" color="teal">
                Project Success Calculator
              </Box>
            </Heading>
            <Heading
              as="h2"
              fontSize={{ base: '1.125rem', lg: '1.5rem' }}
              lineHeight={{ base: '1.375rem', lg: '1.75rem' }}
              color={theme.dark}
              maxW="66.5rem"
              mx="auto"
              mb="6"
            >
              The ultimate tool to calculate the success rate of your project.
            </Heading>
            <Text
              fontSize={{ base: 'md', lg: 'lg' }}
              color={theme.text}
              maxW="58rem"
              textAlign="justify"
              mx="auto"
              mb={{ base: '8', lg: '12' }}
            >
              This multi-step calculator takes into account important factors
              such as project scope, project management tools, quality
              assurance, and budget to provide you with an accurate prediction
              of your project&apos;s success. No more guesswork, no more
              uncertainty. Get a clear picture of your project&apos;s success
              potential today with the Project Success Calculator.
            </Text>
            <Button
              variant="primary"
              minW={{ base: '100%', md: '16rem' }}
              position="relative"
              onClick={() => setStarted(true)}
            >
              Start
              <ArrowRight
                display={{ base: 'none', lg: 'block' }}
                position={{ lg: 'absolute' }}
                right={{ lg: '4' }}
              />
            </Button>
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
            <StepIndicator
              step={step}
              maxSteps={maxSteps}
              primaryColor={theme.primary}
              secondaryColor={theme.secondary}
            />
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
                    ? (answer[data.name as keyof Answer] as AnswerItem[]).some(
                        (s) => s.name === item.title
                      )
                    : (
                        answer[data.name as keyof Answer] as AnswerItem
                      ).name.includes(item.title);
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
                        (answer[data.name as keyof Answer] as AnswerItem[])
                          .length > 4
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
                          lg: data.multiple ? 'space-between' : 'center',
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
                              width="48"
                              height="48"
                            />
                          </Box>
                        )}
                        <Box
                          mt={{ lg: data.multiple ? '0' : '4' }}
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
            <Navigation
              step={step}
              setStep={setStep}
              nextStep={nextStep}
              maxSteps={maxSteps}
              isDisabled={!filledStep(data.multiple)}
            />
          </Box>
          <Result
            theme={theme}
            completed={completed}
            toggleForm={toggleForm}
            calculateResults={calculateResults}
            estimateIncludes={estimateIncludes}
            handleReset={handleReset}
            submitted={submitted}
          />
        </Box>
      </Container>
    </Box>
  );
}
