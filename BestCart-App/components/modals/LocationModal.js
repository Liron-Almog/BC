import React , {useEffect, useState} from "react";
import { View, Text, StyleSheet, Alert, Modal, TouchableOpacity,Button, TouchableWithoutFeedback} from "react-native";
import * as Location from "expo-location";

import AppButton from "../AppButton";
import AppTitleText from '../AppTitleText';
import AppTextInput from "../AppTextInput";
import Colors from "../../config/Colors";
import AppSlider from "../AppSlider";

const LocationModal = ({ showModal, onCloseModal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState();



  return (
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
                 <AppTitleText>Choose the supermarket's distance from you:</AppTitleText>
                 <AppSlider/>
                 <AppButton title={'Exit'} onPress={() => {console.log(location); setModalVisible(!modalVisible)}}/>
             </View>
         </View>
      </Modal>

      <AppButton title={'choose location'} onPress={() => setModalVisible(true)}/>


    </View>
  )
};

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
      height: 300,
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

export default LocationModal;
