import React, {useContext, useEffect, useState} from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    ScrollView, ActivityIndicator
} from 'react-native';
import * as Yup from 'yup';

import Screen from "../components/Screen";
import Icon from "../components/Icon";
import {ErrorMessage, AppForm, AppFormField, SubmitButton} from "../components/forms";
import Colors from "../config/Colors";
//import {useProductsDataApi} from "../Api";
import AppText from "../components/AppText";
import AppLogo from "../components/AppLogo";
import {GlobalContext} from "../components/GlobalState";
import {useIsFocused} from "@react-navigation/native";
const API = require('../Api');

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).label("Password"),
})

function LoginPage({navigation,route}) {

    const [message, setMessage] = useState('');
    const [ isLoading, setIsLoading] = useState(false);
    const [name,setName] = useState('')
    const { setEmail ,setIsLoggedIn,isLoggedIn} = useContext(GlobalContext);
    const isFocused = useIsFocused();


    useEffect(()=>{
        if(isLoggedIn)
            navigation.navigate("LoginConfirmation", { userName:`${name}` });


    },[isFocused])
    const handleSubmit = async (values) => {
        setMessage('')
        const params = new URLSearchParams();
        params.append('email', values.email);
        params.append('password', values.password);
        console.log(`/user?${params.toString()}`);
        try {
            setIsLoading(true);
            const response = await fetch(`${API.BASE_URL}/user?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                setMessage('Invalid email or password. Please try again.')
                return
            }
            const data = await response.json();
            setEmail(values.email);
            setIsLoggedIn(true)
            setName(data[0].first_name)
            navigation.navigate("LoginConfirmation", { userName: data[0].first_name });
        } catch (error) {
            setMessage('Something went wrong...')
        } finally {
            setIsLoading(false); // set loading state to false to hide loading indicator
        }
    };


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTap='handled'>
            <Screen>
               <AppLogo/>
                <View style={{
                    width: "80%",
                    alignSelf: "center"
                }}>
                    <AppForm initialValues={{email: '', password: ''}}
                             onSubmit={handleSubmit}
                             validationSchema={validationSchema}>

                        {message && <ErrorMessage error={message}/>}
                        <View style={{marginBottom: 40, marginTop:40}}>
                            <AppFormField
                                name="email"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                icon="email"
                                placeholder="Email"
                                textContentType="emailAddress"
                            />
                        </View>
                        <View style={{marginBottom: 40}}>
                            <AppFormField name="password"
                                          touched={false}
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          keyboardType="password"
                                          icon="lock"
                                          placeholder="Password"
                                          secureTextEntry
                                          textContentType="password"
                            />
                            <Pressable style={styles.forgotPassword} onPress={() => console.log("forgot")}>
                                <TouchableOpacity>
                                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                </TouchableOpacity>
                            </Pressable>
                        </View>
                        <SubmitButton title="Login" />
                        <ActivityIndicator animating={isLoading} size= "small"/>
                    </AppForm>

                    <View style={styles.iconsContainer}>
                        <Text style={styles.signUp}>Or Sign Up using</Text>
                        <Pressable style={styles.forgotPassword} >
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={styles.forgotPasswordText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </View>

                </View>
            </Screen>
        </ScrollView>

    );
}

const styles = StyleSheet.create({

    forgotPassword: {
        flexDirection: "row-reverse",
    },
    forgotPasswordText: {
        color: "gray",
    },
    iconsContainer: {
        alignItems: "center",

    },
    signUp: {
        color: "gray",
        //padding: 10
    },
    mediaIcons: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
        padding: 10
    },
    invalidLogin:{
        alignSelf: 'center',
        color: Colors.danger,
        margin: 20,
    }
})

export default LoginPage;


