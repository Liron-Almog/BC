import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from './AppText';
import Colors from '../config/Colors';

function ListItem({chainName, title, subTitle, image, onPress, renderRightActions}) {
    return (
        //need to pass renderRightActions function from ShoppingListsPage- didnt work
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight 
           // underlayColor={'#f8f4f4'}
            onPress={onPress}>
                <View style = {styles.container}>
                    <Image style = {styles.image} source={image}/>
                    <View>
                        <AppText style ={styles.title}>{title}</AppText>
                        <AppText style ={styles.subTitle}>{chainName}</AppText>
                        <AppText style ={styles.subTitle}>{subTitle}</AppText>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    subTitle:{
        color: Colors.medium,
        fontSize: 16,
    }
})
export default ListItem;