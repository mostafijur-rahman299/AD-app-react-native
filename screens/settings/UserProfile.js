import React from "react";
import { StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileForm from "../../components/UserProfile/ProfileForm";
import UserTestimonial from "../../components/UserTestimonial/UserTestimonial";

const RootTab = createBottomTabNavigator();

function UserProfile(props) {
  return (
    <RootTab.Navigator
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "white",
        showLabel: true,
        style: {
          backgroundColor: "#fbd106",
          borderRadius: 2,
          height: 50,
          zIndex: 0,
          ...styles.shadow,
        },
      }}
    >
      <RootTab.Screen
        name="profileSettings"
        component={ProfileForm}
        options={{
          title: "ProfileSettings",
          tabBarLabel: "Profile Settings",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "settings" : "settings-outline";
            size = focused ? 33 : 30;
            color = focused ? "tomato" : "white";
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      />

      <RootTab.Screen
        name="Testimonial"
        component={UserTestimonial}
        options={{
          title: "testimonial",
          tabBarLabel: "Testimonial",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "star-sharp" : "star-outline";
            size = focused ? 33 : 30;
            color = focused ? "tomato" : "white";
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

export default UserProfile;
