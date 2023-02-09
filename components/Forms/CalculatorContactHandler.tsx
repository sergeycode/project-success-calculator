import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
  InputProps,
  Button,
} from '@chakra-ui/react';

import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';

const ContactSchema = {
  fullName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .trim()
    .required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string(),
};

interface FormInputProps extends InputProps {
  type: string;
  placeholder: string;
  error?: string | undefined;
}

interface FormProps {
  title: string;
  theme: {
    primary: string;
    secondary: string;
    text: string;
    dark: string;
    light: string;
    border: string;
    boxShadow: string;
  };
  buttonText: string;
  completed: boolean;
}

interface AnswerStringified {
  [key: string]: string | string[];
}

export default function CalculatorContactHandler({
  title,
  theme,
  buttonText,
  completed,
}: FormProps) {
  const FormSchema = Yup.object().shape(ContactSchema);
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>('');
  const [answer, setAnswer] = useState<AnswerStringified>({
    scope: '',
    tools: [],
    qa: '',
    budget: '',
  });

  useEffect(() => {
    if (sessionStorage?.successCalculator && completed) {
      const parsedAnswer = JSON.parse(sessionStorage.successCalculator);
      setAnswer({
        scope: parsedAnswer.scope.name,
        tools: parsedAnswer.tools.map(
          (tool: { name: string; point: number }) => tool.name
        ),
        qa: parsedAnswer.qa.name,
        budget: parsedAnswer.budget.name,
      });
    }
  }, [completed]);

  const FormInput = ({ ...props }: FormInputProps) => {
    return (
      <Input
        px={3}
        border={theme.border}
        borderRadius={0}
        bgColor="#fff"
        _placeholder={{ color: theme.text }}
        focusBorderColor={theme.secondary}
        {...props}
      />
    );
  };

  return (
    <Box
      px={{ base: '4', lg: '0' }}
      py={{ base: '6', lg: '0' }}
      borderRadius="1rem"
      maxW="29.5rem"
      mx="auto"
    >
      {title && (
        <Box
          fontFamily="heading"
          fontSize="1.75rem"
          fontWeight="bold"
          color={theme.dark}
          mb="6"
          textAlign="center"
        >
          {title}
        </Box>
      )}
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          message: '',
          subscribe: false,
        }}
        validationSchema={FormSchema}
        onSubmit={(values, actions) => {
          const formData = {
            fullName: values.fullName,
            email: values.email,
            message: values.message,
            scope: answer.scope,
            tools: answer.tools.toString(),
            qa: answer.qa,
            budget: answer.budget,
          };

          try {
            // define post logic later
            if (true) {
              console.log(formData);
              sessionStorage.successCalculatorSubmitted = true;
              router.replace(
                {
                  query: { ...router.query, s: '1' },
                },
                undefined,
                { shallow: true }
              );
            } else {
              actions.setSubmitting(false);
              setSubmitError(
                'Form submission failed. Please, try again later.'
              );
            }
          } catch (err) {
            console.log('error', err);
            actions.setSubmitting(false);
            setSubmitError('Form submission failed. Please, try again later.');
          }
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          isValid,
        }) => (
          <Form>
            <Box maxW={{ lg: '25rem' }} mx="auto">
              <VStack spacing="4">
                <FormControl
                  isInvalid={'fullName' in errors && touched.fullName}
                >
                  <FormInput
                    type="text"
                    placeholder="Full Name"
                    onChange={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                    error={errors.fullName}
                  />
                  <FormErrorMessage mt="px">{errors.fullName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={'email' in errors && touched.email}>
                  <FormInput
                    type="email"
                    placeholder="Email"
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={errors.email}
                  />
                  <FormErrorMessage mt="px">{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <Textarea
                    px={3}
                    placeholder="Message"
                    border={theme.border}
                    borderRadius={0}
                    bgColor="#fff"
                    _placeholder={{ color: theme.text }}
                    focusBorderColor={theme.secondary}
                    onChange={handleChange('message')}
                    onBlur={handleBlur('message')}
                    value={values.message}
                  />
                </FormControl>
              </VStack>
              <Button
                variant="primary"
                display="block"
                mx="auto"
                mt={6}
                w={{ base: '100%', md: '16rem' }}
                isLoading={isSubmitting}
                isDisabled={isSubmitting || !isValid}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                type="submit"
              >
                {buttonText}
              </Button>
              {submitError && (
                <Box fontSize="xs" mt="1" color="red">
                  {submitError}
                </Box>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
