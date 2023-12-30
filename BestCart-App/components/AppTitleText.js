import React from "react";
import { StyleSheet, Text,Platform } from 'react-native';

import AppText from "./AppText";
  function AppTitleText({children, style}) {
    return(
        <AppText>
          <Text style={[styles.textStyle, style]}>{children}</Text>
      </AppText>
    )
  }

  export default AppTitleText;
const styles = StyleSheet.create({

  textStyle: {
    fontSize: 20, color: 'black',
  }
});