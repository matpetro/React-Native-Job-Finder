import { useState, useEffect, useCallback } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import styles from '../components/home/nearby/nearbyjobs.style'
import { COLORS } from '../constants'
import { NearbyJobCard } from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Favourites() {
    const router = useRouter();
    const [favourites, setFavourites] = useState([]);
    const [isLoadingFavs, setIsLoadingFavs] = useState(true);

    async function getFavouriteData(){
        try {
            const username = await AsyncStorage.getItem("username");
            const storedFavs = await AsyncStorage.getItem(username + "favourites");
            console.log(storedFavs);
            setFavourites((storedFavs === null || storedFavs === undefined || storedFavs.length === 0) ? [] : JSON.parse(storedFavs));
            setIsLoadingFavs(false);
        } catch (error) {
            Alert.alert(error);
        }
    }

    // needed to ensure the favourite data is updated when going back from the job details page
    useFocusEffect(useCallback(() => {
        getFavouriteData();
    }, []));
    
    if (isLoadingFavs){
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
            <Stack.Screen options={{headerShown: true, headerTitle: "Favourites", headerTitleAlign: "center"}}/>
                <View style={styles.cardsContainer}>
                    {favourites.length !== 0 ? favourites.map((job) => (
                        <NearbyJobCard 
                            job={job}
                            key={`nearby-job-${job.job_id}`}
                            handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                        />
                    )) : (<View style={{flex:1,justifyContent: "center",alignItems: "center"}}><Text>No Favourites Found</Text></View>)}
                </View>
        </SafeAreaView>
    )
}

export default Favourites;