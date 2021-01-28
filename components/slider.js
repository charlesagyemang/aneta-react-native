import React, {useState} from 'react';
import Carousel, {Pagination}  from 'react-native-snap-carousel';
import { StyleSheet, Button, View, Text, TouchableOpacity, ImageBackground } from 'react-native';


const slider = () => {
  /*
  Track A Pickup -> Thank you for Choosing Aneta
  Another Page -> You have 30% for every pickup
  Another Page -> We love to make your work easier
  Another -> Let’s keep our city and homes free trash
  */
  const [currentSliderPosition, setCurrentSliderPosition] = useState(0)
  const [items, setItems] = useState([
    { name: 'Thank you for choosing Aneta', code: '#2c3e50', url: 'New Request', uri: 'https://img.apmcdn.org/205d8706dc865111c47f00e68ab1e51b69535e6d/portrait/6d101a-20190605-trash-carts-st-paul.jpg' },
    { name: 'You get 30% off every pickup', code: '#8e44ad', url: 'All Requests', uri: 'https://whyy.org/wp-content/uploads/2020/07/2020-7-16-k-paynter-trash-collection-delay-6.jpg' },
    { name: 'We love to make your work easier', code: '#f1c40f', url: 'New Request', uri: 'https://cityofsugarhill.com/wp-content/uploads/2019/08/waste-pickup-trash-removal.jpg' },
    { name: 'Let’s keep our city and homes free from trash', code: '#e67e22', url: 'Settings', uri: 'https://www.thespruce.com/thmb/7gYM5HstPSxbz5SUiAZbH8F5Yo0=/2119x1414/filters:fill(auto,1)/Mansweepingrestaurant-GettyImages-841234272-efe99f4465384a6c808f22c2e431b2c6.jpg' },
  ]);
  let carousel = ""

  const _renderItem = ({item, index}) => {
      return (
          <View style={{flex: 1, backgroundColor: 'black'}}>
            <ImageBackground imageStyle = {{opacity:0.5}} source={{uri: item.uri}} style={styles.image}>
                <Text style={styles.title}>{ item.name }</Text>
            </ImageBackground>
          </View>
      );
  }

  const pagination =  () => {
       return (
           <Pagination
             dotsLength={items.length}
             activeDotIndex={currentSliderPosition}
             containerStyle={{ backgroundColor: 'transparent', height: '20%' }}
             dotStyle={{
                 width: 10,
                 height: 10,
                 borderRadius: 5,
                 marginHorizontal: 8,
                 backgroundColor: '#172B4D'
             }}
             inactiveDotOpacity={0.4}
             inactiveDotScale={0.6}
           />
       );
   }


  return(
    <View style={{ flex: 1.3, alignItems: 'center' }}>
    <Carousel
          ref={(c) => { carousel = c; }}
          data={items}
          renderItem={_renderItem}
          sliderWidth={450}
          itemWidth={400}
          layout={'default'}
          onSnapToItem={(position) => setCurrentSliderPosition(position)}
        />
        {pagination()}
    </View>
  )
}

export default slider


const styles = StyleSheet.create({
  carouselContainer: {
    height:"20%",
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
