import React from 'react'
import { View } from 'react-native';
import { Text } from 'react-native';
import Buttons from './Button';
import { useNavigation } from "@react-navigation/native";
const ActionBtns = ({ navigate }) => {
    const navigation = useNavigation()
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row justify-between w-7/12">
        <Buttons
          cl="bg-indigo-900 px-4 py-2"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-white text-2xl">Login</Text>
        </Buttons>
        <Buttons
          cl="border-indigo-900 border px-4 py-2"
          onPress={() => navigation.navigate("Signup")}
        >
          <Text className="text-indigo-900 text-2xl">Register</Text>
        </Buttons>
      </View>
    </View>
  );
}

export default ActionBtns