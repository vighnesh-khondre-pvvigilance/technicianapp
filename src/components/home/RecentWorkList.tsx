// src/components/home/RecentWorkList.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Theme } from "../../theme/theme";

import {
  getTodayAllWork,
  getCompletedWork,
} from "../../services/workService";

export default function RecentWorkList() {
  const [todaySchedule, setTodaySchedule] =
    useState<any[]>([]);

  const [monthlyJobs, setMonthlyJobs] =
    useState(0);

  const [pendingCount, setPendingCount] =
    useState(0);

  const [completedToday, setCompletedToday] =
    useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const today = await getTodayAllWork();
    const completed =
      await getCompletedWork();

    setTodaySchedule(today);

    const now = new Date();

    const monthJobs =
      completed.filter((item) => {
        if (!item.completedDate)
          return false;

        const d = new Date(
          item.completedDate +
            "T00:00:00"
        );

        return (
          d.getMonth() ===
            now.getMonth() &&
          d.getFullYear() ===
            now.getFullYear()
        );
      });

    const pending =
      today.filter(
        (item) =>
          item.status === "Pending"
      );

    const doneToday =
      today.filter(
        (item) =>
          item.status ===
          "Completed"
      );

    setMonthlyJobs(
      monthJobs.length
    );

    setPendingCount(
      pending.length
    );

    setCompletedToday(
      doneToday.length
    );
  };

  const getDateBadge = (
    item: any
  ) => {
    const date =
      item.assignedDate ||
      item.completedDate;

    if (!date)
      return {
        day: "--",
        month: "--",
      };

    const d = new Date(
      date + "T00:00:00"
    );

    return {
      day: d.getDate(),
      month:
        d.toLocaleDateString(
          "en-IN",
          {
            month:
              "short",
          }
        ),
    };
  };

  const getPriorityColor = (
    priority: string
  ) => {
    if (
      priority === "High"
    )
      return "#EF4444";

    if (
      priority ===
      "Medium"
    )
      return "#F59E0B";

    return "#10B981";
  };

  return (
    <View style={styles.wrapper}>
      {/* HEADER */}
      <View style={styles.topHeader}>
        <View>
          <Text
            style={styles.smallHead}
          >
            Activity Report
          </Text>

          <Text
            style={styles.heading}
          >
            Performance
          </Text>
        </View>

        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() =>
            router.push(
              "/(tabs)/history"
            )
          }
        >
          <Text style={styles.link}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* PREMIUM SUMMARY */}
      <View style={styles.summaryCard}>
        <View style={styles.glow1} />
        <View style={styles.glow2} />

        <View
          style={styles.metricBox}
        >
          <Text
            style={
              styles.metricNumber
            }
          >
            {monthlyJobs}
          </Text>

          <Text
            style={
              styles.metricLabel
            }
          >
            This Month
          </Text>
        </View>

        <View
          style={styles.divider}
        />

        <View
          style={styles.metricBox}
        >
          <Text
            style={
              styles.metricNumber
            }
          >
            {pendingCount}
          </Text>

          <Text
            style={
              styles.metricLabel
            }
          >
            Pending
          </Text>
        </View>

        <View
          style={styles.divider}
        />

        <View
          style={styles.metricBox}
        >
          <Text
            style={
              styles.metricNumber
            }
          >
            {
              completedToday
            }
          </Text>

          <Text
            style={
              styles.metricLabel
            }
          >
            Done Today
          </Text>
        </View>
      </View>

      {/* TODAY HEADER */}
      <View
        style={[
          styles.topHeader,
          {
            marginTop: 24,
          },
        ]}
      >
        <View>
          <Text
            style={styles.smallHead}
          >
            Schedule
          </Text>

          <Text
            style={styles.heading}
          >
            Today Visits
          </Text>
        </View>

        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() =>
            router.push(
              "/(tabs)/work"
            )
          }
        >
          <Text style={styles.link}>
            Open Work
          </Text>
        </TouchableOpacity>
      </View>

      {/* EMPTY */}
      {todaySchedule.length ===
      0 ? (
        <View
          style={styles.emptyCard}
        >
          <View
            style={
              styles.emptyIcon
            }
          >
            <Ionicons
              name="calendar-outline"
              size={24}
              color={
                Theme.colors
                  .primary
              }
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={
                styles.emptyTitle
              }
            >
              No Work Today
            </Text>

            <Text
              style={
                styles.emptyText
              }
            >
              You are all clear
              for now.
            </Text>
          </View>
        </View>
      ) : (
        todaySchedule.map(
          (item) => {
            const badge =
              getDateBadge(
                item
              );

            const color =
              getPriorityColor(
                item.priority
              );

            const done =
              item.status ===
              "Completed";

            return (
              <TouchableOpacity
                key={
                  item.id
                }
                activeOpacity={
                  0.88
                }
                style={[
                  styles.taskCard,
                  {
                    borderLeftColor:
                      color,
                  },
                ]}
                onPress={() =>
                  router.push(
                    "/(tabs)/work"
                  )
                }
              >
                {/* DATE */}
                <View
                  style={
                    styles.dateBadge
                  }
                >
                  <Text
                    style={
                      styles.day
                    }
                  >
                    {
                      badge.day
                    }
                  </Text>

                  <Text
                    style={
                      styles.month
                    }
                  >
                    {
                      badge.month
                    }
                  </Text>
                </View>

                {/* CONTENT */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      styles.taskTitle
                    }
                    numberOfLines={1}
                  >
                    {
                      item.title
                    }
                  </Text>

                  <Text
                    style={
                      styles.taskSub
                    }
                    numberOfLines={1}
                  >
                    {
                      item.clientName
                    }{" "}
                    •{" "}
                    {
                      item.plantName
                    }
                  </Text>

                  <Text
                    style={
                      styles.location
                    }
                    numberOfLines={1}
                  >
                    {
                      item.location
                    }
                  </Text>

                  <View
                    style={
                      styles.row
                    }
                  >
                    <View
                      style={[
                        styles.priorityTag,
                        {
                          backgroundColor:
                            color,
                        },
                      ]}
                    >
                      <Text
                        style={
                          styles.priorityText
                        }
                      >
                        {
                          item.priority
                        }
                      </Text>
                    </View>

                    <Text
                      style={
                        styles.visitType
                      }
                    >
                      {
                        item.visitType
                      }
                    </Text>
                  </View>
                </View>

                {/* STATUS */}
                <View
                  style={
                    styles.statusWrap
                  }
                >
                  <Ionicons
                    name={
                      done
                        ? "checkmark-circle"
                        : "time"
                    }
                    size={24}
                    color={
                      done
                        ? "#10B981"
                        : "#F59E0B"
                    }
                  />

                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color="#94A3B8"
                  />
                </View>
              </TouchableOpacity>
            );
          }
        )
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      marginTop: 22,
    },

    topHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 14,
    },

    smallHead: {
      fontSize: 13,
      fontWeight: "700",
      color:
        Theme.colors
          .subText,
    },

    heading: {
      fontSize: 20,
      fontWeight: "900",
      color:
        Theme.colors.text,
      marginTop: 2,
    },

    linkBtn: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 14,
      backgroundColor:
        Theme.colors
          .surface,
    },

    link: {
      fontSize: 12,
      fontWeight: "800",
      color:
        Theme.colors
          .primary,
    },

    summaryCard: {
      backgroundColor:
        Theme.colors
          .primary,
      borderRadius: 28,
      paddingVertical: 22,
      flexDirection: "row",
      alignItems:
        "center",
      overflow: "hidden",
      elevation: 3,
    },

    glow1: {
      position: "absolute",
      top: -45,
      right: -15,
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    glow2: {
      position: "absolute",
      bottom: -55,
      left: -20,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor:
        "rgba(255,255,255,0.05)",
    },

    metricBox: {
      flex: 1,
      alignItems:
        "center",
    },

    metricNumber: {
      color: "#fff",
      fontSize: 28,
      fontWeight: "900",
    },

    metricLabel: {
      color:
        "rgba(255,255,255,0.72)",
      fontSize: 12,
      marginTop: 5,
      fontWeight: "700",
    },

    divider: {
      width: 1,
      height: 46,
      backgroundColor:
        "rgba(255,255,255,0.14)",
    },

    emptyCard: {
      backgroundColor:
        Theme.colors
          .surface,
      borderRadius: 22,
      padding: 18,
      flexDirection:
        "row",
      alignItems:
        "center",
      gap: 12,
    },

    emptyIcon: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor:
        "#EEF2FF",
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    emptyTitle: {
      fontWeight: "800",
      fontSize: 15,
      color:
        Theme.colors.text,
    },

    emptyText: {
      marginTop: 4,
      fontSize: 12,
      color: "#64748B",
    },

    taskCard: {
      backgroundColor:
        Theme.colors
          .surface,
      borderRadius: 24,
      padding: 14,
      marginBottom: 12,
      flexDirection:
        "row",
      alignItems:
        "center",
      borderLeftWidth: 5,
      elevation: 2,
    },

    dateBadge: {
      width: 60,
      height: 60,
      borderRadius: 18,
      backgroundColor:
        "#F8FAFC",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 12,
    },

    day: {
      fontSize: 20,
      fontWeight: "900",
      color:
        Theme.colors.text,
      lineHeight: 22,
    },

    month: {
      fontSize: 11,
      color: "#64748B",
      fontWeight: "800",
      textTransform:
        "uppercase",
    },

    taskTitle: {
      fontSize: 15,
      fontWeight: "800",
      color:
        Theme.colors.text,
    },

    taskSub: {
      marginTop: 3,
      fontSize: 12,
      color: "#475569",
    },

    location: {
      marginTop: 2,
      fontSize: 12,
      color: "#94A3B8",
    },

    row: {
      flexDirection:
        "row",
      alignItems:
        "center",
      marginTop: 9,
      gap: 8,
      flexWrap: "wrap",
    },

    priorityTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },

    priorityText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "900",
    },

    visitType: {
      fontSize: 11,
      color: "#64748B",
      fontWeight: "700",
    },

    statusWrap: {
      marginLeft: 10,
      alignItems:
        "center",
      gap: 8,
    },
  });