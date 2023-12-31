import { SafeAreaView,StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants'
import Colors from "../config/Colors";

function Screen({children}) {
    return (

        <SafeAreaView style={styles.screen}>
            {children}
        </SafeAreaView>

    );
}

export default Screen;

const styles = StyleSheet.create({

    screen: {
       paddingTop: Constants.statusBarHeight,
        flex : 1,
        backgroundColor: Colors.white,
    }
});
