import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ShoppingListsPage from '../screens/ShoppingListsPage';
import ListPage from '../screens/ListPage';
import ProductDetailsPage from '../screens/ProductDetailsPage';

const Stack = createStackNavigator();

const MyListsNavigator = ({route})=>{
    return(
        <Stack.Navigator >
            <Stack.Screen name="ShoppingListsPage" component={ShoppingListsPage} options={{title: "Shopping Lists"}}/>
            <Stack.Screen name="ListPage" component={ListPage} options={{title: ""}}/>
            <Stack.Screen name="ProductDetailsPage" component={ProductDetailsPage}/>

        </Stack.Navigator>
    );
}
export default MyListsNavigator;