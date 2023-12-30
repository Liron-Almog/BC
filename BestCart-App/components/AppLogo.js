import React from "react";
import {Image, StyleSheet, View} from "react-native";

function AppLogo({style}){

    return(
        <View>
            <Image source={require('../assets/logo-two.jpeg')} style={[styles.logo, style]}/>
        </View>

    )

}
export default AppLogo;

const styles = StyleSheet.create({

    logo: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginTop: 60,
        // marginBottom: 20,
    },
})