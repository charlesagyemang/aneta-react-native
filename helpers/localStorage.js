import { AsyncStorage } from 'react-native';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true
  } catch (error) {
    return false
  }
}

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return { status: true, value }
    } else {
      return {status: false}
    }
  } catch (error) {
    return { status: false }
  }
}
