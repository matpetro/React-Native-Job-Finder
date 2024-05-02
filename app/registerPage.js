import { View, ScrollView, Text, SafeAreaView, TouchableOpacity, TextInput, Alert} from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import {Avatar} from 'react-native-paper';
import {COLORS, icons, images, SIZES, FONT} from '../constants';
import Feather from 'react-native-vector-icons/Feather';
import Error from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function Register(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [profession, setProfession] = useState("");
    const [validProfession, setValidProfession] = useState(false);
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [image, setImage] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC");
    const [userName, setUsername] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    

    const selectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
      
          //console.log(result);
      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
            //console.log(result.assets[0].uri);
          }
    };

    const handleName = (text) => {
        setName(text);
        setValidName(text.length > 1);
    }

    const handleProfession = (text) => {
        setProfession(text);
        setValidProfession(text.length > 1);
    }

    const handleEmail = (text) => {
        setEmail(text);
        setValidEmail(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(text));
    }

    const handleUsername = (text) => {
        setUsername(text);
        setValidUserName(text.length > 1);
    }

    const handlePassword = (text) => {
        setPassword(text);
        setValidPassword(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(text));
    }

    const submitForm = () => {
        const userData = {
            name:name,
            profession: profession,
            email:email,
            username:userName,
            password:password,
            image:image
        };
        if (validEmail && validName && validPassword && validUserName && validProfession){
            axios.post("http://localhost:8002/register", userData)
            .then(res => {
                console.log(res.data);
                if (res.data.status == "ok"){
                    Alert.alert("Registered Successfully");
                    router.push(`/`)
                } else {
                    Alert.alert(res.data.msg);
                }
            })
            .catch(e => {
                console.log(e);
                Alert.alert("An Error Occurred, Please Try Again");
            })
        } else {
            Alert.alert("Fill Out Mandatory Fields");
        }

        
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
                    headerTitleAlign: "center"
                }}
            />
            <View
                style={{flex:1, padding: SIZES.large}}
            >
                <View style={{flex: 0.2, justifyContent:"center", alignItems:"center", marginTop: SIZES.small, marginBottom:SIZES.large}}>
                    <TouchableOpacity onPress={() => selectPhoto()}>
                        <Avatar.Image
                            size={"14vh"}
                            style={{
                                borderRadius: 80,
                                marginTop: 50,
                                backgroundColor: 'white',
                                height: "14vh",
                                width: "14vh",
                                padding: 8,
                                borderColor: '#ccc',
                                borderWidth: 1,
                                elevation: 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            source={{
                                uri:
                                image==""|| image==null
                                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
                                    : image,
                            }}
                        />
                        <Text style={{textAlign: "center", marginBottom: 30, fontFamily: FONT.regular}}>Add Image</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: SIZES.large,
                    height: 50
                }}>
                    <Text style={{textAlign:"left", fontSize:SIZES.large}}>Name:</Text>
                    <View style={{borderWidth: 1, borderRadius: 4, marginTop: SIZES.xSmall, flexDirection: "row", padding: "2px"}}>
                        <TextInput
                            style={{fontFamily: FONT.regular,
                                width: "100%",
                                height: "100%",
                                paddingHorizontal: SIZES.small}}
                            value={name}
                            onChangeText={handleName}
                        />
                        {validName ? (
                            <Feather name="check-circle" color="green" size="100%" />
                        ) : (
                            <Error name="error" color="red" size="100%" />
                        )}
                    </View>
                    
                </View>
                <View style={{
                    marginTop: SIZES.large,
                    height: 50
                }}>
                    <Text style={{textAlign:"left", fontSize:SIZES.large}}>Profession:</Text>
                    <View style={{borderWidth: 1, borderRadius: 4, marginTop: SIZES.xSmall, flexDirection: "row", padding: "2px"}}>
                        <TextInput
                            style={{fontFamily: FONT.regular,
                                width: "100%",
                                height: "100%",
                                paddingHorizontal: SIZES.small}}
                            value={profession}
                            onChangeText={handleProfession}
                        />
                        {validProfession ? (
                            <Feather name="check-circle" color="green" size="100%" />
                        ) : (
                            <Error name="error" color="red" size="100%" />
                        )}
                    </View>
                    
                </View>
                <View style={{
                    marginTop: SIZES.large,
                    height: 50
                }}>
                    <Text style={{textAlign:"left", fontSize:SIZES.large}}>Email:</Text>
                    <View style={{borderWidth: 1, borderRadius: 4, marginTop: SIZES.xSmall, flexDirection: "row", padding: "2px"}}>
                        <TextInput
                            style={{fontFamily: FONT.regular,
                                width: "100%",
                                height: "100%",
                                paddingHorizontal: SIZES.small}}
                            value={email}
                            onChangeText={handleEmail}
                            
                        />
                        {validEmail ? (
                            <Feather name="check-circle" color="green" size="100%" />
                        ) : (
                            <Error name="error" color="red" size="100%" />
                        )}
                    </View>
                    
                </View>
                <View style={{
                    marginTop: SIZES.large,
                    height: 50
                }}>
                    <Text style={{textAlign:"left", fontSize:SIZES.large}}>Username:</Text>
                    <View style={{borderWidth: 1, borderRadius: 4, marginTop: SIZES.xSmall,  flexDirection: "row", padding: "2px"}}>
                        <TextInput
                            style={{fontFamily: FONT.regular,
                                width: "100%",
                                height: "100%",
                                paddingHorizontal: SIZES.small}}
                            value={userName}
                            onChangeText={handleUsername}
                        />
                        {validUserName ? (
                            <Feather name="check-circle" color="green" size="100%" />
                        ) : (
                            <Error name="error" color="red" size="100%" />
                        )}
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
                            value={password}
                            onChangeText={handlePassword}
                        />
                        {validPassword ? (
                            <Feather name="check-circle" color="green" size="100%" />
                        ) : (
                            <Error name="error" color="red" size="100%" />
                        )}
                    </View>
                </View>
                <View style={{flex: 0.2, justifyContent:"center", alignItems:"center", marginTop: SIZES.small}}>
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
                        onPress={submitForm}
                    
                    >
                        <Text style={{fontFamily: FONT.regular, fontSize: SIZES.medium}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register;