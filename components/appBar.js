import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

const MyComponent = (props) => (
 <Appbar style={styles.bottom}>
    {/* <Appbar.BackAction onPress={() => console.log("heheh")} /> */}
    <Text style={styles.content} >{props.name}</Text>
  </Appbar>
 );

export default MyComponent

const styles = StyleSheet.create({
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    backgroundColor: "red",

  },
  content: {
      margin: 20,
      marginTop: 40,
      padding: 10,
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      textAlign: "center",
      color: "white"
  }
});