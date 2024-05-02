import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tabs = ["About", "Qualifications", "Responsibilities"]

const JobDetails = () => {
    const params = useLocalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [favourites, setFavourites] = useState({});
    const [isLoadingFavs, setIsLoadingFavs] = useState(true);
    const [username, setUsername] = useState("");

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ["N/A"]}/>
            case "About":
                return <JobAbout 
                    info={data[0].job_description ?? "No Data Provided"}
                />
            case "Responsibilities":
                return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}/>
            default:
                break;
        }
    }

    async function handleFavourite(){
        try {
            const username = await AsyncStorage.getItem("username");
            setUsername(username);
            const storedFavs = await AsyncStorage.getItem(username + "favourites");
            console.log(storedFavs);
            setFavourites((storedFavs === null || storedFavs === undefined || storedFavs.length === 0) ? [] : JSON.parse(storedFavs));
            console.log("Here is what the data looks like: ", data);
            setIsLoadingFavs(false);
        } catch (error) {
            console.log(error);
            Alert.alert(error);
        }
    }

    useEffect(() => {
        if (!isLoading){
           handleFavourite(); 
        }
    }, [isLoading]);

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
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => {
                                console.log(favourites);
                                AsyncStorage.setItem(username + "favourites", JSON.stringify(favourites));
                                router.back();
                            }}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ''
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    {error ? (
                        <Text>Something went wrong</Text>
                    ) : data.length === 0 ? (
                        <Text>No data</Text>
                    ) : (
                        <View style={{ flex:1, flexDirection: "column", padding: SIZES.medium, paddingBottom: 100}}>
                            <Company 
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />
                            <JobTabs 
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>
                <JobFooter favourites={favourites} setFavourites={setFavourites} jobData={data[0]} url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
            </>
        </SafeAreaView>
    )
}

export default JobDetails