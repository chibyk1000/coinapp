

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Settings from "./Settings";
import Profile from "./Profile";
import Transactions from "./Transactions";

const Tab = createMaterialBottomTabNavigator();
export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="orange"
      inactiveColor="white"
      sceneAnimationEnabled
      barStyle={{ backgroundColor: "#4d3a7b" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="swap-horizontal"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


