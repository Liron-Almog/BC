import React, {useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "../screens/LoginPage";
import SignUpPage from "../screens/SignUpPage";
import LoginConfirmationPage from "../screens/LoginConfirmationPage";
import {GlobalContext} from "../components/GlobalState";

const Stack = createStackNavigator();

const AuthNavigator = ({navigation,route})=> {

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login"
                          component={LoginPage}/>
            <Stack.Screen name="SignUp" component={SignUpPage}/>
         <Stack.Screen name="LoginConfirmation" component={LoginConfirmationPage}/>
        </Stack.Navigator>
    );
}
export default AuthNavigator;