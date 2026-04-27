// src/components/public/TrainingCard.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function TrainingCard() {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Training Modules
      </Text>

      <Text style={styles.sub}>
        Solar Basics, Safety, Cleaning,
        Inverter, Customer Handling
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/(public)/training")
        }
      >
        <Text style={styles.btnText}>
          Continue Training
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  sub: {
    color: "#CBD5E1",
    marginTop: 8,
    lineHeight: 20,
  },

  button: {
    marginTop: 16,
    backgroundColor: "#F59E0B",
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    fontWeight: "800",
    color: "#0F172A",
  },
});