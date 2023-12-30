import React, {useContext, useEffect, useState} from 'react';
import { View, Image, StyleSheet, Text} from "react-native";
import {useIsFocused, useRoute} from '@react-navigation/native';
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import AppTitleText from "../components/AppTitleText";
import AppLogo from "../components/AppLogo";
import AppText from "../components/AppText";
import Colors from "../config/Colors";
import {GlobalContext} from "../components/GlobalState";

function LoginConfirmationPage({navigation}) {
    const route = useRoute();
    const { userName = 'User' } = route.params;
    const isFocused = useIsFocused();
    const { setEmail ,setIsLoggedIn,isLoggedIn} = useContext(GlobalContext);

    useEffect(()=>{
        if(!isLoggedIn)
            navigation.navigate("Login");
    },[isFocused])

    return(
        <Screen>
            <View style ={styles.pageLayout}>
               <AppLogo style={{marginBottom: 40, marginTop: 100}}/>
                <View style= {{ alignItems: "center"}}>
                    <AppTitleText><Text style={{fontSize:40, fontWeight:"bold",}}> Hello {userName} </Text></AppTitleText>
                    <AppText>Thank you for joining us!</AppText>


                </View>
                {/*<AppButton title={'Sign out'} onPress={() => navigation.navigate('Login')}/>*/}
            </View>
        
        </Screen>
        
    )

}

const styles = StyleSheet.create({

    pageLayout: {
        display: 'flex',
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
       // justifyContent:"center",

        //gap: 100,   **only works for react native version >0.71

    },

    
})

export default LoginConfirmationPage;