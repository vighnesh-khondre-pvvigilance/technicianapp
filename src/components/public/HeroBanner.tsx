// src/components/public/HeroBanner.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

export default function HeroBanner() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Decorative Shapes */}
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        {/* Top Badge */}
        <View style={styles.badge}>
          <Ionicons
            name="flash-outline"
            size={14}
            color="#fff"
          />
          <Text style={styles.badgeText}>
            Verified Network
          </Text>
        </View>

        {/* Main Content */}
        <Text style={styles.title}>
          Become Verified{"\n"}Solar Technician
        </Text>

        <Text style={styles.subtitle}>
          Complete onboarding, finish training,
          get approved, and start receiving
          premium field jobs near you.
        </Text>

        {/* Features */}
        <View style={styles.featureRow}>
          <View style={styles.featureChip}>
            <Ionicons
              name="shield-checkmark-outline"
              size={14}
              color="#fff"
            />
            <Text style={styles.featureText}>
              Trusted Jobs
            </Text>
          </View>

          <View style={styles.featureChip}>
            <Ionicons
              name="cash-outline"
              size={14}
              color="#fff"
            />
            <Text style={styles.featureText}>
              Better Earnings
            </Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={() =>
            router.push("/(public)/training")
          }
        >
          <Text style={styles.buttonText}>
            Start Training
          </Text>

          <Ionicons
            name="arrow-forward"
            size={18}
            color={Theme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  card: {
    backgroundColor:
      Theme.colors.secondary,
    borderRadius: 28,
    padding: 22,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  circleTop: {
    position: "absolute",
    top: -40,
    right: -25,
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor:
      "rgba(255,255,255,0.06)",
  },

  circleBottom: {
    position: "absolute",
    bottom: -55,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor:
      "rgba(255,255,255,0.05)",
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor:
      "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 18,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 36,
  },

  subtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: "92%",
  },

  featureRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    flexWrap: "wrap",
  },

  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor:
      "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
  },

  featureText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  button: {
    marginTop: 22,
    height: 54,
    borderRadius: 16,
    backgroundColor:
      Theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  buttonText: {
    color:
      Theme.colors.secondary,
    fontSize: 15,
    fontWeight: "800",
  },
});