import React, {useContext, useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Modal,
    TouchableOpacity,
    Button,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";

import AppButton from "../AppButton";
import AppTitleText from '../AppTitleText';
import AppTextInput from "../AppTextInput";
import AppText from "../AppText";
import Colors from "../../config/Colors";
import SquareButton from "../SquareButton";
import {useMyCustomizeAPI} from "../../Api";
import {GlobalContext} from "../GlobalState";
import ErrorMessage from "../forms/ErrorMessage";

function ShoppingListsNameModal({setListName}){

    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { isLoggedIn, email } = useContext(GlobalContext);
    const [data, isLoading, isError, fetchData] = useMyCustomizeAPI('get');
    const handleSubmit = async ()=>{
        if(!isLoggedIn){
            setModalVisible(!modalVisible)
            setListName(inputValue);
        }
        else{
            const params = new URLSearchParams();
            params.append('email', `${email}`);
            params.append('listName', `${inputValue}`);
            console.log(email,inputValue)
            await fetchData(`listExist?${params.toString()}`)
            setListName(inputValue);
        }
    }
useEffect(()=>{
    console.log(data)
    if(data.message){
        console.log(data)

        setModalVisible(!modalVisible)
    }
},[data])
    return(
        <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={styles.modalHeaderCloseText}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <AppTitleText>New Shopping List:</AppTitleText>
                        <AppTextInput value={inputValue}
                                      onChangeText={text => setInputValue(text)}
                                      placeholder = 'Enter List Name'/>

                        {!isLoading && <AppButton title={'Create'} onPress={handleSubmit}/>}
                        {isLoading &&  <ActivityIndicator animating={isLoading} size= "large"/>}
                        {isError && <ErrorMessage style={{alignSelf: "center"}} error={"The name already exists. Try another name"}/>}
                    </View>
                </View>
        </Modal>
        
        {/* <TouchableWithoutFeedback>
            <Text onPress={() => setModalVisible(true)}>+ New Item</Text>
        </TouchableWithoutFeedback> */}
        <SquareButton title={'Add list name'}
                      onPress={() => setModalVisible(true)}
                      style={{backgroundColor: "#55433C"}}
                      iconName={"rename-box"}/>
        
   
        </View>
    )
}


const styles= StyleSheet.create({
    centeredView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 25,
       // alignItems: 'center',
        height: 250,
        justifyContent:'space-between',
        shadowColor: Colors.black,

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeaderCloseText: {
        textAlign: "center",
        padding: 5,
        paddingBottom: 10,
       
        alignSelf: 'flex-start'
    },
   
})
export default ShoppingListsNameModal;