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
      <Text style={styles.kicker}>
        Your Role
      </Text>

      <Text style={styles.title}>
        What Work You’ll Do
      </Text>

      <Text style={styles.sub}>
        Real field opportunities on
        professional solar projects.
      </Text>

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
                  size={20}
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
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color="#16A34A"
                  />
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
      textTransform:
        "uppercase",
      letterSpacing: 0.4,
    },

    title: {
      fontSize: 24,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginTop: 6,
    },

    sub: {
      marginTop: 8,
      marginBottom: 16,
      color:
        Theme.colors.subtext,
      lineHeight: 20,
    },

    grid: {
      gap: 14,
    },

    roleCard: {
      backgroundColor:
        "#F8FAFC",
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
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent:
        "center",
      backgroundColor:
        "rgba(245,158,11,0.12)",
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
      marginTop: 8,
    },

    taskText: {
      color:
        Theme.colors.subtext,
      fontSize: 13,
      fontWeight: "600",
    },
  });