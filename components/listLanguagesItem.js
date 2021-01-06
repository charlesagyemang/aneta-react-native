import React, {useState} from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';


const listItem = (props) => {
  return(
    <TouchableOpacity onPress={props.onPress} style={[styles.item, props.style]}>
      <Text style={styles.title}>{props.item.title}</Text>
    </TouchableOpacity>
  )
}

export default listItem


const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
