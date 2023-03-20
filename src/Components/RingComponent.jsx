import React, { memo, useMemo, useState } from 'react'
import { Alert, Dimensions, StatusBar } from 'react-native'
import { BleManager } from 'react-native-ble-plx';
import {
	Text,
	Link,
	HStack,
	Center,
	Heading,
	Switch,
	useColorMode,
	NativeBaseProvider,
	extendTheme,
	VStack,
	Box,
	Button,
	Stack,
	Spinner,
	Flex,
	Image,
} from "native-base";
import base64 from "react-native-base64";
import { useAppDispatch, useBluetoothContext } from '../Context/context';
import { useBluetoothManager } from '../Hooks/useBluetoothManager';


const RingComponent = ({ setBluetoothValue, bluetoothState, setAutoConnect }) => {

	const [scanning, setScanning] = useState(false);
	const Manager = useBluetoothManager();
	const dispatch = useAppDispatch();

	const width=Dimensions.get('window').width;
	const height=Dimensions.get('window').height;





	const handleConnect = async (id) => {
		// console.log(deviceScan.id)
		console.log(id || "9E52F397-5BDF-529A-0915-9BCE9546AA0E")
		// Manager.connectToDevice('68:67:25:EC:47:6A')
		{!true ? Alert.alert("Bluetooth off","Please turn on bluetooth to connect Zikr ring") : 
			Manager.connectToDevice(id || "9E52F397-5BDF-529A-0915-9BCE9546AA0E")
			.then(async (device) => {
				await device.discoverAllServicesAndCharacteristics()
				Manager.stopDeviceScan()
				console.log(`Device connected with ${device.name}`)
				console.log(device, 'ini device')
				await device.services().then((service) => {
				for (const ser of service) {
					console.log(service, 'ini service')
					ser.characteristics().then(async (characteristic) => {
					console.log(characteristic, 'ini characteristic')
					// console.log(characteristic[1].serviceUUID, 'ini serviceUUID')
					// console.log(characteristic[1].uuid, 'ini serviceUUID')
					device.monitorCharacteristicForService("0000d0ff-0000-1000-8000-00805f9b34fb", "0000d002-0000-1000-8000-00805f9b34fb", (error, val) => {
						if(val){
							console.log(base64.decode(val.value), 'ini val')
							setBluetoothValue(parseInt(base64.decode(val.value).split(',')[1]))
							dispatch({type : "UPDATE_COUNT", payload : {count : parseInt(base64.decode(val.value).split(',')[1])}})
						}

						if (error) {
							console.log(error, 'ini error')
							// setAutoConnect(!autoConnect)
						}
					})	

					}).catch((error) => console.log(error, 'error characteristic'))
				}
					// console.log(service, "service")
				}).catch((error) => { console.log(error, 'ini error service') })

			})
			.catch((error) => console.log(error, 'ini errorr'))
		};
	}
		const handleScan = () => {
		let devices = [];
		Manager.stopDeviceScan()
		{!true ? Alert.alert("Bluetooth off","Please turn on bluetooth to connect Zikr ring"): 
			Manager.startDeviceScan(null, null, (error, device) => {
						setScanning(true)
					if (error) {
						console.log('Error Scanning : ', error)
						 setScanning(false)
					}
					if (
						// device.isConnectable && 
						device.name !== null) {
						console.log(device.name, device.id)
						devices.push({name : device.name, id : device.id})
					}
					setTimeout(()=>{
						Manager.stopDeviceScan()
					}, 5000);
		
					// stop
					// if (device.name === DEVICE_NAME) {
					// 	// setScanning(false)
					// 	Manager.stopDeviceScan()
					// 	setDeviceScan(device)
					// 	//terhubung ke perangkat arduino
					// }
					console.log(devices, "after")
					setScannedDevices(prevState => [...prevState, ...devices])
			})
		}
	};

	
	// const HeaderComponent = () => {
	// 	return (
	// 		<>
	// 				<Center
	// 					paddingTop={Dimensions.get('window').height*0.2}
	// 					px={4}
	// 					flex={1}
	// 					mb={5}
	// 				>
	// 					<VStack space={5} alignItems="center">
	// 						<Image alt='logo' source={require('./assets/logo_Al-Edrus.png')} height={Dimensions.get('window').width *0.9} width={Dimensions.get('window').width *0.9} alignSelf="center"/>
	// 						<Heading size="lg">Welcome to Al Edrus</Heading>	
	// 						{bluetoothValue ? <Box padding={Dimensions.get('window').width*0.1}>
	// 							<Heading size='md'>Count :</Heading>
	// 							<Text>{bluetoothValue}</Text>
	// 						</Box>	: null}			
					
	// 						<HStack alignItems={'center'} justifyContent='center' p={5} >
	// 							<Text fontSize={'md'} fontWeight='bold'>Bluetooth : </Text>
	// 							<Text fontSize={'md'} fontWeight='bold'>{bluetoothState ? 'On' : 'Off'} </Text>
	// 						</HStack>
							
	// 						{deviceScan ? (
	// 							<Stack alignItems={'center'} justifyContent='center'>
	// 								<Button onPress={() => handleDisconnect(deviceScan)}>Disconnect</Button>
	// 							</Stack>
	// 						) : (
	// 							<Stack alignItems={'center'} justifyContent='center'>
	// 								<Button onPress={() => handleScan()}>{scanning ? "Stop scanning" : "Scan Device"}</Button>
	// 							</Stack>
	// 						)}
	// 					{scanning ? 
	// 							<Flex>
	// 								<Spinner color="cyan.500" />
	// 								<Text fontSize='sm'>Searching bluetooth...</Text>
	// 							</Flex>
	// 						: 
	// 						null
	// 					}

	// 					{deviceScan && (
	// 						<VStack p={5} alignItems={'center'} justifyContent='center'>
	// 							<Text fontWeight={'bold'} fontSize={'md'} >Device Found : </Text>
	// 							<Flex flexDirection="row" p={1} justifyContent='space-around' width="full">
	// 								<Text fontSize={'md'} >{deviceScan.name}</Text>
	// 								<Button onPress={() => handleConnect()}>Connect</Button>
	// 							</Flex>
	// 						</VStack>
	// 					)}

	// 					{connectedDevice ? <Text>Connected With : {JSON.stringify(connectedDevice)}</Text> : null}
	// 					</VStack>
	// 				</Center>
	// 		</>
	// 	)
	// }
	
	// const FooterComponent = () => {
	// 	return (
	// 		<>
	// 			<Box  bg="gray.0" width={Dimensions.get('window').width} height={80}>
	// 				{count != 0 ? 
	// 					<VStack alignSelf='center'>
	// 						<Heading size="sm">Count : </Heading>
	// 						<Heading>{count}</Heading>
	// 					</VStack>
	// 				 : null }
	// 			</Box>
	// 		</>
	// 	)
	// }

	// const Item = ({data}) => (
	// 	<Flex width={Dimensions.get('window').width*0.9} mx={4} py={1} flexDir='row' justifyContent="space-between">
	// 		<Heading>{data.name}</Heading>
	// 		<Button onPress={()=>handleConnect(data.id)}>Connect</Button>
	// 	</Flex>
	// );

	return (
		<>
			<Stack borderBottomLeftRadius='3xl' bg='white'p={5} width={width} alignSelf='center' display='flex' flexDirection='row' alignItems='center' shadow={1}>
				<Box flex={2}>
					<Image
						source={{uri:'https://c8n.tradeling.com/img/plain/pim/rs:auto:600::0/f:webp/up/62cfe67b0f243f6f784a82ee/e5a300f0ccb3a752d063f1ba87525b3f.jpg'}}
						width={width*0.15}
						height={width*0.15}
						alt="Ring"
						// rounded='full'
					/>
				</Box>

				<VStack gap={1} flex={3}>
					<Heading color='gray.500' size='md' fontWeight={600}>Zikr Ring</Heading>
					<Text color='gray.400' onPress={()=>handleConnect()}>Connect</Text>
				</VStack>
			</Stack>
		</>         
	)
}

export default memo(RingComponent)
