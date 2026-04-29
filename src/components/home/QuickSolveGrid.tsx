// src/components/home/QuickSolveGrid.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

import InverterCalc from "../toolbox/InverterCalc";
import CleaningCalc from "../toolbox/CleaningCalc";
import VocCalc from "../toolbox/VocCalc";
import VoltageDrop from "../toolbox/VoltageDrop";
import YieldCalc from "../toolbox/YieldCalc";

type ToolType =
  | "inverter"
  | "cleaning"
  | "voc"
  | "drop"
  | "yield"
  | null;

const tools = [
  {
    key: "inverter",
    title: "Inverter",
    subtitle: "Efficiency",
    icon: "flash",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    key: "cleaning",
    title: "Cleaning",
    subtitle: "Loss %",
    icon: "water",
    color: "#0EA5E9",
    bg: "#E0F2FE",
  },
  {
    key: "voc",
    title: "VOC",
    subtitle: "Temp Calc",
    icon: "thermometer",
    color: "#EF4444",
    bg: "#FEE2E2",
  },
  {
    key: "drop",
    title: "V Drop",
    subtitle: "Cable Loss",
    icon: "analytics",
    color: "#8B5CF6",
    bg: "#EDE9FE",
  },
  {
    key: "yield",
    title: "Yield",
    subtitle: "Daily Power",
    icon: "sunny",
    color: "#10B981",
    bg: "#D1FAE5",
  },
];

export default function QuickSolveGrid() {
  const [selected, setSelected] =
    useState<ToolType>(null);

  const renderTool = () => {
    switch (selected) {
      case "inverter":
        return <InverterCalc />;

      case "cleaning":
        return <CleaningCalc />;

      case "voc":
        return <VocCalc />;

      case "drop":
        return <VoltageDrop />;

      case "yield":
        return <YieldCalc />;

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (selected) {
      case "inverter":
        return "Inverter Calculator";

      case "cleaning":
        return "Cleaning Impact";

      case "voc":
        return "VOC Calculator";

      case "drop":
        return "Voltage Drop";

      case "yield":
        return "Yield Calculator";

      default:
        return "Calculator";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.heading}>
            Quick Tools
          </Text>

          <Text style={styles.smallText}>
            Field Utilities
          </Text>
        </View>

        <View style={styles.badge}>
          <Ionicons
            name="flash"
            size={14}
            color="#fff"
          />

          <Text style={styles.badgeText}>
            PRO
          </Text>
        </View>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerGlow} />

        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>
            Fast Field Calculations
          </Text>

          <Text style={styles.bannerSub}>
            Voltage, VOC, Yield &
            Performance Tools
          </Text>
        </View>

        <View style={styles.bannerIcon}>
          <Ionicons
            name="construct"
            size={26}
            color="#fff"
          />
        </View>
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {tools.map((item) => (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
              setSelected(
                item.key as ToolType
              )
            }
          >
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    item.bg,
                },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={item.color}
              />
            </View>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.subtitle}>
              {item.subtitle}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={14}
              color="#94A3B8"
              style={styles.arrow}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal */}
      <Modal
        visible={selected !== null}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView
          style={styles.modalWrap}
        >
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#fff"
          />

          {/* Modal Header */}
          <View
            style={styles.modalHeader}
          >
            <TouchableOpacity
              style={
                styles.closeBtn
              }
              onPress={() =>
                setSelected(null)
              }
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color="#0F172A"
              />
            </TouchableOpacity>

            <Text
              numberOfLines={1}
              style={
                styles.modalTitle
              }
            >
              {getTitle()}
            </Text>

            <View
              style={{
                width: 42,
              }}
            />
          </View>

          {/* Modal Body */}
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.modalBody
            }
          >
            {renderTool()}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 6,
    },

    topHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 14,
    },

    heading: {
      fontSize: 20,
      fontWeight: "900",
      color:
        Theme.colors.text,
    },

    smallText: {
      marginTop: 2,
      fontSize: 12,
      fontWeight: "700",
      color:
        Theme.colors.subText,
    },

    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor:
        Theme.colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
    },

    badgeText: {
      color: "#fff",
      fontSize: 11,
      fontWeight: "900",
    },

    banner: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 26,
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      overflow: "hidden",
    },

    bannerGlow: {
      position: "absolute",
      right: -30,
      top: -30,
      width: 130,
      height: 130,
      borderRadius: 65,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    bannerTitle: {
      color: "#fff",
      fontSize: 17,
      fontWeight: "900",
    },

    bannerSub: {
      color:
        "rgba(255,255,255,0.75)",
      marginTop: 5,
      fontSize: 12,
      lineHeight: 18,
    },

    bannerIcon: {
      width: 54,
      height: 54,
      borderRadius: 18,
      backgroundColor:
        "rgba(255,255,255,0.14)",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginLeft: 14,
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:
        "space-between",
    },

    card: {
      width: "48.3%",
      backgroundColor:
        Theme.colors.surface,
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 1,
    },

    iconBox: {
      width: 46,
      height: 46,
      borderRadius: 16,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 12,
    },

    title: {
      fontSize: 15,
      fontWeight: "900",
      color:
        Theme.colors.text,
    },

    subtitle: {
      marginTop: 4,
      fontSize: 12,
      color:
        Theme.colors.subText,
      fontWeight: "600",
    },

    arrow: {
      marginTop: 10,
    },

    modalWrap: {
      flex: 1,
      backgroundColor:
        Theme.colors.background,
    },

    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      paddingHorizontal: 18,
      paddingVertical: 14,
      backgroundColor:
        Theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor:
        Theme.colors.border,
    },

    closeBtn: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        Theme.colors.background,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    modalTitle: {
      flex: 1,
      textAlign: "center",
      marginHorizontal: 10,
      fontSize: 17,
      fontWeight: "900",
      color:
        Theme.colors.text,
    },

    modalBody: {
      padding: 16,
      paddingBottom: 50,
    },
  });