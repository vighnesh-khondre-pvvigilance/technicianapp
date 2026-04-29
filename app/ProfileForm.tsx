// app/ProfileForm.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";

export default function ProfileForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [stateName, setStateName] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [dob, setDob] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [specialization, setSpecialization] =
    useState("");

  const [availability, setAvailability] =
    useState("");

  const [certification, setCertification] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [policeReady, setPoliceReady] =
    useState(false);

  const [hasSmartphone, setHasSmartphone] =
    useState(false);

  const [hasVehicle, setHasVehicle] =
    useState(false);

  const specializations = [
    "Cleaning",
    "Electrical",
    "Maintenance",
    "Installation",
  ];

  const availabilityList = [
    "Full Time",
    "Part Time",
    "Freelance",
  ];

  const validate = () => {
    if (
      !name ||
      !mobile ||
      !email ||
      !address ||
      !city ||
      !stateName ||
      !pincode ||
      !dob ||
      !experience ||
      !specialization ||
      !availability
    ) {
      Alert.alert(
        "Required Fields",
        "Please fill all mandatory fields."
      );
      return false;
    }

    if (mobile.length !== 10) {
      Alert.alert(
        "Invalid Mobile",
        "Enter valid 10 digit mobile number."
      );
      return false;
    }

    if (pincode.length !== 6) {
      Alert.alert(
        "Invalid Pincode",
        "Enter valid 6 digit pincode."
      );
      return false;
    }

    if (!policeReady) {
      Alert.alert(
        "Verification Required",
        "Police verification consent is mandatory."
      );
      return false;
    }

    return true;
  };

  const saveProfile =
    async () => {
      if (!validate()) return;

      try {
        setLoading(true);

        const profile = {
          name,
          mobile,
          email,
          address,
          city,
          state: stateName,
          pincode,
          dob,
          experience,
          specialization,
          availability,
          certification,
          company,
          policeReady,
          hasSmartphone,
          hasVehicle,
          submittedAt:
            new Date().toISOString(),
        };

        await AsyncStorage.setItem(
          "profileData",
          JSON.stringify(
            profile
          )
        );

        await AsyncStorage.setItem(
          "profileSubmitted",
          "true"
        );

        Alert.alert(
          "Success",
          "Profile submitted successfully."
        );

        router.back();
      } catch (error) {
        Alert.alert(
          "Error",
          "Unable to save profile."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.container
          }
        >
          {/* Hero */}
          <View style={styles.hero}>
            <View
              style={styles.heroCircle1}
            />
            <View
              style={styles.heroCircle2}
            />

            <Text
              style={styles.heroTag}
            >
              Profile Setup
            </Text>

            <Text
              style={styles.heading}
            >
              Become Verified
            </Text>

            <Text
              style={
                styles.subheading
              }
            >
              Complete your
              professional profile
              to unlock technician
              approval.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.card}>
            <SectionTitle
              title="Personal Details"
            />

            <Input
              label="Full Name *"
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
            />

            <Input
              label="Mobile Number *"
              value={mobile}
              onChangeText={setMobile}
              placeholder="10 digit number"
              keyboardType="number-pad"
            />

            <Input
              label="Email Address *"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
            />

            <Input
              label="Address *"
              value={address}
              onChangeText={
                setAddress
              }
              placeholder="Street / locality"
            />

            <Input
              label="City *"
              value={city}
              onChangeText={setCity}
              placeholder="Enter city"
            />

            <Input
              label="State *"
              value={stateName}
              onChangeText={
                setStateName
              }
              placeholder="Enter state"
            />

            <Input
              label="Pincode *"
              value={pincode}
              onChangeText={
                setPincode
              }
              placeholder="6 digit pincode"
              keyboardType="number-pad"
            />

            <Input
              label="Date of Birth *"
              value={dob}
              onChangeText={setDob}
              placeholder="dd-mm-yyyy"
            />

            <SectionTitle
              title="Professional Details"
            />

            <Input
              label="Years of Experience *"
              value={experience}
              onChangeText={
                setExperience
              }
              placeholder="e.g. 5"
              keyboardType="number-pad"
            />

            <ChipGroup
              title="Specialization *"
              data={
                specializations
              }
              value={
                specialization
              }
              onSelect={
                setSpecialization
              }
            />

            <ChipGroup
              title="Availability *"
              data={
                availabilityList
              }
              value={
                availability
              }
              onSelect={
                setAvailability
              }
            />

            <Input
              label="Certifications"
              value={
                certification
              }
              onChangeText={
                setCertification
              }
              placeholder="Optional"
            />

            <Input
              label="Previous Company"
              value={company}
              onChangeText={
                setCompany
              }
              placeholder="Optional"
            />

            <SectionTitle
              title="Requirements"
            />

            <SwitchRow
              icon="shield-checkmark-outline"
              title="Police Verification *"
              subtitle="Mandatory consent"
              value={policeReady}
              onChange={
                setPoliceReady
              }
            />

            <SwitchRow
              icon="phone-portrait-outline"
              title="Smartphone"
              subtitle="Have smartphone device"
              value={
                hasSmartphone
              }
              onChange={
                setHasSmartphone
              }
            />

            <SwitchRow
              icon="car-outline"
              title="Vehicle & License"
              subtitle="Own transport available"
              value={hasVehicle}
              onChange={
                setHasVehicle
              }
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.9}
              onPress={
                saveProfile
              }
              disabled={loading}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color={
                  Theme.colors
                    .textInverse
                }
              />

              <Text
                style={
                  styles.buttonText
                }
              >
                {loading
                  ? "Submitting..."
                  : "Complete Registration"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

/* Components */

function SectionTitle({
  title,
}: any) {
  return (
    <Text style={styles.section}>
      {title}
    </Text>
  );
}

function Input({
  label,
  ...props
}: any) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        placeholderTextColor={
          Theme.colors
            .subText
        }
        style={styles.input}
        {...props}
      />
    </View>
  );
}

function ChipGroup({
  title,
  data,
  value,
  onSelect,
}: any) {
  return (
    <View
      style={{
        marginBottom: 14,
      }}
    >
      <Text style={styles.label}>
        {title}
      </Text>

      <View style={styles.chipWrap}>
        {data.map(
          (item: string) => {
            const active =
              value === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  active &&
                    styles.chipActive,
                ]}
                onPress={() =>
                  onSelect(
                    item
                  )
                }
              >
                <Text
                  style={[
                    styles.chipText,
                    active &&
                      styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    </View>
  );
}

function SwitchRow({
  icon,
  title,
  subtitle,
  value,
  onChange,
}: any) {
  return (
    <View style={styles.switchRow}>
      <View
        style={styles.switchIcon}
      >
        <Ionicons
          name={icon}
          size={18}
          color={
            Theme.colors
              .primary
          }
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={
            styles.switchTitle
          }
        >
          {title}
        </Text>

        <Text
          style={
            styles.switchSub
          }
        >
          {subtitle}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={
          onChange
        }
        trackColor={{
          true: Theme
            .colors
            .eco,
          false:
            Theme.colors
              .border,
        }}
        thumbColor={
          Theme.colors
            .surface
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 18,
      paddingBottom: 40,
      backgroundColor:
        Theme.colors
          .background,
    },

    hero: {
      backgroundColor:
        Theme.colors
          .primary,
      borderRadius:
        Theme.radius.xl,
      padding: 22,
      overflow: "hidden",
      marginBottom: 16,
    },

    heroCircle1: {
      position: "absolute",
      top: -40,
      right: -20,
      width: 120,
      height: 120,
      borderRadius: 100,
      backgroundColor:
        "rgba(255,255,255,0.06)",
    },

    heroCircle2: {
      position: "absolute",
      bottom: -50,
      left: -20,
      width: 110,
      height: 110,
      borderRadius: 100,
      backgroundColor:
        "rgba(255,255,255,0.04)",
    },

    heroTag: {
      color:
        Theme.colors
          .textInverse,
      fontSize: 12,
      fontWeight: "800",
      backgroundColor:
        "rgba(255,255,255,0.10)",
      alignSelf:
        "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      marginBottom: 16,
    },

    heading: {
      fontSize: 28,
      fontWeight: "900",
      color:
        Theme.colors
          .textInverse,
    },

    subheading: {
      marginTop: 8,
      color:
        "rgba(255,255,255,0.78)",
      lineHeight: 22,
      fontSize: 14,
    },

    card: {
      backgroundColor:
        Theme.colors
          .surface,
      borderRadius:
        Theme.radius.xl,
      padding: 18,
      borderWidth: 1,
      borderColor:
        Theme.colors
          .border,

      shadowColor:
        Theme.colors
          .shadow,
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 6,
      },

      elevation: 3,
    },

    section: {
      fontSize: 18,
      fontWeight: "900",
      color:
        Theme.colors.text,
      marginBottom: 14,
      marginTop: 10,
    },

    inputWrap: {
      marginBottom: 14,
    },

    label: {
      fontSize: 14,
      fontWeight: "700",
      color:
        Theme.colors
          .text,
      marginBottom: 8,
    },

    input: {
      height: 54,
      borderRadius:
        Theme.radius.lg,
      borderWidth: 1,
      borderColor:
        Theme.colors
          .border,
      backgroundColor:
        Theme.colors
          .surfaceAlt,
      paddingHorizontal: 14,
      color:
        Theme.colors.text,
      fontSize: 14,
    },

    chipWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },

    chip: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor:
        Theme.colors
          .border,
      backgroundColor:
        Theme.colors
          .surfaceAlt,
    },

    chipActive: {
      backgroundColor:
        Theme.colors
          .primary,
      borderColor:
        Theme.colors
          .primary,
    },

    chipText: {
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    chipTextActive: {
      color:
        Theme.colors
          .textInverse,
    },

    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius:
        Theme.radius.lg,
      backgroundColor:
        Theme.colors
          .surfaceAlt,
      marginBottom: 12,
    },

    switchIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        Theme.colors
          .accentSoft,
      marginRight: 12,
    },

    switchTitle: {
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    switchSub: {
      fontSize: 12,
      marginTop: 4,
      color:
        Theme.colors
          .subText,
    },

    button: {
      height: 56,
      borderRadius:
        Theme.radius.lg,
      backgroundColor:
        Theme.colors
          .accent,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginTop: 18,
      flexDirection: "row",
      gap: 8,
    },

    buttonText: {
      fontWeight: "900",
      fontSize: 15,
      color:
        Theme.colors.text,
    },
  });