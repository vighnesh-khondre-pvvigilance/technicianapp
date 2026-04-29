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
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";

export default function QuickJoinScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleContinue = () => {
    if (!fullName.trim() || !email.trim() || !mobile.trim()) {
      Alert.alert("Required", "Please fill all fields.");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (mobile.length < 10) {
      Alert.alert("Invalid Mobile", "Please enter a valid mobile number.");
      return;
    }

    router.replace("/(public)/home");
  };

  return (
    <Screen>
      <StatusBar
        translucent={false}
        backgroundColor={Theme.colors.background}
        barStyle="dark-content"
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
          >
            {/* Header */}
            <Animated.View entering={FadeInDown.delay(100)}>
              <View style={styles.heroWrap}>
                <View style={styles.logoCircle}>
                  <Ionicons
                    name="flash"
                    size={28}
                    color={Theme.colors.textInverse}
                  />
                </View>

                <Text style={styles.brand}>PVprotech</Text>

                <Text style={styles.caption}>
                  Join India’s Premium Solar Technician Network
                </Text>
              </View>
            </Animated.View>

            {/* Trust Strip */}
            <Animated.View entering={FadeInDown.delay(200)}>
              <View style={styles.trustRow}>
                <View style={styles.trustItem}>
                  <Ionicons
                    name="shield-checkmark"
                    size={15}
                    color={Theme.colors.eco}
                  />
                  <Text style={styles.trustText}>Trusted</Text>
                </View>

                <View style={styles.dot} />

                <View style={styles.trustItem}>
                  <Ionicons
                    name="people"
                    size={15}
                    color={Theme.colors.info}
                  />
                  <Text style={styles.trustText}>100+ Techs</Text>
                </View>

                <View style={styles.dot} />

                <View style={styles.trustItem}>
                  <Ionicons
                    name="star"
                    size={15}
                    color={Theme.colors.accent}
                  />
                  <Text style={styles.trustText}>4.8 Rating</Text>
                </View>
              </View>
            </Animated.View>

            {/* Card */}
            <Animated.View entering={FadeInUp.delay(300)}>
              <View style={styles.card}>
                <Text style={styles.heading}>Quick Join</Text>

                <Text style={styles.subheading}>
                  Enter your details to begin onboarding and start training.
                </Text>

                {/* Name */}
                <Text style={styles.label}>Full Name</Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={Theme.colors.subText}
                  />

                  <TextInput
                    placeholder="Enter full name"
                    placeholderTextColor={Theme.colors.subText}
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>

                {/* Email */}
                <Text style={styles.label}>Email Address</Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color={Theme.colors.subText}
                  />

                  <TextInput
                    placeholder="Enter email"
                    placeholderTextColor={Theme.colors.subText}
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
                  <Text style={styles.prefix}>+91</Text>

                  <TextInput
                    placeholder="Enter mobile number"
                    placeholderTextColor={Theme.colors.subText}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={mobile}
                    onChangeText={setMobile}
                    style={styles.input}
                    returnKeyType="done"
                  />
                </View>

                {/* CTA */}
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.9}
                  onPress={handleContinue}
                >
                  <Text style={styles.buttonText}>Continue</Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={Theme.colors.textInverse}
                  />
                </TouchableOpacity>

                {/* Secondary */}
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={() => router.push("/(public)/login")}
                >
                  <Text style={styles.secondaryText}>
                    Already approved? Login
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Bottom */}
            <Animated.View entering={FadeInUp.delay(450)}>
              <Text style={styles.bottomText}>
                Fast onboarding • Secure profile • 30 seconds
              </Text>
            </Animated.View>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  heroWrap: {
    alignItems: "center",
    marginBottom: 22,
  },

  logoCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },

  brand: {
    fontSize: 30,
    fontWeight: "900",
    color: Theme.colors.text,
    letterSpacing: -0.5,
  },

  caption: {
    marginTop: 6,
    fontSize: 14,
    color: Theme.colors.subText,
    fontWeight: "500",
    textAlign: "center",
  },

  trustRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  trustText: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.colors.subText,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 10,
    backgroundColor: Theme.colors.border,
    marginHorizontal: 10,
  },

  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: Theme.colors.border,

    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: Theme.colors.text,
  },

  subheading: {
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
    lineHeight: 21,
    color: Theme.colors.subText,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Theme.colors.textSecondary,
    marginBottom: 8,
  },

  inputWrap: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  prefix: {
    fontSize: 15,
    fontWeight: "700",
    color: Theme.colors.subText,
    marginRight: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Theme.colors.text,
    paddingVertical: 14,
  },

  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    marginTop: 8,
  },

  buttonText: {
    color: Theme.colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },

  secondaryBtn: {
    marginTop: 14,
    alignItems: "center",
  },

  secondaryText: {
    fontSize: 13,
    fontWeight: "700",
    color: Theme.colors.primary,
  },

  bottomText: {
    textAlign: "center",
    marginTop: 22,
    fontSize: 12,
    color: Theme.colors.subText,
    fontWeight: "500",
  },
});