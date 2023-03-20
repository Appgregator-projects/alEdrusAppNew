import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Box, HStack,Input, Button, Image, InputGroup, InputLeftAddon, KeyboardAvoidingView, Link, Spacer, Stack, Text, Icon, Center, Flex, Divider, Spinner } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Platform, useWindowDimensions } from 'react-native'
import { StoreDataObject } from '../Utils/storage';
import { authFirebase, db } from '../Config/firebase';
import { useAuthState, useAppDispatch } from '../Context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [responseLogin, setResponseLogin] = useState({});
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userUid, setUserUid] = useState({});
    const dispatch  = useAppDispatch();

    const handleLogin = async () => {
      // loadingShow();
      setLoading(true)
      if (password !== "" && password !== "") {
        //1. login response
        try {
          const responseLogin = await signInWithEmailAndPassword(
            authFirebase,
            email,
            password
          );
          if (responseLogin) {
            // console.log(responseLogin.user, "response login.user")
            setResponseLogin(responseLogin)

             dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                user: responseLogin.user,
              },
            });
            await AsyncStorage.setItem("user", JSON.stringify(responseLogin.user));
            return responseLogin;

            // notifShow({
            //   title: `Welcome!`,
            //   message: "Login berhasil",
            //   color: "green",
            //   duration: 3000,
            // });
          }
          // loadingClose();
          setLoading(false)

        } catch (error) {
          // notifShow({
          //   title: "Cek email dan password!",
          //   message: `Terjadi kesalahan (${error.message})`,
          //   color: "red",
          //   duration: 3000,
          // });
          // loadingClose();
          setLoading(false)

          console.log("error login bwang", error.message)
        }

        //2. get user data
        // const docRef = doc(db, "users", responseLogin.user.uid);

        // try {
        //   const docSnap = await getDoc(docRef);
        //   // console.log("renyah", docSnap.data());
        //   if (docSnap) {
        //     console.log(docSnap.data(), "data user to save");
        //     await StoreDataObject("user", docSnap.data());
        //   }
        //   // loadingClose();
        //   setLoading(false)

        // } catch (error) {
        //   console.log("error in getting user data", error.message);
        //   // loadingClose();
        //   setLoading(false)
        // }

        // const dataNotif = await registerForPushNotificationsAsync();

        // const notifRef = doc(db, "users", responseLogin.user.uid);
        // console.log({ dataNotif });

        //3. update token notif
        // try {
        //   await setDoc(
        //     notifRef,
        //     { mobile_token: dataNotif || "" },
        //     { merge: true }
        //   );
        //   loadingClose();
        // } catch (error) {
        //   console.log("error in updating token notif", error.message);
        //   loadingClose();
        // }

        // console.log(dataNotif, "ini console datanotif");
          setLoading(false)
      }
  };
  
   const { user } = useAuthState();

   const checkAuth = () => {
    console.log("user anjay",state.user)
    // console.log({state2})
   }




	useEffect(()=>{
		const unsubscribe = onAuthStateChanged(authFirebase, (user) => {
			if (user) {
				setUserUid(user.uid);
				console.log("User", user);
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				// ...
			} else {
				console.log(user)
				// User is signed out
				// ...
			}
		});

		return unsubscribe;
	},[])

  return (
    <>
        {/* <Stack flex={1} alignItems='center' justifyContent='center' width={width}>
            <Text>LoginScreen</Text>
        </Stack> */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <Stack alignItems={"center"} justifyContent="flex-end">
       
          <Image alt="aledrus"source={require('../../assets/yahya.webp')}style={{ width: width, height: height, resizeMode : 'cover', zIndex: -20 }}  />
           <View style={styles.overlay} />
          <Image alt="aledrus"source={require('../../assets/logo_new.png')} style={{width: height*0.2, height: height*0.2, position:'absolute',top:height*0.04, zIndex : 1}} />
          <Stack
            justifyContent="center"
            alignItems="center"
            position={"absolute"}
            w={"70%"}
            space={3}
            pb={5}
          >
            <Spacer />
            <Stack alignItems="center" bg="white">
              <InputGroup
                w={{
                  base: "100%",
                  md: "285",
                }}
              >
                <InputLeftAddon
                  // shadow={3}
                  children={
                    <MaterialIcons name="email" size={24} color="black" />
                  }
                />
                <Input
                  w={{
                    base: "100%",
                    md: "100%",
                  }}
                  placeholder="email"
                  bg="white"
                  size={"xl"}
                  id="email"
                  // shadow={3}
                  value={email}
                  onChangeText={setEmail}
                />
              </InputGroup>
            </Stack>
            <Stack alignItems="center" bg="white">
              <InputGroup
                w={{
                  base: "100%",
                  md: "285",
                }}
              >
                <InputLeftAddon
                  // shadow={3}
                  children={
                    <MaterialIcons name="lock" size={24} color="black" />
                  }
                />
                <Input
                  w={{
                    base: "100%",
                    md: "100%",
                  }}
                  placeholder="password"
                  bg="white"
                  size={"xl"}
                  id="password"
                  type="password"
                  // shadow={3}
                  value={password}
                  onChangeText={setPassword}
                />
              </InputGroup>
            </Stack>


            {/* =======BUTTON GOOGLE======== */}
             {/* <Button
                borderWidth={1}
                borderColor="gray.400"
                rounded="xl"
                width={width*0.7}
                bg='white'
                alignItems='center'
                position="absolute"
                bottom={height*0.2}
                // onPress={handleLoginGoogle}
            >

               <Flex  
                    width={width*0.7}
                    position='relative'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-evenly'
                >
                    <Image alt='google' source={{uri:'https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227'}} height={28} width={28} />
                    <Text color="gray.600">Continue With Google</Text>
                </Flex> 


            </Button> 
            */}


           
            <Button
              shadow={3}
              w="80%"
              size={"sm"}
              // bgColor={colors.theme}
              onPress={() => handleLogin()}
              bg='tertiary.800'

            >
              <Text
                color='warmGray.50'
                fontWeight="bold"
                disabled={loading}
              >
                LOGIN
              </Text>
              {loading ? <Spinner /> : null}
            </Button>

            <Spacer />

        
              <Flex gap={5} alignItems='center' flexDir='row'>
                <Link
                  _text={{
                    fontSize: "sm",
                    fontWeight: "500",
                    color: "indigo.50",
                  }}
                  alignSelf={["flex-end", "flex-end", "center"]}
                  mt="1"
                  onPress={() => navigation.navigate("ForgotPassword")}
                  // bg="white"
                  opacity="0.7"
                  shadow={10}
                >
                  Lupa Password
                </Link>
                <Divider orientation="vertical"/>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                  <Text color={"gray.100"} shadow={3} fontWeight="bold" >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Flex>
          </Stack>
          {/* <Button onPress={checkAuth}>check state</Button> */}
        </Stack>
      </KeyboardAvoidingView>
    </>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
    overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(47,49,54,0.5)',
  }
})