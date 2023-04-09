import { Box, Button, Heading, HStack, ScrollView, Spacer, Stack, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Image, useWindowDimensions } from 'react-native'
import { ImageBackground } from 'react-native'
import * as Location from 'expo-location';
import { cities } from '../Apis/cities';
import dayjs from 'dayjs';
import axios from 'axios';
import { useAppDispatch, useAuthState } from '../Context/context';

const PrayerScreen = () => {
    const { width, height } = useWindowDimensions();
    const [prayers, setPrayers] =  useState({});
    const [hijriyahDate, setHijriyahDate] = useState();
    const { address, location } = useAuthState();

    
    const getPrayerSchedules = async () => {
        console.log(address)
        if(address) {
            const city = await axios.get(`https://api.banghasan.com/sholat/format/json/kota/nama/${address[0]?.subregion.toLowerCase()}`)

            if (city) {
                // console.log('id city nih boss: ', city);
                try {
                    const response = city?.data?.id ?? await axios.get(`https://api.banghasan.com/sholat/format/json/jadwal/kota/${city?.data?.kota[0]?.id}/tanggal/${dayjs().format("YYYY-MM-DD")}`);
                    console.log(response.data?.jadwal?.data, "response nih anjay");
                    setPrayers(response.data?.jadwal?.data)
                } catch (error) {
                    console.error(error);
                };
            };
        };
    };

   const getHijriyahDate = async () => {
        // console.log('===================')
        // console.log('getting hijriyah date')
        // const H_date = await axios.get(`http://api.aladhan.com/v1/gToH/${dayjs().format('MM-DD-YYYY')}`)
        const dateNow = dayjs().format('DD-MM-YYYY');
        const H_date = await axios.get(`http://api.aladhan.com/v1/gToH/${dateNow}`);
        // console.log(H_date.data.data.hijri, "tanggal hijriyah")
        if (H_date.data.data.hijri) setHijriyahDate(H_date.data.data.hijri);
        // console.log('===================')

    };

    useEffect(()=>{
        getHijriyahDate();
    },[]);

    useEffect(()=>{
        getPrayerSchedules();
    },[address]);

  return (
    <>
        <Stack>
            <ImageBackground source={require('../../assets/1789.png')} resizeMode='cover' style={{height, width}}>
                <Stack safeAreaTop px={width*0.06}>
                    <Heading color='blueGray.200'>Prayers</Heading>
                    {address? 
                        <Heading color='blueGray.200' size='sm' fontWeight={400}>{`${address[0]?.street}, ${address[0]?.subregion}, ${address[0]?.region} `}</Heading>
                    : <Heading color='blueGray.200' size='sm' fontWeight={400}>Waiting for location...</Heading>}
                </Stack>

                {/* <Button onPress={()=>{
                    console.log({location})
                    console.log({address})
                }}>Check address</Button> */}

                <Stack alignItems='center' justifyContent='center' display='flex' flexDirection='column' flex={1}>
                    <Box p={5} rounded="lg" width={width*0.9}>
                        <Heading textAlign='center' color="gray.500" fontWeight={300} size="4xl">{dayjs().format('hh:mm')}</Heading>
                    </Box>
                    <Box p={5} rounded="lg" width={width*0.9}>
                        <Heading textAlign='center' color="gray.500" fontWeight={500}>{dayjs().format('dddd, D MMMM YYYY')}</Heading>
                        <Heading textAlign='center' color="gray.500" size='sm'fontWeight={400}>{hijriyahDate ? `${hijriyahDate?.weekday?.en}, ${hijriyahDate?.day} ${hijriyahDate?.month?.en} ${hijriyahDate?.year}`: "Loading.."}</Heading>
                    </Box>
                    <Box p={5} alignSelf='center' bg="#252525" opacity={0.8} rounded="lg" width={width*0.9}>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Imsak</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers?.imsak}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Shubuh</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers?.subuh}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Terbit</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers?.terbit}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Dzuhur</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers?.dzuhur}</Text>
                        </HStack>
                        <HStack p={1} bg="green.600">
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Ashar</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers?.ashar}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Maghrib</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers?.maghrib}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Isya</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers?.isya}</Text>
                        </HStack>
                    </Box>
                </Stack>
            </ImageBackground>
        </Stack>
    </>
  )
}

export default PrayerScreen
