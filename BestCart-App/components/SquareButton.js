import React from "react";
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import Colors from "../config/Colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";


function SquareButton({title, onPress, style, iconName}) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <MaterialCommunityIcons name={iconName} size={30} color={Colors.white}/>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    button: {
        borderRadius: 5,
        justifyContent: 'center',
        // alignSelf: 'center',
         alignItems: 'center',
        width: 125,
        height: 125,
        padding:15,
        backgroundColor: Colors.primary,
        margin: 6

    },
    text:{
        color: 'white',
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign:"center",
        marginTop:5,
    },

});

export default SquareButton;