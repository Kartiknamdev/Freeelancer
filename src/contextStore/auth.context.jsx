import { createContext, useContext, useMemo, useReducer } from "react";
import axios from "axios";

// Context store
const AuthContext = createContext();

// Initial state
const initialState = { authUser: null,token:null, authError: null };

// Reducer function
const reducerFun = (state, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return { ...state, authUser: action.payload };
    case "REGISTER_FAILURE":
      return { ...state, authError: action.payload };
    case "LOGIN_SUCCESS":
      return { ...state, authUser: action.payload };
    case "LOGIN_FAILURE":
      return { ...state, authError: action.payload };
    case "UPDATE_SUCCESS":
      return { ...state, authUser: { ...state.authUser, ...action.payload } };
    case "UPDATE_FAILURE":
      return { ...state, authError: action.payload };
    default:
      return state;
  }
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFun, initialState);

  // Register user
  const registerUser = async (fullName, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        { fullName, email, password }
      );
      if (response) {
        dispatch({ type: "REGISTER_SUCCESS", payload: response.data.data });
      }
    } catch (error) {
      console.error("Registration error:", error);
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error.response?.data || error.message,
      });
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { email, password }
      );
      console.log("response: ", response);
      if (response) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.data });
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data || error.message,
      });
    }
  };
  // Update user details
  const updateDetails = async (formData) => {
    try {
      console.log("accesstoken:  ",state.authUser.accessToken ); // ✅ Log the FormData object
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/update_details",
        formData, // ✅ Wrap in `formData` to match backend
        {
          headers: {
            Authorization: `Bearer ${state.authUser?.accessToken}`, // ✅ Ensure token is present
            "Content-Type": "multipart/form-data", // ✅ Required for JSON data
          },
        }
      );
      console.log("response: ", response);
      if (response.status === 200) {
        dispatch({ type: "UPDATE_SUCCESS", payload: response.data.data });
      }
    } catch (error) {
      console.error(
        "Update details error:",
        error.response?.data || error.message
      );

      dispatch({
        type: "UPDATE_FAILURE",
        payload: error.response?.data || error.message,
      });
    }
  };

  const contextItems = useMemo(
    () => ({
      user: state.authUser,
      error: state.authError,
      registerUser,
      loginUser,
      updateDetails, // Add updateDetails to the context
    }),
    [state.authUser, state.authError, registerUser, loginUser, updateDetails]
  );

  return (
    <AuthContext.Provider value={contextItems}>{children}</AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
