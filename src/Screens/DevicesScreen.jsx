import { Box, Button, FlatList, Flex, Heading, StatusBar, Text } from 'native-base'
import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { useBluetoothContext } from '../Context/context';
import { useBluetoothManager } from '../Hooks/useBluetoothManager';

const DevicesScreen = () => {
	const Manager = useBluetoothManager();
	const Item = ({data}) => (
			<Flex width={Dimensions.get('window').width*0.9} mx={4} py={1} flexDir='row' justifyContent="space-between">
				<Heading>{data.name}</Heading>
				<Button onPress={()=>handleConnect(data.id)}>Connect</Button>
			</Flex>
	);
	// const Manager = useMemo(() => new BleManager(), []);

	const [scannedDevices, setScannedDevices] = useState([]);
	const [scanning, setScanning] = useState(false);

	const handleScan = () => {
		let devices = [];
		Manager.stopDeviceScan()
		{!true ? Alert.alert("Bluetooth off","Please turn on bluetooth to connect Zikr ring"): 
			Manager.startDeviceScan(null, null, (error, device) => {
					// 	setScanning(true)
					// if (error) {
					// 	console.log('Error Scanning : ', error)
					// 	 setScanning(false)
					// }
					// if (
					// 	// device.isConnectable && 
					// 	device.name !== null) {
					// 	console.log(device.name, device.id)
					// 	devices.push({name : device.name, id : device.id})
					// }
					// setTimeout(()=>{
					// 	Manager.stopDeviceScan()
					// }, 5000);
					console.log(device, 'KONTOL')
		
					//stop
					// if (device.name === DEVICE_NAME) {
					// 	// setScanning(false)
					// 	Manager.stopDeviceScan()
					// 	setDeviceScan(device)
					// 	//terhubung ke perangkat arduino
					// }
					// console.log(devices, "after")
					setScannedDevices(prevState => [...prevState, ...devices])
			})
		}
		console.log("negntot")
	};

	const handleScan2 = () => {
		Manager.stopDeviceScan()
		console.log('test')
		Manager.startDeviceScan(null, null, (error, device) => {
			if (error) {
				console.log('Error Scanningtot : ', error)
				return
			}
			if (device.isConnectable) {
				console.log(device.name, device.id)
			}

			//stop
			if (device.name === DEVICE_NAME) {
				Manager.stopDeviceScan()
				setDeviceScan(device)
				//terhubung ke perangkat arduino
			}
		})
	}

	useEffect(()=>{
		handleScan2()
	},[])

	return (
		<>
			<Box
				safeAreaTop
				_dark={{ bg: "blueGray.900" }}
				_light={{ bg: "blueGray.50" }}
				style={{marginTop: StatusBar.currentHeight || 0, display:"flex", position:'relative', flexDirection:'column'}}
			>
				<Text>DevicesScreen</Text>
				<FlatList 
					data={scannedDevices || []} 
					renerItem={Item}
					keyExtractor={item => item.id} 
				/>

			</Box>
		</>
	)
}

export default DevicesScreen
