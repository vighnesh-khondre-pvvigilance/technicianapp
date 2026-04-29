// src/components/public/WhoCanJoin.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

const data = [
  "Solar Technicians",
  "Electricians",
  "Installers",
  "Maintenance Staff",
  "Freshers with Basic Skills",
  "Freelancers",
];

export default function WhoCanJoin() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.title}>
            Who Can Join
          </Text>

          <Text style={styles.sub}>
            Skilled field workers ready
            for premium solar jobs.
          </Text>
        </View>

        <View style={styles.iconWrap}>
          <Ionicons
            name="people-outline"
            size={22}
            color={Theme.colors.primary}
          />
        </View>
      </View>

      {/* Items */}
      <View style={styles.list}>
        {data.map((item) => (
          <View
            key={item}
            style={styles.row}
          >
            <View style={styles.checkWrap}>
              <Ionicons
                name="checkmark"
                size={14}
                color={
                  Theme.colors.eco
                }
              />
            </View>

            <Text style={styles.text}>
              {item}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons
          name="flash-outline"
          size={14}
          color={Theme.colors.accent}
        />

        <Text style={styles.footerText}>
          Fast approval for qualified applicants
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

  topRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color:
      Theme.colors.text,
    letterSpacing: -0.4,
  },

  sub: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color:
      Theme.colors.subText,
    maxWidth: 240,
    fontWeight: "600",
  },

  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Theme.colors.surfaceAlt,
  },

  list: {
    gap: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor:
      Theme.colors.surfaceAlt,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  checkWrap: {
    width: 26,
    height: 26,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      Theme.colors.ecoSoft,
  },

  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color:
      Theme.colors.text,
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor:
      Theme.colors.border,
  },

  footerText: {
    fontSize: 12,
    fontWeight: "700",
    color:
      Theme.colors.subText,
  },
});