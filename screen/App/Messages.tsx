import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import Recent from "../../components/messages/Recent";
import ChatList from "../../components/messages/ChatList";
import Fab from "../../components/messages/ChatList/Fab";
import { AddMessage, MessagesIcon } from "../../components/icons";
import useGetMode from "../../hooks/GetMode";
import { useAppSelector } from "../../redux/hooks/hooks";

export default function Messages() {
  const offset = useRef(new Animated.Value(0)).current;
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";


  useEffect(() => {
    return () => {
      offset.removeAllListeners();
    };
  }, []);
  return (
    <AnimatedScreen style={{ marginTop: 80, flex: 1 }}>
      <Recent offset={offset} />
      <ChatList offset={offset} />
      <Fab item={<AddMessage size={25} color={color} />} />
    </AnimatedScreen>
  );
}
