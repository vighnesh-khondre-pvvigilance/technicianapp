// app/(public)/login.tsx

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
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../../src/components/Screen";
import { Theme } from "../../src/theme/theme";
import { useAuth } from "../../src/context/AuthContext";
import { mockUser } from "../../src/data/user";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] =
    useState("");
  const [secure, setSecure] =
    useState(true);

  const handleLogin = async () => {
    await login(mockUser, "dummy-token");
    router.replace("/(tabs)/home");
  };

  return (
    <Screen>
      <StatusBar
        translucent={false}
        backgroundColor={
          Theme.colors.background
        }
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.scroll
          }
        >
          <View style={styles.container}>
            {/* Brand */}
            <View style={styles.brandWrap}>
              <View
                style={styles.logoBox}
              >
                <Ionicons
                  name="flash"
                  size={24}
                  color={
                    Theme.colors
                      .textInverse
                  }
                />
              </View>

              <Text style={styles.brand}>
                PVprotech
              </Text>

              <Text
                style={styles.caption}
              >
                Technician Portal
              </Text>
            </View>

            {/* Login Card */}
            <View style={styles.card}>
              <View
                style={styles.topBadge}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={14}
                  color={
                    Theme.colors
                      .eco
                  }
                />

                <Text
                  style={
                    styles.topBadgeText
                  }
                >
                  Secure Access
                </Text>
              </View>

              <Text style={styles.heading}>
                Sign In
              </Text>

              <Text
                style={
                  styles.subheading
                }
              >
                Access your assigned
                work, reports and
                daily technician
                tasks.
              </Text>

              {/* Technician ID */}
              <Text style={styles.label}>
                Technician ID
              </Text>

              <View
                style={
                  styles.inputWrap
                }
              >
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={
                    Theme.colors
                      .subText
                  }
                />

                <TextInput
                  placeholder="Enter technician ID"
                  placeholderTextColor={
                    Theme.colors
                      .subText
                  }
                  value={id}
                  onChangeText={setId}
                  style={styles.input}
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <Text style={styles.label}>
                Password
              </Text>

              <View
                style={
                  styles.inputWrap
                }
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={
                    Theme.colors
                      .subText
                  }
                />

                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={
                    Theme.colors
                      .subText
                  }
                  value={password}
                  onChangeText={
                    setPassword
                  }
                  secureTextEntry={
                    secure
                  }
                  style={styles.input}
                />

                <TouchableOpacity
                  onPress={() =>
                    setSecure(
                      !secure
                    )
                  }
                >
                  <Ionicons
                    name={
                      secure
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={18}
                    color={
                      Theme.colors
                        .subText
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot */}
              <TouchableOpacity
                style={
                  styles.forgotWrap
                }
              >
                <Text
                  style={
                    styles.forgot
                  }
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={
                  handleLogin
                }
              >
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Login
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={
                    Theme.colors
                      .textInverse
                  }
                />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <Text
              style={styles.bottomText}
            >
              Internal access for
              approved technicians
              only
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },

  container: {
    padding: Theme.spacing.md + 2,
    backgroundColor:
      Theme.colors.background,
  },

  brandWrap: {
    marginBottom:
      Theme.spacing.lg,
  },

  logoBox: {
    width: 58,
    height: 58,
    borderRadius:
      Theme.radius.lg,
    backgroundColor:
      Theme.colors.primary,
    justifyContent:
      "center",
    alignItems: "center",
    marginBottom: 14,

    shadowColor:
      Theme.colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  brand: {
    fontSize: 30,
    fontWeight: "900",
    color: Theme.colors.text,
    letterSpacing: -0.6,
  },

  caption: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color:
      Theme.colors.subText,
  },

  card: {
    backgroundColor:
      Theme.colors.surface,
    borderRadius:
      Theme.radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor:
      Theme.colors.border,

    shadowColor:
      Theme.colors.shadow,
    shadowOpacity: 0.07,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 4,
  },

  topBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor:
      Theme.colors.ecoSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 16,
  },

  topBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color:
      Theme.colors.eco,
  },

  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: Theme.colors.text,
  },

  subheading: {
    marginTop: 8,
    marginBottom: 22,
    fontSize: 14,
    lineHeight: 22,
    color:
      Theme.colors.subText,
  },

  label: {
    fontSize: 13,
    fontWeight: "800",
    color:
      Theme.colors.textSecondary,
    marginBottom: 8,
  },

  inputWrap: {
    height: 56,
    borderRadius:
      Theme.radius.lg,
    borderWidth: 1,
    borderColor:
      Theme.colors.border,
    backgroundColor:
      Theme.colors.surfaceAlt,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: Theme.colors.text,
  },

  forgotWrap: {
    alignSelf: "flex-end",
    marginTop: -2,
    marginBottom: 18,
  },

  forgot: {
    fontSize: 13,
    fontWeight: "700",
    color:
      Theme.colors.primary,
  },

  button: {
    height: 56,
    borderRadius:
      Theme.radius.lg,
    backgroundColor:
      Theme.colors.primary,
    flexDirection: "row",
    justifyContent:
      "center",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    color:
      Theme.colors.textInverse,
    fontSize: 15,
    fontWeight: "900",
  },

  bottomText: {
    textAlign: "center",
    marginTop:
      Theme.spacing.lg,
    fontSize: 12,
    fontWeight: "600",
    color:
      Theme.colors.subText,
  },
});