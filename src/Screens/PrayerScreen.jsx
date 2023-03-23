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
    const { address } = useAuthState();

    
    const getPrayerSchedules = async () => {
        if(address) {
            const city = await axios.get(`https://api.banghasan.com/sholat/format/json/kota/nama/${address[0]?.city.toLowerCase()}`)

            if (city) {
                console.log('id city nih boss', city.data.kota[0].id);
                try {
                const response = await axios.get(`https://api.banghasan.com/sholat/format/json/jadwal/kota/${city.data.kota[0].id}/tanggal/${dayjs().format("YYYY-MM-DD")}`);
                console.log(response.data.jadwal.data, "response nih anjay");
                setPrayers(response.data.jadwal.data)
                } catch (error) {
                    console.error(error);
                };
            };
        };
    };

    getHijriyahDate = async () => {
        console.log('===================')
        console.log('getting hijriyah date')
        // const H_date = await axios.get(`http://api.aladhan.com/v1/gToH/${dayjs().format('MM-DD-YYYY')}`)
        const dateNow = dayjs().format('DD-MM-YYYY');
        const H_date = await axios.get(`http://api.aladhan.com/v1/gToH/${dateNow}`);
        console.log(H_date.data.data.hijri, "tanggal hijriyah")
        if (H_date.data.data.hijri) setHijriyahDate(H_date.data.data.hijri);
        console.log('===================')

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
                        <Heading color='blueGray.200' size='sm' fontWeight={400}>{`${address[0]?.district}, ${address[0]?.city}, ${address[0]?.country}`}</Heading>
                    : null}
                </Stack>
                <Stack alignItems='center' justifyContent='center' display='flex' flexDirection='column' flex={1}>
                    <Box p={5} rounded="lg" width={width*0.9}>
                        <Heading textAlign='center' color="gray.800" fontWeight={500}>Thursday, March 21 2023</Heading>
                        <Heading textAlign='center' color="gray.700" size='sm'fontWeight={400}>{hijriyahDate ? `${hijriyahDate?.weekday?.en}, ${hijriyahDate?.day} ${hijriyahDate?.month?.en} ${hijriyahDate?.year}`: null}</Heading>
                    </Box>
                    <Box p={5} alignSelf='center' bg="#252525" opacity={0.8} rounded="lg" width={width*0.9}>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Imsak</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers.imsak}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Shubuh</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers.subuh}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Terbit</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers.terbit}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Dzuhur</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers.dzuhur}</Text>
                        </HStack>
                        <HStack p={1} bg="green.600">
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Ashar</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers.ashar}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Maghrib</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers.maghrib}</Text>
                        </HStack>
                        <HStack p={1}>
                            <Heading color="amber.50" fontWeight={400} size='sm' borderRadius='lg' m={0.5}>Isya</Heading>
                            <Spacer />
                            <Text color='amber.50'>{prayers.isya}</Text>
                        </HStack>
                    </Box>
                </Stack>
            </ImageBackground>
        </Stack>
    </>
  )
}

export default PrayerScreen
