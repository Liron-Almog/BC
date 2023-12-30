import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import DropDownPicker from 'react-native-dropdown-picker'
import {useState} from "react";

function AppDropDown({items, setSelection}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState();

    let array = []
    if(items !== undefined) {
        items.forEach(item =>{
            array.push({label:item.label,value:item.value})})
    }

    return (
        <View style={styles.container}>
            {array.length !== 0 &&  <DropDownPicker

                open={isOpen}
                setOpen={()=> setIsOpen(!isOpen)}
                items={array}
                value = {currentValue}
                setValue={(val)=> {setCurrentValue(val),
                                    setSelection(val)}}
                defaultIndex={0}
                containerStyle={{height: 40}}
                maxHeight={200}

            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    paragraph: {
        //margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default  AppDropDown;
