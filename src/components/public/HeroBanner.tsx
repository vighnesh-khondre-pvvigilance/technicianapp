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
import Animated, {
  FadeInUp,
} from "react-native-reanimated";

import { Theme } from "../../theme/theme";

export default function HeroBanner() {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInUp.delay(120)}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        {/* Decorative Shapes */}
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        {/* Badge */}
        <View style={styles.badge}>
          <Ionicons
            name="shield-checkmark-outline"
            size={14}
            color={Theme.colors.textInverse}
          />
          <Text style={styles.badgeText}>
            Verified Technician Network
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Become a Premium{"\n"}
          Solar Technician
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Complete onboarding, finish training,
          get verified, and start receiving
          trusted field jobs near you.
        </Text>

        {/* Highlights */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              ₹35K+
            </Text>
            <Text style={styles.statLabel}>
              Earnings
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              100+
            </Text>
            <Text style={styles.statLabel}>
              Active Techs
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              Fast
            </Text>
            <Text style={styles.statLabel}>
              Approval
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featureWrap}>
          <View style={styles.featureChip}>
            <Ionicons
              name="cash-outline"
              size={14}
              color={Theme.colors.textInverse}
            />
            <Text style={styles.featureText}>
              Better Pay
            </Text>
          </View>

          <View style={styles.featureChip}>
            <Ionicons
              name="location-outline"
              size={14}
              color={Theme.colors.textInverse}
            />
            <Text style={styles.featureText}>
              Nearby Jobs
            </Text>
          </View>

          <View style={styles.featureChip}>
            <Ionicons
              name="flash-outline"
              size={14}
              color={Theme.colors.textInverse}
            />
            <Text style={styles.featureText}>
              Quick Join
            </Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          activeOpacity={0.92}
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
            color={Theme.colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.note}>
          No joining fee • Limited openings
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Theme.spacing.lg,
  },

  card: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radius.xl,
    padding: 22,
    overflow: "hidden",

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 7,
  },

  glowTop: {
    position: "absolute",
    top: -35,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor:
      "rgba(255,255,255,0.07)",
  },

  glowBottom: {
    position: "absolute",
    bottom: -45,
    left: -25,
    width: 120,
    height: 120,
    borderRadius: 999,
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
    color: Theme.colors.textInverse,
    fontSize: 12,
    fontWeight: "800",
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
    color: Theme.colors.textInverse,
    letterSpacing: -0.6,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color:
      "rgba(255,255,255,0.78)",
    maxWidth: "94%",
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  statCard: {
    flex: 1,
    borderRadius: Theme.radius.lg,
    paddingVertical: 12,
    backgroundColor:
      "rgba(255,255,255,0.10)",
    alignItems: "center",
  },

  statValue: {
    fontSize: 16,
    fontWeight: "900",
    color: Theme.colors.textInverse,
  },

  statLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    color:
      "rgba(255,255,255,0.65)",
  },

  featureWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
  },

  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: Theme.radius.md,
    backgroundColor:
      "rgba(255,255,255,0.10)",
  },

  featureText: {
    color: Theme.colors.textInverse,
    fontSize: 13,
    fontWeight: "700",
  },

  button: {
    marginTop: 22,
    height: 56,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.accent,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  buttonText: {
    color: Theme.colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },

  note: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color:
      "rgba(255,255,255,0.55)",
  },
});