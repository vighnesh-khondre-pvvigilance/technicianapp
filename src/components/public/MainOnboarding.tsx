// src/components/public/MainOnboarding.tsx

import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

import HeroBanner from "./HeroBanner";
import StatsStrip from "./StatsStrip";
import WhoCanJoin from "./WhoCanJoin";
import WhyWorkWithUs from "./WhyWorkWithUs";
import WhatWorkYoullDo from "./WhatWorkYoullDo";
import HowApprovalWorks from "./HowApprovalWorks";
import TechnicianStories from "./TechnicianStories";

import { Theme } from "../../theme/theme";

export default function MainOnboarding() {
  const router = useRouter();

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={
          Theme.colors.background
        }
        barStyle="dark-content"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Animated.View entering={FadeInDown.delay(100)}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.brand}>PVprotech</Text>
              <Text style={styles.caption}>
                Premium Solar Technician Network
              </Text>
            </View>

            <View style={styles.badge}>
              <View style={styles.dot} />
              <Text style={styles.badgeText}>Hiring</Text>
            </View>
          </View>
        </Animated.View>

        {/* HERO */}
        <Animated.View entering={FadeInUp.delay(150)}>
          <HeroBanner />
        </Animated.View>

        {/* TRUST */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Ionicons
                name="shield-checkmark"
                size={15}
                color={Theme.colors.eco}
              />
              <Text style={styles.trustText}>Verified</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.trustItem}>
              <Ionicons
                name="people"
                size={15}
                color={Theme.colors.info}
              />
              <Text style={styles.trustText}>100+ Techs</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.trustItem}>
              <Ionicons
                name="star"
                size={15}
                color={Theme.colors.accent}
              />
              <Text style={styles.trustText}>Top Rated</Text>
            </View>
          </View>
        </Animated.View>

        {/* STATS */}
        <Animated.View entering={FadeInUp.delay(250)}>
          <StatsStrip />
        </Animated.View>

        {/* SECTIONS */}
        <Animated.View entering={FadeInUp.delay(300)}>
          <WhoCanJoin />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(350)}>
          <WhyWorkWithUs />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400)}>
          <WhatWorkYoullDo />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(450)}>
          <HowApprovalWorks />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500)}>
          <TechnicianStories />
        </Animated.View>

        {/* CTA */}
        <Animated.View entering={FadeInUp.delay(550)}>
          <View style={styles.card}>
            <View style={styles.smallBadge}>
              <Ionicons
                name="flash-outline"
                size={14}
                color={Theme.colors.textInverse}
              />
              <Text style={styles.smallBadgeText}>
                Limited Openings
              </Text>
            </View>

            <Text style={styles.title}>
              Ready to Start?
            </Text>

            <Text style={styles.sub}>
              Join one of India’s fastest-growing
              solar technician networks and unlock
              premium field opportunities.
            </Text>

            <TouchableOpacity
              activeOpacity={0.92}
              style={styles.primaryBtn}
              onPress={() =>
                router.push("/(public)/training")
              }
            >
              <Text style={styles.primaryText}>
                Start Training
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color={Theme.colors.textInverse}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() =>
                router.push("/(public)/login")
              }
            >
              <Ionicons
                name="log-in-outline"
                size={17}
                color={Theme.colors.primary}
              />

              <Text style={styles.secondaryText}>
                Technician Login
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  content: {
    paddingHorizontal: Theme.spacing.sm,
    paddingTop: 14,
    paddingBottom: 50,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },

  brand: {
    fontSize: 30,
    fontWeight: "900",
    color: Theme.colors.primary,
    letterSpacing: -0.6,
  },

  caption: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.subText,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Theme.colors.ecoSoft,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: Theme.colors.eco,
  },

  badgeText: {
    color: Theme.colors.eco,
    fontSize: 12,
    fontWeight: "800",
  },

  trustRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },

  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  trustText: {
    fontSize: 12,
    fontWeight: "700",
    color: Theme.colors.subText,
  },

  separator: {
    width: 4,
    height: 4,
    borderRadius: 99,
    backgroundColor: Theme.colors.border,
    marginHorizontal: 12,
  },

  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    padding: 22,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 4,
  },

  smallBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: Theme.spacing.md,
  },

  smallBadgeText: {
    color: Theme.colors.textInverse,
    fontSize: 12,
    fontWeight: "800",
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: Theme.colors.text,
  },

  sub: {
    marginTop: 8,
    marginBottom: Theme.spacing.md,
    lineHeight: 22,
    fontSize: 14,
    color: Theme.colors.subText,
  },

  primaryBtn: {
    height: 56,
    borderRadius: Theme.radius.lg,
    backgroundColor: Theme.colors.accent,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    marginBottom: 12,
  },

  primaryText: {
    color: Theme.colors.text,
    fontSize: 15,
    fontWeight: "900",
  },

  secondaryBtn: {
    height: 52,
    borderRadius: Theme.radius.md,
    backgroundColor: Theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Theme.colors.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  secondaryText: {
    color: Theme.colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
});