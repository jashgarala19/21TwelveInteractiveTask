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
// Assuming you have an API service for creating products
import { useLocation, useNavigate } from "react-router-dom";
import { addProduct as addProductAPI } from "services/api/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setShops } from "features/shop/shopSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  productPhoto: Yup.mixed().required("Product photo is required"),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const { currentShop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("shopId", currentShop); // Assuming a static shopId for now
    formData.append("product[name]", values.name);
    formData.append("product[description]", values.description);
    formData.append("product[price]", values.price);
    formData.append("productPhoto", values.productPhoto);

    try {
      const { data } = await addProductAPI(formData);
      
      dispatch(addProduct({ shopId: currentShop, data: data.payload }));

      if (data.code === 200) {
        navigate(`/shop/${currentShop}`);
      }
    } catch (err) {
      console.log(err);
      // Handle errors here
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "",
        productPhoto: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <VStack spacing={4} align="stretch">
          <Field name="name">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <Input {...field} type="text" placeholder="Product Name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="description">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <Textarea {...field} placeholder="Product Description" />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="price">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.price && form.touched.price}>
                <Input {...field} type="number" placeholder="Product Price" />
                <FormErrorMessage>{form.errors.price}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="productPhoto">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.productPhoto && form.touched.productPhoto
                }
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    form.setFieldValue(
                      "productPhoto",
                      event.currentTarget.files[0]
                    )
                  }
                />
                <FormErrorMessage>{form.errors.productPhoto}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button type="submit" colorScheme="teal" mt={4}>
            Create Product
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};

export default AddProduct;
