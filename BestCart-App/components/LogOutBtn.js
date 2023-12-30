import React, {useContext} from 'react';
import {StyleSheet,} from 'react-native';

import AppButton from "./AppButton";
import {GlobalContext} from "./GlobalState";

function LogOutBtn() {
    const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
    return (
        <AppButton title={"Logout"}
                   disabled={!isLoggedIn}
                   onPress={()=>setIsLoggedIn(false)}
                   style={styles.btn}
        />
    );
}

const styles = StyleSheet.create({
    btn:{
        width:80,
        padding: 0,
        alignSelf: "left",
        marginBottom: 38,
    }
})


export default LogOutBtn;