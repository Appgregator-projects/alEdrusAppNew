import AsyncStorage from "@react-native-async-storage/async-storage";

export async function StoreDataString(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e.message, "error in storing data string");
  }
}

export async function StoreDataObject(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e.message, "error in storing data string");
  }
}

export async function GetDataString(storageKey) {
  try {
    const value = await AsyncStorage.getItem(storageKey);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e.message, "error in getdataString");
  }
}

export async function GetDataObject(storageKey) {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e.message, "error in getDataObject");
  }
}

export async function RemoveValue(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e.message, "error in getDataObject");
  }

  console.log("Done.");
}
