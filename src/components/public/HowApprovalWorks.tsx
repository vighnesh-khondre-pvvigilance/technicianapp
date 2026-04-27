// src/components/public/HowApprovalWorks.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

const steps = [
  {
    icon: "person-add-outline",
    title: "Apply Online",
    desc: "Submit your basic details and start your application.",
  },
  {
    icon: "document-text-outline",
    title: "Complete Profile",
    desc: "Add skills, experience, city, and work preferences.",
  },
  {
    icon: "cloud-upload-outline",
    title: "Upload Documents",
    desc: "Upload Aadhaar, PAN, and profile photo for verification.",
  },
  {
    icon: "school-outline",
    title: "Finish Training",
    desc: "Complete onboarding modules and basic safety learning.",
  },
  {
    icon: "call-outline",
    title: "Verification Review",
    desc: "Our team reviews your profile and may contact you.",
  },
  {
    icon: "checkmark-done-outline",
    title: "Get Approved",
    desc: "Receive technician credentials and start getting jobs.",
  },
];

export default function HowApprovalWorks() {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>
        Process
      </Text>

      <Text style={styles.title}>
        How Approval Works
      </Text>

      <Text style={styles.sub}>
        A simple onboarding process
        to verify and activate
        technicians quickly.
      </Text>

      <View style={styles.list}>
        {steps.map(
          (step, index) => (
            <View
              key={step.title}
              style={styles.row}
            >
              <View
                style={
                  styles.leftCol
                }
              >
                <View
                  style={
                    styles.number
                  }
                >
                  <Text
                    style={
                      styles.numberText
                    }
                  >
                    {index + 1}
                  </Text>
                </View>

                {index !==
                  steps.length -
                    1 && (
                  <View
                    style={
                      styles.line
                    }
                  />
                )}
              </View>

              <View
                style={
                  styles.content
                }
              >
                <View
                  style={
                    styles.iconWrap
                  }
                >
                  <Ionicons
                    name={
                      step.icon as any
                    }
                    size={18}
                    color={
                      Theme.colors.primary
                    }
                  />
                </View>

                <View
                  style={
                    styles.textWrap
                  }
                >
                  <Text
                    style={
                      styles.stepTitle
                    }
                  >
                    {step.title}
                  </Text>

                  <Text
                    style={
                      styles.stepDesc
                    }
                  >
                    {step.desc}
                  </Text>
                </View>
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        Theme.colors.card,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
    },

    kicker: {
      fontSize: 12,
      fontWeight: "800",
      color:
        Theme.colors.primary,
      textTransform:
        "uppercase",
      letterSpacing: 0.4,
    },

    title: {
      fontSize: 24,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginTop: 6,
    },

    sub: {
      marginTop: 8,
      marginBottom: 18,
      color:
        Theme.colors.subtext,
      lineHeight: 20,
    },

    list: {
      gap: 10,
    },

    row: {
      flexDirection: "row",
      alignItems: "stretch",
    },

    leftCol: {
      width: 34,
      alignItems: "center",
    },

    number: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor:
        Theme.colors.primary,
      alignItems: "center",
      justifyContent:
        "center",
    },

    numberText: {
      color:
        Theme.colors.secondary,
      fontWeight: "900",
      fontSize: 12,
    },

    line: {
      width: 2,
      flex: 1,
      backgroundColor:
        Theme.colors.border,
      marginTop: 6,
      marginBottom: -6,
    },

    content: {
      flex: 1,
      flexDirection: "row",
      gap: 12,
      backgroundColor:
        "#F8FAFC",
      borderRadius: 18,
      padding: 14,
      marginLeft: 8,
    },

    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: "center",
      justifyContent:
        "center",
      backgroundColor:
        "rgba(245,158,11,0.12)",
    },

    textWrap: {
      flex: 1,
    },

    stepTitle: {
      fontSize: 15,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 4,
    },

    stepDesc: {
      fontSize: 13,
      lineHeight: 19,
      color:
        Theme.colors.subtext,
    },
  });