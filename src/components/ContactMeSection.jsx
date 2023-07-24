import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import FullScreenSection from './FullScreenSection';
import useSubmit from '../hooks/useSubmit';
import { useAlertContext } from '../context/AlertContext';
import emailkey from '../emailkey';
import emailjs from '@emailjs/browser/es';

const ContactMeSection = () => {
  const formRef = useRef(null)
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: { firstName: "", email: "", type: "hireMe", comment: "" },
    onSubmit: (values) => {
      submit("localhost:3000/#contact-me", values)
      emailsend(formRef)
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      comment: Yup.string()
      .min(25, 'Must be at least 25 characters')
      .required('Required'),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message)
      if (response.type === 'success') {
        formik.resetForm()
      }
    }
  }, [response])

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
      id="contactme-section"
    >
      <VStack
        w="1024px"
        p={32}
        alignItems="flex-start"
      >
        <Heading
          as="h1"
          id="contactme-section"
        >
          Contact me
        </Heading>
        <Box
          p={6}
          rounded="md"
          w="100%"
        >
          <form ref={formRef} onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.errors.firstName && formik.touched.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps('firstName')}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  color="pink.300"
                  {...formik.getFieldProps('type')}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.errors.comment && formik.touched.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps('comment')}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

const emailsend = (e)=>{
  emailjs.sendForm(emailkey.SERVICE_ID, emailkey.TEMPLATE_ID, e.current, emailkey.USER_ID)
        .then((result) => {
        console.log("Message Sent, We will get back to you shortly", result.text);
        },
        (error) => {
        console.log("An error occurred, Please try again", error.text);
        });
}

export default ContactMeSection;
