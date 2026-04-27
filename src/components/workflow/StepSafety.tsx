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
  const verified = form?.safety?.verified || false;
  const image = form?.safety?.image || null;
  const confirmed = form?.safety?.confirmed || false;

  const updateSafety = (data: any) => {
    updateForm({
      safety: {
        ...form?.safety,
        ...data,
      },
    });
  };

  const toggleSafety = () =>
    updateSafety({ verified: !verified });

  const toggleConfirm = () =>
    updateSafety({ confirmed: !confirmed });

  const pickImage = async () => {
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
        quality: 0.7,
        allowsEditing: true,
      });

    if (!result.canceled) {
      updateSafety({
        image: result.assets[0].uri,
      });
    }
  };

  const openCamera = async () => {
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
        quality: 0.7,
        allowsEditing: true,
      });

    if (!result.canceled) {
      updateSafety({
        image: result.assets[0].uri,
      });
    }
  };

  const chooseImage = () => {
    Alert.alert(
      "Upload Safety Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: openCamera,
        },
        {
          text: "Gallery",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const removeImage = () => {
    updateSafety({ image: null });
  };

  const handleNext = () => {
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 28,
        }}
      >
        {/* HEADER */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="shield-checkmark"
              size={26}
              color="#fff"
            />
          </View>

          <Text style={styles.heroTitle}>
            Safety Verification
          </Text>

          <Text style={styles.heroSub}>
            Complete all required checks
            before continuing.
          </Text>
        </View>

        {/* PPE CARD */}
        <TouchableOpacity
          style={[
            styles.actionCard,
            verified &&
              styles.actionCardActive,
          ]}
          onPress={toggleSafety}
          activeOpacity={0.85}
        >
          <View style={styles.actionLeft}>
            <Ionicons
              name="construct-outline"
              size={20}
              color={
                verified
                  ? "#fff"
                  : Theme.colors.primary
              }
            />

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
              verified ? "#fff" : "#94A3B8"
            }
          />
        </TouchableOpacity>

        {/* RULES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Instructions
          </Text>

          {RULES.map((item, index) => (
            <View
              key={index}
              style={styles.ruleRow}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={Theme.colors.primary}
              />

              <Text style={styles.ruleText}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* UPLOAD */}
        <TouchableOpacity
          style={styles.uploadCard}
          onPress={chooseImage}
          activeOpacity={0.85}
        >
          <Ionicons
            name="camera-outline"
            size={22}
            color={Theme.colors.primary}
          />

          <Text style={styles.uploadTitle}>
            {image
              ? "Change Safety Image"
              : "Upload Safety Image"}
          </Text>

          <Text style={styles.uploadSub}>
            PPE / Site readiness photo
          </Text>
        </TouchableOpacity>

        {/* IMAGE */}
        {image && (
          <View style={styles.card}>
            <View style={styles.previewHead}>
              <Text style={styles.cardTitle}>
                Uploaded Preview
              </Text>

              <TouchableOpacity
                onPress={removeImage}
              >
                <Text style={styles.removeText}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{ uri: image }}
              style={styles.preview}
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
          onPress={toggleConfirm}
          activeOpacity={0.85}
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
                : Theme.colors.primary
            }
          />

          <Text
            style={[
              styles.confirmText,
              confirmed &&
                styles.confirmTextActive,
            ]}
          >
            I confirm that I followed
            all instructions mentioned
            above.
          </Text>
        </TouchableOpacity>

        {/* BUTTONS */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBack}
          >
            <Text style={styles.backText}>
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 14,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Theme.colors.text,
    marginBottom: 14,
  },

  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  actionCardActive: {
    backgroundColor:
      Theme.colors.primary,
    borderColor:
      Theme.colors.primary,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  actionText: {
    fontWeight: "700",
    fontSize: 15,
    color: Theme.colors.text,
  },

  actionTextActive: {
    color: "#fff",
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },

  ruleText: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.text,
    lineHeight: 22,
  },

  uploadCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor:
      Theme.colors.primary,
    alignItems: "center",
  },

  uploadTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  uploadSub: {
    marginTop: 4,
    fontSize: 13,
    color: Theme.colors.subtext,
  },

  previewHead: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  removeText: {
    color: "#DC2626",
    fontWeight: "700",
  },

  preview: {
    width: "100%",
    height: 230,
    borderRadius: 16,
  },

  confirmCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },

  confirmActive: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },

  confirmText: {
    flex: 1,
    lineHeight: 22,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  confirmTextActive: {
    color: "#fff",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  backBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  backText: {
    fontWeight: "700",
    color: Theme.colors.text,
  },

  nextBtn: {
    flex: 1,
    backgroundColor:
      Theme.colors.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontWeight: "800",
  },
});