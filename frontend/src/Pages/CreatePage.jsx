import { Container, useColorModeValue, VStack, Heading, Box, Input, Button, useToast} from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { useProductStore } from '../store/product.js';

const Createpage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    age: "",  
    email: "",
    });

    const toast = useToast();

const {createProduct}  = useProductStore();

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    if(!success) {
      toast({
        title: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    else {
      toast({
        title: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setNewProduct({
        name: "",
        age: "",
        email: "",
      });
    }
  }
  return <Container maxW={"container.sm"}>
    <VStack
      spacing={8}
    >
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Add a new user</Heading>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"lg"}
        shadow={"md"} 
      >
        <VStack spacing={4}>
          <Input
            placeholder={"Username"}
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input
            placeholder={"Age"}
            name="price"
            type="number"
            value={newProduct.age}
            onChange={(e) => setNewProduct({...newProduct, age: e.target.value})}
          />
          <Input
            placeholder={"Email"}
            name="image"
            value={newProduct.email}
            onChange={(e) => setNewProduct({...newProduct, email: e.target.value})}
          />
          <Button colorScheme="blue" onClick={handleAddProduct} w='full'>Add user</Button>
        </VStack>
      </Box>
    </VStack>
  </Container>
}

export default Createpage
