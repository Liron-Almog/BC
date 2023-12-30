import React, {useContext} from 'react';
import { createStackNavigator } from "@react-navigation/stack";


import CreateListPage from '../screens/CreateListPage';
import AddItemsToListsPage from '../screens/AddItemsToListPage';
import ProductDetailsPage from '../screens/ProductDetailsPage';
import AddItemToList from "../components/AddItemToList";
import {useNavigation} from "@react-navigation/native";
import AppButton from "../components/AppButton";
import PromosPage from "../screens/PromosPage";
import ListPage from "../screens/ListPage";
import {GlobalContext} from "../components/GlobalState";

const Stack = createStackNavigator();
// const Link = ()=>{
//     const navigation = useNavigation();
//
//     return(
//         <AppButton title ="click " onPress={()=> navigation.navigate("AddItemsToLists")}/>
//     )
// }
const CreateListNavigator = ({route})=> {


    return (
        <Stack.Navigator>
            <Stack.Screen name="CreateList" component={CreateListPage}
                          options={{title: "Create new list"}}/>
            <Stack.Screen name="AddItemsToLists" component={AddItemsToListsPage}
                          options={{title: "Add products to list"}}/>
            <Stack.Screen name="ProductDetailsPage" component={ProductDetailsPage}
                          options={{title: "Product details"}}/>
            {/*<Stack.Screen name= "AddItemToList" component={AddItemToList}/>*/}
            <Stack.Screen name="PromosPage" component={PromosPage} options={{title: "Promotions"}}/>
            <Stack.Screen name="ListPage" component={ListPage} options={{title: ""}}/>

        </Stack.Navigator>
    );
}
export default CreateListNavigator;