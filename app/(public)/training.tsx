// app/(public)/training.tsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import Screen from "../../src/components/Screen";
import { Theme } from "../../src/theme/theme";
import { quizQuestions } from "../../src/data/quizQuestions";

const PROFILE_KEY = "profileSubmitted";
const QUIZ_DONE_KEY = "trainingQuizCompleted";
const QUIZ_SCORE_KEY = "trainingQuizScore";

const PASS_SCORE = 8;

const trainingModules = [
  {
    id: "1",
    title: "Solar Basics",
    time: "8 min",
    icon: "sunny-outline",
    url: "https://www.youtube.com/watch?v=xKxrkht7CpY",
  },
  {
    id: "2",
    title: "Cleaning SOP",
    time: "10 min",
    icon: "water-outline",
    url: "https://www.youtube.com/watch?v=U5l2QW9oK7A",
  },
  {
    id: "3",
    title: "PPE Safety",
    time: "6 min",
    icon: "shield-checkmark-outline",
    url: "https://www.youtube.com/watch?v=q6xU4n0D3Y8",
  },
  {
    id: "4",
    title: "Inverter Basics",
    time: "9 min",
    icon: "flash-outline",
    url: "https://www.youtube.com/watch?v=6Yg7x0M5R9A",
  },
  {
    id: "5",
    title: "Customer Handling",
    time: "7 min",
    icon: "people-outline",
    url: "https://www.youtube.com/watch?v=7x8vL0mT2nQ",
  },
];

export default function TrainingScreen() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [profileDone, setProfileDone] = useState(false);
  const [savedScore, setSavedScore] = useState<number | null>(null);

  const current = quizQuestions[step];

  const loadSavedData = async () => {
    try {
      const profile = await AsyncStorage.getItem(PROFILE_KEY);
      const done = await AsyncStorage.getItem(QUIZ_DONE_KEY);
      const score = await AsyncStorage.getItem(QUIZ_SCORE_KEY);

      setProfileDone(profile === "true");
      setCompleted(done === "true");
      setSavedScore(score ? Number(score) : null);
    } catch {}
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedData();
    }, [])
  );

  useEffect(() => {
    loadSavedData();
  }, []);

  const liveScore = useMemo(() => {
    return answers.filter(
      (item, index) =>
        item === quizQuestions[index]?.answer
    ).length;
  }, [answers]);

  const score =
    savedScore !== null
      ? savedScore
      : liveScore;

  const passed =
    completed &&
    score >= PASS_SCORE;

  const progress = completed
    ? 100
    : ((step + 1) /
        quizQuestions.length) *
      100;

  const technicianId =
    "PVP" +
    (1000 + score * 12).toString();

  const openVideo = async (url: string) => {
    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const selectAnswer = async (
    index: number
  ) => {
    const updated = [...answers];
    updated[step] = index;
    setAnswers(updated);

    if (
      step <
      quizQuestions.length - 1
    ) {
      setStep(step + 1);
      return;
    }

    const finalScore =
      updated.filter(
        (item, i) =>
          item ===
          quizQuestions[i]?.answer
      ).length;

    setSavedScore(finalScore);
    setCompleted(true);

    await AsyncStorage.multiSet([
      [QUIZ_DONE_KEY, "true"],
      [
        QUIZ_SCORE_KEY,
        String(finalScore),
      ],
    ]);
  };

  const restartQuiz = async () => {
    Alert.alert(
      "Restart Quiz",
      "Reset previous attempt?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Restart",
          onPress: async () => {
            setStep(0);
            setAnswers([]);
            setCompleted(false);
            setSavedScore(null);

            await AsyncStorage.multiRemove(
              [
                QUIZ_DONE_KEY,
                QUIZ_SCORE_KEY,
              ]
            );
          },
        },
      ]
    );
  };

  const stages = [
    "Quick Join Complete",
    profileDone
      ? "Profile Submitted"
      : "Profile Pending",
    completed
      ? "Training Complete"
      : "Training Pending",
    completed
      ? "Verification Pending"
      : "Waiting",
    passed
      ? "Approved"
      : completed
      ? "Review Pending"
      : "Pending Approval",
  ];

  return (
    <Screen>
      <StatusBar
        translucent={false}
        backgroundColor={
          Theme.colors.background
        }
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        {/* HERO */}
        <Animated.View
          entering={FadeInDown.delay(
            80
          )}
          style={styles.hero}
        >
          <View
            style={styles.heroGlow1}
          />
          <View
            style={styles.heroGlow2}
          />

          <Text style={styles.heroTag}>
            Training Center
          </Text>

          <Text style={styles.heading}>
            Learn & Get Verified
          </Text>

          <Text
            style={styles.subheading}
          >
            Complete profile,
            finish training &
            pass quiz to unlock
            approval.
          </Text>
        </Animated.View>

        {/* MODULES */}
        <Animated.View
          entering={FadeInDown.delay(
            120
          )}
          style={styles.card}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Training Modules
          </Text>

          {trainingModules.map(
            (
              item,
              index
            ) => (
              <TouchableOpacity
                key={item.id}
                style={
                  styles.moduleRow
                }
                activeOpacity={
                  0.88
                }
                onPress={() =>
                  openVideo(
                    item.url
                  )
                }
              >
                <View
                  style={
                    styles.iconBox
                  }
                >
                  <Ionicons
                    name={
                      item.icon as any
                    }
                    size={18}
                    color={
                      Theme
                        .colors
                        .primary
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
                      styles.rowText
                    }
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={
                      styles.meta
                    }
                  >
                    Module{" "}
                    {index + 1} •{" "}
                    {item.time}
                  </Text>
                </View>

                <View
                  style={
                    styles.playBtn
                  }
                >
                  <Ionicons
                    name="logo-youtube"
                    size={18}
                    color="#FF0000"
                  />
                </View>
              </TouchableOpacity>
            )
          )}
        </Animated.View>

        {/* PROFILE */}
        <Animated.View
          entering={FadeInDown.delay(
            160
          )}
        >
          <TouchableOpacity
            style={
              styles.profileBtn
            }
            activeOpacity={
              0.88
            }
            onPress={() =>
              router.push(
                "/ProfileForm"
              )
            }
          >
            <View
              style={
                styles.profileLeft
              }
            >
              <View
                style={
                  styles.profileIcon
                }
              >
                <Ionicons
                  name={
                    profileDone
                      ? "checkmark-circle-outline"
                      : "person-add-outline"
                  }
                  size={18}
                  color={
                    Theme
                      .colors
                      .primary
                  }
                />
              </View>

              <View>
                <Text
                  style={
                    styles.profileTitle
                  }
                >
                  {profileDone
                    ? "Update Profile"
                    : "Complete Profile"}
                </Text>

                <Text
                  style={
                    styles.profileSub
                  }
                >
                  {profileDone
                    ? "Your details are submitted"
                    : "Submit details to continue"}
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </Animated.View>

        {/* QUIZ */}
        <Animated.View
          entering={FadeInDown.delay(
            220
          )}
          style={styles.card}
        >
          <View
            style={
              styles.rowBetween
            }
          >
            <Text
              style={
                styles.sectionTitle
              }
            >
              Quick Quiz
            </Text>

            {completed && (
              <TouchableOpacity
                onPress={
                  restartQuiz
                }
              >
                <Text
                  style={
                    styles.resetText
                  }
                >
                  Restart
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={
              styles.progressTrack
            }
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          {!completed ? (
            <>
              <Text
                style={
                  styles.stepText
                }
              >
                Question{" "}
                {step + 1} of{" "}
                {
                  quizQuestions.length
                }
              </Text>

              <Text
                style={
                  styles.question
                }
              >
                {
                  current.question
                }
              </Text>

              {current.options.map(
                (
                  item,
                  index
                ) => (
                  <TouchableOpacity
                    key={index}
                    style={
                      styles.option
                    }
                    onPress={() =>
                      selectAnswer(
                        index
                      )
                    }
                  >
                    <Text
                      style={
                        styles.optionText
                      }
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </>
          ) : (
            <>
              <View
                style={
                  styles.resultBox
                }
              >
                <Ionicons
                  name={
                    passed
                      ? "trophy-outline"
                      : "alert-circle-outline"
                  }
                  size={24}
                  color={
                    passed
                      ? Theme
                          .colors
                          .success
                      : Theme
                          .colors
                          .danger
                  }
                />

                <Text
                  style={
                    styles.score
                  }
                >
                  {score}/
                  {
                    quizQuestions.length
                  }
                </Text>
              </View>

              <Text
                style={[
                  styles.saved,
                  {
                    color:
                      passed
                        ? Theme
                            .colors
                            .success
                        : Theme
                            .colors
                            .danger,
                  },
                ]}
              >
                {passed
                  ? "Congratulations! You passed."
                  : "Restart quiz and improve your score."}
              </Text>
            </>
          )}
        </Animated.View>

        {/* STATUS */}
        <Animated.View
          entering={FadeInDown.delay(
            280
          )}
          style={styles.card}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Onboarding Status
          </Text>

          {stages.map(
            (
              item,
              index
            ) => {
              const done =
                item.includes(
                  "Complete"
                ) ||
                item ===
                  "Profile Submitted" ||
                item ===
                  "Approved";

              return (
                <View
                  key={index}
                  style={
                    styles.statusRow
                  }
                >
                  <Ionicons
                    name={
                      done
                        ? "checkmark-circle"
                        : "ellipse-outline"
                    }
                    size={20}
                    color={
                      done
                        ? Theme
                            .colors
                            .success
                        : "#CBD5E1"
                    }
                  />

                  <Text
                    style={
                      styles.statusText
                    }
                  >
                    {item}
                  </Text>
                </View>
              );
            }
          )}

          {passed && (
            <View
              style={
                styles.idBox
              }
            >
              <Text
                style={
                  styles.idLabel
                }
              >
                Approved Technician
              </Text>

              <Text
                style={
                  styles.idValue
                }
              >
                {technicianId}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.sm,
    paddingBottom: 40,
    backgroundColor:
      Theme.colors.background,
  },

  hero: {
    backgroundColor:
      Theme.colors.primary,
    borderRadius:
      Theme.radius.xl,
    padding: 22,
    overflow: "hidden",
    marginBottom: 14,
  },

  heroGlow1: {
    position: "absolute",
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 999,
    backgroundColor:
      "rgba(255,255,255,0.06)",
  },

  heroGlow2: {
    position: "absolute",
    bottom: -50,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor:
      "rgba(255,255,255,0.05)",
  },

  heroTag: {
    color:
      Theme.colors.textInverse,
    fontSize: 12,
    fontWeight: "800",
    backgroundColor:
      "rgba(255,255,255,0.12)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginBottom: 14,
  },

  heading: {
    fontSize: 28,
    fontWeight: "900",
    color:
      Theme.colors.textInverse,
  },

  subheading: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
    color:
      "rgba(255,255,255,0.78)",
  },

  card: {
    backgroundColor:
      Theme.colors.card,
    borderRadius:
      Theme.radius.xl,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor:
      Theme.colors.border,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: Theme.colors.text,
    marginBottom: 14,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  resetText: {
    color: Theme.colors.info,
    fontWeight: "800",
  },

  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius:
      Theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      Theme.colors.accentSoft,
    marginRight: 12,
  },

  playBtn: {
    width: 38,
    height: 38,
    borderRadius:
      Theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      Theme.colors.dangerSoft,
  },

  rowText: {
    fontSize: 15,
    fontWeight: "800",
    color: Theme.colors.text,
  },

  meta: {
    marginTop: 3,
    fontSize: 12,
    color:
      Theme.colors.subText,
  },

  profileBtn: {
    backgroundColor:
      Theme.colors.card,
    borderRadius:
      Theme.radius.xl,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor:
      Theme.colors.border,
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileIcon: {
    width: 46,
    height: 46,
    borderRadius:
      Theme.radius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor:
      Theme.colors.accentSoft,
  },

  profileTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: Theme.colors.text,
  },

  profileSub: {
    marginTop: 4,
    fontSize: 13,
    color:
      Theme.colors.subText,
  },

  progressTrack: {
    height: 8,
    borderRadius: 99,
    overflow: "hidden",
    backgroundColor:
      Theme.colors.border,
    marginBottom: 14,
  },

  progressFill: {
    height: "100%",
    backgroundColor:
      Theme.colors.accent,
  },

  stepText: {
    fontSize: 12,
    color:
      Theme.colors.subText,
    fontWeight: "700",
    marginBottom: 8,
  },

  question: {
    fontSize: 16,
    fontWeight: "900",
    color: Theme.colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },

  option: {
    borderWidth: 1,
    borderColor:
      Theme.colors.border,
    borderRadius:
      Theme.radius.lg,
    padding: 14,
    marginBottom: 10,
    backgroundColor:
      Theme.colors.surfaceAlt,
  },

  optionText: {
    fontSize: 14,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  resultBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  score: {
    fontSize: 24,
    fontWeight: "900",
    color:
      Theme.colors.accent,
  },

  saved: {
    marginTop: 8,
    fontWeight: "800",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  statusText: {
    marginLeft: 10,
    fontWeight: "700",
    color: Theme.colors.text,
  },

  idBox: {
    marginTop: 12,
    backgroundColor:
      Theme.colors.accentSoft,
    borderRadius:
      Theme.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor:
      Theme.colors.accent,
  },

  idLabel: {
    fontSize: 12,
    fontWeight: "700",
    color:
      Theme.colors.primary,
  },

  idValue: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: "900",
    color:
      Theme.colors.primary,
  },
});