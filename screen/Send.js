import React, { useState } from 'react'
import { View, Text,Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import {FontAwesome5} from '@expo/vector-icons'

import { useSelector } from "react-redux";
import { BASE_URL } from "@env";
import axios from 'axios'
const Send = () => {
   const { user: data } = useSelector((state) => state.userSlice);
    const [inputs, setInputs] = useState("");
    const [dollar, setDollar] = useState(0);
    const [btc, setBtc] = useState(0);
const [showConFrm, setShowConFrm] = useState(false)
    const [show, setShow] = useState(false);
    const [code, setCode] = useState(false);

    const handleChange = (text) => {
      setInputs(text);
    };

    const handleDollar = (text) => {
      setDollar();
      setBtc((text * data?.price).toFixed(4));
    };
    const handleBtc = (text) => {
      setDollar((text / data?.price).toFixed(4));
      setBtc(text);
    };

    const sendCoin = async () => {
        try {
            
            const resp = await axios.post(`${BASE_URL}/api/sendcoin`, {
              btc_amount: btc,
              outgoing_address: inputs,
              type: "send",
            });
      
            if (resp.status === 200) {
                   Alert.alert("Success", resp.data.message, [
              {
                text: "OK",
              },
                   ]);
                
                setShowConFrm(true)
            }
        } catch (err) {
            console.log(err.response.data)
        }
    };

    const confirmTransaction = async () => {
        try {
            
            const resp = await axios.post(
              `${BASE_URL}/auth/confirm_transaction`
            );
             if (resp.status === 200) {
               Alert.alert("Success", resp.data.message, [
                 {
                   text: "OK",
                 },
               ]);

               setShowConFrm(false);
             }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <View>
      <Text className="font-bold uppercase text-center text-orange-900 text-3xl mt-5">
        Send Btc
      </Text>
      <View className="bg-white p-4">
        <View className="w-full items-center mb-3">
          <TextInput
            onChangeText={(text) => setInputs(text)}
            value={inputs}
            className="w-[90%]"
            placeholder="Address"
          />
        </View>
        <View className="flex-row w-full items-center justi gap-2 mb-3">
          <Text className="text-3xl text-orange-900">$</Text>
          <TextInput
            onChangeText={(text) => handleDollar(text)}
            value={dollar}
            className="w-[90%]"
            placeholder="$"
          />
        </View>
        <View className="flex-row w-full items-center justi gap-2 mb-3">
          <FontAwesome5 name="btc" size={24} className="fill-orange-900" />
          <TextInput
            onChangeText={(text) => handleBtc(text)}
            value={btc}
            className="w-[90%]"
            placeholder="BTC"
          />
        </View>
        <Button className="bg-orange-900 text-white" onPress={sendCoin}>
          <Text className="text-white">Send</Text>
        </Button>
      </View>
      {showConFrm && (
        <View className="bg-white p-4 mt-5">
          <View className="w-full items-center mb-3">
            <TextInput
              onChangeText={(text) => setCode(text)}
              value={code}
              className="w-[90%]"
              placeholder="Confirmation Code"
            />
          </View>
          <Button
            className="bg-orange-900 text-white"
            onPress={confirmTransaction}
          >
            <Text className="text-white">confirm Transaction</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

export default Send