import React, { useState } from "react";
import { ScrollView, Text, View, Alert, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Buttons from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@env";
const Signup = () => {
  const navigation = useNavigation();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirm_password, setConfirmPassword] = useState("");
 
  const handleSubmit = async () => {
    try {
      const resp = await axios.post(`${BASE_URL}/auth/signup`, {
        firstname,
        lastname,
        username,
        email,
        phone,
        password,
        confirm_password,
      });
      console.log(resp.data);
        Alert.alert("Success", resp.data.message, [
          {
            text: "OK",
          },
        ]);
      if (resp.status === 200) {
        
        setTimeout(() => {
          navigation.navigate('Verify')
        })
      }
    } catch (error) {
      console.log(error.response.data.message);
      Alert.alert("Error", error.response.data.message, [
        {
          text: "OK",
        }
      ]);
    }
  };
  return (
    <ScrollView className="pt-3">
      <View className="flex-1 justify-center px-2">
        <View>
          <View className="flex-row w-full justify-between mb-3">
            <TextInput
              className="w-[45%]"
              label="First Name"
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
            />
            <TextInput
              className="w-[45%]"
              label="Last Name"
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
          </View>
          <TextInput
            className="mb-5"
            label="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            className="mb-5"
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            className="mb-5"
            label="Phone Number"
            value={phone}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            className="mb-5"
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            className="mb-5"
            label="Confirm Password"
            secureTextEntry
            value={confirm_password}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <Buttons cl="bg-indigo-900 py-2 mb-5" onPress={handleSubmit}>
          <Text className="text-white text-center">Register</Text>
        </Buttons>
        <Buttons
          cl="bg-pink-900 py-2"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-white text-center">Login</Text>
        </Buttons>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  title: {
    color: "red"
  }
})

export default Signup;
