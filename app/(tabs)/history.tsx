// app/(tabs)/history.tsx

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  ZoomIn,
  Layout,
} from "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import Screen from "../../src/components/Screen";
import { Theme } from "../../src/theme/theme";

import { Work } from "../../src/types/work";
import { getCompletedWork } from "../../src/services/workService";

type FilterType =
  | "all"
  | "today"
  | "approved"
  | "pending";

export default function History() {
  const [filter, setFilter] =
    useState<FilterType>("all");

  const [data, setData] =
    useState<Work[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const result =
        await getCompletedWork();

      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh =
    async () => {
      setRefreshing(true);
      await loadData();
    };

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const filteredData =
    useMemo(() => {
      let list = [...data];

      if (filter === "today") {
        list = list.filter(
          (item) =>
            item.completedDate ===
            today
        );
      }

      if (
        filter === "approved"
      ) {
        list = list.filter(
          (item) =>
            item.adminApproval ===
            "Approved"
        );
      }

      if (
        filter === "pending"
      ) {
        list = list.filter(
          (item) =>
            !item.adminApproval ||
            item.adminApproval ===
              "Pending"
        );
      }

      if (search.trim()) {
        const q =
          search.toLowerCase();

        list = list.filter(
          (item) =>
            item.title
              ?.toLowerCase()
              .includes(q) ||
            item.clientName
              ?.toLowerCase()
              .includes(q) ||
            item.plantName
              ?.toLowerCase()
              .includes(q) ||
            item.location
              ?.toLowerCase()
              .includes(q)
        );
      }

      return list;
    }, [
      data,
      filter,
      search,
      today,
    ]);

  const stats =
    useMemo(() => {
      return {
        total:
          data.length,

        today:
          data.filter(
            (item) =>
              item.completedDate ===
              today
          ).length,

        approved:
          data.filter(
            (item) =>
              item.adminApproval ===
              "Approved"
          ).length,
      };
    }, [data, today]);

  const formatDate = (
    date?: string
  ) => {
    if (!date) return "—";

    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: Work;
    index: number;
  }) => {
    const approval =
      item.adminApproval ||
      "Pending";

    const approved =
      approval ===
      "Approved";

    return (
      <Animated.View
        entering={FadeInDown.delay(
          index * 70
        )}
        layout={Layout.springify()}
      >
        <TouchableOpacity
          activeOpacity={
            0.9
          }
          style={
            styles.card
          }
          onPress={() =>
            router.push({
              pathname:
                "/history/[id]",
              params: {
                id: item.id,
              },
            })
          }
        >
          {/* Top */}
          <View
            style={
              styles.cardTop
            }
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={
                  styles.title
                }
                numberOfLines={
                  1
                }
              >
                {item.title}
              </Text>

              <Text
                style={
                  styles.client
                }
                numberOfLines={
                  1
                }
              >
                {
                  item.clientName
                }
              </Text>
            </View>

            <Animated.View
              entering={ZoomIn.delay(
                index * 70
              )}
              style={
                styles.doneBadge
              }
            >
              <Text
                style={
                  styles.doneText
                }
              >
                DONE
              </Text>
            </Animated.View>
          </View>

          {/* Meta */}
          <View
            style={
              styles.metaWrap
            }
          >
            <View
              style={
                styles.metaItem
              }
            >
              <Ionicons
                name="leaf-outline"
                size={14}
                color="#64748B"
              />

              <Text
                style={
                  styles.metaText
                }
              >
                {
                  item.plantName
                }
              </Text>
            </View>

            <View
              style={
                styles.metaItem
              }
            >
              <Ionicons
                name="calendar-outline"
                size={14}
                color="#64748B"
              />

              <Text
                style={
                  styles.metaText
                }
              >
                {formatDate(
                  item.completedDate
                )}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View
            style={
              styles.footer
            }
          >
            <Animated.View
              entering={FadeInRight.delay(
                120
              )}
              style={[
                styles.status,
                approved
                  ? styles.approved
                  : styles.pending,
              ]}
            >
              <Ionicons
                name={
                  approved
                    ? "checkmark-circle"
                    : "time"
                }
                size={14}
                color={
                  approved
                    ? "#16A34A"
                    : "#F59E0B"
                }
              />

              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      approved
                        ? "#16A34A"
                        : "#F59E0B",
                  },
                ]}
              >
                {approval}
              </Text>
            </Animated.View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#94A3B8"
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Screen>
      <FlatList
        data={
          filteredData
        }
        keyExtractor={(
          item
        ) => item.id}
        renderItem={
          renderItem
        }
        showsVerticalScrollIndicator={
          false
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
          />
        }
        contentContainerStyle={{
          paddingBottom: 0,
          paddingHorizontal: 6,
        }}
        ListHeaderComponent={
          <View
            style={
              styles.container
            }
          >
            {/* Header */}
            <Animated.View
              entering={FadeInUp.duration(
                700
              )}
              style={
                styles.headerRow
              }
            >
              <View>
                <Text
                  style={
                    styles.smallHead
                  }
                >
                  Reports
                </Text>

                <Text
                  style={
                    styles.header
                  }
                >
                  Work History
                </Text>
              </View>

              <View
                style={
                  styles.iconBtn
                }
              >
                <Ionicons
                  name="time-outline"
                  size={18}
                  color="#fff"
                />
              </View>
            </Animated.View>

            {/* Stats */}
            <View
              style={
                styles.statsRow
              }
            >
              <StatCard
                value={
                  stats.total
                }
                label="Total"
                index={0}
              />

              <StatCard
                value={
                  stats.today
                }
                label="Today"
                index={1}
              />

              <StatCard
                value={
                  stats.approved
                }
                label="Approved"
                index={2}
              />
            </View>

            {/* Search */}
            <Animated.View
              entering={FadeInRight.delay(
                180
              )}
              style={
                styles.searchBox
              }
            >
              <Ionicons
                name="search"
                size={18}
                color="#94A3B8"
              />

              <TextInput
                style={
                  styles.input
                }
                placeholder="Search history..."
                placeholderTextColor="#94A3B8"
                value={
                  search
                }
                onChangeText={
                  setSearch
                }
              />
            </Animated.View>

            {/* Filters */}
            <Animated.View
              entering={FadeInUp.delay(
                230
              )}
              style={
                styles.filterRow
              }
            >
              {[
                "all",
                "today",
                "approved",
                "pending",
              ].map(
                (
                  item,
                  index
                ) => (
                  <Animated.View
                    key={
                      item
                    }
                    entering={ZoomIn.delay(
                      index *
                        70
                    )}
                  >
                    <TouchableOpacity
                      style={[
                        styles.tab,
                        filter ===
                          item &&
                          styles.activeTab,
                      ]}
                      onPress={() =>
                        setFilter(
                          item as FilterType
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.tabText,
                          filter ===
                            item &&
                            styles.activeText,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                )
              )}
            </Animated.View>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={
                Theme.colors
                  .primary
              }
              style={{
                marginTop: 60,
              }}
            />
          ) : (
            <Animated.View
              entering={FadeInUp}
              style={
                styles.empty
              }
            >
              <Ionicons
                name="folder-open-outline"
                size={54}
                color="#94A3B8"
              />

              <Text
                style={
                  styles.emptyTitle
                }
              >
                No History Found
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                Completed jobs
                will appear
                here
              </Text>
            </Animated.View>
          )
        }
      />
    </Screen>
  );
}

function StatCard({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) {
  return (
    <Animated.View
      entering={ZoomIn.delay(
        index * 120
      )}
      style={
        styles.statCard
      }
    >
      <Text
        style={
          styles.statValue
        }
      >
        {value}
      </Text>

      <Text
        style={
          styles.statLabel
        }
      >
        {label}
      </Text>
    </Animated.View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      paddingTop: 4,
    },

    headerRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      marginBottom: 18,
    },

    smallHead: {
      fontSize: 13,
      color:
        Theme.colors.subText,
      fontWeight: "700",
    },

    header: {
      fontSize: 28,
      fontWeight:
        "900",
      color:
        Theme.colors.text,
      marginTop: 2,
    },

    iconBtn: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor:
        Theme.colors.primary,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    statsRow: {
      flexDirection:
        "row",
      gap: 10,
      marginBottom: 16,
    },

    statCard: {
      flex: 1,
      backgroundColor:
        Theme.colors.surface,
      borderRadius: 20,
      padding: 14,
      alignItems:
        "center",
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      shadowColor:
        "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      elevation: 2,
    },

    statValue: {
      fontSize: 24,
      fontWeight:
        "900",
      color:
        Theme.colors.primary,
    },

    statLabel: {
      fontSize: 12,
      color: "#64748B",
      marginTop: 4,
    },

    searchBox: {
      flexDirection:
        "row",
      alignItems:
        "center",
      backgroundColor:
        Theme.colors.surface,
      borderRadius: 18,
      paddingHorizontal: 14,
      marginBottom: 14,
      height: 52,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
    },

    input: {
      flex: 1,
      marginLeft: 8,
      color: "#111827",
    },

    filterRow: {
      flexDirection:
        "row",
      flexWrap:
        "wrap",
      gap: 8,
      marginBottom: 16,
    },

    tab: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor:
        Theme.colors.surface,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
    },

    activeTab: {
      backgroundColor:
        Theme.colors.primary,
      borderColor:
        Theme.colors.primary,
    },

    tabText: {
      color: "#475569",
      fontWeight:
        "700",
      fontSize: 12,
      textTransform:
        "capitalize",
    },

    activeText: {
      color: "#fff",
    },

    card: {
      backgroundColor:
        Theme.colors.surface,
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor:
        Theme.colors.border,
      shadowColor:
         Theme.colors.border,
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      elevation: 2,
    },

    cardTop: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "flex-start",
      marginBottom: 10,
    },

    title: {
      fontSize: 15,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
    },

    client: {
      fontSize: 13,
      color: "#64748B",
      marginTop: 4,
    },

    doneBadge: {
      backgroundColor:
        "#DCFCE7",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },

    doneText: {
      fontSize: 10,
      fontWeight:
        "900",
      color: "#16A34A",
    },

    metaWrap: {
      gap: 8,
    },

    metaItem: {
      flexDirection:
        "row",
      alignItems:
        "center",
      gap: 6,
    },

    metaText: {
      fontSize: 12,
      color: "#64748B",
    },

    footer: {
      marginTop: 14,
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    status: {
      flexDirection:
        "row",
      alignItems:
        "center",
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
    },

    approved: {
      backgroundColor:
        "#F0FDF4",
    },

    pending: {
      backgroundColor:
        "#FFF7ED",
    },

    statusText: {
      fontSize: 12,
      fontWeight:
        "800",
    },

    empty: {
      alignItems:
        "center",
      marginTop: 80,
    },

    emptyTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight:
        "800",
      color:
        Theme.colors.text,
    },

    emptyText: {
      marginTop: 4,
      color: "#64748B",
    },
  });