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
      <Text style={styles.title}>
        Who Can Join
      </Text>

      <Text style={styles.sub}>
        Skilled field workers ready
        for solar opportunities.
      </Text>

      {data.map((item) => (
        <View
          key={item}
          style={styles.row}
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:
      Theme.colors.card,
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color:
      Theme.colors.text,
  },
  sub: {
    color:
      Theme.colors.subtext,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    color:
      Theme.colors.text,
  },
});