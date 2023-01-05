import {useState, useEffect} from 'react'
import { Text, View, ActivityIndicator, Alert } from 'react-native'
import CheckAuth from "../components/CheckAuth";
import { TextInput,  } from 'react-native-paper'
import Buttons from '../components/Button'
import axios from 'axios'

import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "@env";
import { useSelector } from 'react-redux';
import ActionBtns from '../components/ActionBtns';
const Profile = () => {
const navigation = useNavigation()
const { user: data } = useSelector((state) => state.userSlice);
const { isLoading, login} = useSelector((state) => state.authSlice);

 const [firstname, setFirstname] = useState("");
 const [lastname, setLastname] = useState("");
 const [username, setUsername] = useState("");
 const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  

  if (!login) {
    return <ActionBtns/>
  }
  
  if (isLoading) {
    

    return( 
    <View className="flex-1 justify-center items-center">
       <ActivityIndicator size="large" color="#4d3a7b" />  
    </View>
     );
    }

  const handleSubmit = async() => {
    try {
      const resp = await axios.put(`${BASE_URL}/api/user`, {
        firstname,
        lastname,
        username,
        email,
        phone,
      });

      if (resp.status === 200) {
        
        Alert.alert("Success", "Profile updated", [
          {
            text: "OK",
          },
        ]);
      }
    } catch (err) {
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
          Profile
        </Text>

        <View className="w-[90%] mx-auto">
          <TextInput
            placeholder="Firstname"
            className="mb-2"
            defaultValue={data?.user?.firstname}
            onChangeText={(text) => setFirstname(text)}
          />
          <TextInput
            placeholder="Lastname"
            className="mb-2"
            
            defaultValue={data?.user?.lastname}
            onChangeText={(text) => setLastname(text)}
          />
          <TextInput
            placeholder="Username"
            className="mb-2"
            defaultValue={data?.user?.username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Email"
            className="mb-2"
            defaultValue={data?.user?.email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Phone"
            className="mb-2"
            keyboardType='numeric'
            defaultValue={JSON.stringify(data?.user?.phone)}
            onChangeText={(text) => setPhone(text)}
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

export default Profile