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
      <Text style={styles.kicker}>
        Benefits
      </Text>

      <Text style={styles.title}>
        Why Work With Us
      </Text>

      <Text style={styles.sub}>
        Join a growing solar network
        built for skilled field
        technicians.
      </Text>

      <View style={styles.grid}>
        {benefits.map((item) => (
          <View
            key={item.title}
            style={styles.item}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={item.icon as any}
                size={20}
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
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        Theme.colors.card,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
    },

    kicker: {
      fontSize: 12,
      fontWeight: "800",
      color:
        Theme.colors.primary,
      letterSpacing: 0.4,
      textTransform:
        "uppercase",
    },

    title: {
      fontSize: 24,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginTop: 6,
    },

    sub: {
      color:
        Theme.colors.subtext,
      lineHeight: 20,
      marginTop: 8,
      marginBottom: 16,
    },

    grid: {
      gap: 14,
    },

    item: {
      flexDirection: "row",
      gap: 12,
      alignItems: "flex-start",
      backgroundColor:
        "#F8FAFC",
      borderRadius: 18,
      padding: 14,
    },

    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor:
        "rgba(245,158,11,0.12)",
      alignItems: "center",
      justifyContent:
        "center",
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
        Theme.colors.subtext,
    },
  });