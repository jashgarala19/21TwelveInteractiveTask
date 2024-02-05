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
import { loginUser } from "services/api/apiServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useAuth();
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setLoading(true);
      const { data, token } = await loginUser(values);


      if (data.code === 200) {
        setUserToken(token, data.payload);
        navigate("/");
      }
    } catch (error) {
        console.log(error);
    //   console.error("Login failed:", error.error);
      setLoginError(error.error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen min-h-screen border  bg-black  max-h-auto flex justify-center items-center">
      <div className="p-5 min-w-[400px] border rounded-md  max-h-auto m-auto">
        <Box my={3}>
          <h1 className="text-3xl text-center">Login</h1>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange }) => (
            <Form>
              <FormControl mb={4}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Field
                  type="email"
                  as={Input}
                  name="email"
                  size="lg"
                  mb={2}
                  onChange={(e) => {
                    handleChange(e);
                    setLoginError(null);
                  }}
                />
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
                  onChange={(e) => {
                    handleChange(e);
                    setLoginError(null);
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
                {loginError && (
                  <Box color="red.500" mb={4}>
                    {loginError}
                  </Box>
                )}
                <Button type="submit" width="100%" my={2}>
                  {loading ? <Spinner /> : "Login"}
                </Button>
              </FormControl>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
