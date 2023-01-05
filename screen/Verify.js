import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Buttons from '../components/Button'
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";
const Verify = () => {
    const [state, setState] = useState('')
    const navigation = useNavigation();

    const handleSubmit = async (event) => { 
try {
    const resp = await axios.post(`${BASE_URL}/api/verify`, {
      state,
    });
    console.log(resp.data)

      Alert.alert("Success", resp.data.message, [
        {
          text: "OK",
        },
      ]);
        setTimeout(() => {
          navigation.navigate("Login");
        });
} catch (error) {
    console.log(error)
        Alert.alert("Error", error.response.data.message, [
          {
            text: "OK",
          },
        ]);
}
    }
    return (
      <View className="justify-center flex-1 px-2">
        <View>
          <TextInput
            placeholder="Enter your verification code"
                    activeUnderlineColor="orange"
                    onChangeText={(text)=> setState(text)}
          />
          <Buttons cl="bg-indigo-700 py-2 my-2" onPress={handleSubmit}>
            <Text className="text-center text-white text-2xl">Submit</Text>
          </Buttons>
        </View>
      </View>
    );
}

export default Verify