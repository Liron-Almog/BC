import React from "react";
import {StyleSheet, Text,} from 'react-native';
import Colors from "../../config/Colors";


function ErrorMessage({error}) {


    return (
        <Text style={styles.error}>{error}</Text>
    );
}

const styles = StyleSheet.create({

    error: {
        color: Colors.danger,
    }

});


export default ErrorMessage;