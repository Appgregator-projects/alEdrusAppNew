import React, { useState, useEffect } from 'react';
import { Image, View, useWindowDimensions } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { Box, Button, Flex, Heading, Stack, StatusBar, Text } from 'native-base';
import CompassHeading from 'react-native-compass-heading';
import { useAuthState } from '../Context/context';


const QiblaScreen = () => {
    const { height, width } = useWindowDimensions();
    const [subscription, setSubscription] = useState(null);
    const [magnetometer, setMagnetometer] = useState(0);
    const [heading, setHeading] = useState(0);
    const { location } = useAuthState();
    const [qibladValue, setQibladValue] = useState(0);

    const calculate = () => {
        let { latitude } = location.coords;
        let { longitude } = location.coords;
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
        _toggle();
        calculate();
        return () => {
            _unsubscribe();
        };
    }, []);

    const _toggle = () => {
        if (subscription) {
            _unsubscribe();
        } else {
            _subscribe();
        }
    };

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener((data) => {
                setMagnetometer(_angle(data));
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const _angle = (magnetometer) => {
        let angle = 0;
        if (magnetometer) {
            let { x, y, z } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(angle);
    };

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
            <Stack bg='black' style={{width, height}} safeAreaTop>
                <Flex flexDirection='row' alignItems='center'>
                    <Stack style={{ alignItems: 'center' }}>
                        <Box style={{ position: 'absolute', width: width, alignItems: 'center', top: 0 }}>
                            <Image source={require('../../assets/compass_pointer.png')} 
                                style={{
                                    height: height / 26,
                                    resizeMode: 'contain'
                                }} 
                            />
                        </Box>
                    </Stack>
                </Flex>
                <Flex>
                    <Heading>{parseInt(360-heading)}</Heading>
                </Flex>

                <Flex style={{ flexDirection : 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }} size={2} >
                    <Text 
                        style={{
                            color: '#fff',
                            fontSize: height / 27,
                            width: width,
                            // position: 'absolute',
                            textAlign: 'center'
                        }}
                    >
                        {_degree(magnetometer)}°
                    </Text>

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
                                transform: [{ rotate: qibladValue + 'deg' }]
                            }} 
                        />
                    </Stack>
                </Flex>
            </Stack>
        </>

        );
    };


    export default QiblaScreen;