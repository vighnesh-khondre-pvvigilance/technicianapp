// src/components/public/WhyWorkWithUs.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

const benefits = [
  {
    icon: "briefcase-outline",
    title: "Regular Work",
    desc: "Get access to ongoing solar site jobs and service requests.",
  },
  {
    icon: "cash-outline",
    title: "Reliable Payments",
    desc: "Transparent payouts with trusted company support.",
  },
  {
    icon: "school-outline",
    title: "Training Support",
    desc: "Learn safety standards, field SOPs, and technical skills.",
  },
  {
    icon: "trending-up-outline",
    title: "Career Growth",
    desc: "Grow from technician to team lead and supervisor roles.",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Trusted Brand",
    desc: "Work with a professional solar company and quality clients.",
  },
  {
    icon: "location-outline",
    title: "Multiple Projects",
    desc: "Opportunities across cities and industrial locations.",
  },
];

export default function WhyWorkWithUs() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <Text style={styles.kicker}>
        Benefits
      </Text>

      <Text style={styles.title}>
        Why Work With Us
      </Text>

      <Text style={styles.sub}>
        Join a premium solar network
        built for skilled field
        technicians who want steady
        work and growth.
      </Text>

      {/* Items */}
      <View style={styles.grid}>
        {benefits.map((item) => (
          <View
            key={item.title}
            style={styles.item}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={item.icon as any}
                size={19}
                color={
                  Theme.colors.primary
                }
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.itemTitle}>
                {item.title}
              </Text>

              <Text style={styles.itemDesc}>
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons
          name="sparkles-outline"
          size={15}
          color={Theme.colors.accent}
        />

        <Text style={styles.footerText}>
          More opportunities added regularly
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius:
        Theme.radius.xl,
      padding: 20,
      marginBottom: 18,

      borderWidth: 1,
      borderColor:
        Theme.colors.border,

      shadowColor:
        Theme.colors.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 6,
      },

      elevation: 3,
    },

    kicker: {
      alignSelf: "flex-start",
      fontSize: 11,
      fontWeight: "900",
      color:
        Theme.colors.primary,
      letterSpacing: 0.8,
      textTransform:
        "uppercase",
      backgroundColor:
        Theme.colors.surfaceAlt,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
    },

    title: {
      fontSize: 24,
      fontWeight: "900",
      color:
        Theme.colors.text,
      marginTop: 12,
      letterSpacing: -0.4,
    },

    sub: {
      color:
        Theme.colors.subText,
      lineHeight: 21,
      marginTop: 8,
      marginBottom: 18,
      fontSize: 14,
      fontWeight: "600",
    },

    grid: {
      gap: 12,
    },

    item: {
      flexDirection: "row",
      gap: 12,
      alignItems: "flex-start",
      backgroundColor:
        Theme.colors.surfaceAlt,
      borderRadius: 18,
      padding: 14,
    },

    iconWrap: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        Theme.colors.surface,
      alignItems: "center",
      justifyContent:
        "center",
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
    },

    content: {
      flex: 1,
    },

    itemTitle: {
      fontSize: 15,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 4,
    },

    itemDesc: {
      fontSize: 13,
      lineHeight: 19,
      color:
        Theme.colors.subText,
      fontWeight: "500",
    },

    footer: {
      marginTop: 16,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor:
        Theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    footerText: {
      fontSize: 12,
      fontWeight: "700",
      color:
        Theme.colors.subText,
    },
  });