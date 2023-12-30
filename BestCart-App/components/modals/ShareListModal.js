import React , {useState} from "react";
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity,Button, TouchableWithoutFeedback} from "react-native";

import AppButton from "../AppButton";
import AppTitleText from '../AppTitleText';
import AppTextInput from "../AppTextInput";
import Colors from "../../config/Colors";

function ShareListModal(){
    const [modalVisible, setModalVisible] = useState(false);
   

    return(
        <View>
            <Modal
            animationType='fade'
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
                        <AppTitleText>we'll add this featcher later on</AppTitleText>
                        <AppButton title={'Exit'} onPress={() => setModalVisible(!modalVisible)}/>
                    </View>
                </View>
        </Modal>
        
        <AppButton title={'Share list'} onPress={() => setModalVisible(true)}/>
        
   
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
export default ShareListModal;