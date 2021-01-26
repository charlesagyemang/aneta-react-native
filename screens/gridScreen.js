import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import  Button  from "../components/Button";


export default function Example({navigation}) {
  const [items, setItems] = React.useState([
    { name: 'All Requests', code: '#8e44ad', url: 'All Requests', uri: 'https://whyy.org/wp-content/uploads/2020/07/2020-7-16-k-paynter-trash-collection-delay-6.jpg' },
    { name: 'Create A New Request', code: '#2c3e50', url: 'New Request', uri: 'https://img.apmcdn.org/205d8706dc865111c47f00e68ab1e51b69535e6d/portrait/6d101a-20190605-trash-carts-st-paul.jpg' },
    { name: 'Track A Pickup', code: '#f1c40f', url: 'New Request', uri: 'https://cityofsugarhill.com/wp-content/uploads/2019/08/waste-pickup-trash-removal.jpg' },
    { name: 'Settings', code: '#e67e22', url: 'Settings', uri: 'https://img.apmcdn.org/205d8706dc865111c47f00e68ab1e51b69535e6d/portrait/6d101a-20190605-trash-carts-st-paul.jpg' },
  ]);

  return (
    <View style={{ flex: 1, marginTop: "60%"}}>
      <FlatGrid itemDimension={130} data={items} style={styles.gridView} spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: item.code }]}
            key={item.name}
            onPress={() => navigation.navigate(item.url, { name: item.url })}>
            <ImageBackground
            source={{ uri: item.uri }}
            style={{
              height: 150,
              width: 190,
              opacity: 0.3,
              position: 'absolute',
            }}
          />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
