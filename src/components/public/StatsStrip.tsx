// src/components/public/StatsStrip.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

export default function StatsStrip() {
  const data = [
    {
      label: "Technicians",
      value: "100+",
      icon: "people-outline",
    },
    {
      label: "Jobs Done",
      value: "500+",
      icon: "briefcase-outline",
    },
    {
      label: "Clients",
      value: "20+",
      icon: "business-outline",
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>
        Growing Network
      </Text>

      <View style={styles.row}>
        {data.map((item, index) => (
          <View
            key={index}
            style={styles.card}
          >
            <View style={styles.iconBox}>
              <Ionicons
                name={item.icon as any}
                size={18}
                color={
                  Theme.colors.primary
                }
              />
            </View>

            <Text style={styles.value}>
              {item.value}
            </Text>

            <Text style={styles.label}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  heading: {
    fontSize: 18,
    fontWeight: "800",
    color: Theme.colors.text,
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  card: {
    flex: 1,
    backgroundColor:
      Theme.colors.card,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",

    borderWidth: 1,
    borderColor:
      Theme.colors.border,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      "rgba(245,158,11,0.12)",
    marginBottom: 10,
  },

  value: {
    fontSize: 24,
    fontWeight: "800",
    color: Theme.colors.primary,
  },

  label: {
    marginTop: 4,
    color: Theme.colors.subtext,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});