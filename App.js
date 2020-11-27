import React from 'react';
import HomeScreen from './screens/homeScreen';
import CreateRequest from './screens/createRequest';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <CreateRequest />
      </View>
      
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});