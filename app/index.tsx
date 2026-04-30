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
  ActivityIndicator,
} from "react-native";

import {
  useState,
  useRef,
  useEffect,
} from "react";

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

  const otpRef =
    useRef<TextInput>(null);

  const [step, setStep] =
    useState(1);

  const [fullName, setFullName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [timer, setTimer] =
    useState(0);

  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((p) => p - 1);
      }, 1000);
    }

    return () =>
      clearInterval(interval);
  }, [timer]);

  const validateStep1 = () => {
    if (!fullName.trim()) {
      Alert.alert(
        "Required",
        "Enter full name."
      );
      return false;
    }

    if (mobile.length !== 10) {
      Alert.alert(
        "Invalid",
        "Enter valid mobile."
      );
      return false;
    }

    return true;
  };

  const continueToEmail = () => {
    if (!validateStep1()) return;
    setStep(2);
  };

  const sendOtp = async () => {
    if (!email.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Enter valid email."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const code = Math.floor(
        100000 +
          Math.random() *
            900000
      ).toString();

      setGeneratedOtp(code);
      setLoading(false);
      setStep(3);
      setTimer(60);

      Alert.alert(
        "OTP Sent",
        `Dev OTP: ${code}`
      );
    }, 1200);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Invalid OTP",
        "Enter 6 digit OTP."
      );
      return;
    }

    if (otp !== generatedOtp) {
      Alert.alert(
        "Wrong OTP",
        "OTP incorrect."
      );
      return;
    }

    router.replace(
      "/(public)/home"
    );
  };

  const resendOtp = () => {
    sendOtp();
  };

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          Theme.colors.background
        }
      />

      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
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
            {/* HEADER */}
            <Animated.View
              entering={FadeInDown}
              style={styles.hero}
            >
              <View
                style={
                  styles.logoCircle
                }
              >
                <Ionicons
                  name="flash"
                  size={34}
                  color="#fff"
                />
              </View>

              <Text
                style={styles.brand}
              >
                PVprotech
              </Text>

              <Text
                style={
                  styles.caption
                }
              >
                India’s Premium
                Solar Technician
                Network
              </Text>
            </Animated.View>

            {/* STEPS */}
            <Animated.View
              entering={FadeInDown.delay(
                120
              )}
              style={
                styles.stepWrap
              }
            >
              {[1, 2, 3].map(
                (item, i) => (
                  <View
                    key={item}
                    style={
                      styles.stepRow
                    }
                  >
                    <View
                      style={[
                        styles.stepDot,
                        step >=
                          item &&
                          styles.stepDotActive,
                      ]}
                    >
                      <Text
                        style={
                          styles.stepText
                        }
                      >
                        {item}
                      </Text>
                    </View>

                    {i !== 2 && (
                      <View
                        style={[
                          styles.line,
                          step >
                            item &&
                            styles.lineActive,
                        ]}
                      />
                    )}
                  </View>
                )
              )}
            </Animated.View>

            {/* STEP 1 */}
            {step === 1 && (
              <Animated.View
                entering={FadeInUp}
                style={
                  styles.card
                }
              >
                <Text
                  style={
                    styles.heading
                  }
                >
                  Basic Info
                </Text>

                <Text
                  style={
                    styles.subheading
                  }
                >
                  Enter your
                  personal
                  details
                </Text>

                <Text
                  style={
                    styles.label
                  }
                >
                  Full Name
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
                    placeholder="Enter full name"
                    placeholderTextColor={
                    Theme.colors
                      .subText
                  }
                    value={
                      fullName
                    }
                    onChangeText={
                      setFullName
                    }
                    style={
                      styles.input
                    }
                  />
                </View>

                <Text
                  style={
                    styles.label
                  }
                >
                  Mobile
                </Text>

                <View
                  style={
                    styles.inputWrap
                  }
                >
                  <Text
                    style={
                      styles.prefix
                    }
                  >
                    +91
                  </Text>

                  <TextInput
                    placeholder="Enter mobile"
                    placeholderTextColor={
                    Theme.colors
                      .subText
                  }
                    keyboardType="phone-pad"
                    maxLength={
                      10
                    }
                    value={
                      mobile
                    }
                    onChangeText={
                      setMobile
                    }
                    style={
                      styles.input
                    }
                  />
                </View>

                <TouchableOpacity
                  style={
                    styles.button
                  }
                  onPress={
                    continueToEmail
                  }
                >
                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    Continue
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#fff"
                  />
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <Animated.View
                entering={FadeInUp}
                style={
                  styles.card
                }
              >
                <Text
                  style={
                    styles.heading
                  }
                >
                  Email Verify
                </Text>

                <Text
                  style={
                    styles.subheading
                  }
                >
                  OTP will be
                  sent to your
                  email
                </Text>

                <Text
                  style={
                    styles.label
                  }
                >
                  Email Address
                </Text>

                <View
                  style={
                    styles.inputWrap
                  }
                >
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color={
                      Theme.colors
                        .subText
                    }
                  />

                  <TextInput
                    placeholder="Enter email"
                    placeholderTextColor={
                    Theme.colors
                      .subText
                  }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={
                      email
                    }
                    onChangeText={
                      setEmail
                    }
                    style={
                      styles.input
                    }
                  />
                </View>

                <TouchableOpacity
                  style={
                    styles.button
                  }
                  onPress={
                    sendOtp
                  }
                  disabled={
                    loading
                  }
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text
                        style={
                          styles.buttonText
                        }
                      >
                        Send OTP
                      </Text>

                      <Ionicons
                        name="send"
                        size={18}
                        color="#fff"
                      />
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.backBtn
                  }
                  onPress={() =>
                    setStep(
                      1
                    )
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
              </Animated.View>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <Animated.View
                entering={FadeInUp}
                style={
                  styles.card
                }
              >
                <Text
                  style={
                    styles.heading
                  }
                >
                  Verify OTP
                </Text>

                <Text
                  style={
                    styles.subheading
                  }
                >
                  Enter code
                  sent to{" "}
                  {email}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    otpRef.current?.focus()
                  }
                >
                  <View
                    style={
                      styles.otpRow
                    }
                  >
                    {[0, 1, 2, 3, 4, 5].map(
                      (
                        item
                      ) => (
                        <View
                          key={
                            item
                          }
                          style={
                            styles.otpBox
                          }
                        >
                          <Text
                            style={
                              styles.otpText
                            }
                          >
                            {otp[
                              item
                            ] ||
                              ""}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </TouchableOpacity>

                <TextInput
                  ref={otpRef}
                  value={otp}
                  onChangeText={(
                    text
                  ) =>
                    setOtp(
                      text
                        .replace(
                          /[^0-9]/g,
                          ""
                        )
                        .slice(
                          0,
                          6
                        )
                    )
                  }
                  keyboardType="number-pad"
                  maxLength={6}
                  style={
                    styles.hiddenInput
                  }
                  autoFocus
                />

                <TouchableOpacity
                  style={
                    styles.button
                  }
                  onPress={
                    verifyOtp
                  }
                >
                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    Verify &
                    Continue
                  </Text>
                </TouchableOpacity>

                <View
                  style={
                    styles.timerWrap
                  }
                >
                  {timer >
                  0 ? (
                    <Text
                      style={
                        styles.timerText
                      }
                    >
                      Resend
                      in{" "}
                      {
                        timer
                      }
                      s
                    </Text>
                  ) : (
                    <TouchableOpacity
                      onPress={
                        resendOtp
                      }
                    >
                      <Text
                        style={
                          styles.backText
                        }
                      >
                        Resend
                        OTP
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            )}

            {/* FOOTER */}
            <View
              style={
                styles.footer
              }
            >
              <Text
                style={
                  styles.footerText
                }
              >
                Secure • Fast
                Approval •
                Trusted
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    scroll: {
      paddingHorizontal: 20,
      paddingTop: 36,
      paddingBottom: 40,
    },

    hero: {
      alignItems: "center",
      marginBottom: 28,
    },

    logoCircle: {
      width: 86,
      height: 86,
      borderRadius: 43,
      backgroundColor:
        Theme.colors.primary,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 14,
    },

    brand: {
      fontSize: 30,
      fontWeight: "900",
      color:
        Theme.colors.text,
    },

    caption: {
      marginTop: 8,
      textAlign:
        "center",
      color:
        Theme.colors.subText,
      lineHeight: 21,
    },

    stepWrap: {
      flexDirection:
        "row",
      justifyContent:
        "center",
      marginBottom: 26,
    },

    stepRow: {
      flexDirection:
        "row",
      alignItems:
        "center",
    },

    stepDot: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor:
        Theme.colors.border,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    stepDotActive: {
      backgroundColor:
        Theme.colors.primary,
    },

    stepText: {
      color: "#fff",
      fontWeight: "800",
    },

    line: {
      width: 55,
      height: 3,
      backgroundColor:
        Theme.colors.border,
    },

    lineActive: {
      backgroundColor:
        Theme.colors.primary,
    },

    card: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius: 26,
      padding: 22,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      marginBottom: 20,
    },

    heading: {
      fontSize: 24,
      fontWeight: "900",
      color:
        Theme.colors.text,
    },

    subheading: {
      color:
        Theme.colors.subText,
      marginTop: 6,
      marginBottom: 20,
      lineHeight: 20,
    },

    label: {
      fontSize: 13,
      fontWeight: "700",
      marginBottom: 8,
      color:
        Theme.colors.textSecondary,
    },

    inputWrap: {
      minHeight: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      backgroundColor:
        Theme.colors.background,
      paddingHorizontal: 14,
      flexDirection:
        "row",
      alignItems:
        "center",
      marginBottom: 16,
    },

    input: {
      flex: 1,
      marginLeft: 10,
      color:
        Theme.colors.text,
    },

    prefix: {
      fontWeight: "700",
      color:
        Theme.colors.subText,
    },

    button: {
      height: 56,
      borderRadius: 16,
      backgroundColor:
        Theme.colors.primary,
      justifyContent:
        "center",
      alignItems:
        "center",
      flexDirection:
        "row",
      gap: 8,
      marginTop: 6,
    },

    buttonText: {
      color: "#fff",
      fontWeight: "800",
    },

    backBtn: {
      marginTop: 14,
      alignItems:
        "center",
    },

    backText: {
      color:
        Theme.colors.primary,
      fontWeight: "700",
    },

    otpRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom: 18,
    },

    otpBox: {
      width: 48,
      height: 56,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        Theme.colors.background,
    },

    otpText: {
      fontSize: 22,
      fontWeight: "800",
      color:
        Theme.colors.primary,
    },

    hiddenInput: {
      position:
        "absolute",
      opacity: 0,
    },

    timerWrap: {
      marginTop: 16,
      alignItems:
        "center",
    },

    timerText: {
      color:
        Theme.colors.subText,
    },

    footer: {
      marginTop: 10,
      alignItems:
        "center",
    },

    footerText: {
      fontSize: 12,
      color:
        Theme.colors.subText,
    },
  });