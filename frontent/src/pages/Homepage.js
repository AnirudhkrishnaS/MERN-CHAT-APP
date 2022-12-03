import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'

function Homepage() {
  return (
    
    <Container maxW='xl' pt={"3%"} centerContent>
    <Box
    d='flex'
    p={3}
   justifyContent = "Center"
    bg={"white"}
      w="100%"
      m="40px 0 15px 0"
    borderRadius = "lg"
    // borderWidth="2px"
    >

      <Text fontSize={'4xl'} textAlign="center" fontFamily="Work sans" color={'black'}>Talk-A-Tive</Text>
    </Box>
    <Box bg = "white"  w = "100%" p={4} borderRadius="lg" color={"black"} borderWidth="1px">
    <Tabs variant='soft-rounded' >
  <TabList mb={"1em"}>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>

    </Container>
    
  )
}

export default Homepage
