import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack,Input, Button, Image, InputGroup, InputLeftAddon, KeyboardAvoidingView, Link, Spacer, Stack, Text, Icon, Center, Flex } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Platform, useWindowDimensions } from 'react-native'

const LoginScreen = () => {
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <>
        {/* <Stack flex={1} alignItems='center' justifyContent='center' width={width}>
            <Text>LoginScreen</Text>
        </Stack> */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <Stack alignItems={"center"} justifyContent="flex-end">
       
          <Image alt="aledrus"source={require('../../assets/yahya.jpg')}style={{ width: width, height: height, resizeMode : 'cover', zIndex: -20 }}  />
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
              {/* <InputGroup
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
              </InputGroup> */}
            </Stack>
            <Stack alignItems="center" bg="white">
              {/* <InputGroup
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
              </InputGroup> */}
            </Stack>
            <Button
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

            {/* <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf={["flex-end", "flex-end", "center"]}
              mt="1"
              onPress={() => navigation.navigate("ForgotPassword")}
              // bg="white"
              opacity="0.7"
              shadow={10}
            >
              Lupa Password?
            </Link>
            <Button
              shadow={3}
              w="80%"
              size={"sm"}
              // bgColor={colors.theme}
              onPress={() => handleLogin()}
            >
              <Text
                // color={colors.black}
                fontWeight="bold"
              >
                LOGIN
              </Text>
            </Button>
            <Button onPress={() => handleCheck()}>Check Storage</Button>

            <Spacer />

            <HStack space={1}>
              <Text color={"gray.100"} shadow={10}>
                Belum punya akun ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text color={"gray.100"} shadow={3} fontWeight="bold">
                  Join sekarang !
                </Text>
              </TouchableOpacity>
            </HStack> */}
          </Stack>
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