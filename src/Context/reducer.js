import AsyncStorage from "@react-native-async-storage/async-storage";

let getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user == null ? "" : JSON.parse(user);
  } catch (e) {
    console.log(error);
  }
};

let getZikrCount = async () => {
  try {
    const user = await AsyncStorage.getItem("zikrCount");
    return user == null ? "" : JSON.parse(user);
  } catch (e) {
    console.log(error);
  }
};

let getConnectedDevices = async () => {
  try {
    const user = await AsyncStorage.getItem("connectedDevices");
    // return user == null ? "" : JSON.parse(user);
    if (user) return JSON.parse(user)
  } catch (e) {
    console.log(error);
  }
};


export const initialState = {
  getUser: "" ||  getUser(),
  user : null ||  getUser(),
  getZikrCount : 0 ||  getZikrCount(),
  getConnectedDevices :  getConnectedDevices() || [],
  loading: false,
  errorMessage: null,
};

export const AppReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };

    case "LOGIN_SUCCESS":
      console.log("thi.s is login success in reducer", action.payload.user)
      return {
        ...initialState,
        user: action.payload.user,
        loading: false,
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    case "REQUEST_LOGOUT":
      return {
        ...initialState,
        loading: true,
      };

    case "LOGOUT_SUCCESS":
      return {
        ...initialState,
        loading: false,
        token: "",
      };

    case "LOGOUT_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    case "INIT_START":
      return {
        ...initialState,
        loading: true,
      };

    case "INIT_FINISH":
      return {
        ...initialState,
        loading: false,
      };

    case "UPDATE_COUNT":
      return {
        ...initialState,
        count : action.payload.count,
      };
    case "UPDATE_CONNECTED_DEVICE":
      return {
        ...initialState,
        connectedDevice : action.payload.device
      }
    case "UPDATE_ADDRESS":
      return {
        ...initialState,
        address : action.payload.address
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
