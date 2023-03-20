import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Box, HStack,Input, Button, Image, InputGroup, InputLeftAddon, KeyboardAvoidingView, Link, Spacer, Stack, Text, Icon, Center, Flex, Divider, Spinner } from 'native-base'
import React, { useState } from 'react'
import { Alert, AsyncStorage } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Platform, useWindowDimensions } from 'react-native'
import { authFirebase, db } from '../Config/firebase';

const SignUpScreen = () => {
		const { width, height } = useWindowDimensions();
		const navigation = useNavigation();
		const [name, setName] = useState('');
		const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');
		const [confirmPassword, setConfirmPassword] = useState('');
		const [loading, setLoading] = useState(false);

		const handleSignUp = async () => {
			setLoading(true)
			// console.log(signUpData,'ini data sign up')
			if (!name) {
				Alert.alert("Nama harus diisi!");
				setLoading(false)
			} else if (name && !email) {
				Alert.alert("Email harus diisi!");
				setLoading(false)
			} else if (name && email && !password) {
				Alert.alert("Password harus diisi!");
				setLoading(false)
			} else if (
				name &&
				email &&
				password &&
				!confirmPassword
			) {
				Alert.alert("Konfirmasi password harus diisi!");
				setLoading(false)
			} else if (
				name &&
				email &&
				password &&
				confirmPassword &&
				password !== confirmPassword
			) {
				Alert.alert("Maaf, konfirmasi password tidak sama dengan password..");
				setLoading(false)
			} else if (
				name &&
				email &&
				password &&
				confirmPassword &&
				password == confirmPassword
			) {
				const displayName = name;
				try {
					await createUserWithEmailAndPassword(
						authFirebase,
						email,
						password
					).then(async (userCredential) => {
						await updateProfile(authFirebase.currentUser, {
							displayName,
						});
						sendEmailVerification(authFirebase.currentUser);
						// Signed in
						const user = userCredential.user;

						console.log("userCredential:", userCredential);
						console.log("userCredential.user", userCredential.user);

						if (user) {
							// notifShow({
							// 	title: `Berhasil membuat akun baru dengan email: ${user.email}`,
							// 	message: "Silakan login dengan email dan password",
							// 	color: "green",
							// 	duration: 5000,
							// });
							console.log(`berhasill membuat akun dengan email : ${user.email}`)
							try {
								await setDoc(doc(db, "users", user.uid), {
									name: user.displayName,
									email: user.email,
									uid: user.uid,
									role: "user",
									subscription: "null",
									enrollmentDate: dayjs().format("DD/MM/YYYY-HH:mm"),
									connectedDevices : [],
									zikrCount : 0,
									createdAt: new Date(),
								});
							} catch (error) {
								console.log(error, "error setdoc register")
							}
						}
					});
					setLoading(false)
					// authFirebase.signOut();
				} catch (error) {
					setLoading(false)
					Alert.alert(error.message);
				}
				setLoading(false)
			}
			setLoading(false)
		};


	return (
		<>
				{/* <Stack flex={1} alignItems='center' justifyContent='center' width={width}>
						<Text>SignUpScreen</Text>
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
										<MaterialIcons name="person" size={24} color="black" />
									}
								/>
								<Input
									w={{
										base: "100%",
										md: "100%",
									}}
									placeholder="Name"
									bg="white"
									size={"xl"}
									id="name"
									// shadow={3}
									value={name}
									onChangeText={setName}
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
										<MaterialIcons name="email" size={24} color="black" />
									}
								/>
								<Input
									w={{
										base: "100%",
										md: "100%",
									}}
									placeholder="Email"
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
									placeholder="Password"
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
									placeholder="Confirm Password"
									bg="white"
									size={"xl"}
									id="confirmPassword"
									type="password"
									// shadow={3}
									value={confirmPassword}
									onChangeText={setConfirmPassword}
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
							onPress={() => handleSignUp()}
							bg='tertiary.800'

						>
							<Text
								color='warmGray.50'
								fontWeight="bold"
								disabled={loading}
							>
								SIGN UP
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
									// bg="white"
									opacity="0.7"
									shadow={10}
								>
									Already have an account?
								</Link>
								<Divider orientation="vertical"/>
								<TouchableOpacity onPress={() => navigation.navigate("Login")} >
									<Text color={"gray.100"} shadow={3} fontWeight="bold" >
										Login
									</Text>
								</TouchableOpacity>
							</Flex>
					</Stack>
				</Stack>
			</KeyboardAvoidingView>
		</>
	)
}

export default SignUpScreen


const styles = StyleSheet.create({
		overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(47,49,54,0.5)',
	}
})