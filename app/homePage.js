import { View, ScrollView, SafeAreaView, ActivityIndicator, Alert, Image, TouchableOpacity, Text} from 'react-native';
import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import {COLORS, icons, SIZES, FONT} from '../constants';
import {Nearbyjobs, Newjobs, ScreenHeaderBtn, Welcome} from '../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import Popover from 'react-native-popover-view/dist/Popover';

function Home(){
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState({});
    const [nearbyJobsData, setNearbyJobsData] = useState({});
    const [newJobsData, setNewJobsData] = useState({});
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [isLoadingNearbyJobs, setIsLoadingNearbyJobs] = useState(true);
    const [isLoadingNewJobs, setIsLoadingNewJobs] = useState(true);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [menuVisible, setMenuVisible] = useState(false);
    const [error, setError] = useState(false);

    async function getUserData(){
        try {
           const token = await AsyncStorage.getItem("token");
            axios.post("http://localhost:8002/get-user-data", {token: token}).then(res => {
                console.log(res.data);
                AsyncStorage.setItem("username", res.data.data.username);
                setUserData(res.data.data);
                setIsLoadingData(false);
            }); 
        } catch (error) {
            Alert.alert(error);
            setError(true);
        }
    }

    async function getLocation(){
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setIsLoadingLocation(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
            .then(res => {
              console.log(res.data);
              // Extract city and country information from the response
              const city =
                res.data.address.city ||
                res.data.address.town ||
                res.data.address.village ||
                res.data.address.hamlet;
              const country = res.data.address.country;
              setCity(city);
              setCountry(country);
              setIsLoadingLocation(false);
            })
        } catch (error) {
            Alert.alert(error);
            setError(true);
        }
    }

    async function fetchNewJobsData() {
        const options = {
            method: 'GET',
            url: `https://jsearch.p.rapidapi.com/search`,
            params: {
                query: userData.profession,
                num_pages: 1,
                date_posted: 'week'
            },
            headers: {
              'X-RapidAPI-Key': '306ef96a75msh7f01b84ff83efa5p1a34ebjsn13b7e004c03f',
              'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setNewJobsData(response.data.data);
            setIsLoadingNewJobs(false);
        } catch (error) {
            setError(true);
            alert("There is an error");
        }
    }

    async function fetchNearbyJobsData() {
        const options = {
            method: 'GET',
            url: `https://jsearch.p.rapidapi.com/search`,
            params: {
                query: `${userData.profession}${city === '' && country === '' ? "" : ` in ${city} ${country}`}`,
                num_pages: 1
            },
            headers: {
              'X-RapidAPI-Key': '306ef96a75msh7f01b84ff83efa5p1a34ebjsn13b7e004c03f',
              'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setNearbyJobsData(response.data.data)
            setIsLoadingNearbyJobs(false)
        } catch (error) {
            setError(true);
            alert("There is an error")
        }
    }

    useEffect(() => {
        if (isLoadingData || isLoadingLocation) {
            getUserData();
            getLocation();
        } else {
            fetchNearbyJobsData();
            fetchNewJobsData();
        }
    }, [isLoadingData, isLoadingLocation]);

    if (isLoadingData || isLoadingLocation || isLoadingNearbyJobs || isLoadingNewJobs){
        return (<>
            <Stack.Screen options={{headerShown: false}}/>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }}>
                <ActivityIndicator
                    size="large" color={COLORS.primary}
                />
            </View>
        </>)
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <Popover from={(
                            <TouchableOpacity style={{width: 40, height: 40, marginLeft: 10, backgroundColor: COLORS.white,borderRadius: SIZES.small / 1.25, justifyContent: "center", alignItems: "center"}} onPress={() => setMenuVisible(prev => !prev)}>
                                <Image source={icons.menu} style={{width: 35, height: 35, backgroundColor: COLORS.white,borderRadius: SIZES.small / 1.25}}/>
                            </TouchableOpacity>
                            )}
                            backgroundStyle={{opacity:0}}
                            arrowSize={{width:0, height:0}}
                            isVisible={menuVisible}
                            onRequestClose={() => setMenuVisible(false)}
                        >
                            <TouchableOpacity style={{height:"5vh", justifyContent: "center", padding: 10}}><Text style={{fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.primary}}>Profile</Text></TouchableOpacity>
                            <TouchableOpacity style={{height:"5vh", justifyContent: "center", padding: 10}} onPress={() => {
                                    router.push("/favourites");
                                    setMenuVisible(false);
                                }}>
                                    <Text style={{fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.primary}}>Favourites</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{height:"5vh", justifyContent: "center", padding: 10}} 
                                onPress={() => {
                                    router.push("/");
                                    setMenuVisible(false);
                                }}>
                                    <Text style={{fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.primary}}>Logout</Text>
                            </TouchableOpacity>
                        </Popover>
                                    
                        
                    ),
                    headerRight: () => (
                        <View style={{marginRight: 10}}>
                            <ScreenHeaderBtn iconUrl={userData.profilePic} dimension="100%"/>
                        </View>
                        
                    ),
                    headerTitle: ""
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{flex:1, padding: SIZES.medium}}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        name={userData.name}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Newjobs profession={userData.profession} data={newJobsData}/>
                    <Nearbyjobs profession={userData.profession} data={nearbyJobsData} city={city} country={country}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;