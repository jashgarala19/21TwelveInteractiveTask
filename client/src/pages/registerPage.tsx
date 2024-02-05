import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { registerUser } from "services/api/apiServices";

const RegisterPage = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    userName: Yup.string().required("User Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const [registrationError, setRegistrationError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
  
      if (response.data.code == 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error.error);
      setRegistrationError(error.error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen min-h-screen border bg-black  max-h-auto flex justify-center items-center">
      <div className="p-5 border rounded-md max-h-auto m-auto">
        <Box my={3}>
          <h1 className="text-3xl text-center">Create an account</h1>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormControl mb={4}>
              <div className="flex gap-5">
                <div>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Field
                    type="text"
                    as={Input}
                    name="firstName"
                    size="lg"
                    mb={2}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Field
                    type="text"
                    as={Input}
                    name="lastName"
                    size="lg"
                    mb={2}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <FormLabel htmlFor="userName">User Name</FormLabel>
              <Field type="text" as={Input} name="userName" size="lg" mb={2} />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-500"
              />

              <FormLabel htmlFor="email">Email address</FormLabel>
              <Field type="email" as={Input} name="email" size="lg" mb={2} />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                type="password"
                as={Input}
                name="password"
                size="lg"
                mb={4}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              {registrationError && (
                <Box color="red.500" mb={4}>
                  {registrationError}
                </Box>
              )}
              <Button type="submit" width="100%" my={2}>
                {loading ? <Spinner /> : "Register"}
              </Button>
            </FormControl>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
