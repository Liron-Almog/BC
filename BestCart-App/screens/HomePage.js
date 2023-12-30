import React, {useContext, useEffect, useState} from "react";
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppTitleText from "../components/AppTitleText";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import * as PropTypes from "prop-types";
import {GlobalContext} from "../components/GlobalState";
import Colors from "../config/Colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ContactUs from "../components/modals/ContactUs";
import LocationModal from "../components/modals/LocationModal";
import FeedBack from "../components/modals/feedback";
import LogOutBtn from "../components/LogOutBtn";

function AppTitleTextText(props) {
    return null;
}

AppTitleTextText.propTypes = {
    style: PropTypes.shape({fontSize: PropTypes.number}),
    children: PropTypes.node
};

function HomePage({navigation,route}) {

    return (
        <Screen>
            <View style={styles.container }>
                <View style={{ width: '100%'}}>
                    <LogOutBtn />
                </View>

                <AppTitleText style={{fontSize: 60}}>Cheaper</AppTitleText>
                <AppText style={{paddingLeft:30, paddingRight:30, textAlign:"center"}}>Save money with Cheaper- the ultimate shopping app for creating the cheapest cart!</AppText>

                <Image source={require("../assets/no-text.jpeg")} style={styles.image}/>

                <AppButton title={"Start shopping!"}
                           onPress={()=>{navigation.navigate("CreateList")}}/>

                <View style={{ width: '100%', flexDirection:"row", }}>
                    <ContactUs/>
                    <FeedBack/>
                </View>

            </View>
        </Screen>

    );
}

export default HomePage;
const styles = StyleSheet.create({

    container: {
        flex:1,
        alignItems:"center",
        backgroundColor: Colors.white,
    },
    image:{
        width: 200,
        height: 200,
        margin: 45,
    },

});
