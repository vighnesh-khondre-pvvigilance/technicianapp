// app/(tabs)/work.tsx

import React, {
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
  StatusBar,
} from "react-native";
import {
  Ionicons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

import Screen from "../../src/components/Screen";
import { Theme } from "../../src/theme/theme";
import { workData } from "../../src/data/work";

export default function Work() {
  const currentTech =
    "tech001";

  const [search, setSearch] =
    useState("");

  const assignedWork =
    workData.filter(
      (item) =>
        item.technicianId ===
          currentTech &&
        item.status ===
          "Pending"
    );

  const groupedClients =
    assignedWork.reduce(
      (
        acc: any[],
        item
      ) => {
        const existing =
          acc.find(
            (
              client
            ) =>
              client.clientId ===
              item.clientId
          );

        if (
          existing
        ) {
          existing.plants.push(
            item
          );
        } else {
          acc.push({
            clientId:
              item.clientId,
            clientName:
              item.clientName,
            plants: [item],
          });
        }

        return acc;
      },
      []
    );

  const filteredData =
    useMemo(() => {
      return groupedClients.filter(
        (item) =>
          item.clientName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      search,
      groupedClients,
    ]);

  const totalPlants =
    assignedWork.length;

  const urgentCount =
    assignedWork.filter(
      (item) =>
        item.priority ===
        "High"
    ).length;

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={
          Theme.colors
            .background
        }
      />

      <View
        style={
          styles.container
        }
      >
        {/* HEADER */}
        <Animated.View
          entering={FadeInDown.delay(
            100
          )}
          style={
            styles.headerRow
          }
        >
          <View>
            <Text
              style={
                styles.smallTitle
              }
            >
              Technician Dashboard
            </Text>

            <Text
              style={
                styles.mainTitle
              }
            >
              Work Panel
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.profileBtn
            }
            onPress={() =>
              router.push(
                "/(tabs)/profile"
              )
            }
          >
            <Ionicons
              name="person"
              size={20}
              color={
                Theme.colors
                  .textInverse
              }
            />
          </TouchableOpacity>
        </Animated.View>

        {/* HERO STATS */}
        <Animated.View
          entering={FadeInDown.delay(
            180
          )}
          style={
            styles.statsCard
          }
        >
          <View
            style={
              styles.glow1
            }
          />
          <View
            style={
              styles.glow2
            }
          />

          <View
            style={
              styles.statRow
            }
          >
            <View>
              <Text
                style={
                  styles.statLabel
                }
              >
                Assigned Clients
              </Text>

              <Text
                style={
                  styles.statSub
                }
              >
                Active accounts
              </Text>
            </View>

            <Text
              style={
                styles.statValue
              }
            >
              {
                groupedClients.length
              }
            </Text>
          </View>

          <View
            style={
              styles.line
            }
          />

          <View
            style={
              styles.statRow
            }
          >
            <View>
              <Text
                style={
                  styles.statLabel
                }
              >
                Pending Plants
              </Text>

              <Text
                style={
                  styles.statSub
                }
              >
                Visits left
              </Text>
            </View>

            <Text
              style={
                styles.statValue
              }
            >
              {
                totalPlants
              }
            </Text>
          </View>

          <View
            style={
              styles.line
            }
          />

          <View
            style={
              styles.statRow
            }
          >
            <View>
              <Text
                style={
                  styles.statLabel
                }
              >
                Urgent Visits
              </Text>

              <Text
                style={
                  styles.statSub
                }
              >
                High priority
              </Text>
            </View>

            <Text
              style={[
                styles.statValue,
                {
                  color:
                    Theme
                      .colors
                      .accent,
                },
              ]}
            >
              {
                urgentCount
              }
            </Text>
          </View>
        </Animated.View>

        {/* SEARCH */}
        <Animated.View
          entering={FadeInDown.delay(
            240
          )}
          style={
            styles.searchBox
          }
        >
          <Ionicons
            name="search"
            size={18}
            color={
              Theme.colors
                .subText
            }
          />

          <TextInput
            placeholder="Search client..."
            placeholderTextColor={
              Theme.colors
                .subText
            }
            style={
              styles.input
            }
            value={search}
            onChangeText={
              setSearch
            }
          />
        </Animated.View>

        {/* SECTION */}
        <Animated.Text
          entering={FadeInDown.delay(
            280
          )}
          style={
            styles.sectionTitle
          }
        >
          Assigned Clients
        </Animated.Text>

        {/* LIST */}
        <FlatList
          data={
            filteredData
          }
          keyExtractor={(
            item,
            index
          ) =>
            `${item.clientId}-${index}`
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          ListEmptyComponent={
            <Animated.View
              entering={FadeInDown}
              style={
                styles.emptyWrap
              }
            >
              <Ionicons
                name="briefcase-outline"
                size={52}
                color={
                  Theme.colors
                    .subText
                }
              />

              <Text
                style={
                  styles.emptyTitle
                }
              >
                No Work Found
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                No assigned
                clients right
                now
              </Text>
            </Animated.View>
          }
          renderItem={({
            item,
            index,
          }) => {
            const urgent =
              item.plants.filter(
                (
                  p: any
                ) =>
                  p.priority ===
                  "High"
              ).length;

            return (
              <Animated.View
                entering={FadeInRight.delay(
                  index *
                    80
                )}
              >
                <TouchableOpacity
                  activeOpacity={
                    0.9
                  }
                  style={
                    styles.card
                  }
                  onPress={() =>
                    router.push(
                      `/client/${item.clientId}`
                    )
                  }
                >
                  {/* Avatar */}
                  <View
                    style={
                      styles.avatar
                    }
                  >
                    <Text
                      style={
                        styles.avatarText
                      }
                    >
                      {item.clientName
                        .charAt(
                          0
                        )
                        .toUpperCase()}
                    </Text>
                  </View>

                  {/* INFO */}
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={
                        styles.name
                      }
                    >
                      {
                        item.clientName
                      }
                    </Text>

                    <Text
                      style={
                        styles.sub
                      }
                    >
                      {
                        item
                          .plants
                          .length
                      }{" "}
                      Plants
                      Assigned
                    </Text>

                    {urgent >
                      0 && (
                      <View
                        style={
                          styles.badge
                        }
                      >
                        <Ionicons
                          name="warning"
                          size={
                            12
                          }
                          color={
                            Theme
                              .colors
                              .danger
                          }
                        />

                        <Text
                          style={
                            styles.badgeText
                          }
                        >
                          {
                            urgent
                          }{" "}
                          urgent
                        </Text>
                      </View>
                    )}
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={
                      Theme
                        .colors
                        .primary
                    }
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      </View>
    </Screen>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 6,
      paddingTop: 8,
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

    smallTitle: {
      fontSize: 13,
      color:
        Theme.colors
          .subText,
      fontWeight: "600",
    },

    mainTitle: {
      fontSize: 28,
      fontWeight: "800",
      color:
        Theme.colors
          .text,
    },

    profileBtn: {
      width: 48,
      height: 48,
      borderRadius: 18,
      backgroundColor:
        Theme.colors
          .primary,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    statsCard: {
      backgroundColor:
        Theme.colors
          .primary,
      borderRadius: 28,
      padding: 18,
      marginBottom: 18,
      overflow:
        "hidden",
    },

    glow1: {
      position:
        "absolute",
      top: -35,
      right: -20,
      width: 140,
      height: 140,
      borderRadius: 80,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    glow2: {
      position:
        "absolute",
      bottom: -30,
      left: -30,
      width: 110,
      height: 110,
      borderRadius: 70,
      backgroundColor:
        "rgba(255,255,255,0.05)",
    },

    statRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
      paddingVertical: 8,
    },

    statLabel: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
    },

    statSub: {
      color:
        "rgba(255,255,255,0.72)",
      fontSize: 12,
      marginTop: 2,
    },

    statValue: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "900",
    },

    line: {
      height: 1,
      backgroundColor:
        "rgba(255,255,255,0.10)",
      marginVertical: 4,
    },

    searchBox: {
      flexDirection:
        "row",
      alignItems:
        "center",
      backgroundColor:
        Theme.colors
          .surface,
      borderRadius: 18,
      paddingHorizontal: 14,
      height: 54,
      borderWidth: 1,
      borderColor:
        Theme.colors
          .border,
      marginBottom: 18,
    },

    input: {
      flex: 1,
      marginLeft: 10,
      color:
        Theme.colors
          .text,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "800",
      color:
        Theme.colors
          .text,
      marginBottom: 12,
    },

    card: {
      backgroundColor:
        Theme.colors
          .surface,
      borderRadius: 22,
      padding: 16,
      marginBottom: 12,
      flexDirection:
        "row",
      alignItems:
        "center",
      borderWidth: 1,
      borderColor:
        Theme.colors
          .border,
    },

    avatar: {
      width: 52,
      height: 52,
      borderRadius: 18,
      backgroundColor:
        Theme.colors
          .primarySoft,
      justifyContent:
        "center",
      alignItems:
        "center",
      marginRight: 14,
    },

    avatarText: {
      fontSize: 18,
      fontWeight: "800",
      color:
        Theme.colors
          .primary,
    },

    name: {
      fontSize: 16,
      fontWeight: "700",
      color:
        Theme.colors
          .text,
    },

    sub: {
      fontSize: 13,
      color:
        Theme.colors
          .subText,
      marginTop: 4,
    },

    badge: {
      marginTop: 8,
      alignSelf:
        "flex-start",
      flexDirection:
        "row",
      alignItems:
        "center",
      backgroundColor:
        Theme.colors
          .dangerSoft,
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 20,
    },

    badgeText: {
      color:
        Theme.colors
          .danger,
      fontSize: 11,
      fontWeight: "700",
      marginLeft: 4,
    },

    emptyWrap: {
      alignItems:
        "center",
      marginTop: 80,
    },

    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color:
        Theme.colors
          .text,
      marginTop: 12,
    },

    emptyText: {
      marginTop: 6,
      fontSize: 14,
      color:
        Theme.colors
          .subText,
    },
  });