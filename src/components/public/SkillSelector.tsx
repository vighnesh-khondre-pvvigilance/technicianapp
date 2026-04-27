// src/components/public/SkillSelector.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function SkillSelector() {
  const skills = [
    "Cleaning",
    "Electrical",
    "Maintenance",
    "Installation",
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Skills
      </Text>

      <View style={styles.wrap}>
        {skills.map((item, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.text}>
              {item}
            </Text>
          </View>
        ))}
      </View>
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
    marginBottom: 14,
  },

  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  text: {
    color: "#92400E",
    fontWeight: "700",
  },
});