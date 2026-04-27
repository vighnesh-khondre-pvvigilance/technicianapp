// src/components/public/EligibilitySection.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

const items = [
  "Solar technicians",
  "Electricians",
  "Maintenance workers",
  "Installers",
  "Freshers with basic skills",
  "Freelancers",
];

export default function EligibilitySection() {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>
        Eligibility
      </Text>

      <Text style={styles.title}>
        Who Can Join?
      </Text>

      <Text style={styles.sub}>
        We welcome motivated
        technicians ready to grow in
        solar field services.
      </Text>

      <View style={styles.grid}>
        {items.map((item) => (
          <View
            key={item}
            style={styles.item}
          >
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#16A34A"
            />
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
    color:
      Theme.colors.primary,
    fontWeight: "800",
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color:
      Theme.colors.text,
    marginTop: 6,
  },
  sub: {
    color:
      Theme.colors.subtext,
    marginTop: 6,
    lineHeight: 20,
  },
  grid: {
    marginTop: 14,
    gap: 12,
  },
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    color:
      Theme.colors.text,
    fontWeight: "600",
  },
});