import React, { useEffect, useMemo, useState } from 'react'
import {
	Text,
	Heading,
	Box,
	ScrollView,
	StatusBar,
    Button,
    Avatar,
    Flex,
    Stack,
} from "native-base";
import RingComponent from '../Components/RingComponent';
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from "react-native-chart-kit";
import { useAppContext } from '../Context/context';



const HomeScreen = ({bluetoothState, setAutoConnect}) => {
    const [bluetoothValue, setBluetoothValue] = useState(null);
    // const width = Dimensions.get('window').width;
	// const height = Dimensions.get('window').height;
    const { width, height } = useWindowDimensions();
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
        <StatusBar barStyle='dark-content' backgroundColor={'red'}/>
        <Header />
        <ScrollView>
        	<Box
        		_dark={{ bg: "blueGray.900" }}
        		_light={{ bg: "red" }}
        		style={{marginTop: 10, display:"flex", position:'relative', flexDirection:'column', bg:'red.500'}}
        	>
                <RingComponent setBluetoothValue={setBluetoothValue} bluetoothState={bluetoothState}/>
                <Box width={Dimensions.get('window').width*0.96} alignSelf='center'bg="white" shadow={1} p={6}rounded="2xl" mt={2} display='flex' flexDirection='row' alignItems='flex-start' justifyContent='space-between'>
                    <Box alignSelf='center' >
                        <Heading color='gray.500' fontWeight={500}>Real Time Tasbih</Heading>
                        <Text color='gray.500'>View the number {'\n'}of ring tasbih in real-time.</Text>
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
                        
                {/* <Box alignSelf='center'>
                    <BarChart
                        data={data}
                        width={width*0.9}
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
                </Box> */}
        	</Box>
        </ScrollView>
        <Button onPress={()=>navigation.navigate('Devices')} position='absolute' bottom={height*0.2} right={width*0.1} left={width*0.1} bg='#047857'>+ Add Device</Button>
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

const Header = () => {
	return (
		<>
			<Flex flexDirection='row' py={2} boxShadow='md' safeAreaTop bg='green.700'>
				<ImageContainer />
				<HeaderTitle />
			</Flex>
		</>
	)
};

const ImageContainer = () => {
	return (
		<>
			<Stack mx={5}>
				<Avatar size='md' source={{ uri : "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" }}/>
			</Stack>
		</>
	)
};


const HeaderTitle = () => {
	return (
		<>
			<Stack width={Dimensions.get('window').width}>
				<Text style={styles.titleBig}>Hello,</Text>
				<Text style={styles.titleSmall}>Faizal Edrus</Text>
			</Stack>
		</>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleBig: { 
        fontSize : 20,
        fontWeight : 600,
        color :'aliceblue'
		//  fontFamily : "Poppins-Medium" 
		},
	titleSmall: { 
        fontSize : 14,
        color : 'aliceblue'
		//  fontFamily : "Poppins-Regular" 
		}
});

