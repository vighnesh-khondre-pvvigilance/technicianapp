// src/components/public/StatusTracker.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function StatusTracker() {
  const stages = [
    "Basic Info Complete",
    "Profile Pending",
    "Training Pending",
    "Approval Pending",
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Progress Tracker
      </Text>

      {stages.map((item, index) => (
        <View key={index} style={styles.row}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === 0
                    ? "#16A34A"
                    : "#CBD5E1",
              },
            ]}
          />

          <Text style={styles.text}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  heading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  text: {
    fontWeight: "600",
    color: "#334155",
  },
});