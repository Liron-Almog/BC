import React, {useContext, useEffect, useState} from "react";
import {View, FlatList, StyleSheet, Button, TouchableOpacity, Image} from "react-native";

import ListItem from "../components/ListItem";
import Card from "../components/Card";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import AppText from "../components/AppText";
import Colors from "../config/Colors";
import {GlobalContext} from "../components/GlobalState";


function ListPage({ navigation, route}){

    const {listItems, setListItems} = useContext(GlobalContext);
    const [total,setTotal] = useState(0)
    const DefaultHandleDelete = (item) => {
        // Find the index of the first occurrence of the item
        const index = list.findIndex((l) => l === item);

        // Create a new array without the item
        const newLists = [...list];
        if (index !== -1) {
            newLists.splice(index, 1);
        }

        // Update the state with the new array
        setList(newLists);
        setListItems(newLists);
    };
    const {listName,handleDelete =undefined, image} = route.params;

    const [list, setList] = useState(listItems);

    useEffect(()=>{

        let temp = 0;

        for(let element of list)
            temp += parseFloat(element.price.slice(1))

        setTotal(temp)
    },[list])
    return(
        <View style = {styles.pageLayout}>
            <View style={{width: '100%'}}>
                <ListItem
                    chainName={list.chain_name}
                    title = {listName}
                    subTitle =  {"Items: "+list.length + "  Total price: ₪"+total}
                    image ={image}/>
            </View>
            <View style = {{flexGrow: 1}}>
                {/* for listItem in list */}
                <FlatList
                    numColumns={2}
                    data={list}
                    keyExtractor = {listItem => listItem.title}
                    renderItem={({ item }) => (

                        <View style={{ flexDirection: "column", width:"50%" }}>
                            <TouchableOpacity style = {styles.card} onPress={() => navigation.navigate("ProductDetailsPage", item, setListItems)}>
                                <Image style = {styles.image} source = {item.image} />
                                <View style = {styles.detailsContainer}>
                                    <AppText style = {styles.title}>{item.title}</AppText>
                                    <AppText >{item.price}</AppText>
                                    <AppText style={{fontSize:1}}>{item.item_code}</AppText>
                                    <AppText style={{fontSize:1}}>{item.list_name}</AppText>
                                    <Button title="Delete" onPress={() => {
                                        if(handleDelete !== undefined)
                                             handleDelete(item)
                                        DefaultHandleDelete(item)}} color={Colors.danger} />
                                </View>
                            </TouchableOpacity>
                        </View>


                    )}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    pageLayout:{
        backgroundColor: '#f8f4f4',
        padding: 20,
        flexDirection: 'row',
        flexWrap:'wrap',
        paddingBottom:200, //for scrollimg list to the end
    },
    card: {
        borderRadius: 15,
        backgroundColor: 'white',
        marginBottom: 20,
        overflow: 'hidden',
        // width: '90%',
        margin: 8,
        hidden:{}

    },
    image: {
        width: '100%',
        height: 150,
    },
    detailsContainer:{
        padding: 10,

    },
    title:{
        marginBottom: 7,
        fontWeight: 'bold',
    }

})
export default ListPage;


