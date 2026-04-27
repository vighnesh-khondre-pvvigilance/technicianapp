// app/index.tsx

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";

export default function QuickJoinScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleContinue = () => {
    if (!fullName || !email || !mobile) {
      Alert.alert("Required", "Please fill all fields.");
      return;
    }

    router.replace("/(public)/home");
  };

  return (
    <Screen>
      <StatusBar barStyle="dark-content" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
            <View style={styles.container}>
              {/* Brand */}
              <View style={styles.brandWrap}>
                <View style={styles.logoBox}>
                  <Ionicons name="flash" size={24} color="#fff" />
                </View>

                <Text style={styles.brand}>PVprotech</Text>

                <Text style={styles.caption}>
                  Technician Onboarding
                </Text>
              </View>

              {/* Card */}
              <View style={styles.card}>
                <Text style={styles.heading}>Quick Join</Text>

                <Text style={styles.subheading}>
                  Enter basic details to start your technician application.
                </Text>

                {/* Full Name */}
                <Text style={styles.label}>Full Name</Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color="#94A3B8"
                  />

                  <TextInput
                    placeholder="Enter full name"
                    placeholderTextColor="#94A3B8"
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>

                {/* Email */}
                <Text style={styles.label}>Email</Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color="#94A3B8"
                  />

                  <TextInput
                    placeholder="Enter email"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>

                {/* Mobile */}
                <Text style={styles.label}>Mobile Number</Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="call-outline"
                    size={18}
                    color="#94A3B8"
                  />

                  <TextInput
                    placeholder="Enter mobile number"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={mobile}
                    onChangeText={setMobile}
                    style={styles.input}
                    returnKeyType="done"
                  />
                </View>

                {/* Continue */}
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.9}
                  onPress={handleContinue}
                >
                  <Text style={styles.buttonText}>Continue</Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <Text style={styles.bottomText}>
                Fast onboarding • 30 seconds
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 30,
  },

  container: {
    padding: 18,
  },

  brandWrap: {
    marginBottom: 26,
  },

  logoBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },

  caption: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  subheading: {
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },

  inputWrap: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#0F172A",
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomText: {
    textAlign: "center",
    marginTop: 22,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },
});