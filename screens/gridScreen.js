import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import  Button  from "../components/Button";
import Slider from '../components/slider';
import {useSelector, useDispatch} from 'react-redux';





export default function Example({navigation}) {
  const reqStat = useSelector(state => state.individualStat)
  const dispatch =  useDispatch()
  const [token, setToken] = useState('');
  const todReq = reqStat.todaysRequest.length
  const twReq = reqStat.thisWeeksRequest.length
  const tmReq = reqStat.thisMonthsRequest.length || 0
  const allTime = reqStat.requests.length || 0
  const mostRecent = reqStat.requests[0] ? reqStat.requests[0].id : 'NAN'
  const completed = reqStat.requests.filter(x => x.requestStatus === "PICKUP_COMPLETE").length;
  const created = reqStat.requests.filter(x => x.requestStatus === "CREATED").length;


  const items = [
    {
      name: 'Create a New Request',
      code: '#2c3e50',
      url: 'New Request',
      uri: 'https://img.apmcdn.org/205d8706dc865111c47f00e68ab1e51b69535e6d/portrait/6d101a-20190605-trash-carts-st-paul.jpg',
      message: `Today: ${todReq}\nThis Week: ${twReq}\nAll Time: ${allTime}\n`,
    },
    {
      name: 'Track a Pickup Request',
      code: '#8e44ad',
      url: 'All Requests',
      uri: 'https://whyy.org/wp-content/uploads/2020/07/2020-7-16-k-paynter-trash-collection-delay-6.jpg',
      message: `Created: ${created}\nCompleted: ${completed}\n\n`,
    },

    {
      name: 'All My Requests',
      code: '#f1c40f',
      url: 'All Requests',
      uri: 'https://cityofsugarhill.com/wp-content/uploads/2019/08/waste-pickup-trash-removal.jpg',
      message:`Last Order: ${mostRecent}\n\n\n`,
    },
    {
      name: 'My Locations',
      code: '#e67e22',
      url: 'Locations',
      uri: 'https://www.thespruce.com/thmb/7gYM5HstPSxbz5SUiAZbH8F5Yo0=/2119x1414/filters:fill(auto,1)/Mansweepingrestaurant-GettyImages-841234272-efe99f4465384a6c808f22c2e431b2c6.jpg',
      message: "Checkout Your Locations\n\n\n",
    },
  ];

  return (
    <View style={{ flex: 1}}>
      <Slider />
      <View style={{ flex: 1}}>
            <FlatGrid itemDimension={130} data={items} style={styles.gridView} spacing={10}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.itemContainer, { backgroundColor: item.code }]}
                  key={item.name}
                  onPress={() => navigation.navigate(item.url, { name: item.url })}>
                  <Text style={styles.itemName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
        </View>

    </View>
  );
}

//<Text style={styles.itemCode}>{item.message}</Text>


const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 117,
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
  carouselContainer: {
    height:"30%",
	},
	carousel: {
    flex:1
	},
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: "20%",
    marginLeft: "25%",
    marginRight: "20%",
    color: 'white'

  },

  image: {
   flex: 1,
   resizeMode: "cover",
   justifyContent: "center"
 },
 text: {
   color: "white",
   fontSize: 42,
   fontWeight: "bold",
   textAlign: "center",
   backgroundColor: "#000000a0"
 }
});
