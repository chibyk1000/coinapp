import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { View } from 'react-native'
import Navigation from './Navigation'
import axios from 'axios'
import { BASE_URL } from "@env";
const MyDrawer = (props) => {
    const handleLogout = async () => {
        console.log('ss')
      const resp =await  axios.post(`${BASE_URL}/api/logout`)
        if (resp.status === 200) {
    
            props.navigation.navigate('Home')
}
    }
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={async() => {
                    console.log('ss')
                    try {
                         const resp = await axios.post(
                           `${BASE_URL}/api/logout`
                        );
                        console.log(resp.data)
                         if (resp.status === 200) {
                           props.navigation.navigate("Home");
                         }    
                    } catch (error) {
                      console.log(error)  
                    }
  
                }}
            />
        </DrawerContentScrollView>
    )
}
const Drawer = createDrawerNavigator()
const DrawerScreen = () => {
  return (
      <Drawer.Navigator useLegacyImplementation drawerContent={(props) => <MyDrawer {...props} />}>
          
          <Drawer.Screen name="Nav" component={Navigation} options={{headerShown:false}} />
    </Drawer.Navigator>
  )
}

export default DrawerScreen