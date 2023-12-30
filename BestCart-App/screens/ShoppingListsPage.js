import React, {useContext, useEffect, useState} from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    ScrollView,
    FlatList, Alert, ActivityIndicator,
} from 'react-native';

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AppAlert from "../components/Alert"
import Colors from "../config/Colors";
import {GlobalContext} from "../components/GlobalState";
import {useMyCustomizeAPI} from "../Api";
import { useIsFocused } from '@react-navigation/native';

const cartImage = require("../assets/image3.jpeg");

function ShoppingListsPage({navigation}){

    const [data, isLoading, isError, fetchData] = useMyCustomizeAPI('get');
    const [dataItems, isLoadingItems, isErrorItems, fetchDataItems] = useMyCustomizeAPI('get');
    const [dataDelete, isLoadingDelete, isErrorDelete, fetchDelete] = useMyCustomizeAPI('delete');

    const [items, setItems] = useState([])
    const [lists, setLists] = useState([]);
    const { isLoggedIn, email } = useContext(GlobalContext);
    const isFocused = useIsFocused();

    useEffect(()=>{

        const temp = async () => {
            if (isLoggedIn) {
                const params = new URLSearchParams();
                params.append('email', `${email}`);
                await fetchData(`Carts?${params.toString()}`)
            }
        }
        temp();
        }, [isFocused])

    useEffect(()=>{
        setLists(data)
        //setLists(data)
    },[data])

    const handleDelete = async (list)=>{

        const index = lists.findIndex((l) => l === list);

        // Create a new array without the item
        const newLists = [...lists];
        if (index !== -1) {
            newLists.splice(index, 1);
        }
        setLists(newLists);
        console.log(list)
        const params = new URLSearchParams();
        params.append('email', `${email}`);
        params.append('listName', `${list.cart_name}`);
        await fetchDelete(`Carts/deleteCart?${params.toString()}`)

    }
    const deleteItem =async (item) =>{
        const params = new URLSearchParams();
        params.append('email', `${email}`);
        params.append('listName', `${item.list_name}`);
        params.append('itemCode', `${item.item_code}`);

        await fetchDelete(`Carts/deleteItem?${params.toString()}`)
        const params2 = new URLSearchParams();
        params2.append('email', `${item.email}`);
        params2.append('listName', `${item.list_name}`);
        await fetchDataItems(`Carts/items?${params2.toString()}`)

    }
    const handleGetItems =async (title)=>{
        const params = new URLSearchParams();
        params.append('email', `${email}`);
        params.append('title', `${title}`);
        await fetchDataItems(`Carts/items?${params.toString()}`)

    }
    useEffect(()=>{
        console.log(dataItems);

        if(dataItems.length !== 0){
            navigation.navigate("ListPage", {listItems: dataItems, setListItems:setItems , listName: dataItems[0].list_name,handleDelete: deleteItem, image:cartImage });
            }
    },[dataItems])
    return(
       
            <Screen>

                {!isLoggedIn && <AppAlert title={"You must login in order to view tour lists."}/>}
                {isLoggedIn &&
                <View style = {{flexGrow: 1}}>
                    {/* for listItem in list */}
                    <FlatList
                        data={lists}
                        keyExtractor={(list, index) => index.toString()}
                        renderItem = {({item}) => 
                        <ListItem
                            //listItem = {item} 
                            chainName = {item.chain_name}
                            title = {item.cart_name}
                            id = {item.cart_name}
                            subTitle = {item.list_size +' Items'}
                            image = {cartImage}
                            onPress={() =>{handleGetItems(item.cart_name)} }
                            renderRightActions ={()=> 
                            <ListItemDeleteAction
                            onPress={()=>handleDelete(item)}/>} 
                        />}
                        ItemSeparatorComponent={()=> <ListItemSeparator/> } 
                    
                    />
                </View>}
                 <ActivityIndicator animating={isLoading || isLoadingItems ||isLoadingDelete} size= "large"/>
            </Screen>
    )

}

const styles = StyleSheet.create({

    title:{
        color: Colors.white,
    },
    newList:{
        fontSize: 15,
        color: Colors.white,
    }

  
}
)
export default ShoppingListsPage;