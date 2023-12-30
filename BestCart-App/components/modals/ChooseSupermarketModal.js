import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import Checkbox from 'expo-checkbox';

import AppButton from '../AppButton';
import AppText from '../AppText';
import AppDropDown from "../AppDropDown";
import AppTitleText from "../AppTitleText";
import SquareButton from "../SquareButton";
import {useMyCustomizeAPI} from "../../Api";
import {ErrorMessage} from "../forms";
const API = require('../../Api');

function ChooseSupermarketModal({setSelectedStore, selectedSupermarket, setSelectedSupermarket}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [idAndNameStores, setIdAndNameStores] = useState([]);
    const [chainsNamesAndId, setChainsNamesAndId] = useState([]);
    const [data, isLoading, isError, fetchData] = useMyCustomizeAPI('get');
    const [dataStore, isStoresLoading, isStoresError, fetchDataStores] = useMyCustomizeAPI('get');
    useEffect(() => {
        const getChains = async () => {
            await fetchData('chains')
        }
        getChains();

        }, []);
    useEffect(()=>{ // when the data of chain name and chain id comes

            setChainsNamesAndId([]);
            if(data)
                handleSupermarketSelect(data[0]);
            if(data) {
                data.forEach((item) => {
                    const newObject = {
                        chain_name: item.chain_name.toString(),
                        chain_id: item.chain_id,

                    };
                    setChainsNamesAndId((prev) => [...prev, newObject]);
                });
                getSupermarkets(selectedSupermarket);
            }


    },[data])
    const getSupermarkets = async (supermarket) => {
        const params = new URLSearchParams();
        params.append('chain_id', supermarket.chain_id);
        await fetchDataStores(`supermarkets?${params.toString()}`)
    }
    useEffect(()=>{//when we choose a chain .get its stores
        if(dataStore) {
            setIdAndNameStores([]);
            let myStores = [];
            dataStore.forEach((item) => {
                let newObj = {
                    label: item.store_name,
                    value: item.store_id,
                }
                myStores.push(newObj);
            });
            setIdAndNameStores(myStores);
        }

    },[dataStore])
    const handleSupermarketSelect = async (supermarket) => {
        setSelectedSupermarket(supermarket);
        await getSupermarkets(supermarket);

    };

    const handleModalClose = () => {
        setModalVisible(false);
    };
    const handleModalOpen = () => {
        setModalVisible(true);
    };

    return (
        <View style={{ width: '100%' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View >
                            <TouchableOpacity onPress={handleModalClose}>
                                <Text style={styles.modalHeaderCloseText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <AppTitleText>Choose store to shop in:</AppTitleText>
                        <ActivityIndicator animating={isLoading || isStoresLoading} size= "large"/>
                        <View style={styles.options}>
                            {chainsNamesAndId.map((option) => (
                                <View
                                    key={option.chain_id}
                                    style={styles.supermarket}
                                     >
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={selectedSupermarket === option}
                                        onValueChange={() => handleSupermarketSelect(option)}
                                        color={selectedSupermarket ? '#0F9600' : undefined}
                                    />
                                    <AppText>{option.chain_name}</AppText>
                                </View>
                            ))}

                        </View>
                        <View style={{ margin: 20, zIndex: 100}}>
                            <AppDropDown items={idAndNameStores} setSelection={setSelectedStore}/>
                        </View>

                        <AppButton title={'Save'} onPress={handleModalClose} />

                        {isError || isStoresError && <ErrorMessage error={"Something went wrong..."}/>}
                    </View>
                </View>
            </Modal>
            <SquareButton title={'Choose store'}
                          onPress={handleModalOpen}
                          style={{backgroundColor: '#0F9600'}}
                          iconName={"store-marker-outline"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: "95%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeaderCloseText: {
        textAlign: 'center',
        paddingLeft: 5,
        paddingBottom: 10,
        alignSelf: 'flex-end',
    },
    checkbox: {
        margin: 8,
    },
    options: {
        alignSelf: 'flex-end',
       // zIndex: 100,
        width: '80%',
    },
    supermarket: {
        flexDirection: 'row-reverse',
        alignItems: "center",
    },
    selectedSupermarket: {

    },
});

export default ChooseSupermarketModal;