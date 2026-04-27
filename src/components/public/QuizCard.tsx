// src/components/public/QuizCard.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function QuizCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Quiz Required
      </Text>

      <Text style={styles.sub}>
        Pass MCQ assessment after training
        to move for approval.
      </Text>
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
  },

  sub: {
    marginTop: 8,
    color: "#64748B",
    lineHeight: 20,
  },
});