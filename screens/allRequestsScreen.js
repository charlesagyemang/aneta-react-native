import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import AppBar from '../components/appBar';
import Item from '../components/listItem';


const sports = [
    {
      label: 'Football',
      value: 'football',
      key: "1",
    },
    {
      label: 'Baseball',
      value: 'baseball',
      key: "2",
    },
    {
      label: 'Hockey',
      value: 'hockey',
      key: "3",
    },
    {
      label: 'Football',
      value: 'football',
      key: "4",
    },
    {
      label: 'Baseball',
      value: 'baseball',
      key: "5",
    },
    {
      label: 'Hockey',
      value: 'hockey',
      key: "6",
    },
    {
      label: 'Football',
      value: 'football',
      key: "7",
    },
    {
      label: 'Baseball',
      value: 'baseball',
      key: "8",
    },
    {
      label: 'Hockey',
      value: 'hockey',
      key: "9",
    },
  ];


export default () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
     const backgroundColor = item.key === selectedId ? "#6e3b6e" : "#f9c2ff";
     return (
       <Item
         item={item}
         onPress={() => setSelectedId(item.key)}
         style={{ backgroundColor }}
       />
     );
   };

    return(
        <View style={{flex: 1}}>
            <AppBar name="All Requests" />
            <View style={styles.container}>
                <Text>ALL REQUESTS PAGE</Text>
                <View style={styles.newStack}>
                  <Text>Hey</Text>
                </View>
                <SafeAreaView style={styles.safeAreaStyle}>
                    <FlatList
                      data={sports}
                      renderItem={renderItem}
                      keyExtractor={(item) => item.key}
                      extraData={selectedId}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    safeAreaStyle: {
      height: "80%"
    },
    newStack:{
      height: "10%"
    },
});
