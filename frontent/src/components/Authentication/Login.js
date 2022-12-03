import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const [show,setShow] = useState();
    const toast = useToast();
    const handleClick = () => setShow(!show)
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const submitHandler = async()=>{
      setLoading(true);
      if(!email || !password){
        toast({
          title: 'please fil all the fields',
          status: 'warning',
          duration:5000,
          isClosable: true,
          position:"bottom",
        })
        setLoading(false);
        return;
      }
    
      try {
        const config = {
          headers:{
            "Content-type" : "application/json",
          },
        };
        const {data} = await Axios.post(
          "/api/user/login",
          {email,password},
        config
        );
        toast({
          title: 'Login successfull',
          status: 'success',
          duration:5000,
          isClosable: true,
          position:"bottom",
        });

        localStorage.setItem("userInfo" , JSON.stringify(data));
        setLoading(false)
        history.push('/chats')
        
      } catch (err) {
        toast({
          title: 'Error Occured',
          description: err.response.data.message,
          status: 'error',
          duration:5000,
          isClosable: true,
          position:"bottom",
        });
        setLoading(false)
      }
    }

  return (

    
    <VStack spacing={'5px'} color="black">

            <FormControl id = "email" isRequired>
        <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter your  Email'
                value ={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
            </FormControl>
            <FormControl id = "password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>

            <Input
        type={show ? 'text' : 'password'}
                placeholder='Enter your  password'
                value ={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
             <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
        </InputGroup>
            </FormControl>

        

        
            <Button 
            colorScheme='blue'
            width={"100%"}
            style = {{marginTop:15}}
            onClick={submitHandler}
            isLoading = {loading}
            >
            Login
            </Button>
            
            <Button 
            colorScheme='red'
            variant={"solid"}
            width={"100%"}
            style = {{marginTop:15}}
            onClick={()=>{
                setEmail("guest@examble.com");
                setPassword("123456");
            }}
            >
            Get Guest User Credentials
            </Button>
            
    </VStack>   
  )
}

export default Login
