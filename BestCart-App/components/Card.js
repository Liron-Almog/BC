import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import AddItemToList from "./AddItemToList";

function Card({item, onPress}) {
    return (
        <TouchableOpacity style = {styles.card} onPress={onPress}>
            <Image style = {styles.image} source = {item.image} />
            <View style = {styles.detailsContainer}>
                <AppText style = {styles.title}>{item.title}</AppText>
                <AppText>{item.price}</AppText>
            </View>
       </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: 'white',
        marginBottom: 20,
        overflow: 'hidden',
        width: '45%',
        margin: 8

    },
    image: {
        width: '100%',
        height: 130,
    },
    detailsContainer:{
        padding: 10,

    },
    title:{
        marginBottom: 7,
        fontWeight: 'bold',
    }

})
export default Card;