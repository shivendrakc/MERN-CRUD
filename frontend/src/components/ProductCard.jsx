import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Image, useColorModeValue, Heading, HStack, IconButton, Text } from '@chakra-ui/react' // Added Text import
import React from 'react'
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react' // Added useToast import
import { useDisclosure } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Input, VStack, ModalHeader } from '@chakra-ui/react' // Added Modal imports
import { ModalFooter, Button } from '@chakra-ui/react' // Added ModalFooter and Button imports
import { useState } from 'react' // Added useState import
const ProductCard = ({ product }) => {

  const [updatedProduct, setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { isOpen, onOpen, onClose } = useDisclosure()
  

  const {deleteProduct, updateProduct} = useProductStore()
  const toast = useToast()
  const hadnleDeleteProduct = async (pid) => {
    const {success, message } = await deleteProduct(pid);
    if(!success) {
      toast({
        title: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
  }else { 
      toast({
        title: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message } = await updateProduct(pid, updatedProduct);
    onClose()
    if(!success) {
      toast({
        title: 'Error',
        status: "error",
        duration: 2000,
        isClosable: true,
      }); 
    } else { 
      toast({
        title: 'Success',
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image 
        src={product.email} 
        alt={product.name} 
        h={48} 
        w="full" 
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        {/* Fixed fontWeight prop and added Text component */}
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.age}
        </Text>

        <HStack spacing={2}>
          {/* Added aria-labels for accessibility */}
          <IconButton 
            icon={<EditIcon />} 
            onClick={onOpen}
            colorScheme='blue' 
            aria-label="Edit product" 
          />
          <IconButton 
            icon={<DeleteIcon />} 
            onClick={ () => hadnleDeleteProduct(product._id)}
            colorScheme="red" 
            aria-label="Delete product" 
          />
        </HStack>
      </Box>
      <Modal isOpen = {isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input 
              placeholder = 'Product Name'
              name = 'name'
              value={updatedProduct.name}
              onChange={(e) => 
              setUpdatedProduct({ updatedProduct, name: e.target.value})}/>
              <Input 
              placeholder = 'Age'
              name = 'age'
              value={updatedProduct.age}
              onChange={(e) => 
              setUpdatedProduct({ ...updatedProduct, age: e.target.value})}/>
              <Input 
              placeholder = 'Email'
              name = 'email'
              value={updatedProduct.email}
              onChange={(e) => 
              setUpdatedProduct({ ...updatedProduct, email: e.target.value})}/>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductCard