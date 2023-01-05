import { View, Text, ActivityIndicator, Image, RefreshControl, Alert } from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

import TransactionBtns from "../components/TransactionBtns";
import Login from "./Login";
import { BottomNavigation, Dialog,Portal, Provider, Button, Modal } from "react-native-paper";
import { useState } from "react";
import { BASE_URL } from "@env";`${BASE_URL}/api/logout`
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setLogin } from "../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect } from "react";
import { getUser } from "../components/Layout";
import { setUser } from "../redux/userSlice";
const Home = ({ navigation }) => {
  const [visible, setVisible] = useState(false)
  // const navigation = useNavigation()
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const [state, setState] = useState(1)

  const { user:data } = useSelector((state) => state.userSlice)
  const { isLoading, login } = useSelector((state) => state.authSlice)
 
  const showDialog = () => {
   login === false || isLoading === true?   Alert.alert("Oops", 'You need to login', [
        {
          text: "OK",
        },
      ]):
    setVisible(true)
  }
  const hideDialog = () => setVisible(false)
  const getUser = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/auth/api/user`);
      if (resp) {
        dispatch(setUser(resp.data));
        dispatch(setIsLoading(false));
      }
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async () => {
    try {
      
     
      const resp = await axios.post(`${BASE_URL}/api/logout`)

      if (resp.status === 200) {
              setState((state) => {
     state: state+1
   })
        dispatch(setLogin(false))
        dispatch(setIsLoading(true))
        // navigation.navigate('Login')
      }
    } catch (error) {
      console.log(error.response)
    }



  }


  // useEffect(() => {
  //   const focusHandler = navigation.addListener("focus", () => {
  //     console.log('REFRESH')
  //     getUser()
  //   });
  //   return focusHandler;
  // }, [navigation,login]);



  // console.log(data, error)
  // const { price, r_balance, user } = data;
console.log(login, isLoading);

  return (
    <Provider key={state}>
      <View className="flex-1 py-10 px-5 ">
        <View className="bg-pink-200 w-full h-48 mx-auto rounded-2xl p-4 ">
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <AntDesign name="wallet" size={20} color="#4d3a7b" />
              <Text className="text-indigo-800 font-bold capitalize text-lg ml-4">
                wallet
              </Text>
            </View>
            <Feather name="bell" size={24} color="#4d3a7b" />
          </View>
          {login === false || isLoading === true ? (
            <Text>Please login to your account</Text>
          ) : (
            <Text className="text-indigo-900 font-semibold text-5xl mt-10">
              USD{" "}
              {isLoading ? (
                <ActivityIndicator size="large" color="#4d3a7b" />
              ) : (
                <>
                  {(
                    (data?.r_balance + data?.user?.balance) /
                    1000000000 /
                    data?.price
                  ).toFixed(3)}
                </>
              )}
            </Text>
          )}

          <View className="flex-row mt-3 items-center">
            <AntDesign name="arrowup" size={16} color="#4d3a7b" />
            <Text className="text-indigo-800">8.00% (+$780)</Text>
          </View>
        </View>

        <View className="flex-row justify-between  my-8">
          <TransactionBtns onPress={showDialog}>
            <AntDesign name="arrowdown" size={24} color="white" />
          </TransactionBtns>
          <TransactionBtns
            onPress={() => {
              login === false || isLoading === true
                ? Alert.alert("Oops", "please login to your account", [
                    {
                      text: "OK",
                    },
                  ])
                : navigation.navigate("Send");
            }}
          >
            <Feather name="arrow-up-right" size={24} color="white" />
          </TransactionBtns>
          <TransactionBtns>
            <FontAwesome name="exchange" size={24} color="white" />
          </TransactionBtns>

          {login === false || isLoading === true ? (
            
            <TransactionBtns onPress={()=> navigation.navigate('Login')}>
              <AntDesign name="login" size={24} color="white" />
        </TransactionBtns>
          ) : (
        <TransactionBtns onPress={handleLogout}>
              <AntDesign name="logout" size={24} color="white" />
            </TransactionBtns>
          )}
        
        </View>

        <View className="flex-row gap-4 w-full px-2">
          <View className=" w-1/2  bg-stone-200 p-2 h-32 rounded-lg">
            <View className="flex-row">
              <View className="bg-indigo-200 w-10 h-10 rounded-full items-center justify-center bg-opacity-5 mr-3">
                <FontAwesome5 name="ethereum" size={24} color="#4d3a7b" />
              </View>
              <View>
                <Text className="text-indigo-900">Ethereum</Text>
              </View>
            </View>
            <Text className="text-center text-indigo-800 text-3xl">$1740</Text>
          </View>
          <View className=" w-1/2  bg-stone-200 p-2 h-32 rounded-lg">
            <View className="flex-row">
              <View className="bg-indigo-200 w-10 h-10 rounded-full items-center justify-center bg-opacity-5 mr-3">
                <FontAwesome name="btc" size={24} color="#4d3a7b" />
              </View>
              <Text className="text-indigo-900">Bitcoin</Text>
            </View>

            <Text className="text-center text-indigo-800 text-3xl">$1740</Text>
          </View>
        </View>
        <View>
          {/* dialog */}
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>
                <Text className="uppercase text-orange-800">Btc Address</Text>
              </Dialog.Title>
              <Dialog.Content>
                <Text className="text-center text-xl">
                  {data?.user?.address}
                </Text>

                <View>
                  <Image
                    source={{ uri: data?.qrcode }}
                    className="w-full h-60 mt-3"
                  />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </Provider>
  );
};

export default Home;
