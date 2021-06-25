import {StyleSheet} from 'react-native';

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 4,
      color: "blue",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 160,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });