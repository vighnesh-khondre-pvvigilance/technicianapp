// src/components/workflow/StepVisitForm.tsx

import React, {
  useState,
  useEffect,
  memo,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";
import Screen from "../Screen";

type Props = {
  form: any;
  updateForm: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  technicianId?: string;
};

/* -------------------------------- */
/* FIELD COMPONENT OUTSIDE PARENT   */
/* prevents keyboard close issue    */
/* -------------------------------- */
const Field = memo(
  ({
    label,
    icon,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    multiline = false,
    editable = true,
  }: any) => {
    return (
      <View style={styles.fieldWrap}>
        <Text style={styles.label}>
          {label}
        </Text>

        <View
          style={[
            styles.inputBox,
            multiline &&
              styles.areaBox,
            !editable &&
              styles.readonlyBox,
          ]}
        >
          <Ionicons
            name={icon}
            size={18}
            color="#94A3B8"
            style={{
              marginTop:
                multiline
                  ? 14
                  : 0,
            }}
          />

          <TextInput
            value={value}
            onChangeText={
              onChangeText
            }
            placeholder={
              placeholder
            }
            placeholderTextColor="#94A3B8"
            keyboardType={
              keyboardType
            }
            multiline={
              multiline
            }
            editable={
              editable
            }
            style={[
              styles.input,
              multiline &&
                styles.area,
            ]}
            textAlignVertical="top"
          />
        </View>
      </View>
    );
  }
);

export default function StepVisitForm({
  form,
  updateForm,
  onNext,
  onBack,
  technicianId = "TECH-1001",
}: Props) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [localForm, setLocalForm] =
    useState({
      visitDate:
        form?.visitForm
          ?.visitDate ||
        today,

      technicianId,

      inverterStatus:
        form?.visitForm
          ?.inverterStatus ||
        "",

      inverterRemarks:
        form?.visitForm
          ?.inverterRemarks ||
        "",

      importReading:
        form?.visitForm
          ?.importReading ||
        "",

      exportReading:
        form?.visitForm
          ?.exportReading ||
        "",

      netReading:
        form?.visitForm
          ?.netReading ||
        "",

      generationReading:
        form?.visitForm
          ?.generationReading ||
        "",

      extraRemarks:
        form?.visitForm
          ?.extraRemarks ||
        "",
    });

  useEffect(() => {
    setLocalForm((prev) => ({
      ...prev,
      technicianId,
    }));
  }, [technicianId]);

  const updateField = (
    key: string,
    value: string
  ) => {
    setLocalForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    updateForm({
      visitForm: localForm,
    });

    onNext();
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS ===
          "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {/* HERO */}
          <View style={styles.hero}>
            <View
              style={
                styles.heroIcon
              }
            >
              <Ionicons
                name="clipboard"
                size={24}
                color="#fff"
              />
            </View>

            <Text
              style={
                styles.heroTitle
              }
            >
              Visit Details
            </Text>

            <Text
              style={
                styles.heroSub
              }
            >
              Fill accurate
              site visit
              details before
              continuing.
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text
              style={
                styles.section
              }
            >
              Basic Info
            </Text>

            <Field
              label="Visit Date"
              icon="calendar-outline"
              value={
                localForm.visitDate
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "visitDate",
                  t
                )
              }
              placeholder="YYYY-MM-DD"
            />

            <Field
              label="Technician ID"
              icon="person-outline"
              value={
                localForm.technicianId
              }
              editable={
                false
              }
            />

            <Text
              style={
                styles.section
              }
            >
              Inverter
            </Text>

            <Field
              label="Inverter Status"
              icon="flash-outline"
              value={
                localForm.inverterStatus
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "inverterStatus",
                  t
                )
              }
              placeholder="Running / Fault / Off"
            />

            <Field
              label="Inverter Remarks"
              icon="document-text-outline"
              value={
                localForm.inverterRemarks
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "inverterRemarks",
                  t
                )
              }
              placeholder="Enter remarks"
            />

            <Text
              style={
                styles.section
              }
            >
              Meter Readings
            </Text>

            <Field
              label="Import Reading"
              icon="download-outline"
              value={
                localForm.importReading
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "importReading",
                  t
                )
              }
              keyboardType="numeric"
            />

            <Field
              label="Export Reading"
              icon="upload-outline"
              value={
                localForm.exportReading
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "exportReading",
                  t
                )
              }
              keyboardType="numeric"
            />

            <Field
              label="Net Reading"
              icon="swap-horizontal-outline"
              value={
                localForm.netReading
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "netReading",
                  t
                )
              }
              keyboardType="numeric"
            />

            <Field
              label="Generation Reading"
              icon="sunny-outline"
              value={
                localForm.generationReading
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "generationReading",
                  t
                )
              }
              keyboardType="numeric"
            />

            <Text
              style={
                styles.section
              }
            >
              Notes
            </Text>

            <Field
              label="Extra Remarks"
              icon="create-outline"
              value={
                localForm.extraRemarks
              }
              onChangeText={(
                t: string
              ) =>
                updateField(
                  "extraRemarks",
                  t
                )
              }
              placeholder="Write notes..."
              multiline
            />

            {/* BUTTONS */}
            <View
              style={styles.row}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    hero: {
      backgroundColor:
        Theme.colors.primary,
      padding: 20,
      borderRadius: 24,
      marginBottom: 16,
    },

    heroIcon: {
      width: 54,
      height: 54,
      borderRadius: 18,
      backgroundColor:
        Theme.colors.surface,
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
      marginTop: 6,
      color: "#CBD5E1",
      lineHeight: 21,
    },

    card: {
      backgroundColor:
        "#fff",
      borderRadius: 24,
      padding: 18,
      borderWidth: 1,
      borderColor:
        "#EEF2F7",
    },

    section: {
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 14,
      marginTop: 6,
    },

    fieldWrap: {
      marginBottom: 14,
    },

    label: {
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 8,
      color:
        Theme.colors.subText,
    },

    inputBox: {
      minHeight: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      backgroundColor:
        "#F8FAFC",
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems:
        "center",
      gap: 10,
    },

    readonlyBox: {
      backgroundColor:
        "#F1F5F9",
    },

    areaBox: {
      alignItems:
        "flex-start",
    },

    input: {
      flex: 1,
      color:
        Theme.colors.text,
      fontSize: 15,
      paddingVertical: 14,
    },

    area: {
      height: 110,
    },

    row: {
      flexDirection: "row",
      gap: 12,
      marginTop: 12,
    },

    backBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      padding: 16,
      borderRadius: 16,
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
        Theme.colors.primary,
      padding: 16,
      borderRadius: 16,
      alignItems:
        "center",
    },

    nextText: {
      color: "#fff",
      fontWeight: "800",
    },
  });