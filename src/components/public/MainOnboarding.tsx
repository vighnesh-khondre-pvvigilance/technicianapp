// src/components/public/MainOnboarding.tsx

import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import HeroBanner from "./HeroBanner";
import BenefitGrid from "./BenefitGrid";
import StatsStrip from "./StatsStrip";

import WhoCanJoin from "./WhoCanJoin";
import WhyWorkWithUs from "./WhyWorkWithUs";
import WhatWorkYoullDo from "./WhatWorkYoullDo";
import HowApprovalWorks from "./HowApprovalWorks";
import TechnicianStories from "./TechnicianStories";

import { Theme } from "../../theme/theme";

export default function MainOnboarding() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* Header */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.brand}>
            PVprotech
          </Text>

          <Text style={styles.caption}>
            Solar Technician Network
          </Text>
        </View>

        <View style={styles.badge}>
          <View style={styles.dot} />

          <Text
            style={
              styles.badgeText
            }
          >
            Hiring
          </Text>
        </View>
      </View>

      {/* Hero */}
      <HeroBanner />

      {/* Stats */}
      <StatsStrip />

      {/* Existing Benefits */}
      {/* <BenefitGrid /> */}

      {/* New Sections */}
      <WhoCanJoin />

      <WhyWorkWithUs />

      <WhatWorkYoullDo />

      <HowApprovalWorks />

      <TechnicianStories />

      {/* CTA Card */}
      <View style={styles.card}>
        <View
          style={
            styles.smallBadge
          }
        >
          <Ionicons
            name="flash-outline"
            size={14}
            color="#fff"
          />

          <Text
            style={
              styles.smallBadgeText
            }
          >
            Limited Openings
          </Text>
        </View>

        <Text style={styles.title}>
          Ready to Start?
        </Text>

        <Text style={styles.sub}>
          Join one of India’s growing
          solar technician networks
          and unlock new field
          opportunities.
        </Text>

        {/* Primary */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={
            styles.primaryBtn
          }
          onPress={() =>
            router.push(
              "/(public)/training"
            )
          }
        >
          <Text
            style={
              styles.primaryText
            }
          >
            Start Training
          </Text>

          <Ionicons
            name="arrow-forward"
            size={18}
            color={
              Theme.colors.secondary
            }
          />
        </TouchableOpacity>

        {/* Secondary */}
        <View style={styles.row}>
          <TouchableOpacity
            style={
              styles.secondaryBtn
            }
            onPress={() =>
              router.push(
                "/(public)/login"
              )
            }
          >
            <Ionicons
              name="log-in-outline"
              size={16}
              color={
                Theme.colors.text
              }
            />

            <Text
              style={
                styles.secondaryText
              }
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Theme.colors.background,
    },

    content: {
      padding: 18,
      paddingTop: 12,
      paddingBottom: 42,
    },

    topRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 18,
    },

    brand: {
      fontSize: 30,
      fontWeight: "900",
      color:
        Theme.colors.secondary,
      letterSpacing: -0.7,
    },

    caption: {
      marginTop: 4,
      fontSize: 13,
      fontWeight: "600",
      color:
        Theme.colors.subtext,
    },

    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor:
        "#DCFCE7",
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: 999,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 99,
      backgroundColor:
        "#16A34A",
    },

    badgeText: {
      color: "#15803D",
      fontSize: 12,
      fontWeight: "800",
    },

    card: {
      backgroundColor:
        Theme.colors.card,
      borderRadius: 28,
      padding: 20,
      marginTop: 8,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 4,
    },

    smallBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor:
        Theme.colors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      marginBottom: 16,
    },

    smallBadgeText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "700",
    },

    title: {
      fontSize: 24,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    sub: {
      marginTop: 8,
      color:
        Theme.colors.subtext,
      lineHeight: 22,
      marginBottom: 18,
      fontSize: 14,
    },

    primaryBtn: {
      height: 56,
      borderRadius: 18,
      backgroundColor:
        Theme.colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
      marginBottom: 12,
    },

    primaryText: {
      color:
        Theme.colors.secondary,
      fontSize: 15,
      fontWeight: "900",
    },

    row: {
      flexDirection: "row",
      gap: 10,
    },

    secondaryBtn: {
      flex: 1,
      height: 52,
      borderRadius: 16,
      backgroundColor:
        "#F8FAFC",
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "center",
      gap: 8,
    },

    secondaryText: {
      color:
        Theme.colors.text,
      fontSize: 14,
      fontWeight: "700",
    },
  });