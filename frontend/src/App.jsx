import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePage from "./Pages/CreatePage";
import Homepage from "./Pages/Homepage";
import NavBar from "./components/Navbar";
function App() {
  return (
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/create" element={<CreatePage/>} />
        </Routes>
      </Box>
  );
}

export default App;
