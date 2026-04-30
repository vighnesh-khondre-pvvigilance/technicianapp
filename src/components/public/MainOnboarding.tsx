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
  ZoomIn,
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
        backgroundColor={Theme.colors.background}
        barStyle="dark-content"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP HEADER */}
        <Animated.View entering={FadeInDown.delay(80)}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.brand}>PVprotech</Text>
              <Text style={styles.caption}>
                India’s Premium Solar Technician Network
              </Text>
            </View>

            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Hiring</Text>
            </View>
          </View>
        </Animated.View>

        {/* HERO */}
        <Animated.View entering={FadeInUp.delay(130)}>
          <HeroBanner />
        </Animated.View>

        {/* TRUST STRIP */}
        <Animated.View entering={FadeInUp.delay(180)}>
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Ionicons
                name="shield-checkmark"
                size={15}
                color={Theme.colors.eco}
              />
              <Text style={styles.trustText}>Verified</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.trustItem}>
              <Ionicons
                name="people"
                size={15}
                color={Theme.colors.info}
              />
              <Text style={styles.trustText}>100+ Techs</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.trustItem}>
              <Ionicons
                name="star"
                size={15}
                color={Theme.colors.accent}
              />
              <Text style={styles.trustText}>4.9 Rated</Text>
            </View>
          </View>
        </Animated.View>

        {/* STATS */}
        <Animated.View entering={FadeInUp.delay(230)}>
          <StatsStrip />
        </Animated.View>

        {/* CONTENT BLOCKS */}
        <Animated.View entering={FadeInUp.delay(280)}>
          <WhoCanJoin />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(330)}>
          <WhyWorkWithUs />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(380)}>
          <WhatWorkYoullDo />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(430)}>
          <HowApprovalWorks />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(480)}>
          <TechnicianStories />
        </Animated.View>

        {/* FINAL TESLA CTA */}
        <Animated.View entering={ZoomIn.delay(550)}>
          <View style={styles.ctaCard}>
            <View style={styles.ribbon}>
              <Ionicons
                name="flash"
                size={14}
                color={Theme.colors.textInverse}
              />
              <Text style={styles.ribbonText}>
                Limited Openings
              </Text>
            </View>

            <Text style={styles.ctaTitle}>
              Build Your Solar Career
            </Text>

            <Text style={styles.ctaSub}>
              Join one of India’s fastest-growing
              technician networks and access
              verified premium field jobs.
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
                size={18}
                color={Theme.colors.primary}
              />

              <Text style={styles.secondaryText}>
                Technician Login
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* FOOTER */}
        <Animated.View entering={FadeInUp.delay(620)}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Trusted by solar professionals across India
            </Text>
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
    paddingTop: 16,
    paddingBottom: 60,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  brand: {
    fontSize: 32,
    fontWeight: "900",
    color: Theme.colors.primary,
    letterSpacing: -0.8,
  },

  caption: {
    marginTop: 4,
    fontSize: 13,
    color: Theme.colors.subText,
    fontWeight: "600",
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Theme.colors.ecoSoft,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: Theme.colors.eco,
  },

  liveText: {
    fontSize: 12,
    fontWeight: "900",
    color: Theme.colors.eco,
  },

  trustRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
  },

  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  trustText: {
    fontSize: 12,
    fontWeight: "800",
    color: Theme.colors.subText,
  },

  divider: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: Theme.colors.border,
    marginHorizontal: 12,
  },

  ctaCard: {
    marginTop: 16,
    backgroundColor: Theme.colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: Theme.colors.border,

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 6,
  },

  ribbon: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 16,
  },

  ribbonText: {
    color: Theme.colors.textInverse,
    fontWeight: "900",
    fontSize: 12,
  },

  ctaTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: Theme.colors.text,
    letterSpacing: -0.5,
  },

  ctaSub: {
    marginTop: 8,
    marginBottom: 18,
    color: Theme.colors.subText,
    fontSize: 14,
    lineHeight: 22,
  },

  primaryBtn: {
    height: 58,
    borderRadius: 18,
    backgroundColor: Theme.colors.accent,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    marginBottom: 12,
  },

  primaryText: {
    fontSize: 15,
    fontWeight: "900",
    color: Theme.colors.text,
  },

  secondaryBtn: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surfaceAlt,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: "800",
    color: Theme.colors.primary,
  },

  footer: {
    alignItems: "center",
    marginTop: 22,
  },

  footerText: {
    fontSize: 12,
    color: Theme.colors.subText,
    fontWeight: "600",
  },
});