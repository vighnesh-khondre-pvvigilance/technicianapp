// app/(tabs)/home.tsx

import React, {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import BottomSheet from "@gorhom/bottom-sheet";

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  ZoomIn,
  LinearTransition,
} from "react-native-reanimated";

import Screen from "../../src/components/Screen";
import HeaderCard from "../../src/components/home/HeaderCard";
import StatsRow from "../../src/components/home/StatsRow";
import QuickSolveGrid from "../../src/components/home/QuickSolveGrid";
import RecentWorkList from "../../src/components/home/RecentWorkList";
import WeatherCard from "../../src/components/home/WeatherCard";

import InverterCalc from "../../src/components/toolbox/InverterCalc";
import CleaningCalc from "../../src/components/toolbox/CleaningCalc";
import VocCalc from "../../src/components/toolbox/VocCalc";
import VoltageDrop from "../../src/components/toolbox/VoltageDrop";
import YieldCalc from "../../src/components/toolbox/YieldCalc";

import { Theme } from "../../src/theme/theme";

export default function HomeScreen() {
  const [tool, setTool] =
    useState<string | null>(null);

  const sheetRef =
    useRef<BottomSheet>(null);

  const snapPoints =
    useMemo(() => ["74%"], []);

  const openTool = (
    name: string
  ) => {
    setTool(name);
    sheetRef.current?.expand();
  };

  const renderTool = () => {
    switch (tool) {
      case "Inverter":
        return <InverterCalc />;

      case "Cleaning":
        return <CleaningCalc />;

      case "VOC":
        return <VocCalc />;

      case "Voltage":
        return <VoltageDrop />;

      case "Yield":
        return <YieldCalc />;

      default:
        return (
          <Text style={styles.emptyText}>
            Select a tool from Quick Solve
          </Text>
        );
    }
  };

  return (
    <Screen>
      <StatusBar
        translucent={false}
        backgroundColor={
          Theme.colors.background
        }
        barStyle="dark-content"
      />

      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.scroll
          }
        >
          {/* HERO */}
          <Animated.View
            entering={FadeInDown.springify().delay(
              80
            )}
            layout={LinearTransition.springify()}
            style={styles.heroWrap}
          >
            <View style={styles.heroGlow1} />
            <View style={styles.heroGlow2} />

            <HeaderCard />
          </Animated.View>

          {/* STATS */}
          <Animated.View
            entering={FadeInUp.springify().delay(
              150
            )}
            layout={LinearTransition.springify()}
            style={styles.section}
          >
            <StatsRow />
          </Animated.View>

          {/* QUICK TOOLS */}
          <Animated.View
            entering={FadeInDown.springify().delay(
              230
            )}
            layout={LinearTransition.springify()}
            style={styles.section}
          >
            <View style={styles.block}>


              <QuickSolveGrid
                onPress={openTool}
              />
            </View>
          </Animated.View>

          {/* WEATHER */}
          <Animated.View
            entering={FadeInRight.springify().delay(
              300
            )}
            layout={LinearTransition.springify()}
            style={styles.section}
          >
            <WeatherCard />
          </Animated.View>

          {/* RECENT WORK */}
          <Animated.View
            entering={FadeInDown.springify().delay(
              380
            )}
            layout={LinearTransition.springify()}
            style={styles.section}
          >
            <View style={styles.block}>





              <RecentWorkList />
            </View>
          </Animated.View>



        </ScrollView>

        {/* TOOL SHEET */}
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={
            styles.sheetBg
          }
          handleIndicatorStyle={
            styles.sheetHandle
          }
        >
          <View style={styles.sheet}>
            {renderTool()}
          </View>
        </BottomSheet>
      </View>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor:
        Theme.colors.background,
    },

    scroll: {
      paddingTop: 6,
      paddingBottom: 0,
    },

    section: {
      marginTop: 18,
      paddingHorizontal: 6,
    },

    heroWrap: {
      marginHorizontal: 6,
      borderRadius: 30,
      overflow: "hidden",
      backgroundColor:
        Theme.colors.primary,
      shadowColor:
        Theme.colors.primary,
      shadowOpacity: 0.18,
      shadowRadius: 18,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      elevation: 8,
    },

    heroGlow1: {
      position: "absolute",
      top: -45,
      right: -10,
      width: 170,
      height: 170,
      borderRadius: 100,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    heroGlow2: {
      position: "absolute",
      bottom: -55,
      left: -25,
      width: 140,
      height: 140,
      borderRadius: 80,
      backgroundColor:
        "rgba(255,255,255,0.05)",
    },

    block: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius: 26,
      padding: 16,
      paddingBottom: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 2,
    },

    blockHead: {
      marginBottom: 14,
    },

    blockTitle: {
      fontSize: 18,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    blockSub: {
      marginTop: 4,
      fontSize: 13,
      color:
        Theme.colors.subText,
    },









    sheetBg: {
      backgroundColor:
        Theme.colors.surface,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },

    sheetHandle: {
      width: 54,
      backgroundColor:
        Theme.colors.border,
    },

    sheet: {
      flex: 1,
      padding: 16,
    },

    emptyText: {
      textAlign: "center",
      marginTop: 30,
      color:
        Theme.colors.subText,
      fontSize: 15,
    },
  });