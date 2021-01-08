import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { AsyncStorage } from 'react-native';
import  Button  from "../components/Button";
import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
import AppBar from '../components/appBar';


const Profile = ({navigation}) => {
    const [profile, setProfile] = useState({phoneNumber: "", other: { name: "Loading....", zone: "please Wait...", location: "....", }})
    useEffect(() => {
      AsyncStorage.getItem('USER-DETAILS', (err, data) => {
        const info = JSON.parse(data);
        setProfile(info);
      })
    }, [profile])

    const handleSignOut = () => {
      console.log("sign Me out");
        AsyncStorage.removeItem('USER-DETAILS', (err, data) => {
        console.log("Done");
        navigation.navigate('Home', {name: 'Home'});
        setProfile({phoneNumber: "", other: { name: "Loading....", zone: "please Wait...", location: "....", }})
      })
    }

    return (
      <View style={{flex: 1}}>
      <AppBar name="My Profile" />
      <View style={{paddingTop: 10}}></View>
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.AnetaLogo }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      onPress={() => navigation.navigate('New Request', {name: 'New Request'})}
                      small
                      style={{ backgroundColor: argonTheme.COLORS.INFO }}
                    >
                      New Req
                    </Button>
                    <Button
                      onPress={() => navigation.navigate('All Requests', {name: 'All Requests'})}
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                    >
                      All Req
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        All Req
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>12 </Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        Today
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>3  </Text>
                    </Block>
                    <Block middle>
                      <Text
                        bold
                        color="#525F7F"
                        size={18}
                        style={{ marginBottom: 4 }}
                      >
                        This Month
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>  3  </Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                    {profile.other.name}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    {profile.other.zone}, {profile.other.location}, {profile.phoneNumber}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      Aneta technologies is equiped to aid you with your trash by picking it up for you when you simoply request. Call us on 0277119919 for more info
                    </Text>
                    <Button
                      onPress={handleSignOut}
                      small
                      style={{ backgroundColor: "red" }}
                    >
                      Sign Out
                    </Button>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    </View>
    );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },

  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
