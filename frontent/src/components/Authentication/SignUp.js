import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState  } from 'react'
import { useToast } from '@chakra-ui/react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
const SignUp = () => {

    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [confirmPassword , setConfirmPassword] = useState();
    const [password , setPassword] = useState();
    const [pic , setPic] = useState();
    const [show,setShow] = useState();  
    const [loading , setLoading] = useState(false)
    const handleClick = () => setShow(!show)
  const toast = useToast()
  const history = useHistory()

  
    const submitHandler =async ()=>{
      setLoading(true);
      if(!name || !email || !password || !confirmPassword){
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
      if(password !== confirmPassword){
        toast({
          title: 'Passwords do not match',
          status: 'warning',
          duration:5000,
          isClosable: true,
          position:"bottom",
        });
        setLoading(false);

        return;


      }
      console.log(name, email, password, pic);
      try {
        const config = {
          headers:{
            "Content-type" : "application/json",
          },
        }
        const {data} = await Axios.post(
          "/api/user",
          {
            name,
            email,
            password,
            pic,
          },
        config
        );
        console.log(data)
        toast({
          title: 'Registration is successfull',
          status: 'success',
          duration:5000,
          isClosable: true,
          position:"bottom",
        });

        localStorage.setItem("userInfo" , JSON.stringify(data));
        setLoading(false)
        history.push('/chats')
        

    } catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);

        
      }
      

    }
  
    
    const postDetails = (pics) =>{
      setLoading(true)
      if(pics === undefined){
        toast({
          title: 'please Select an Image',
          status: 'warning',
          duration:5000,
          isClosable: true,
          position:"bottom",
        })
        return;

      }
      if(pics.type  === 'image/jpeg' || pics.type === 'image/png'){
        // console.log(pics)
        const data = new FormData()
        data.append("file",pics);
        data.append("upload_preset","Chat App");
        data.append("cloud_name","dh9fqax1a");
         Axios.post("https://api.cloudinary.com/v1_1/dh9fqax1a/image/upload" , data).then((res)=>{
           setPic(res.data.url.toString());
          setLoading(false)
         })
     
        .catch((err)=>{
          console.log(err);;
          setLoading(false);
        });
       
      }else{
        toast({
          title: 'please Select an Image',
          status: 'warning',
          duration:5000,
          isClosable: true,
          position:"bottom",
        })
        setLoading(false);
        return;
      }


    }

  return (
    <VStack spacing={'5px'} color="black">
    <FormControl id = "first-name" isRequired>
        <FormLabel>Name</FormLabel>
            <Input
                placeholder='Enter your  name'
                onChange={(e)=> setName(e.target.value)}
            />
            </FormControl>
            <FormControl id = "email" isRequired>
        <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter your  Email'
                onChange={(e)=> setEmail(e.target.value)}
            />
            </FormControl>
            <FormControl id = "password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>

            <Input
        type={show ? 'text' : 'password'}
                placeholder='Enter your Password'
                onChange={(e)=> setPassword(e.target.value)}
            />
             <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
        </InputGroup>
            </FormControl>

            <FormControl id = "password" isRequired>
        <FormLabel> Confirm Password</FormLabel>
        <InputGroup>

            <Input
        type={show ? 'text' : 'password'}
                placeholder='Confirm Password'
                onChange={(e)=> setConfirmPassword(e.target.value)}
            />
             <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
        </InputGroup>
            </FormControl>

            <FormControl id = "pic" >
        <FormLabel>Upload Your Picture</FormLabel>
            <Input
            type={"file"}
            p={1.5}
            accept="image/*"
                onChange={(e)=> postDetails(e.target.files[0])}
            />
            </FormControl>
            <Button 
            colorScheme='blue'
            width={"100%"}
            style = {{marginTop:15}}
            onClick={submitHandler}
            isLoading ={loading}
            >
            Sign Up
            </Button>
            
    </VStack>
  )
}

export default SignUp
