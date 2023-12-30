import React, {useState} from "react";
import {TextInput, StyleSheet, Text, View,Platform } from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons';

function AppTextInput({icon,...otherProps}) {

    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={'black'} style={styles.icon}/>}
            <TextInput style={styles.textInput} {...otherProps}/>
        </View>
    );
}


export default AppTextInput;
const styles = StyleSheet.create({

    container: {

        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#a0a0a0",
        width:'100%',
    },
    icon:{
        marginRight:10,

    },
    textInput: {
        textAlign:"left",
        fontSize: 18,
        width:"90%",
        fontFamily:Platform.OS === "android" ? "Roboto" : "Avenir",
    },
});
