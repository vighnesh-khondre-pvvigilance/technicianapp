// src/components/public/BenefitGrid.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

export default function BenefitGrid() {
  const benefits = [
    {
      title: "Flexible Jobs",
      subtitle: "Choose available field work",
      icon: "calendar-outline",
    },
    {
      title: "Trusted Clients",
      subtitle: "Corporate & verified projects",
      icon: "shield-checkmark-outline",
    },
    {
      title: "Career Growth",
      subtitle: "Build long-term technician profile",
      icon: "trending-up-outline",
    },
    {
      title: "Weekly Earnings",
      subtitle: "Regular payout opportunities",
      icon: "wallet-outline",
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>
        Why Join Us
      </Text>

      <Text style={styles.subheading}>
        Work with a growing solar
        technician network.
      </Text>

      <View style={styles.grid}>
        {benefits.map(
          (item, index) => (
            <View
              key={index}
              style={styles.card}
            >
              <View
                style={styles.iconBox}
              >
                <Ionicons
                  name={
                    item.icon as any
                  }
                  size={20}
                  color={
                    Theme.colors.primary
                  }
                />
              </View>

              <Text
                style={styles.title}
              >
                {item.title}
              </Text>

              <Text
                style={
                  styles.subtitle
                }
              >
                {item.subtitle}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  subheading: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 21,
    color: Theme.colors.subtext,
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent:
      "space-between",
  },

  card: {
    width: "48%",
    backgroundColor:
      Theme.colors.card,
    borderRadius: 22,
    padding: 16,

    borderWidth: 1,
    borderColor:
      Theme.colors.border,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      "rgba(245,158,11,0.12)",
    marginBottom: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: Theme.colors.subtext,
    fontWeight: "500",
  },
});