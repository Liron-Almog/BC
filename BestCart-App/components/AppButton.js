import React from "react";
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Colors from "../config/Colors";


function AppButton({title, onPress, style,disabled = false}) {
    return (
     <TouchableOpacity disabled={disabled} style={[styles.button, style]}   onPress={onPress} >
         <Button
             style={styles.text}
             title={title.toString()}
             disabled={disabled}
             color={Colors.white}
             onPress={onPress}
         />
     </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    button: {
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '75%',
        padding:10,
        backgroundColor: Colors.green,
        margin: 10

    },
    text:{
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },

});

export default AppButton;