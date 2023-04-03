import React, { useEffect, useMemo, useState } from "react";
import {
	Text,
	HStack,
	Switch,
	useColorMode,
	NativeBaseProvider,
	extendTheme,
	Stack,
	Heading,
	Image,
	Button,
} from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { useWindowDimensions, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from "./src/Navigators/MainNavigator";
import HomeScreen from './src/Screens/HomeScreen';
import { AppProvider, useAuthState } from "./src/Context/context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthNavigator from './src/Navigators/AuthNavigator';
import { StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, authFirebase, db } from "./src/Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GetDataObject } from "./src/Utils/storage";
import Navigators from "./src/Navigators/Navigators";



// Define the config
const config = {
	useSystemColorMode: false,
	initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
const Tab = createBottomTabNavigator();


export default function App() {
	const [deviceScan, setDeviceScan] = useState(null);
	const [showIntro, setShowIntro] = useState(true);
	const { width, height } = useWindowDimensions();
	const auth = getAuth(app);

	const getUserFromStorage = async () => {
		const x = await GetDataObject("userData");
		if (x) setUserStorage(x);
	};

	useEffect(() => {
		getUserFromStorage();
		// const 
		return () => {};
	}, []);
	
	const handleDisconnect = (device) => {
		console.log(device.id, 'ini id')
		Manager.onDeviceDisconnected(device.id, (error, res) => {
		console.log(res, 'success disconnected')
		// setDeviceScan(null)
		if (error) {
			console.log(error)
		}
		})
		// setDeviceScan(null)
	};

	const data = [
		{
			id : 1,
			title :"Al Edrus al Jannah",
			description : "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmiondo",
			image : 'https://img.freepik.com/premium-photo/young-muslim-woman-praying-with-tasbeeh-holy-quran-is-background-indoors-focus-hands_94678-1890.jpg'
		},
		{
			id : 2,
			title :"Lorem ipsum dolor sit amet",
			description : "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmiondo",
			image : 'https://cdn.shopify.com/s/files/1/0531/7115/9236/files/562d3aecd7c57ac74f0bdeba6640abc_480x480@2x.jpg?v=1644919880'
		},
		{
			id : 3,
			title :"Lorem ipsum dolor sit amet",
			description : "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmiondo",
			image : 'https://static2.mumzworld.com/media/catalog/product/s/b/sbf-zikr1-18c-zikr-smart-tasbih-ring-18mm-rose-gold-16389700426.jpg'
		},
	];


	const renderItem = ({item}) => {
		return (
			<Stack width={width} height={height} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
				<Image alt={item.title} source={{uri : item.image}} position='absolute' width={width} height={height} resizeMode='cover' zIndex={-2}/>
				<Image alt='logo' source={require('./assets/logo_new.png')} position='absolute' width={width*0.5} height={width*0.5} resizeMode='cover' top={15} zIndex={-2}/>
				 <View style={styles.overlay} />
				<Heading fontSize={30} color='#e3e6e4'>{item.title}</Heading>
				<Text></Text>
				<Text></Text>
				<Text></Text>
				<Text textAlign='center' color='#e3e6e4' fontSize={20}>{item.description}</Text>
			</Stack>
		);
	};

	return (
		<NavigationContainer>
			<NativeBaseProvider>
				<AppProvider>
					{false ? 
						<AppIntroSlider 
							data={data}
							renderItem={renderItem}
							onDone={()=>setShowIntro(false)}
						/>
					 : 
						<Navigators />
					 }
				</AppProvider>
			</NativeBaseProvider>
		</NavigationContainer>
	);
}

// Color Switch Component
function ToggleDarkMode() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<HStack space={2} alignItems="center">
			<Text>Theme</Text>
			<Switch
				isChecked={colorMode === "light"}
				onToggle={toggleColorMode}
				aria-label={
					colorMode === "light" ? "switch to dark mode" : "switch to light mode"
				}
			/>
		</HStack>
	);
};



const CustomTabBarButton = (props) => {
	const { children, accessibilityState, onPress } = props;
	if (accessibilityState.selected) {
		return (
			<View style={styles.wrapper}>
				<TouchableOpacity onPress={onPress} style={styles.active}>
					<Text>{children}</Text>
				</TouchableOpacity>
			</View>
		);
	} else {
		return (
			<TouchableOpacity onPress={onPress} style={styles.inactive}>
				<Text>{children}</Text>
			</TouchableOpacity>
		);
	};
};

const styles = StyleSheet.create({
	overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(47,49,54,0.5)',
  },
	tabBarStyle : {
		backgroundColor : "#054705",
		borderTopWidth : 0,
		// marginHorizontal: Dimensions.get('window')*0.2,
		// justifyContent : 'space-evenly',
		// borderRadius:100,
		// position:"absolute",
		// bottom : 7,
		// right : 10,
		// left : 10
	},
	wrapper : {
		flex : 1,
		alignItems : 'center'
	},
	active : {
		// flex :1,
		// position : "absolute",
		width :50,
		height : 50,
		borderRadius : 50/2,
		backgroundColor : '#054705',
		justifyContent : 'center',
		alignItems : 'center'
	},
	inactive : {
		flex :1,
		backgroundColor : 'transparent'
	}
})