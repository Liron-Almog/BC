import React, {useContext, useState} from "react";
import {View, StyleSheet, ActivityIndicator, Image,} from "react-native";

import AppText from "../components/AppText";
import ChooseSupermarketModal from "../components/modals/ChooseSupermarketModal";
import Screen from "../components/Screen";
import ShoppingListsNameModal from "../components/modals/ShoppingListNameModal";
import AppButton from "../components/AppButton";
import ListPage from "./ListPage";
import SquareButton from "../components/SquareButton";
import Colors from "../config/Colors";
import {GlobalContext} from "../components/GlobalState";
import {useMyCustomizeAPI} from "../Api";
import {Cart} from "../components/Cart";

function CreateListPage({navigation}){

    const [listName, setListName] = useState("");
    const [selectedStore, setSelectedStore] = useState("");
    const {listItems, setListItems} = useContext(GlobalContext);
    const [selectedSupermarket, setSelectedSupermarket] = useState({});
    const { isLoggedIn ,email} = useContext(GlobalContext);
    const [data, isLoading, isError, fetchData] = useMyCustomizeAPI('post');
    const handleSubmit = async () => {

        let params = {listItems:listItems,email:email,selectedStore:selectedStore,
                        selectedSupermarket:selectedSupermarket,listName:listName};
        await fetchData('Carts',params)
        listItems.map((item) => {
            console.log(item);
        });
    };
    return(
    <Screen>

        <View style={styles.container}>

            <View>
                <Image source={require("../assets/no-text.jpeg")} style={styles.image}/>
            </View>


            <View style={styles.btnRow}>
                <ShoppingListsNameModal setListName={setListName}/>
                <ChooseSupermarketModal setSelectedStore={setSelectedStore} selectedSupermarket={selectedSupermarket} setSelectedSupermarket={setSelectedSupermarket}/>
            </View>

            <View style={styles.btnRow}>
                <SquareButton
                    title={"Add items to list"}
                    onPress={() => navigation.navigate("AddItemsToLists", {setListItems: setListItems, chain_id: selectedSupermarket.chain_id, store_id:selectedStore})}
                    style={{backgroundColor: '#006200'}}
                    iconName={"shopping-search"}/>
                <SquareButton
                    title={"Products on sale"}
                    onPress={() => navigation.navigate("PromosPage", {chain_id: selectedSupermarket.chain_id, store_id:selectedStore})}
                    style={{backgroundColor: "#BDA69E"}}
                    iconName={"percent-outline"}/>
            </View>

            <AppButton
                title={"view cart"}
                onPress={() => navigation.navigate("ListPage", {listName})}
                style={{borderRadius: 5, width: "70%", backgroundColor: "#E44E1C"}}/>

                <AppButton
                    disabled={!isLoggedIn}
                    title={"Done!"}
                    onPress={handleSubmit}
                    style={{borderRadius: 5, width: "70%", backgroundColor: "#E44E1C"}}/>
            {!isLoggedIn && <AppText style={{alignSelf: "center"}}>You need to register for adding your shopping list</AppText>}
            <ActivityIndicator animating={isLoading} size= "large"/>
            {isError && <AppText style={{alignSelf: "center"}}>Something went wrong...</AppText>}
            {(data && !isError) && <AppText style={{alignSelf: "center"}}>Your cart was saved successfully</AppText>}

        </View>


    </Screen>
    )
}

const styles = StyleSheet.create({
    container:{
        //marginTop: 40,
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.white,


    },
    btnRow:{
        flexDirection: "row",
        width: '90%',
        alignItems:"center",
        alignSelf:"center",

        position: "relative",
        left: 30


    },
    image:{
        width: 120,
        height: 120,
        margin: 20
    }
})

export default CreateListPage;
