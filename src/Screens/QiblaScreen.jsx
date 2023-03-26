import React, { useState, useEffect } from 'react';
import { Image, View, useWindowDimensions } from 'react-native';
import { Box, Button, Flex, Heading, Stack, StatusBar, Text } from 'native-base';
import CompassHeading from 'react-native-compass-heading';
import { useAuthState } from '../Context/context';


const QiblaScreen = () => {
    const { height, width } = useWindowDimensions();
    const [heading, setHeading] = useState(0);
    const { location, address } = useAuthState();
    const [qibladValue, setQibladValue] = useState(0);

    const calculate = () => {
        let { latitude } = location?.coords;
        let { longitude } = location?.coords;
      
        const PI = Math.PI;
        let lat_kaaba = (21.4225 * PI) / 180;
        let lng_kaaba = (39.8264 * PI) / 180;
        let phi = (latitude * PI) /180;
        let lambda = (longitude * PI) / 180;
        
        let qiblad = (180 / PI) * Math.atan2(Math.sin(lng_kaaba - lambda), Math.cos(phi) * Math.tan(lat_kaaba) - Math.sin(phi) * Math.cos(lng_kaaba - lambda));
        setQibladValue(qiblad)
        // console.log(qiblad, "qiblad")
      }

    useEffect(() => {
        calculate();
        return () => {
        };
    }, []);

    const _direction = (degree) => {
        if (degree >= 22.5 && degree < 67.5) {
            return 'NE';
        }
        else if (degree >= 67.5 && degree < 112.5) {
            return 'E';
        }
        else if (degree >= 112.5 && degree < 157.5) {
            return 'SE';
        }
        else if (degree >= 157.5 && degree < 202.5) {
            return 'S';
        }
        else if (degree >= 202.5 && degree < 247.5) {
            return 'SW';
        }
        else if (degree >= 247.5 && degree < 292.5) {
            return 'W';
        }
        else if (degree >= 292.5 && degree < 337.5) {
            return 'NW';
        }
        else {
            return 'N';
        }
    };

    // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
    const _degree = (magnetometer) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    useEffect(() => {
        const degree_update_rate = 0;
    
        CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
          setHeading(heading);
        });
    
        return () => {
          CompassHeading.stop();
        };
      }, []);

    return (
        <>
            <StatusBar barStyle={'light-content'}/>
            <Stack bg='dark.100' style={{width, height}} safeAreaTop>
                <Flex style={{ flexDirection : 'column', alignItems: 'center', flex: 1, width, height}}>
                   
                    <Stack alignSelf='center'>
                        <Image 
                            source={require("../../assets/compass_bg.png")} 
                            style={{
                                justifyContent: 'center',
                                height: width,
                                width,
                                alignItems: 'center',
                                resizeMode: 'contain',
                                transform: [{ rotate: parseInt(270-heading)+'deg' }]
                            }} 
                        />
                        <Image 
                            source={require("../../assets/qibla_pointer.png")} 
                            style={{
                                position : 'absolute',
                                zIndex : 4,
                                alignSelf : 'center',
                                width,
                                height: width,
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                                transform: [{ rotate: parseInt(qibladValue - heading) + 'deg' }]
                            }} 
                        />
                    </Stack>
                    <Stack py={5}>
                        <Flex flexDirection='column' alignItems='center' >
                            <Heading color='amber.200'>Heading : {heading}° {_direction(heading)}</Heading>
                            <Heading size='sm' color='amber.100'>QIBLAT : {qibladValue?.toFixed(2)}° from True North</Heading>
                        </Flex>
                        <Heading mt={10} color='amber.100' fontSize={12}>{address[0]?.name}, {address[0]?.city}</Heading>
                    </Stack>
                </Flex>
            </Stack>
        </>

        );
    };


    export default QiblaScreen;