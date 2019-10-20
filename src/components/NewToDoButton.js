import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const NewToDoButton = ({ onPress, color }) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text style={{fontSize: 55, color: color || "#000000"}}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NewToDoButton;