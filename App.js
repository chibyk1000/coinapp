import "react-native-gesture-handler";


import { NavigationContainer } from "@react-navigation/native";
import {Provider} from 'react-redux'
import {store} from './redux/store'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./screen/Navigation";
import Login from "./screen/Login";
import Signup from "./screen/Signup";
import Verify from "./screen/Verify";
import Send from "./screen/Send";
import DrawerScreen from "./screen/DrawerScreen";
import Layout from "./components/Layout";



const Stack = createNativeStackNavigator();
export default function App() { 


  
  return (
    <NavigationContainer>

        {/* <AppBar/> */}
     
      {/* </PaperProvider> */}
      <Provider store={store}>
        <Layout>
          
      <Stack.Navigator initialRouteName="Drawer"  >
        
        <Stack.Screen name="Drawer" component={DrawerScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Verify" component={Verify}/>
        <Stack.Screen name="Send" component={Send}/>
      </Stack.Navigator>
</Layout>
      </Provider>
    </NavigationContainer>
  );
}




