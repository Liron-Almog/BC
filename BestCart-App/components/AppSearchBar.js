import React, { useState } from 'react';
import {TextInput, View, StyleSheet, Button, Text, TouchableOpacity} from 'react-native';
import { SearchBar } from '@rneui/themed';

import Colors from '../config/Colors';
import AppButton from "./AppButton";

function AppSearchBar(props) {
  const [search, setSearch] = useState('');

  function handleSearchChange(searchTerm) {
    setSearch(searchTerm);
  }

  function submitSearch(){
    props.onSearch(search);
  }

  return (
    <View style={styles.container}>
        <SearchBar
        platform='ios'
        searchIcon = {true}
        placeholder= "Search for items..."
        onChangeText={handleSearchChange}
        value={search}
        />
        <TouchableOpacity style={[styles.button]} onPress={submitSearch}>
            <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 10,
        // display: "flex",
        // flexDirection: "row",
   },
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 85,
        padding: 10,
        backgroundColor: Colors.primary,
        margin: 5

    },
    text:{
        color: 'white',
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },


});

export default AppSearchBar;
