import React, {useState, useEffect} from "react";
import axios from 'axios'
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View
} from "react-native";
import { Block, Text } from "galio-framework";
import { AsyncStorage } from 'react-native';
import  Button  from "../components/Button";
import Images from "../constants/Images";
import argonTheme from "../constants/Theme";
import theme2 from '../src/theme';

import { HeaderHeight } from "../constants/utils";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
import AppBar from '../components/appBar';


const Profile = ({navigation}) => {
    const [profile, setProfile] = useState({phoneNumber: "", other: { name: "Loading....", zone: "please Wait...", location: "....", }})
    const [reqStat, setReqStat] = useState({todaysRequest: [], thisWeeksRequest: [], thisMonthsRequest: [], requests: [{id: "none"}]})
    useEffect(() => {
      AsyncStorage.getItem('USER-DETAILS', (err, data) => {
        const info = JSON.parse(data);
        setProfile(info);

        const url = `https://kelin-weebhook.herokuapp.com/api/user/mobile/${info.id}`
        axios.get(url)
        .then((resp) => {
          setReqStat(resp.data);
        })
        .catch((e) => {
          console.log(e.message);
        })

      });
    }, [])

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
      <AppBar name="My Profilerrr" bg={theme2.COLOR_THEMES.ONE.PRIMARY}/>
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
                      style={{ backgroundColor: theme2.COLOR_THEMES.ONE.PRIMARY }}
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
                      <Text size={12} color={argonTheme.COLORS.TEXT}>{reqStat.requests.length} </Text>
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
                      <Text size={12} color={argonTheme.COLORS.TEXT}>{reqStat.todaysRequest.length}  </Text>
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
                      <Text size={12} color={argonTheme.COLORS.TEXT}>  {reqStat.thisMonthsRequest.length}  </Text>
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
    padding: theme2.SIZES.BASE,
    marginHorizontal: theme2.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme2.COLORS.WHITE,
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
