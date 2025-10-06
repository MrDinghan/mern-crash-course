import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useState } from "react";

import { useProductStore } from "@/store/product";

const CreatePage: FC = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
  });
  const toast = useToast();

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    await createProduct(newProduct);
    toast({
      title: "Success",
      description: "Product created successfully",
      status: "success",
      isClosable: true,
    });
    setNewProduct({ name: "", price: 0, image: "" });
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={String(newProduct.price)}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
