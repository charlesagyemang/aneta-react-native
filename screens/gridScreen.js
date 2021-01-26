import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import  Button  from "../components/Button";


export default function Example({navigation}) {
  const [items, setItems] = React.useState([
    { name: 'All Requests', code: '#8e44ad', url: 'All Requests' },
    { name: 'Create A New Request', code: '#2c3e50', url: 'New Request' },
    { name: 'Track A Pickup', code: '#f1c40f', url: 'New Request' },
    { name: 'Settings', code: '#e67e22', url: 'Settings' },
  ]);

  return (
      <FlatGrid itemDimension={130} data={items} style={styles.gridView} spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: item.code }]}
            key={item.name}
            onPress={() => navigation.navigate(item.url, { name: item.url })}>
            <ImageBackground
            source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg' }}
            style={{
              height: 150,
              width: 190,
              opacity: 0.6,
              position: 'absolute',
            }}
          />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </TouchableOpacity>
        )}
      />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
