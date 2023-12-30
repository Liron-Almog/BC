import React, {useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';

import AppSlider from "../AppSlider";
import {useMyCustomizeAPI} from "../../Api";

const FeedBack = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [sliderValue, setSliderValue] = useState(85);
    const [data, isLoading, isError, fetch] = useMyCustomizeAPI('post');

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Let us know what you think!</Text>
                        <AppSlider sliderValue={sliderValue} setSliderValue={setSliderValue}/>

                        <Pressable
                            style={[styles.button1, styles.buttonClose]}
                            onPress={() => {setModalVisible(!modalVisible)
                                fetch('feedback',{sliderValue:sliderValue})}}>
                            <Text style={styles.textStyle }>Send</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>FB</Text>
            </Pressable>
        </View>
    );
};

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
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        position:"relative",
        right: 40,
        bottom:10


    },
    button1: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#2196F3',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
});

export default FeedBack;