import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePage from "./Pages/CreatePage";
import Homepage from "./Pages/Homepage";
import Navbar from "./components/NavBar";
function App() {
  return (
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/create" element={<CreatePage/>} />
        </Routes>
      </Box>
  );
}

export default App;
