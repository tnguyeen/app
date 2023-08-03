import { BlurView } from "expo-blur";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ProfileButton from "./ProfileButton";
import React from "react";
function CustomHeader({ title }: { title: string }) {
  return (
    <SafeAreaView>
      <BlurView style={style.blurView} tint="light" intensity={70}>
        <View style={style.titleView}>
          <View style={{ width: "33.3%", alignItems: "flex-start" }}>
            {title==="Home"&&<ProfileButton size={45} color="black" />}
          </View>

          <View style={{ width: "33.3%", alignItems: "center" }}>
            <Text style={style.headerStyle}>{title}</Text>
          </View>
          <View style={{ width: "33.3%" }} />
        </View>
      </BlurView>
    </SafeAreaView>
  );
}


export default React.memo(CustomHeader);
const style = StyleSheet.create({
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    height:90,
    paddingHorizontal: 10,
    borderBlockColor: "#0000002F",
    borderBottomWidth: 0.5,
    right: 0,
    alignItems: "center",
  },
  titleView: {
    paddingTop: 44,
    paddingBottom:10,
    width: "100%",
    height:"100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerStyle: {
    fontFamily: "instaBold",
    fontSize: 20,
  },
});
