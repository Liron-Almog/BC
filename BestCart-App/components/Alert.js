import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Colors from "../config/Colors";
import AppTitleText from "./AppTitleText";


function AppAlert({title, style}) {
    return (
       <View style={[styles.container, style]}>
           <AppTitleText style={{color: Colors.dangerTxt,}}>{title}</AppTitleText>
       </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.dangerBg,
        width: "80%",
        height: "20%",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 150,
        alignItems: 'center',
        padding: 5,

    },
    text:{

    },

});

export default AppAlert;