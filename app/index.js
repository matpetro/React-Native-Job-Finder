import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert} from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import {COLORS, SIZES, FONT} from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

function LogIn(){
    const router = useRouter();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogIn = () => {
        const userData = {
            username: userName,
            password
        }

        // check if user exists in db
        axios.post("http://localhost:8002/login-user", userData)
        .then(res => {
            console.log(res.data)
            // if so then log in
            if (res.data.status == "login successful"){
                // use async storage so we can access the token from different parts of the app
                AsyncStorage.setItem("token", res.data.token);
                router.push(`/homePage`);
                setUsername("");
                setPassword("");
            } else {
                Alert.alert("Credentials Wrong, Please Try Again");
            }
        }).catch(Alert.alert("Credentials Wrong, Please Try Again"))

        
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
            {/*This component controls the header that can be seen at the top of the app*/}
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerTitleStyle: {fontSize: SIZES.xLarge},
                    headerShadowVisible: true,
                    headerTitle: "Career Compass",
                    headerTitleAlign: "center",
                    headerLeft: ()=> null
                }}
            />
            <View
                style={{flex:1, padding: SIZES.large}}
            >
                <View style={{
                    marginTop: SIZES.large,
                    height: 50
                }}>
                    <Text style={{textAlign:"left", fontSize:SIZES.large}}>Username:</Text>
                    <View style={{borderWidth: 1, borderRadius: 4, marginTop: SIZES.xSmall, padding: "2px"}}>
                        <TextInput
                            style={{fontFamily: FONT.regular,
                                width: "100%",
                                height: "100%",
                                paddingHorizontal: SIZES.small}}
                            value={userName}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    
                </View>
                <View style={{
                    marginTop: SIZES.medium,
                    marginBottom: SIZES.large,
                    height: 50
                }}>
                    <Text style={{textAlign:"left", fontSize:SIZES.large}}>Password:</Text>
                    <View style={{borderWidth: 1, borderRadius: 4, marginTop: SIZES.xSmall, flexDirection: "row", padding: "2px"}}>
                        <TextInput
                            style={{fontFamily: FONT.regular,
                                width: "100%",
                                height: "100%",
                                paddingHorizontal: SIZES.small
                            }}
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        {showPassword ? (
                            <Feather name="eye-off" size="100%" onPress={() => setShowPassword(false)}/>
                        ) : (
                            <Feather name="eye" size="100%" onPress={() => setShowPassword(true)}/>
                        )}
                    </View>
                </View>
                <View style={{flex: 0.2, justifyContent:"center", alignItems:"center", marginTop: SIZES.xSmall}}>
                    <TouchableOpacity style={{
                            width: "40%",
                            height: "6vh",
                            backgroundColor: COLORS.white,
                            borderRadius: SIZES.medium,
                            borderWidth: 0.2,
                            borderColor: COLORS.gray,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: SIZES.small
                        }}
                        onPress={handleLogIn}
                    
                    >
                        <Text style={{fontFamily: FONT.regular, fontSize: SIZES.medium}}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={{fontFamily: FONT.regular}}>Don't have an Account? <Text onPress={()=> {router.push(`/registerPage`)}} style = {{ color: COLORS.tertiary }}>Register one here</Text></Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LogIn;