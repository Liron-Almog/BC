import { StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants'
import Colors from '../config/Colors';

function ListItemSeparator() {
    return (
        <View style={styles.separatorLine}/>
    );
}

export default ListItemSeparator;

const styles = StyleSheet.create({

    separatorLine: {
        width:'100%',
        height:1,
        backgroundColor: Colors.light,
    }
});
