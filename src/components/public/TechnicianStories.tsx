// src/components/public/TechnicianStories.tsx

import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

const stories = [
  {
    name: "Rahul Patil",
    city: "Pune",
    role: "Solar Technician",
    quote:
      "Started with small service visits and now I get regular monthly work through the network.",
    rating: 5,
  },
  {
    name: "Akash Sharma",
    city: "Nashik",
    role: "Electrical Technician",
    quote:
      "Training helped me shift from basic electrical jobs into better solar opportunities.",
    rating: 5,
  },
  {
    name: "Imran Shaikh",
    city: "Mumbai",
    role: "Field Partner",
    quote:
      "Professional support, clear instructions, and timely payments made a big difference.",
    rating: 5,
  },
];

export default function TechnicianStories() {
  return (
    <View style={styles.section}>
      <Text style={styles.kicker}>
        Testimonials
      </Text>

      <Text style={styles.title}>
        Technician Stories
      </Text>

      <Text style={styles.sub}>
        Real feedback from growing
        field professionals working
        with us.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollWrap
        }
      >
        {stories.map((item) => (
          <View
            key={item.name}
            style={styles.card}
          >
            {/* Header */}
            <View style={styles.topRow}>
              <View
                style={styles.avatar}
              >
                <Text
                  style={
                    styles.avatarText
                  }
                >
                  {item.name
                    .split(" ")
                    .map(
                      (n) =>
                        n[0]
                    )
                    .join("")
                    .slice(
                      0,
                      2
                    )}
                </Text>
              </View>

              <View
                style={styles.info}
              >
                <Text
                  style={
                    styles.name
                  }
                >
                  {item.name}
                </Text>

                <Text
                  style={
                    styles.meta
                  }
                >
                  {item.role} •{" "}
                  {item.city}
                </Text>
              </View>
            </View>

            {/* Stars */}
            <View style={styles.stars}>
              {Array.from({
                length:
                  item.rating,
              }).map(
                (_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={14}
                    color={
                      Theme.colors
                        .accent
                    }
                  />
                )
              )}
            </View>

            {/* Quote */}
            <Text style={styles.quote}>
              “{item.quote}”
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles =
  StyleSheet.create({
    section: {
      marginBottom: 18,
    },

    kicker: {
      fontSize: 12,
      fontWeight: "900",
      color:
        Theme.colors.primary,
      textTransform:
        "uppercase",
      letterSpacing: 0.7,
      marginBottom: 6,
    },

    title: {
      fontSize: 24,
      fontWeight: "900",
      color:
        Theme.colors.text,
    },

    sub: {
      marginTop: 8,
      marginBottom: 16,
      color:
        Theme.colors.subText,
      lineHeight: 21,
      fontSize: 14,
    },

    scrollWrap: {
      paddingRight: 6,
    },

    card: {
      width: 305,
      backgroundColor:
        Theme.colors.surface,
      borderRadius:
        Theme.radius.xl,
      padding: 18,
      marginRight: 14,

      borderWidth: 1,
      borderColor:
        Theme.colors.border,

      shadowColor:
        Theme.colors.shadow,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 3,
    },

    topRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor:
        Theme.colors.primary,
      alignItems: "center",
      justifyContent:
        "center",
    },

    avatarText: {
      color:
        Theme.colors
          .textInverse,
      fontWeight: "900",
      fontSize: 14,
    },

    info: {
      flex: 1,
    },

    name: {
      fontSize: 15,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    meta: {
      marginTop: 4,
      fontSize: 12,
      fontWeight: "600",
      color:
        Theme.colors.subText,
    },

    stars: {
      flexDirection: "row",
      gap: 4,
      marginTop: 14,
      marginBottom: 12,
    },

    quote: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: "500",
      color:
        Theme.colors
          .textSecondary,
    },
  });