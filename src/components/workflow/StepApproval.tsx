// src/components/workflow/StepApproval.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";
import Screen from "../Screen";

export default function StepApproval({
  visit,
  onNext,
}: any) {
  const status =
    visit?.status || "Pending";

  const statusColor =
    status === "Assigned"
      ? Theme.colors.info
      : status === "Approved"
      ? Theme.colors.eco
      : Theme.colors.warning;

  const statusBg =
    status === "Assigned"
      ? Theme.colors.infoSoft
      : status === "Approved"
      ? Theme.colors.ecoSoft
      : Theme.colors.warningSoft;

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 32,
        }}
      >
        {/* HERO */}
        <View style={styles.hero}>
          <View
            style={styles.heroGlow}
          />

          <View
            style={styles.heroIcon}
          >
            <Ionicons
              name="clipboard"
              size={24}
              color="#fff"
            />
          </View>

          <Text
            style={styles.heroTitle}
          >
            Job Approval
          </Text>

          <Text
            style={styles.heroSub}
          >
            Review task details,
            verify site info and
            continue workflow.
          </Text>
        </View>

        {/* STATUS */}
        <View style={styles.card}>
          <View
            style={
              styles.statusRow
            }
          >
            <Text
              style={
                styles.sectionTitle
              }
            >
              Work Status
            </Text>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    statusBg,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color:
                      statusColor,
                  },
                ]}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>

        {/* JOB DETAILS */}
        <View style={styles.card}>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Job Details
          </Text>

          <InfoRow
            icon="briefcase-outline"
            label="Work Title"
            value={
              visit?.title || "-"
            }
          />

          <InfoRow
            icon="business-outline"
            label="Plant Name"
            value={
              visit?.plantName ||
              "-"
            }
          />

          <InfoRow
            icon="person-outline"
            label="Owner Name"
            value={
              visit?.ownerName ||
              "-"
            }
          />

          <InfoRow
            icon="flash-outline"
            label="Capacity"
            value={
              visit?.capacity ||
              "-"
            }
          />

          <InfoRow
            icon="calendar-outline"
            label="Assigned Date"
            value={
              visit?.assignedDate ||
              "-"
            }
          />

          <InfoRow
            icon="location-outline"
            label="Location"
            value={
              visit?.location ||
              "-"
            }
          />
        </View>

        {/* NOTES */}
        <View style={styles.card}>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Task Notes
          </Text>

          <Text
            style={
              styles.notesText
            }
          >
            {visit?.issue ||
              "No additional notes available."}
          </Text>
        </View>

        {/* IMAGE */}
        {visit?.beforeImage ? (
          <View
            style={styles.card}
          >
            <Text
              style={
                styles.sectionTitle
              }
            >
              Existing Condition
            </Text>

            <Image
              source={{
                uri: visit.beforeImage,
              }}
              style={
                styles.image
              }
            />
          </View>
        ) : null}

        {/* CTA */}
        <TouchableOpacity
          style={styles.btn}
          onPress={onNext}
          activeOpacity={0.9}
        >
          <Text
            style={
              styles.btnText
            }
          >
            Approve &
            Continue
          </Text>

          <Ionicons
            name="arrow-forward"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: any) {
  return (
    <View style={styles.infoRow}>
      <View
        style={
          styles.iconWrap
        }
      >
        <Ionicons
          name={icon}
          size={18}
          color={
            Theme.colors.accent
          }
        />
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={
            styles.label
          }
        >
          {label}
        </Text>

        <Text
          style={
            styles.value
          }
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    hero: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius:
        Theme.radius.xl,
      padding: 22,
      marginBottom: 16,
      overflow:
        "hidden",
    },

    heroGlow: {
      position:
        "absolute",
      top: -30,
      right: -20,
      width: 130,
      height: 130,
      borderRadius: 100,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    heroIcon: {
      width: 54,
      height: 54,
      borderRadius: 18,
      backgroundColor:
        "rgba(255,255,255,0.14)",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 14,
    },

    heroTitle: {
      fontSize: 24,
      fontWeight: "800",
      color:
        Theme.colors.textInverse,
    },

    heroSub: {
      color:
        "#CBD5E1",
      marginTop: 6,
      fontSize: 14,
      lineHeight: 22,
    },

    card: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius:
        Theme.radius.lg,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors.borderLight,
      shadowColor:
        Theme.colors.shadow,
      shadowOpacity: 0.04,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 2,
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 14,
    },

    statusRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    badge: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 999,
    },

    badgeText: {
      fontSize: 12,
      fontWeight: "800",
    },

    infoRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 16,
      alignItems:
        "flex-start",
    },

    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor:
        Theme.colors.accentSoft,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    label: {
      fontSize: 11,
      color:
        Theme.colors.subText,
      marginBottom: 4,
      fontWeight: "700",
      textTransform:
        "uppercase",
      letterSpacing: 0.5,
    },

    value: {
      fontSize: 15,
      fontWeight: "700",
      color:
        Theme.colors.text,
      lineHeight: 22,
    },

    notesText: {
      fontSize: 15,
      lineHeight: 24,
      color:
        Theme.colors.textSecondary,
    },

    image: {
      width: "100%",
      height: 220,
      borderRadius: 18,
    },

    btn: {
      backgroundColor:
        Theme.colors.accent,
      padding: 18,
      borderRadius:
        Theme.radius.lg,
      flexDirection: "row",
      justifyContent:
        "center",
      alignItems:
        "center",
      gap: 8,
      marginTop: 4,
      shadowColor:
        Theme.colors.accent,
      shadowOpacity: 0.18,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 4,
    },

    btnText: {
      color:
        Theme.colors.textInverse,
      fontWeight: "800",
      fontSize: 15,
    },
  });