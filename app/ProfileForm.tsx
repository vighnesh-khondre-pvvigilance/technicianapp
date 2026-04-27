// src/components/public/ProfileForm.tsx

import Screen from "@/src/components/Screen";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";

export default function ProfileForm() {
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

  const availability = [
    "Full Time",
    "Part Time",
    "Freelance",
  ];

  const [selectedSpec, setSelectedSpec] =
    useState("");

  const [selectedAvailability, setSelectedAvailability] =
    useState("");

  const ChipGroup = ({
    data,
    value,
    setValue,
  }: any) => (
    <View style={styles.chipWrap}>
      {data.map((item: string) => {
        const active = value === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setValue(item)
            }
            style={[
              styles.chip,
              active &&
                styles.chipActive,
            ]}
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
      })}
    </View>
  );

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            Complete Registration
          </Text>

          <Text style={styles.subTitle}>
            Upgrade your profile to become
            a verified PVprotech technician.
          </Text>

          {/* PERSONAL DETAILS */}
          <Text style={styles.section}>
            Personal Details
          </Text>

          <Input
            label="Full Name *"
            placeholder="Enter your full name"
          />

          <Input
            label="Mobile Number *"
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
          />

          <Input
            label="Email Address *"
            placeholder="your.email@example.com"
            keyboardType="email-address"
          />

          <Input
            label="Address *"
            placeholder="Street address, locality"
          />

          <Input
            label="City *"
            placeholder="Enter city"
          />

          <Input
            label="State *"
            placeholder="Enter state"
          />

          <Input
            label="Pincode *"
            placeholder="6-digit pincode"
            keyboardType="number-pad"
          />

          <Input
            label="Date of Birth *"
            placeholder="dd-mm-yyyy"
          />

          {/* PROFESSIONAL DETAILS */}
          <Text style={styles.section}>
            Professional Details
          </Text>

          <Input
            label="Years of Experience *"
            placeholder="e.g., 5"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>
            Specialization *
          </Text>

          <ChipGroup
            data={specializations}
            value={selectedSpec}
            setValue={setSelectedSpec}
          />

          <Text style={styles.label}>
            Availability *
          </Text>

          <ChipGroup
            data={availability}
            value={selectedAvailability}
            setValue={
              setSelectedAvailability
            }
          />

          <Input
            label="Certifications (Optional)"
            placeholder="e.g., Solar PV Installer, Electrical Safety"
          />

          <Input
            label="Previous Company (Optional)"
            placeholder="Last employer name"
          />

          {/* REQUIREMENTS */}
          <Text style={styles.section}>
            Requirements
          </Text>

          <SwitchRow
            title="Police Verification *"
            subtitle="Should Ready for Police Verification"
            value={policeReady}
            onChange={setPoliceReady}
          />

          <SwitchRow
            title="Mobile Device"
            subtitle="Have smartphone & app proficient"
            value={hasSmartphone}
            onChange={setHasSmartphone}
          />

          <SwitchRow
            title="Vehicle & License"
            subtitle="Should have Own vehicle with valid license"
            value={hasVehicle}
            onChange={setHasVehicle}
          />

          {/* CTA */}
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Complete Registration
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

/* ---------- Reusable Components ---------- */

function Input({
  label,
  placeholder,
  keyboardType = "default",
}: any) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

function SwitchRow({
  title,
  subtitle,
  value,
  onChange,
}: any) {
  return (
    <View style={styles.switchCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.switchTitle}>
          {title}
        </Text>

        <Text
          style={styles.switchSub}
        >
          {subtitle}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },

  subTitle: {
    color: "#64748B",
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 22,
  },

  section: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginTop: 8,
    marginBottom: 12,
  },

  inputWrap: {
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 14,
    color: "#111827",
  },

  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
  },

  chipActive: {
    backgroundColor: "#F59E0B",
  },

  chipText: {
    fontWeight: "700",
    color: "#475569",
  },

  chipTextActive: {
    color: "#111827",
  },

  switchCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    marginBottom: 12,
    gap: 12,
  },

  switchTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  switchSub: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  button: {
    marginTop: 18,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },
});