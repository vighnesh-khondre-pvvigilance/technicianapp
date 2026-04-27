// src/components/workflow/StepCleaning.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";
import Screen from "../Screen";

const MAX_LIMIT = 20;

export default function StepCleaning({
  form,
  updateForm,
  onBack,
  onSubmit,
}: any) {
  const [loading, setLoading] =
    useState(false);

  const visitForm =
    form?.visitForm || {};

  const cleaning =
    form?.cleaning || {
      required: false,
      done: false,
      before: [],
      after: [],
    };

  const updateCleaning = (
    data: any
  ) => {
    updateForm({
      cleaning: {
        ...cleaning,
        ...data,
      },
    });
  };

  /* Toggle Cleaning Cycle */
  const toggleRequired =
    () =>
      updateCleaning({
        required:
          !cleaning.required,
      });

  /* Toggle Completed */
  const toggleDone = () =>
    updateCleaning({
      done: !cleaning.done,
    });

  /* Save Photo */
  const savePhoto = (
    type:
      | "before"
      | "after",
    uri: string
  ) => {
    updateCleaning({
      [type]: [
        ...cleaning[type],
        uri,
      ],
    });
  };

  const checkLimit = (
    type:
      | "before"
      | "after"
  ) => {
    if (
      cleaning[type].length >=
      MAX_LIMIT
    ) {
      Alert.alert(
        "Limit Reached",
        `Maximum ${MAX_LIMIT} photos allowed`
      );
      return true;
    }
    return false;
  };

  /* Gallery */
  const pickImage = async (
    type:
      | "before"
      | "after"
  ) => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Allow gallery access."
      );
      return;
    }

    if (checkLimit(type))
      return;

    const result =
      await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,
          quality: 0.8,
          allowsEditing: true,
        }
      );

    if (!result.canceled) {
      savePhoto(
        type,
        result.assets[0].uri
      );
    }
  };

  /* Camera */
  const openCamera = async (
    type:
      | "before"
      | "after"
  ) => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Allow camera access."
      );
      return;
    }

    if (checkLimit(type))
      return;

    const result =
      await ImagePicker.launchCameraAsync(
        {
          quality: 0.8,
          allowsEditing: true,
        }
      );

    if (!result.canceled) {
      savePhoto(
        type,
        result.assets[0].uri
      );
    }
  };

  const addPhoto = (
    type:
      | "before"
      | "after"
  ) => {
    Alert.alert(
      "Upload Photo",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: () =>
            openCamera(
              type
            ),
        },
        {
          text: "Gallery",
          onPress: () =>
            pickImage(
              type
            ),
        },
        {
          text: "Cancel",
          style:
            "cancel",
        },
      ]
    );
  };

  const removePhoto = (
    type:
      | "before"
      | "after",
    index: number
  ) => {
    updateCleaning({
      [type]:
        cleaning[type].filter(
          (
            _: any,
            i: number
          ) =>
            i !== index
        ),
    });
  };

  /* Submit */
  const handleSubmit =
    async () => {
      if (
        cleaning.required
      ) {
        if (
          cleaning.before
            .length === 0
        ) {
          Alert.alert(
            "Required",
            "Upload before cleaning photos."
          );
          return;
        }

        if (
          cleaning.after
            .length === 0
        ) {
          Alert.alert(
            "Required",
            "Upload after cleaning photos."
          );
          return;
        }

        if (
          !cleaning.done
        ) {
          Alert.alert(
            "Required",
            "Confirm cleaning completed."
          );
          return;
        }
      }

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        onSubmit();
      }, 1500);
    };

  const PhotoSection = ({
    title,
    type,
  }: any) => (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text
          style={
            styles.cardTitle
          }
        >
          {title}
        </Text>

        <Text
          style={
            styles.count
          }
        >
          {
            cleaning[type]
              .length
          }
          /20
        </Text>
      </View>

      <TouchableOpacity
        style={
          styles.uploadBox
        }
        onPress={() =>
          addPhoto(type)
        }
      >
        <Ionicons
          name="camera-outline"
          size={24}
          color={
            Theme.colors.primary
          }
        />
        <Text
          style={
            styles.uploadText
          }
        >
          Add Photo
        </Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
      >
        {cleaning[type].map(
          (
            img: string,
            i: number
          ) => (
            <View
              key={i}
              style={
                styles.photoWrap
              }
            >
              <Image
                source={{
                  uri: img,
                }}
                style={
                  styles.photo
                }
              />

              <TouchableOpacity
                style={
                  styles.remove
                }
                onPress={() =>
                  removePhoto(
                    type,
                    i
                  )
                }
              >
                <Ionicons
                  name="close"
                  size={14}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* HEADER */}
        <LinearGradient
          colors={[
            "#0F172A",
            "#1E293B",
          ]}
          style={
            styles.header
          }
        >
          <Text
            style={
              styles.headerTitle
            }
          >
            Cleaning Confirmation
          </Text>

          <Text
            style={
              styles.headerSub
            }
          >
            Final visit review &
            site cleaning status
          </Text>
        </LinearGradient>

        {/* SUMMARY */}
        <View style={styles.card}>
          <Text
            style={
              styles.cardTitle
            }
          >
            Visit Summary
          </Text>

          <Row
            label="Technician"
            value={
              visitForm.technicianId ||
              "-"
            }
          />
          <Row
            label="Inverter"
            value={
              visitForm.inverterStatus ||
              "-"
            }
          />
          <Row
            label="Generation"
            value={
              visitForm.generationReading ||
              "-"
            }
          />
        </View>

        {/* TOGGLE */}
        <TouchableOpacity
          style={[
            styles.toggle,
            cleaning.required &&
              styles.active,
          ]}
          onPress={
            toggleRequired
          }
        >
          <Text
            style={[
              styles.toggleText,
              cleaning.required &&
                {
                  color:
                    "#fff",
                },
            ]}
          >
            {cleaning.required
              ? "✓ "
              : "☐ "}
            Cleaning Cycle
          </Text>
        </TouchableOpacity>

        {/* SHOW ONLY IF CHECKED */}
        {cleaning.required && (
          <>
            <PhotoSection
              title="Before Cleaning"
              type="before"
            />

            <PhotoSection
              title="After Cleaning"
              type="after"
            />

            <TouchableOpacity
              style={[
                styles.toggle,
                cleaning.done &&
                  styles.done,
              ]}
              onPress={
                toggleDone
              }
            >
              <Text
                style={[
                  styles.toggleText,
                  cleaning.done &&
                    {
                      color:
                        "#fff",
                    },
                ]}
              >
                {cleaning.done
                  ? "✓ "
                  : "☐ "}
                Cleaning Completed
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* BUTTONS */}
        <View style={styles.row}>
          <TouchableOpacity
            style={
              styles.backBtn
            }
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
            onPress={
              handleSubmit
            }
            disabled={
              loading
            }
          >
            <LinearGradient
              colors={[
                "#F59E0B",
                "#D97706",
              ]}
              style={
                styles.submitBtn
              }
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={
                    styles.submitText
                  }
                >
                  Submit Visit
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

function Row({
  label,
  value,
}: any) {
  return (
    <View style={styles.item}>
      <Text
        style={
          styles.itemLabel
        }
      >
        {label}
      </Text>

      <Text
        style={
          styles.itemValue
        }
      >
        {value}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    header: {
      padding: 20,
      borderRadius: 24,
      marginBottom: 16,
    },

    headerTitle: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "800",
    },

    headerSub: {
      color: "#CBD5E1",
      marginTop: 6,
    },

    card: {
      backgroundColor:
        "#fff",
      padding: 18,
      borderRadius: 22,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        "#EEF2F7",
    },

    cardTitle: {
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 12,
    },

    item: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor:
        "#F1F5F9",
    },

    itemLabel: {
      color:
        Theme.colors.subtext,
    },

    itemValue: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    toggle: {
      backgroundColor:
        "#EEF2FF",
      padding: 16,
      borderRadius: 16,
      marginBottom: 16,
      alignItems:
        "center",
    },

    active: {
      backgroundColor:
        Theme.colors.primary,
    },

    done: {
      backgroundColor:
        "#16A34A",
    },

    toggleText: {
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    top: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 10,
    },

    count: {
      color:
        Theme.colors.subtext,
      fontSize: 12,
    },

    uploadBox: {
      height: 110,
      borderRadius: 18,
      borderWidth: 1.5,
      borderStyle:
        "dashed",
      borderColor:
        "#E5E7EB",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 12,
    },

    uploadText: {
      marginTop: 8,
      fontWeight: "700",
    },

    photoWrap: {
      marginRight: 10,
      position:
        "relative",
    },

    photo: {
      width: 95,
      height: 95,
      borderRadius: 16,
    },

    remove: {
      position:
        "absolute",
      top: 6,
      right: 6,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor:
        "rgba(0,0,0,0.6)",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    row: {
      flexDirection: "row",
      gap: 12,
      marginTop: 6,
    },

    backBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor:
        "#E5E7EB",
      borderRadius: 16,
      padding: 16,
      alignItems:
        "center",
    },

    backText: {
      fontWeight: "700",
    },

    submitBtn: {
      padding: 16,
      borderRadius: 16,
      alignItems:
        "center",
    },

    submitText: {
      color: "#fff",
      fontWeight: "800",
    },
  });