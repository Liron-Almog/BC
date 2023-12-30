import React, {useContext, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import AppButton from './AppButton';
import AppText from './AppText';
import Colors from '../config/Colors';
import {useNavigation} from "@react-navigation/native";
import {GlobalContext} from "./GlobalState";

const AddItemToList = ({  item }) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
    const {listItems, setListItems} = useContext(GlobalContext);
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // Add the item and its quantity to the shopping cart
      for (let i = 0; i < quantity; i++)
          setListItems((prev) => [...prev, item]);
    // console.log(`Added ${quantity} ${item.title}(s) to cart at a total cost of $${quantity * item.price}.`);
      //navigation.navigate("AddItemsToLists");

  };

  return (
    <View style={styles.addToCartSection}>
      <View style={styles.qnty}>
        <Button title="-" onPress={decrementQuantity} />
        <AppText style={{fontSize: 30}}>{quantity}</AppText>
        <Button title="+" onPress={incrementQuantity} />
      </View>
      <AppButton style={styles.btn} title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

export default AddItemToList;

const styles = StyleSheet.create({
    addToCartSection:{
       // borderWidth: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.light,
        borderRadius: 15,
        marginTop: 20,
    },
    qnty:{
        displey: 'flex',
        flexDirection: 'row',
        //borderWidth: 1,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 80
    },
    btn:{
        width: '50%',
    }

})