import React, { useState } from 'react'
import { Text, View, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import ActionBtns from '../components/ActionBtns'
import Buttons from '../components/Button'
import CheckAuth from '../components/CheckAuth'
import axios from 'axios'
import { BASE_URL } from "@env";
const Settings = () => {
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async () => {
    try {
 
      const resp = await axios.put(`${BASE_URL}/api/changepass`, {password,newPassword, confirmPassword});
        if (resp.status === 200) {
          Alert.alert("Success", "Password updated", [
            {
              text: "OK",
            },
          ]);
        }

      setPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.log(error)
       Alert.alert("Error!", "Something Happened!", [
         {
           text: "OK",
         },
       ]);
    }
  }
  return (
    <CheckAuth>
      <View className=" flex-1 justify-center">
        <Text className="font-bold text-center text-3xl uppercase mb-10">
       Update Password
        </Text>

        <View className="w-[90%] mx-auto">
          <TextInput
            placeholder="Current Password"
            className="mb-2"
         value = {password}   
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="New Password"
            className="mb-2"
           value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            placeholder="Confirm New Password"
            className="mb-2"
           value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <Buttons cl="bg-orange-500" onPress={handleSubmit}>
            <Text className="text-white text-center font-semibold uppercase text-xl py-2">
              submit
            </Text>
          </Buttons>
        </View>
      </View>
    </CheckAuth>
  );
}

export default Settings