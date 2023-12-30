import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import AppSearchBar from '../components/AppSearchBar';
import Screen from '../components/Screen';
import Card from '../components/Card';
import AppText from "../components/AppText";
import {ErrorMessage} from "../components/forms";
import {GlobalContext} from "../components/GlobalState";
const API = require('../Api');

function PromosPage({route,  navigation }) {
    const {listItems, setListItems} = useContext(GlobalContext);
    const { chain_id, store_id} = route.params;

    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(()=>{const getPromos = async (product) => {
        const params = new URLSearchParams();
        params.append('chain_id',chain_id);
        params.append('store_id', store_id);
        console.log(`/user?${params.toString()}`);
        try {
            setIsLoading(true);
            const response = await fetch(`${API.BASE_URL}/promos?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                setMessage("Please select a store to view promotions.");
                return;
            }
            setMessage("");
            const data = await response.json();
            setList([]);
            data.forEach((item) => {
                const newObject = {
                     item_code: item.item_code,
                     title: item.description,
                     promotion_id: item.promotion_id,
                     start_date: item.start_date,
                     end_date: item.end_date,
                     image: require("../assets/image-not-available.jpg"),

                };

                console.log(newObject);
                setList((prev) => [...prev, newObject]);

            });
        } catch (error) {
            setMessage("Something went wrong...")
        }finally {
            setIsLoading(false); // set loading state to false to hide loading indicator
        }
    };
        getPromos();
        }, []);


    return (
        <Screen style={styles.container}>

            <View style={styles.pageLayout}>
                <View style={{ flexGrow: 1 }}>
                    <ActivityIndicator animating={isLoading} size= "large"/>
                    {message && <ErrorMessage error={message}/>}
                    <FlatList
                        numColumns={2}
                        data={list}
                        keyExtractor={(listItem) => listItem.item_code}
                        renderItem={({ item }) => (
                            <Card item={item} onPress={() => navigation.navigate('ProductDetailsPage', {item, setListItems})} />
                        )}
                    />
                </View>
            </View>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageLayout: {
        backgroundColor: '#f8f4f4',
        padding: 20,
        paddingTop: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default PromosPage;
