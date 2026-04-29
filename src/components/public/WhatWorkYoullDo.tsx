// src/components/public/WhatWorkYoullDo.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

const roles = [
  {
    icon: "water-outline",
    title: "Panel Cleaning",
    tasks: [
      "Solar panel cleaning",
      "Basic inspection",
      "Before / after photos",
    ],
  },
  {
    icon: "construct-outline",
    title: "Maintenance Work",
    tasks: [
      "Routine servicing",
      "Loose connection checks",
      "Minor repairs",
    ],
  },
  {
    icon: "flash-outline",
    title: "Electrical Support",
    tasks: [
      "Cable checks",
      "MCB / DB checks",
      "Testing assistance",
    ],
  },
  {
    icon: "build-outline",
    title: "Installation Support",
    tasks: [
      "Module mounting",
      "Structure support",
      "Commissioning help",
    ],
  },
];

export default function WhatWorkYoullDo() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <Text style={styles.kicker}>
        Your Role
      </Text>

      <Text style={styles.title}>
        What Work You’ll Do
      </Text>

      <Text style={styles.sub}>
        Real field opportunities on
        premium solar projects with
        professional teams.
      </Text>

      {/* Roles */}
      <View style={styles.grid}>
        {roles.map((role) => (
          <View
            key={role.title}
            style={styles.roleCard}
          >
            <View style={styles.topRow}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={
                    role.icon as any
                  }
                  size={19}
                  color={
                    Theme.colors.primary
                  }
                />
              </View>

              <Text
                style={
                  styles.roleTitle
                }
              >
                {role.title}
              </Text>
            </View>

            {role.tasks.map(
              (task) => (
                <View
                  key={task}
                  style={
                    styles.taskRow
                  }
                >
                  <View
                    style={
                      styles.checkWrap
                    }
                  >
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color={
                        Theme.colors.eco
                      }
                    />
                  </View>

                  <Text
                    style={
                      styles.taskText
                    }
                  >
                    {task}
                  </Text>
                </View>
              )
            )}
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons
          name="briefcase-outline"
          size={15}
          color={Theme.colors.accent}
        />

        <Text style={styles.footerText}>
          Work assigned based on skill level
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
      marginTop: 8,
      marginBottom: 18,
      color:
        Theme.colors.subText,
      lineHeight: 21,
      fontSize: 14,
      fontWeight: "600",
    },

    grid: {
      gap: 12,
    },

    roleCard: {
      backgroundColor:
        Theme.colors.surfaceAlt,
      borderRadius: 20,
      padding: 14,
    },

    topRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
    },

    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center",
      justifyContent:
        "center",
      backgroundColor:
        Theme.colors.surface,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
    },

    roleTitle: {
      flex: 1,
      fontSize: 15,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    taskRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 9,
    },

    checkWrap: {
      width: 20,
      height: 20,
      borderRadius: 99,
      alignItems: "center",
      justifyContent:
        "center",
      backgroundColor:
        Theme.colors.ecoSoft,
    },

    taskText: {
      flex: 1,
      color:
        Theme.colors.subText,
      fontSize: 13,
      fontWeight: "700",
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