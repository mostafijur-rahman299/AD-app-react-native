import React from "react";
import { StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";

import SpecialFunnel from "../../components/SpecialFunnel/SpecialFunnel";
import Video from "../../components/SpecialFunnel/Video/Video";
import colors from "../../components/Constant/colors";

const RootTab = createBottomTabNavigator();

function SpecialWarmFunnel(props) {
  return (
    <RootTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.secondary,
        inactiveTintColor: "white",
        showLabel: true,
        style: {
          backgroundColor: colors.primary,
          borderRadius: 2,
          height: 50,
          zIndex: 0,
          ...styles.shadow,
        },
      }}
    >
      <RootTab.Screen
        name="specialfunnel"
        component={SpecialFunnel}
        options={{
          title: "SpecialFunnel",
          tabBarLabel: "Special Funnel",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "funnel" : "funnel-outline";
            size = focused ? 28 : 25;
            color = focused ? colors.secondary : "white";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
          HeaderTitle: "hello",
        }}
      />

      <RootTab.Screen
        name="video"
        component={Video}
        options={{
          title: "Video",
          tabBarLabel: "Videos",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "image" : "image-outline";
            size = focused ? 33 : 30;
            color = focused ? colors.secondary : "white";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      />
    </RootTab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 3,
  },
});

export default React.memo(SpecialWarmFunnel);
