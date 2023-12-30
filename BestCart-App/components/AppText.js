import React from "react";
import { StyleSheet, Text,Platform } from 'react-native';


function AppText({children, style}) {
    return (
        <Text style={[styles.textStyle, style]}>{children}</Text>
    );
}


export default AppText;
const styles = StyleSheet.create({

    textStyle: {

        color: "black",
        ...Platform.select({
            ios: {
                fontSize: 13,
                fontFamily: "Avenir",
            },
            android: {
                fontSize: 18,
                fontFamily: "Roboto",
            }
        })
    }
});
