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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

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
  const [savedScore, setSavedScore] =
    useState<number | null>(null);
  const [loading, setLoading] =
    useState(true);

  const current = quizQuestions[step];

  /* --------------------------------------- */
  /* LOAD DATA WHEN SCREEN FOCUSED          */
  /* --------------------------------------- */
  const loadSavedData = async () => {
    try {
      setLoading(true);

      const profile =
        await AsyncStorage.getItem(
          PROFILE_KEY
        );

      const done =
        await AsyncStorage.getItem(
          QUIZ_DONE_KEY
        );

      const score =
        await AsyncStorage.getItem(
          QUIZ_SCORE_KEY
        );

      setProfileDone(
        profile === "true"
      );

      setCompleted(
        done === "true"
      );

      if (score !== null) {
        setSavedScore(
          Number(score)
        );
      } else {
        setSavedScore(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedData();
    }, [])
  );

  useEffect(() => {
    loadSavedData();
  }, []);

  /* --------------------------------------- */
  /* SCORE                                  */
  /* --------------------------------------- */
  const liveScore = useMemo(() => {
    return answers.filter(
      (item, index) =>
        item ===
        quizQuestions[index]
          ?.answer
    ).length;
  }, [answers]);

  const score =
    savedScore !== null
      ? savedScore
      : liveScore;

  const passed =
    completed &&
    score >= PASS_SCORE;

  const progress =
    completed
      ? 100
      : ((step + 1) /
          quizQuestions.length) *
        100;

  /* --------------------------------------- */
  /* VIDEO                                  */
  /* --------------------------------------- */
  const openVideo = async (
    url: string
  ) => {
    const supported =
      await Linking.canOpenURL(
        url
      );

    if (supported) {
      await Linking.openURL(
        url
      );
    }
  };

  /* --------------------------------------- */
  /* QUIZ                                   */
  /* --------------------------------------- */
  const selectAnswer =
    async (
      index: number
    ) => {
      const updated = [
        ...answers,
      ];

      updated[step] = index;

      setAnswers(updated);

      if (
        step <
        quizQuestions.length -
          1
      ) {
        setStep(
          step + 1
        );
        return;
      }

      const finalScore =
        updated.filter(
          (
            item,
            i
          ) =>
            item ===
            quizQuestions[
              i
            ]?.answer
        ).length;

      setSavedScore(
        finalScore
      );

      setCompleted(true);

      await AsyncStorage.multiSet(
        [
          [
            QUIZ_DONE_KEY,
            "true",
          ],
          [
            QUIZ_SCORE_KEY,
            String(
              finalScore
            ),
          ],
        ]
      );
    };

  const restartQuiz =
    async () => {
      Alert.alert(
        "Restart Quiz",
        "Do you want to reset your quiz attempt?",
        [
          {
            text: "Cancel",
            style:
              "cancel",
          },
          {
            text: "Restart",
            onPress:
              async () => {
                setStep(0);
                setAnswers(
                  []
                );
                setCompleted(
                  false
                );
                setSavedScore(
                  null
                );

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

  /* --------------------------------------- */
  /* STATUS                                 */
  /* --------------------------------------- */
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

  const technicianId =
    "PVP" +
    (
      1000 + score * 12
    ).toString();

  /* --------------------------------------- */
  /* UI                                     */
  /* --------------------------------------- */
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.container
        }
      >
        {/* HERO */}
        <View style={styles.hero}>
          <View
            style={
              styles.heroCircle1
            }
          />
          <View
            style={
              styles.heroCircle2
            }
          />

          <Text
            style={
              styles.heroTag
            }
          >
            Training Center
          </Text>

          <Text
            style={
              styles.heading
            }
          >
            Learn & Get
            Verified
          </Text>

          <Text
            style={
              styles.subheading
            }
          >
            Complete your
            profile, finish
            training, pass
            the quiz and get
            approved.
          </Text>
        </View>

        {/* MODULES */}
        <View style={styles.card}>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Training
            Modules
          </Text>

          {trainingModules.map(
            (
              item,
              index
            ) => (
              <TouchableOpacity
                key={
                  item.id
                }
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
                    size={
                      18
                    }
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
                    {
                      item.title
                    }
                  </Text>

                  <Text
                    style={
                      styles.meta
                    }
                  >
                    Module{" "}
                    {index +
                      1}{" "}
                    •{" "}
                    {
                      item.time
                    }
                  </Text>
                </View>

                <View
                  style={
                    styles.playBtn
                  }
                >
                  <Ionicons
                    name="logo-youtube"
                    size={
                      18
                    }
                    color="#FF0000"
                  />
                </View>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* PROFILE */}
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
                size={
                  18
                }
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
                  ? "Your profile is submitted"
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

        {/* QUIZ */}
        <View style={styles.card}>
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
                {step +
                  1}{" "}
                of{" "}
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
                    key={
                      index
                    }
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
                          .primary
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
                  Score:{" "}
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
                  : "You can restart and improve score."}
              </Text>
            </>
          )}
        </View>

        {/* STATUS */}
        <View style={styles.card}>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Onboarding
            Status
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
                  key={
                    index
                  }
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
                Technician ID
              </Text>

              <Text
                style={
                  styles.idValue
                }
              >
                {
                  technicianId
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 18,
      paddingBottom: 42,
      backgroundColor:
        Theme.colors
          .background,
    },

    hero: {
      backgroundColor:
        Theme.colors
          .secondary,
      borderRadius: 28,
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
        "rgba(255,255,255,0.05)",
    },

    heroTag: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "700",
      backgroundColor:
        "rgba(255,255,255,0.12)",
      alignSelf:
        "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      marginBottom: 16,
    },

    heading: {
      fontSize: 28,
      fontWeight: "800",
      color: "#fff",
    },

    subheading: {
      marginTop: 8,
      color:
        "rgba(255,255,255,0.75)",
      lineHeight: 22,
    },

    card: {
      backgroundColor:
        Theme.colors.card,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 14,
    },

    rowBetween: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    resetText: {
      fontWeight: "700",
      color:
        Theme.colors.info,
    },

    moduleRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },

    iconBox: {
      width: 42,
      height: 42,
      borderRadius: 14,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "rgba(245,158,11,0.12)",
      marginRight: 12,
    },

    playBtn: {
      width: 38,
      height: 38,
      borderRadius: 12,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "#FFF1F2",
    },

    rowText: {
      fontSize: 15,
      fontWeight: "700",
      color:
        Theme.colors.text,
    },

    meta: {
      marginTop: 3,
      fontSize: 12,
      color:
        Theme.colors.subtext,
    },

    profileBtn: {
      backgroundColor:
        Theme.colors.card,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
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
      flex: 1,
    },

    profileIcon: {
      width: 46,
      height: 46,
      borderRadius: 16,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 12,
      backgroundColor:
        "rgba(245,158,11,0.12)",
    },

    profileTitle: {
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    profileSub: {
      marginTop: 4,
      fontSize: 13,
      color:
        Theme.colors.subtext,
    },

    progressTrack: {
      height: 8,
      borderRadius: 99,
      backgroundColor:
        "#E5E7EB",
      overflow: "hidden",
      marginBottom: 14,
    },

    progressFill: {
      height: "100%",
      backgroundColor:
        Theme.colors.primary,
    },

    stepText: {
      fontSize: 12,
      marginBottom: 8,
      color:
        Theme.colors.subtext,
    },

    question: {
      fontSize: 16,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 12,
      lineHeight: 24,
    },

    option: {
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      borderRadius: 16,
      padding: 14,
      marginBottom: 10,
      backgroundColor:
        "#F8FAFC",
    },

    optionText: {
      fontSize: 14,
      fontWeight: "600",
      color:
        Theme.colors.text,
    },

    resultBox: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    score: {
      fontSize: 22,
      fontWeight: "800",
      color:
        Theme.colors.primary,
    },

    saved: {
      marginTop: 8,
      fontWeight: "700",
    },

    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },

    statusText: {
      marginLeft: 10,
      fontWeight: "600",
      color:
        Theme.colors.text,
    },

    idBox: {
      marginTop: 10,
      backgroundColor:
        "#FFF7ED",
      borderRadius: 18,
      padding: 16,
    },

    idLabel: {
      fontSize: 12,
      color: "#92400E",
    },

    idValue: {
      marginTop: 4,
      fontSize: 20,
      fontWeight: "900",
      color: "#92400E",
    },
  });