import { Container } from '@chakra-ui/react'
import React, { use } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { useEffect } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'

const Homepage = () => {
  const { fetchProducts,products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }
  , [fetchProducts]);
  console.log("products", products);
  return (
   <Container maxW={"container.xl"} py={12}>
    <VStack spacing = {8}>
      <Text 
      fontSize = {'30'}
      fontWeight ={'bold'}
      bgGradient={"linear(to-r, cyan.400, blue.500)"}
      bgClip={'text'}
      textAlign={"center"}>
        Welcome to Learn 2 drive
      </Text>

      <SimpleGrid
        columns={{
          base: 1,
          md: 3,
          lg: 4,
        }}
        spacing={10}
        w={"full"}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </SimpleGrid>
     {products.length === 0 && (
       <Text fontSize='xl' textAlign={"center"} fontWeight={'bold'} color={"gray.500"}>
       No users found. Please add a new user to the database.
       <Link to={"/create"}>
         <Text as={"span"} color={"blue.500"} _hover={{  textDecoration: "underline" }}> Add User</Text>
       </Link>
       </Text>
     )}
    </VStack>
    </Container>
  )
}

export default Homepage
