import React from "react";
import { StyleSheet, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TopBar from "./components/Layout/TopBar";
import Ionicons from "react-native-vector-icons/Ionicons";

import UserProfile from "./screens/settings/UserProfile";
import SpecialWarmFunnel from "./screens/settings/SpecialWarmFunnel";
import NormalWarmFunnel from "./screens/settings/NormalWarmFunnel";
import Membership from "./screens/settings/Membership";
import AffiliateProgram from "./screens/settings/AffiliateProgram";

const Tab = createMaterialTopTabNavigator();

import { View, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import colors from "./components/Constant/colors";

function AboutScreen2() {
  return (
    <>
      <TopBar />

      <NavigationContainer>
        <Tab.Navigator
          tabBarPosition={"top"}
          backBehavior={"initialRoute"}
          tabBarPosition={"top"}
          keyboardDismissMode={"auto"}
          swipeEnabled={true}
          swipeVelocityImpact={0.1}
          tabBarOptions={{
            activeTintColor: colors.secondary,
            inactiveTintColor: colors.primary,
            showIcon: true,
            showLabel: true,
            pressColor: colors.primary,
            pressOpacity: 0.9,
            scrollEnabled: true,
            tabStyle: {
              backgroundColor: "white",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
            },
            indicatorStyle: {
              backgroundColor: "tomato",
              marginBottom: -2,
            },
            labelStyle: {
              fontSize: 12,
              fontWeight: "bold",
              letterSpacing: 2,
            },
            iconStyle: {},
            style: {},
          }}
        >
          <Tab.Screen
            name="Profile"
            component={UserProfile}
            // options={{
            //   tabBarIcon: ({ focused, color, size }) => {
            //     const iconName = focused ? "settings" : "settings-outline";
            //     size = focused ? 33 : 30;
            //     color = focused ? "tomato" : "white";
            //     return <Ionicons name={iconName} color={color} size={size} />;
            //   }
            // }}
          />

          <Tab.Screen name="Normal Funnel" component={NormalWarmFunnel} />
          <Tab.Screen name="Special Funnel" component={SpecialWarmFunnel} />
          <Tab.Screen name="Membership" component={Membership} />
          <Tab.Screen
            name="Affiliate Program"
            component={AffiliateProgram}
            options={{
              labelStyle: {
                
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default AboutScreen2;
