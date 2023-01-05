import { useState } from "react";
import { View, Text,    Alert } from "react-native";
import { TextInput } from "react-native-paper";
import Buttons from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import { BASE_URL } from '@env'
import { useDispatch } from "react-redux";
import { setLogin, setIsLoading } from "../redux/authSlice";
const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  

  // console.log(BASE_URL)
  const handleLogin = async () => {
    try {
      const resp = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      
      Alert.alert("Success", resp.data.message, [
        {
          text: "OK",
        },
      ]);
      if (resp.status === 200) {
        dispatch(setLogin(true))
        dispatch(setIsLoading(true))
        setTimeout(() => {
          navigation.navigate("Home");
        },1000);
      }
    } catch (err) {
      console.log(err)
      Alert.alert("Error", err.response.data.message, [
        {
          text: "OK",
        }
      ]);
    }
    }
  
  return (
    <View className="flex-1 justify-center px-2">
      <View>
        <TextInput
          className="mb-5"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="mb-5"
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Buttons cl="bg-indigo-900 py-2 mb-5" onPress={handleLogin}>
        <Text className="text-white text-center">Login</Text>
      </Buttons>
      <Buttons cl="bg-pink-900 py-2" onPress={()=> navigation.navigate('Signup')}>
        <Text className="text-white text-center">Register</Text>
      </Buttons>


    </View>
  );
};

export default Login;
