import React, { useEffect, useMemo, useState } from 'react'
import {
	Text,
	Heading,
	Box,
	ScrollView,
	StatusBar,
    Button,
} from "native-base";
import RingComponent from '../Components/RingComponent';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from "react-native-chart-kit";



const HomeScreen = ({bluetoothState, setAutoConnect}) => {
    const [bluetoothValue, setBluetoothValue] = useState(null);
    const width = Dimensions.get('window').width;
	const height = Dimensions.get('window').height;

    const navigation = useNavigation();

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
            data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#047857",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `gray`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.3,
        useShadowColorFromDataset: false, // optional,
        propsForBackgroundLines: null,

    };

  return (
    <>
        <StatusBar barStyle='dark-content'/>
        <ScrollView>
        	<Box
        		safeAreaTop
        		_dark={{ bg: "blueGray.900" }}
        		_light={{ bg: "blueGray.50" }}
        		style={{marginTop: StatusBar.currentHeight || 0, display:"flex", position:'relative', flexDirection:'column'}}
        	>
                <RingComponent setBluetoothValue={setBluetoothValue} bluetoothState={bluetoothState}/>
                <Box width={Dimensions.get('window').width*0.9} alignSelf='center'bg="white" shadow={4} p={6}rounded="2xl" mt={10} display='flex' flexDirection='row' alignItems='flex-start' justifyContent='space-between'>
                    <Box alignSelf='center' >
                        <Heading color='gray.500' fontWeight={500}>Real Time Tasbih</Heading>
                        <Text>View the number {'\n'}of ring tasbih in real-time.</Text>
                    </Box>
                    <ValueCounter bluetoothValue={bluetoothValue}/>
                </Box>
            
                    {/* <Flex key="S" p={2} safeAreaTop  bg='green.300' position='absolute' zIndex={10} top={0} right={0} left={0} flexDir='row' justifyContent='space-between'>
                        <Heading>Zikr Ring Counter</Heading>x
                        <ToggleDarkMode />
                    </Flex> */}

                    {/* {deviceScan ? (
                        <Stack alignItems={'center'} justifyContent='center'>
                        <Button onPress={() => handleDisconnect(deviceScan)}>Disconnect</Button>
                        </Stack>
                        ) : (
                            <Stack alignItems={'center'} justifyContent='center'>
                            <Button onPress={() => handleScan()}>{scanning ? "Stop scanning" : "Scan Device"}</Button>
                            </Stack>
                        )} */}
                        
                <Box>
                    <BarChart
                        data={data}
                        width={Dimensions.get('window').width}
                        height={220}
                        yAxisLabel=""
                        propsForBackgroundLines={null}
                        chartConfig={chartConfig}
                        verticalLabelRotation={0}
                         style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </Box>
        	</Box>
        </ScrollView>
        <Button onPress={()=>navigation.navigate('Devices')} position='absolute' bottom={10} right={width*0.1} left={width*0.1} bg='#047857'>+ Add Device</Button>
    </>
  )
}

export default HomeScreen;



const ValueCounter = ({ bluetoothValue }) => {

    return (
        <>
            <Box  bg="#9ae6b4" p={5} rounded="full" height='auto'>
                <Heading fontWeight={500} color='gray.700'>{bluetoothValue || 0}</Heading>
            </Box>
        </>
    )
}
