// src/components/workflow/StepSafety.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";
import Screen from "../Screen";

type Props = {
  form: any;
  updateForm: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

const RULES = [
  "Cleaning cycle date & time communicated to client",
  "Client informed after reaching site",
  "Admin informed after reaching site",
  "Tool bag available",
  "Wearing all safety equipment",
  "Use less water with maximum cleaning quality",
  "Clean lower edge of modules properly",
  "Capture before & after photos",
  "Capture meter readings and inverter status",
  "Take client signature after completion",
  "Inform manager before site sign off",
];

export default function StepSafety({
  form,
  updateForm,
  onNext,
  onBack,
}: Props) {
  const verified =
    form?.safety?.verified ||
    false;

  const image =
    form?.safety?.image || null;

  const confirmed =
    form?.safety?.confirmed ||
    false;

  const updateSafety = (
    data: any
  ) => {
    updateForm({
      safety: {
        ...form?.safety,
        ...data,
      },
    });
  };

  const toggleSafety = () =>
    updateSafety({
      verified: !verified,
    });

  const toggleConfirm = () =>
    updateSafety({
      confirmed:
        !confirmed,
    });

  const pickImage =
    async () => {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        !permission.granted
      ) {
        Alert.alert(
          "Permission Required",
          "Please allow gallery access."
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync(
          {
            mediaTypes:
              ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
          }
        );

      if (
        !result.canceled
      ) {
        updateSafety({
          image:
            result.assets[0]
              .uri,
        });
      }
    };

  const openCamera =
    async () => {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (
        !permission.granted
      ) {
        Alert.alert(
          "Permission Required",
          "Please allow camera access."
        );
        return;
      }

      const result =
        await ImagePicker.launchCameraAsync(
          {
            quality: 0.7,
            allowsEditing: true,
          }
        );

      if (
        !result.canceled
      ) {
        updateSafety({
          image:
            result.assets[0]
              .uri,
        });
      }
    };

  const chooseImage =
    () => {
      Alert.alert(
        "Upload Safety Image",
        "Choose image source",
        [
          {
            text: "Camera",
            onPress:
              openCamera,
          },
          {
            text: "Gallery",
            onPress:
              pickImage,
          },
          {
            text: "Cancel",
            style:
              "cancel",
          },
        ]
      );
    };

  const removeImage =
    () => {
      updateSafety({
        image: null,
      });
    };

  const handleNext =
    () => {
      if (!verified) {
        Alert.alert(
          "PPE Required",
          "Please verify PPE checked."
        );
        return;
      }

      if (!image) {
        Alert.alert(
          "Upload Required",
          "Please upload safety image."
        );
        return;
      }

      if (!confirmed) {
        Alert.alert(
          "Confirmation Required",
          "Please confirm instructions followed."
        );
        return;
      }

      onNext();
    };

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
        <View
          style={
            styles.hero
          }
        >
          <View
            style={
              styles.heroGlow
            }
          />

          <View
            style={
              styles.heroIcon
            }
          >
            <Ionicons
              name="shield-checkmark"
              size={26}
              color="#fff"
            />
          </View>

          <Text
            style={
              styles.heroTitle
            }
          >
            Safety Verification
          </Text>

          <Text
            style={
              styles.heroSub
            }
          >
            Complete all
            mandatory checks
            before starting
            site work.
          </Text>
        </View>

        {/* PPE */}
        <TouchableOpacity
          style={[
            styles.actionCard,
            verified &&
              styles.actionCardActive,
          ]}
          onPress={
            toggleSafety
          }
          activeOpacity={
            0.88
          }
        >
          <View
            style={
              styles.actionLeft
            }
          >
            <View
              style={[
                styles.iconBox,
                verified &&
                  styles.iconBoxDark,
              ]}
            >
              <Ionicons
                name="construct-outline"
                size={20}
                color={
                  verified
                    ? "#fff"
                    : Theme
                        .colors
                        .accent
                }
              />
            </View>

            <Text
              style={[
                styles.actionText,
                verified &&
                  styles.actionTextActive,
              ]}
            >
              PPE Checked
            </Text>
          </View>

          <Ionicons
            name={
              verified
                ? "checkmark-circle"
                : "ellipse-outline"
            }
            size={24}
            color={
              verified
                ? "#fff"
                : Theme
                    .colors
                    .subText
            }
          />
        </TouchableOpacity>

        {/* RULES */}
        <View
          style={
            styles.card
          }
        >
          <Text
            style={
              styles.cardTitle
            }
          >
            Instructions
          </Text>

          {RULES.map(
            (
              item,
              index
            ) => (
              <View
                key={
                  index
                }
                style={
                  styles.ruleRow
                }
              >
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={
                    Theme
                      .colors
                      .eco
                  }
                />

                <Text
                  style={
                    styles.ruleText
                  }
                >
                  {item}
                </Text>
              </View>
            )
          )}
        </View>

        {/* UPLOAD */}
        <TouchableOpacity
          style={
            styles.uploadCard
          }
          onPress={
            chooseImage
          }
          activeOpacity={
            0.88
          }
        >
          <View
            style={
              styles.uploadIcon
            }
          >
            <Ionicons
              name="camera-outline"
              size={22}
              color={
                Theme
                  .colors
                  .accent
              }
            />
          </View>

          <Text
            style={
              styles.uploadTitle
            }
          >
            {image
              ? "Change Safety Image"
              : "Upload Safety Image"}
          </Text>

          <Text
            style={
              styles.uploadSub
            }
          >
            PPE / Site
            readiness photo
          </Text>
        </TouchableOpacity>

        {/* IMAGE */}
        {image && (
          <View
            style={
              styles.card
            }
          >
            <View
              style={
                styles.previewHead
              }
            >
              <Text
                style={
                  styles.cardTitle
                }
              >
                Uploaded
                Preview
              </Text>

              <TouchableOpacity
                onPress={
                  removeImage
                }
              >
                <Text
                  style={
                    styles.removeText
                  }
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{
                uri: image,
              }}
              style={
                styles.preview
              }
            />
          </View>
        )}

        {/* CONFIRM */}
        <TouchableOpacity
          style={[
            styles.confirmCard,
            confirmed &&
              styles.confirmActive,
          ]}
          onPress={
            toggleConfirm
          }
          activeOpacity={
            0.88
          }
        >
          <Ionicons
            name={
              confirmed
                ? "checkbox"
                : "square-outline"
            }
            size={24}
            color={
              confirmed
                ? "#fff"
                : Theme
                    .colors
                    .primary
            }
          />

          <Text
            style={[
              styles.confirmText,
              confirmed &&
                styles.confirmTextActive,
            ]}
          >
            I confirm that I
            followed all
            instructions
            mentioned above.
          </Text>
        </TouchableOpacity>

        {/* BUTTONS */}
        <View
          style={
            styles.row
          }
        >
          <TouchableOpacity
            style={
              styles.backBtn
            }
            onPress={
              onBack
            }
          >
            <Text
              style={
                styles.backText
              }
            >
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.nextBtn
            }
            onPress={
              handleNext
            }
          >
            <Text
              style={
                styles.nextText
              }
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
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
      right: -25,
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
      color:
        Theme.colors.textInverse,
      fontSize: 24,
      fontWeight: "800",
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

    cardTitle: {
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 14,
    },

    actionCard: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius:
        Theme.radius.lg,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    actionCardActive: {
      backgroundColor:
        Theme.colors.primary,
      borderColor:
        Theme.colors.primary,
    },

    actionLeft: {
      flexDirection:
        "row",
      alignItems:
        "center",
      gap: 12,
    },

    iconBox: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor:
        Theme.colors.accentSoft,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    iconBoxDark: {
      backgroundColor:
        "rgba(255,255,255,0.14)",
    },

    actionText: {
      fontWeight: "700",
      fontSize: 15,
      color:
        Theme.colors.text,
    },

    actionTextActive: {
      color:
        Theme.colors.textInverse,
    },

    ruleRow: {
      flexDirection:
        "row",
      alignItems:
        "flex-start",
      gap: 10,
      marginBottom: 12,
    },

    ruleText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 22,
      color:
        Theme.colors.text,
    },

    uploadCard: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius:
        Theme.radius.lg,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1.4,
      borderStyle:
        "dashed",
      borderColor:
        Theme.colors.accent,
      alignItems:
        "center",
    },

    uploadIcon: {
      width: 52,
      height: 52,
      borderRadius: 18,
      backgroundColor:
        Theme.colors.accentSoft,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    uploadTitle: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    uploadSub: {
      marginTop: 4,
      fontSize: 13,
      color:
        Theme.colors.subText,
    },

    previewHead: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 12,
    },

    removeText: {
      color:
        Theme.colors.danger,
      fontWeight: "700",
    },

    preview: {
      width: "100%",
      height: 230,
      borderRadius: 18,
    },

    confirmCard: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius:
        Theme.radius.lg,
      padding: 16,
      marginBottom: 18,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      flexDirection:
        "row",
      gap: 12,
      alignItems:
        "flex-start",
    },

    confirmActive: {
      backgroundColor:
        Theme.colors.eco,
      borderColor:
        Theme.colors.eco,
    },

    confirmText: {
      flex: 1,
      lineHeight: 22,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    confirmTextActive: {
      color:
        "#fff",
    },

    row: {
      flexDirection:
        "row",
      gap: 12,
    },

    backBtn: {
      flex: 1,
      backgroundColor:
        Theme.colors.surface,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      padding: 16,
      borderRadius:
        Theme.radius.md,
      alignItems:
        "center",
    },

    backText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    nextBtn: {
      flex: 1,
      backgroundColor:
        Theme.colors.accent,
      padding: 16,
      borderRadius:
        Theme.radius.md,
      alignItems:
        "center",
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

    nextText: {
      color:
        "#fff",
      fontWeight: "800",
    },
  });