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
      <View style={styles.headerRow}>
        <Text style={styles.heading}>
          Growing Network
        </Text>

        <View style={styles.liveBadge}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>
            Live Growth
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        {data.map((item, index) => (
          <View
            key={index}
            style={styles.card}
          >
            <View style={styles.iconWrap}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={
                    Theme.colors.primary
                  }
                />
              </View>
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
    marginBottom: 22,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  heading: {
    fontSize: 19,
    fontWeight: "900",
    color: Theme.colors.text,
    letterSpacing: -0.3,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor:
      Theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor:
      Theme.colors.border,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 20,
    backgroundColor:
      Theme.colors.eco,
  },

  liveText: {
    fontSize: 11,
    fontWeight: "800",
    color:
      Theme.colors.subText,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  card: {
    flex: 1,
    backgroundColor:
      Theme.colors.surface,
    borderRadius:
      Theme.radius.xl,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",

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

  iconWrap: {
    marginBottom: 10,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      Theme.colors.surfaceAlt,
  },

  value: {
    fontSize: 24,
    fontWeight: "900",
    color:
      Theme.colors.primary,
    letterSpacing: -0.4,
  },

  label: {
    marginTop: 5,
    color:
      Theme.colors.subText,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});