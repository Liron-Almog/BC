import React, {useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";


import CreateListPage from '../screens/CreateListPage';

import {GlobalContext} from "../components/GlobalState";
import HomePage from "../screens/HomePage";
import CreateListNavigator from "./CreateListNavigator";

const Stack = createStackNavigator();

const HomeNavigator = ({route})=> {


    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomePage" component={HomePage}/>
            <Stack.Screen name="CreateList" component={CreateListNavigator}
                          options={{title: "Create new list"}}/>


        </Stack.Navigator>
    );
}
export default HomeNavigator;