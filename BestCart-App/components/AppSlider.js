import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const AppSlider = ({sliderValue, setSliderValue}) => {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/*Text to show slider value*/}
        <Text style={{alignSelf: 'center'}}>{sliderValue} %</Text>

        {/*Slider with max, min, step and initial value*/}
        <Slider
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          step={1}
          value={sliderValue}
          onValueChange={(sliderValue) => setSliderValue(sliderValue)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: 300
  },
});

export default AppSlider;