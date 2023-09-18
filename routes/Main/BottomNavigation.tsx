import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  BottomProp,
  BottomRootStackParamList,
  DiscoverProp,
} from "../../types/navigation";
import { BlurView } from "expo-blur";

import IconButtons from "../../components/global/Buttons/BottomBarButtons";
import ProfileButton from "../../components/home/header/ProfileButton";
import {
  HomeIcon,
  SearchIcon,
  MessagesIcon,
  NotificationIcon,
  HomeIconUnfocused,
  SearchUnfocused,
  MessageUnfocused,
  NotificationUnfocused,
  MessageAvailableIcon,
} from "../../components/icons";
import useGetMode from "../../hooks/GetMode";
import Discover from "../../screen/App/Discover";
import Messages from "../../screen/App/Messages";
import DrawerNavigator from "./DrawerNavigation";
import Notifications from "../../screen/App/Notifications";
import { openToast } from "../../redux/slice/toast/toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect } from "react";
import socket from "../../util/socket";
import { IMessageSocket } from "../../types/socket";
import SearchBar from "../../components/discover/SearchBar";
import { Text, View } from "react-native";
const Tab = createBottomTabNavigator<BottomRootStackParamList>();
export function BottomTabNavigator() {
  const dark = useGetMode();
  const dispatch = useAppDispatch();
  const isNewMessage = useAppSelector((state) => state.chatlist.new);
  const isDark = dark;
  const tint = !isDark ? "light" : "dark";
  const color = isDark ? "white" : "black";
  const backgroundColor = isDark ? "black" : "white";

  const borderColor = isDark ? "#FFFFFF7D" : "#4545452D";
  return (
    <Tab.Navigator
    
      tabBar={(props) => (
        <BlurView
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          tint={tint}
          intensity={200}
        >
          <BottomTabBar {...props} />
        </BlurView>
      )}
      
      sceneContainerStyle={{ backgroundColor }}
      screenOptions={({ navigation, route, }) => {
        return {
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerStatusBarHeight: 30,

          tabBarStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            height: 65,
            paddingBottom: 10,
            borderTopWidth: 0.2,

            borderColor,
          },
          headerBackgroundContainerStyle: {
            borderBottomWidth: 0.2,
            borderColor,
          },
          headerBackground: () => (
            <BlurView
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                top: 0,
                right: 0,
              }}
              tint={tint}
              intensity={200}
            />
          ),
          tabBarIcon: ({ focused }) => {
            const iconFocused = () => {
              if (route.name === "BottomHome") {
                return HomeIcon;
              }
              if (route.name === "Discover") {
                return SearchIcon;
              }
              if (route.name === "Messages") {
                return MessagesIcon;
              } else {
                return NotificationIcon;
              }
            };
            const iconUnfocused = () => {
              if (route.name === "BottomHome") {
                return HomeIconUnfocused;
              }
              if (route.name === "Discover") {
                return SearchUnfocused;
              }
              if (route.name === "Messages") {
                if (!isNewMessage) {
                  return MessageUnfocused;
                } else {
                  return MessageAvailableIcon;
                }
              } else {
                return NotificationUnfocused;
              }
            };
            return (
              <IconButtons
                Icon={focused ? iconFocused() : iconUnfocused()}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          },
          headerTitleStyle: { fontFamily: "uberBold", fontSize: 20, color },
          headerShadowVisible: false,
          headerTransparent: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
        };
      }}
    >
      <Tab.Screen
        name="BottomHome"
        options={({ navigation, route }: BottomProp) => {
          return {
            headerShown: false,

            title: "Home",

            headerTitleStyle: { fontFamily: "instaBold", fontSize: 24 },
            headerTitleAlign: "center",
          };
        }}
        component={DrawerNavigator}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={({ navigation, route }: DiscoverProp) => {
          return {
            title: "Discover",
            headerTitle: () => {
              return <SearchBar />;
            },
            headerShown: true,
            headerTransparent: true,
            headerBackgroundContainerStyle: {
              borderBottomWidth: 0,
              borderColor,
            },
            headerBackground: () => (
              <BlurView
                style={{
                  opacity: 0,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  top: 0,
                  right: 0,
                }}
                tint={tint}
                intensity={100}
              />
            ),
            headerLeft: () => (
              <ProfileButton
                color={color}
                style={{ paddingLeft: 20 }}
                size={40}
                onPress={() => {
                  navigation.navigate("BottomHome");
                }}
              />
            ),
          };
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={({ navigation }) => {
          return {
            title: "Notifications",
            headerTitle: () => {
              return (
                <View style={{marginTop:20}}>
                  <Text
                    style={{
                      fontFamily: "uberBold",
                      fontSize: 30,
                      
                      color,
                      height: 28,
                    }}
                  >
                    Notifications
                  </Text>
                  <Text
                    style={{ fontFamily: "jakara", includeFontPadding: false }}
                  >
                    Check Your Notifications
                  </Text>
                </View>
              );
            },
            headerTitleAlign: "left",

            headerBackground: () => (
              <BlurView
                style={{
                  opacity: 0,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  top: 0,
                  right: 0,
                }}
                tint={tint}
                intensity={100}
              />
            ),
            headerBackgroundContainerStyle: {
              borderBottomWidth: 0,
            },
          };
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerBackground: () => (
            <BlurView
              style={{
                opacity: 0,
                position: "absolute",
                bottom: 0,
                left: 0,
                top: 0,
                right: 0,
              }}
              tint={tint}
              intensity={100}
            />
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { fontFamily: "uberBold", fontSize: 30, color },
          title: "Messages",
          headerTransparent: true,
          headerBackgroundContainerStyle: undefined,
        }}
      />
    </Tab.Navigator>
  );
}
