// src/components/workflow/StepUpload.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";
import Screen from "../Screen";

export default function StepUpload({
  form,
  updateForm,
  onNext,
  onBack,
}: any) {
  const uploads = form?.uploads || {};

  const FIELDS = [
    {
      title: "Client Signature",
      field: "clientSignature",
      icon: "create-outline",
    },
    {
      title: "Extra Photo",
      field: "extraPhoto",
      icon: "image-outline",
    },
    {
      title: "Inverter Photo",
      field: "inverterPhoto",
      icon: "flash-outline",
    },
    {
      title: "Import Meter",
      field: "importPhoto",
      icon: "speedometer-outline",
    },
    {
      title: "Export Meter",
      field: "exportPhoto",
      icon: "speedometer-outline",
    },
    {
      title: "Net Meter",
      field: "netPhoto",
      icon: "analytics-outline",
    },
    {
      title: "Generation Meter",
      field: "generationPhoto",
      icon: "bar-chart-outline",
    },
  ];

  const pickImage = async (
    field: string
  ) => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

    if (!result.canceled) {
      saveImage(
        field,
        result.assets[0].uri
      );
    }
  };

  const openCamera = async (
    field: string
  ) => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow camera access."
      );
      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        quality: 0.8,
        allowsEditing: true,
      });

    if (!result.canceled) {
      saveImage(
        field,
        result.assets[0].uri
      );
    }
  };

  const saveImage = (
    field: string,
    uri: string
  ) => {
    updateForm({
      uploads: {
        ...uploads,
        [field]: uri,
      },
    });
  };

  const removeImage = (
    field: string
  ) => {
    updateForm({
      uploads: {
        ...uploads,
        [field]: null,
      },
    });
  };

  const chooseImage = (
    field: string
  ) => {
    Alert.alert(
      "Upload Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: () =>
            openCamera(field),
        },
        {
          text: "Gallery",
          onPress: () =>
            pickImage(field),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const completed =
    FIELDS.filter(
      (item) =>
        uploads[item.field]
    ).length;

  const UploadCard = ({
    title,
    field,
    icon,
  }: any) => {
    const image =
      uploads[field];

    return (
      <View style={styles.card}>
        <View
          style={styles.topRow}
        >
          <View
            style={
              styles.iconBox
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
                styles.cardTitle
              }
            >
              {title}
            </Text>

            <Text
              style={
                styles.cardSub
              }
            >
              {image
                ? "Uploaded successfully"
                : "Required upload"}
            </Text>
          </View>

          <View
            style={[
              styles.status,
              image &&
                styles.statusDone,
            ]}
          >
            <Ionicons
              name={
                image
                  ? "checkmark"
                  : "add"
              }
              size={18}
              color={
                image
                  ? "#fff"
                  : Theme.colors.text
              }
            />
          </View>
        </View>

        {!image ? (
          <TouchableOpacity
            style={
              styles.uploadBox
            }
            onPress={() =>
              chooseImage(
                field
              )
            }
          >
            <Ionicons
              name="cloud-upload-outline"
              size={28}
              color={
                Theme.colors.primary
              }
            />

            <Text
              style={
                styles.uploadText
              }
            >
              Upload Image
            </Text>

            <Text
              style={
                styles.uploadSub
              }
            >
              Camera or Gallery
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <Image
              source={{
                uri: image,
              }}
              style={
                styles.preview
              }
            />

            <View
              style={
                styles.actionRow
              }
            >
              <TouchableOpacity
                style={
                  styles.lightBtn
                }
                onPress={() =>
                  chooseImage(
                    field
                  )
                }
              >
                <Text
                  style={
                    styles.lightText
                  }
                >
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.deleteBtn
                }
                onPress={() =>
                  removeImage(
                    field
                  )
                }
              >
                <Text
                  style={
                    styles.deleteText
                  }
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
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
        <LinearGradient
          colors={[
            Theme.colors.primary,
            "#111827",
          ]}
          style={styles.hero}
        >
          <View
            style={
              styles.heroIcon
            }
          >
            <Ionicons
              name="cloud-upload"
              size={24}
              color="#fff"
            />
          </View>

          <Text
            style={
              styles.heroTitle
            }
          >
            Upload Documents
          </Text>

          <Text
            style={
              styles.heroSub
            }
          >
            Submit all required
            photos and proofs for
            job completion.
          </Text>

          <View
            style={
              styles.progressRow
            }
          >
            <Text
              style={
                styles.progressText
              }
            >
              {completed}/
              {FIELDS.length}
              Completed
            </Text>
          </View>
        </LinearGradient>

        {/* LIST */}
        {FIELDS.map((item) => (
          <UploadCard
            key={item.field}
            title={item.title}
            field={item.field}
            icon={item.icon}
          />
        ))}

        {/* ACTIONS */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBack}
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
            style={{
              flex: 1,
            }}
            onPress={onNext}
          >
            <LinearGradient
              colors={[
                "#F59E0B",
                "#D97706",
              ]}
              style={
                styles.nextBtn
              }
            >
              <Text
                style={
                  styles.nextText
                }
              >
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    hero: {
      padding: 20,
      borderRadius: 24,
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
      color: "#fff",
      fontSize: 24,
      fontWeight: "800",
    },

    heroSub: {
      color: "#CBD5E1",
      marginTop: 6,
      lineHeight: 22,
    },

    progressRow: {
      marginTop: 14,
    },

    progressText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 13,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 22,
      padding: 14,
      marginBottom: 14,
      borderWidth: 1,
      borderColor:
        "#EEF2F7",
    },

    topRow: {
      flexDirection: "row",
      alignItems:
        "center",
      gap: 12,
      marginBottom: 14,
    },

    iconBox: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        "#FFF7ED",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    cardTitle: {
      fontSize: 15,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    cardSub: {
      marginTop: 4,
      fontSize: 12,
      color:
        Theme.colors.subText,
    },

    status: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor:
        "#F1F5F9",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    statusDone: {
      backgroundColor:
        "#16A34A",
    },

    uploadBox: {
      height: 150,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor:
        "#E5E7EB",
      borderStyle:
        "dashed",
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "#FAFAFA",
    },

    uploadText: {
      marginTop: 10,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    uploadSub: {
      marginTop: 4,
      fontSize: 12,
      color:
        Theme.colors.subtext,
    },

    preview: {
      width: "100%",
      height: 210,
      borderRadius: 18,
    },

    actionRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 12,
    },

    lightBtn: {
      flex: 1,
      padding: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      alignItems:
        "center",
    },

    lightText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    deleteBtn: {
      flex: 1,
      padding: 14,
      borderRadius: 14,
      backgroundColor:
        "#FEF2F2",
      alignItems:
        "center",
    },

    deleteText: {
      fontWeight: "700",
      color: "#DC2626",
    },

    row: {
      flexDirection: "row",
      gap: 12,
      marginTop: 8,
    },

    backBtn: {
      flex: 1,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      alignItems:
        "center",
      justifyContent:
        "center",
      backgroundColor:
        "#fff",
    },

    backText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    nextBtn: {
      padding: 16,
      borderRadius: 16,
      alignItems:
        "center",
    },

    nextText: {
      color: "#fff",
      fontWeight: "800",
      fontSize: 15,
    },
  });