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
      ? "#2563EB"
      : status === "Approved"
      ? "#16A34A"
      : "#F59E0B";

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 28,
        }}
      >
        {/* HERO */}
        <View style={styles.hero}>
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
            Review assigned work
            details before starting
            the task.
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
                    `${statusColor}15`,
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
            Approve & Continue
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
            Theme.colors.primary
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
        Theme.colors.secondary,
      borderRadius: 22,
      padding: 20,
      marginBottom: 16,
    },

    heroIcon: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor:
        "rgba(255,255,255,0.15)",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 14,
    },

    heroTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: "#fff",
    },

    heroSub: {
      color: "#CBD5E1",
      marginTop: 6,
      lineHeight: 22,
      fontSize: 14,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        "#EEF2F7",
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
      paddingVertical: 6,
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
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor:
        "#FFF7ED",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    label: {
      fontSize: 12,
      color:
        Theme.colors.subtext,
      marginBottom: 3,
      fontWeight: "700",
      textTransform:
        "uppercase",
      letterSpacing: 0.4,
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
        Theme.colors.text,
    },

    image: {
      width: "100%",
      height: 220,
      borderRadius: 18,
    },

    btn: {
      backgroundColor:
        Theme.colors.primary,
      padding: 17,
      borderRadius: 18,
      flexDirection: "row",
      justifyContent:
        "center",
      alignItems:
        "center",
      gap: 8,
      marginTop: 4,
    },

    btnText: {
      color: "#fff",
      fontWeight: "800",
      fontSize: 15,
    },
  });