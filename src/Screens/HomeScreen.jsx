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
    Menu,
    Stack,
    Image,
    Pressable
} from "native-base";
import RingComponent from '../Components/RingComponent';
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from "react-native-chart-kit";
import { useAuthState } from '../Context/context';



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
        {/* <Button onPress={()=>navigation.navigate('Devices')} position='absolute' bottom={height*0.02} right={width*0.1} left={width*0.1} bg='#047857'>+ Add Device</Button> */}
    </>
  )
}

export default HomeScreen;



const ValueCounter = ({ bluetoothValue }) => {
    const {user}  = useAuthState();
    return (
        <>
            <Box  bg="#9ae6b4" p={5} rounded="full" height='auto'>
                <Heading fontWeight={500} color='gray.700'>{user.count || bluetoothValue || 0}</Heading>
            </Box>
        </>
    )
}

const Header = () => {
    const {user} = useAuthState();
	return (
		<>
			<Flex flexDirection='row' py={2} boxShadow='md' safeAreaTop bg='green.700'>
				<ImageContainer user={user}/>
				<HeaderTitle user={user}/>
			</Flex>
		</>
	)
};

const ImageContainer = ({ user }) => {
	return (
		<>
			<Stack mx={5}>
                <Menu w="190" trigger={triggerProps => {
                    return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                <Avatar size='md' source=   {{ uri : user?.photoUrl }} />
                        </Pressable>
                    }}
                >
                    <Menu.Item onPress={()=>console.log("pressed!")}>Log Out</Menu.Item>
                    <Menu.Item>Cookie</Menu.Item>
                </Menu>
			</Stack>
		</>
	)
};


const HeaderTitle = ({ user }) => {
	return (
		<>
			<Stack width={Dimensions.get('window').width}>
				<Text style={styles.titleBig}>Hello,</Text>
				<Text style={styles.titleSmall}>{user?.displayName}</Text>
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

