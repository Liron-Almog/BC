import React, { useState } from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import AppSearchBar from '../components/AppSearchBar';
import Screen from '../components/Screen';
import Card from '../components/Card';
import AppText from "../components/AppText";
import {ErrorMessage} from "../components/forms";
const API = require('../Api');

function AddItemsToListsPage({route,  navigation }) {
    const {setListItems, chain_id, store_id} = route.params;

    const [searchTerm, setSearchTerm] = useState('');
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const getProducts = async (product) => {
        const params = new URLSearchParams();
        params.append('product', product);
        params.append('chain_id', chain_id);
        params.append('store_id', store_id);

        try {
            setIsLoading(true);
            const response = await fetch(`${API.BASE_URL}/products?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                setMessage('No such product')
                console.log("heree")
                return;
            }

            const data = await response.json();
            setList([]);
            //processPaginatedData(data);
            data.forEach((item) => {
                const newObject = {
                    chain_id: item.chain_id,
                    item_code: item.item_code,
                    title: item.description,
                    price: `₪${item.item_price}`,
                    image: require('../assets/image-not-available.jpg'),
                    unit_of_measure: item.unit_of_measure,
                    is_discount: item.is_discount,
                    is_weighted: item.is_weighted,

                };
                setList((prev) => [...prev, newObject]);
            });
        } catch (error) {
            setMessage('Something went wrong...')
        }finally {
            setIsLoading(false); // set loading state to false to hide loading indicator
        }
    };

    function handleSearch(search) {
        setList([])
        setMessage('')
        setSearchTerm(search);
        if (search !== '') {
            getProducts(search);
        }
    }

    return (
        <Screen style={styles.container}>
            <AppSearchBar onSearch={handleSearch} />

            {searchTerm !== '' && (
                <View style={styles.pageLayout}>
                    <View style={{ flexGrow: 1 }}>
                        <ActivityIndicator animating={isLoading} size= "large"/>
                        {message && <ErrorMessage error={message}/>}
                        <FlatList
                            numColumns={2}
                            data={list}
                            keyExtractor={(listItem) => listItem.title}
                            renderItem={({ item }) => (
                                <Card item={item} onPress={() => navigation.navigate('ProductDetailsPage', {item, setListItems})} />
                            )}
                        />
                    </View>
                </View>
            )}
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

export default AddItemsToListsPage;
