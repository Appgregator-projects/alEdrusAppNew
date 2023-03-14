import { Box, Button, Divider, FlatList, Flex, Heading, Spinner, StatusBar, Text } from 'native-base'
import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { useBluetoothContext } from '../Context/context';
import { useBluetoothManager } from '../Hooks/useBluetoothManager';

const DevicesScreen = () => {
	const Manager = useBluetoothManager();
	const [loading, setLoading] = useState(false)
	let devices = [];


	const [scannedDevices, setScannedDevices] = useState([]);
	const [scanning, setScanning] = useState(false);

	const handleScan = () => {
		console.log("scan running")
		setLoading(true)
		Manager.stopDeviceScan()
		{!true ? Alert.alert("Bluetooth off","Please turn on bluetooth to connect Zikr ring"): 
			Manager.startDeviceScan(null, null, (error, device) => {
						setScanning(true);
					if (error) {
						console.log('Error Scanning : ', error)
						 setScanning(false)
					};
					if (device.isConnectable && device.name !== null) {
						console.log(device.name, device.id)
						let index = devices.findIndex(item => item.name === device.name || item.id === device.id);
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
				<Box bg="green.200" padding={70} rounded='full' onPress={handleScan}>
					<Text fontWeight="bold" textAlign='center' as="button">Scan {'\n'}Devices</Text>
				</Box>
				{loading && <><Text>Loading...</Text><Spinner /></>}
				{/* <FlatList 
					data={scannedDevices || [{name:'kuda', id:'jongkok'}]} 
					renderItem={Item}
					keyExtractor={item => item.id} 
				/> */}
			</Box>
		</>
	)
}

export default DevicesScreen
