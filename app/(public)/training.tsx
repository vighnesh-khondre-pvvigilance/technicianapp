// app/(public)/training.tsx

import { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";

import { quizQuestions } from "../../src/data/quizQuestions";
import Screen from "../../src/components/Screen";
import { Theme } from "../../src/theme/theme";

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
  const [answers, setAnswers] =
    useState<number[]>([]);
  const [completed, setCompleted] =
    useState(false);

  const current =
    quizQuestions[step];

  const score = useMemo(() => {
    return answers.filter(
      (item, index) =>
        item ===
        quizQuestions[index]?.answer
    ).length;
  }, [answers]);

  const progress =
    ((step +
      (completed ? 1 : 0)) /
      quizQuestions.length) *
    100;

  const openVideo = async (
    url: string
  ) => {
    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const selectAnswer = (
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
    } else {
      setCompleted(true);
    }
  };

  const stages = [
    "Quick Join Complete",
    "Profile Submitted",
    completed
      ? "Training Complete"
      : "Training Pending",
    completed
      ? "Verification Pending"
      : "Waiting",
    score >= 8
      ? "Approved"
      : "Pending Approval",
  ];

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
        {/* Hero */}
        <View style={styles.hero}>
          <View
            style={styles.heroCircle1}
          />
          <View
            style={styles.heroCircle2}
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
            Complete training,
            pass the quiz, and
            move toward technician
            approval.
          </Text>
        </View>

        {/* Modules */}
        <View style={styles.card}>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Training Modules
          </Text>

          {trainingModules.map(
            (item, index) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                style={
                  styles.moduleRow
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
                      Theme.colors
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
        </View>

        {/* Profile Button */}
        <TouchableOpacity
          style={styles.profileBtn}
          activeOpacity={0.88}
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
                name="person-add-outline"
                size={18}
                color={
                  Theme.colors
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
                Complete Profile
              </Text>

              <Text
                style={
                  styles.profileSub
                }
              >
                Submit details to
                unlock training
                approval
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#94A3B8"
          />
        </TouchableOpacity>

        {/* Quiz */}
        <View style={styles.card}>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Quick Quiz
          </Text>

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
                {current.question}
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
                  name="trophy-outline"
                  size={22}
                  color={
                    Theme.colors
                      .primary
                  }
                />

                <Text
                  style={
                    styles.score
                  }
                >
                  Score: {score}/
                  {
                    quizQuestions.length
                  }
                </Text>
              </View>

              <Text
                style={
                  styles.saved
                }
              >
                Result saved
                successfully.
              </Text>
            </>
          )}
        </View>

        {/* Status */}
        <View style={styles.card}>
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

          {score >= 8 &&
            completed && (
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
                  PVP1024
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
        Theme.colors
          .border,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      color:
        Theme.colors.text,
      marginBottom: 14,
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
        Theme.colors
          .subtext,
    },

    profileBtn: {
      backgroundColor:
        Theme.colors.card,
      borderRadius: 24,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor:
        Theme.colors
          .border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
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
      backgroundColor:
        "rgba(245,158,11,0.12)",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 12,
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
        Theme.colors
          .subtext,
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
        Theme.colors
          .primary,
    },

    stepText: {
      fontSize: 12,
      color:
        Theme.colors
          .subtext,
      marginBottom: 8,
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
        Theme.colors
          .border,
      borderRadius: 16,
      padding: 14,
      marginBottom: 10,
      backgroundColor:
        "#F8FAFC",
    },

    optionText: {
      fontSize: 14,
      color:
        Theme.colors.text,
      fontWeight: "600",
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
        Theme.colors
          .primary,
    },

    saved: {
      marginTop: 8,
      color:
        Theme.colors
          .success,
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