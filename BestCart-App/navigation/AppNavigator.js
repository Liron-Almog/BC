import React, {useState} from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import CreateListPage from "../screens/CreateListPage";
import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";
import ShoppingListsPage from "../screens/ShoppingListsPage";
import AuthNavigator from './AuthNavigator';
import MyListsNavigator from './MyListsNavigator';
import CreateListNavigator from './CreateListNavigator';
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator(); 

const AppNavigator = () => {

    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home"
                        component={HomeNavigator}
                        options={{tabBarIcon: ({size, color}) => (
                            <MaterialCommunityIcons name="home" size={size} color={color}/>)}}

            />
            <Tab.Screen name="Sign in"
                        component={AuthNavigator}
                        options={{tabBarIcon: ({size, color}) => (
                                <MaterialCommunityIcons name="account" size={size} color={color}/>)}}/>


            <Tab.Screen name="Create list"
                        component={CreateListNavigator}
                        options={{tabBarIcon: ({size, color}) => (
                                <MaterialCommunityIcons name="cart" size={size} color={color}/>)}}/>
            <Tab.Screen name="My lists"
                        component={MyListsNavigator}
                        options={{tabBarIcon: ({size, color}) => (
                                <MaterialCommunityIcons name="format-list-bulleted" size={size} color={color}/>)}}/>

        </Tab.Navigator>
    )
}
export default AppNavigator;