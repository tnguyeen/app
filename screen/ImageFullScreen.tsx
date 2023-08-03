import { View, Text, Button } from "react-native";
import { ImageFullScreenProp } from "../types/navigation";
import { Image } from "expo-image";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadingTransition,
  SlideInUp,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import CustomBottomBar from "../components/global/BottomBar.tsx/CustomBottomBar";
//Hero Transition

export default function ImageFullScreen({
  route,
  navigation,
}: ImageFullScreenProp) {
  const { photoUri } = route.params;
  console.log("🚀 ~ file: ImageFullScreen.tsx:23 ~ route:", route);
  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="transparent" />
      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(400)}
        style={{
          flex: 1,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlurView
        intensity={5}
        
        tint="dark"
          style={{
            width:"100%",
            height:"100%",
            backgroundColor:"#000000E6",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 300,
            }}
          >
            <Animated.Image
              sharedTransitionTag={photoUri}
              source={{ uri: photoUri }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </BlurView>
      </Animated.View>
    </>
  );
}
