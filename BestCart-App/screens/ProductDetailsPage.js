import React from "react";
import { StyleSheet, Image , View} from "react-native";
//import type { FlexAlignType } from "react-native";

import AppText from "../components/AppText";
import AppTitleText from "../components/AppTitleText";

import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import Colors from "../config/Colors";
import AddItemToList from "../components/AddItemToList";


function ProductDetailsPage({route, unitOfMeasure= '0 kg', navigation}){
    const {item, setListItems} = route.params;

    return(
        <Screen>
            <View style={styles.productInfo}>
                <View style={{margin: 40, alignItems: 'center'}}>
                    <Image source={item.image} style={{width: 200, height: 200, marginBottom:20}}/>
                    <AppTitleText>{item.title}</AppTitleText>
                    <AppText>{item.price}</AppText>
                    <AppText>{item.unitOfMeasure}</AppText>
                </View>
                    <View  style={{alignSelf:'flex-start', paddingLeft: 15}}>
                        <AppTitleText>Details</AppTitleText>
                    </View>
                    <ListItemSeparator/>
                    <AppText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </AppText>
                    
                    {/* add item to list with qnty */}
                    <AddItemToList item={item} setListItems={setListItems}/>
            
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    productInfo:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 20
    },
})

export default ProductDetailsPage;