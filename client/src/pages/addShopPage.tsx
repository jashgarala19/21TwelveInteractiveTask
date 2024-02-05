import { Formik, Form, Field } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { createShop } from "services/api/apiServices";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  shopPhoto: Yup.mixed().required("Shop photo is required"),
});

const AddShop = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("shopPhoto", values.shopPhoto);
    formData.append("location", values.location);
    try {
      const { data } = await createShop(formData);
      if (data.code == 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        shopPhoto: null,
        location: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <VStack spacing={4} align="stretch">
          <Field name="name">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <Input {...field} type="text" placeholder="Shop Name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="description">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <Textarea {...field} placeholder="Shop Description" />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="shopPhoto">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.shopPhoto && form.touched.shopPhoto}
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    form.setFieldValue(
                      "shopPhoto",
                      event.currentTarget.files[0]
                    )
                  }
                />
                <FormErrorMessage>{form.errors.shopPhoto}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="location">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.location && form.touched.location}
              >
                <Input {...field} type="text" placeholder="Shop Location" />
                <FormErrorMessage>{form.errors.location}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button type="submit" colorScheme="teal" mt={4}>
            Create Shop
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};

export default AddShop;
