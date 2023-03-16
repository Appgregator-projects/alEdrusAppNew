import { MotiView } from 'moti';
import { Box, Button, Divider, FlatList, Flex, Heading, Spinner, StatusBar, Text } from 'native-base'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Easing } from 'react-native-reanimated';
import { useBluetoothContext } from '../Context/context';
import { useBluetoothManager, useBluetoothState } from '../Hooks/useBluetoothManager';

const DevicesScreen = () => {
	const Manager = useBluetoothManager();
	const [loading, setLoading] = useState(false)
	let devices = [];
	const bluetoothState = useBluetoothState();

	const [scannedDevices, setScannedDevices] = useState([]);
	const [scanning, setScanning] = useState(false);

	const handleScan = () => {
		setLoading(true)
		Manager.stopDeviceScan()
		{!bluetoothState ? Alert.alert("Bluetooth off","Please turn on bluetooth to connect Zikr ring"): 
			Manager.startDeviceScan(null, null, (error, device) => {
						setScanning(true);
					if (error) {
						console.log('Error Scanning : ', error)
						 setScanning(false)
						 setLoading(false)
					};
					if (device.isConnectable && device.name !== null) {
						console.log(device.name, device.id)
						// let index = devices.findIndex(item => item.name === device.name || item.id === device.id);
						let index = devices.findIndex(item => 
							String(item.name).toLowerCase().includes('zikr') || 
							String(item.name).toLowerCase().includes('ring') || 
							String(item.name).toLowerCase().includes('QB709')
						);


						if (index === -1) {
							devices.push({name : device.name, id : device.id});
						}
					};
					setTimeout(()=>{
						Manager.stopDeviceScan();
						setScannedDevices(devices);
						setLoading(false);
					}, 5000);
		
					//stop
					// if (device.name === DEVICE_NAME) {
					// 	// setScanning(false)
					// 	Manager.stopDeviceScan()
					// 	setDeviceScan(device)
					// 	//terhubung ke perangkat arduino
					// }
					// console.log(devices, "after")
					// setScannedDevices(prevState => [...prevState, ...devices]);
				})
			}
	};

	const handleConnect = async (id) => {
		// console.log(deviceScan.id)
		setLoading(true)
		console.log(id || "9E52F397-5BDF-529A-0915-9BCE9546AA0E")
		// Manager.connectToDevice('68:67:25:EC:47:6A')
		{!bluetoothState ? Alert.alert("Bluetooth off","Please turn on bluetooth to connect Zikr ring") : 
			Manager.connectToDevice(id || "9E52F397-5BDF-529A-0915-9BCE9546AA0E")
			.then(async (device) => {
				setLoading(false)
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
						}

						if (error) {
							setLoading(false)
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

	const Item = ({item}) => (
		<Flex width={Dimensions.get('window').width*0.9} mx={4} py={1} flexDir='row' justifyContent="space-between">
			<Heading fontWeight={300} size='md'>{item?.name}</Heading>
			<Button colorScheme="tertiary" variant='outline' onPress={()=>handleConnect(item?.id)}>Connect</Button>
			{/* <Button color='white' bg='#047857' variant="outline" onPress={()=>handleConnect(item?.id)}>Connect</Button> */}
		</Flex>
	);

	useEffect(()=>{
		setTimeout(()=>{
			console.log(scannedDevices, "scannedDevices")
			console.log(devices, "devices")
			setLoading(false)
		}, 12000)
	},[])

	return (
		<>
			<Box
				safeAreaTop
				flex={1}
				display='flex'
				justifyContent='center'
				alignItems='center'
				flexDirection='column'
				_dark={{ bg: "blueGray.900" }}
				_light={{ bg: "blueGray.50" }}
				style={{marginTop: StatusBar.currentHeight || 0, display:"flex", position:'relative', flexDirection:'column'}}
			>
			{[...Array(3).keys()].map((index)=>{
				return (
					<MotiView 
						from={{ opacity:0.7, scale :1}}
						animate={{ opacity : 0, scale : 4 }}
						transition={{
							type:null,
							duration : 2000,
							easing : Easing.out(Easing.ease),
							delay : index * 400,	
							repeatReverse : false,
							loop:true,
						}}
						key={index}
						style={[StyleSheet.absoluteFillObject, styles.dot]}
			/>
				)
			})}
				<Button bg="green.200" padding={70} rounded='full' onPress={handleScan}>
					<Text fontWeight="bold" textAlign='center' as="button">Scan {'\n'}Devices</Text>
				</Button>
				{loading && <><Text>Searching...</Text><Spinner /></>}
				<FlatList 
					data={scannedDevices || [{name:'kuda', id:'jongkok'}]} 
					renderItem={Item}
					keyExtractor={item => item.id} 
				/>
			</Box>
		</>
	)
}

export default DevicesScreen

const styles = StyleSheet.create({
	dot : {
		width : 100,
		height : 100,
		borderRadius : 100,
		color: "#ffd600"
	}	
})
