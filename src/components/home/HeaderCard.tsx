// src/components/home/HeaderCard.tsx

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Theme } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";

export default function HeaderCard() {
  const { user } = useAuth();

  const [cityName, setCityName] =
    useState(
      user?.city ||
        "Fetching location..."
    );

  const [loadingLocation, setLoadingLocation] =
    useState(true);

  const now = useMemo(
    () => new Date(),
    []
  );

  const hour =
    now.getHours();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation =
    async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (
          status !==
          "granted"
        ) {
          setCityName(
            user?.city ||
              "kolhapur, Maharashtra"
          );
          setLoadingLocation(
            false
          );
          return;
        }

        const location =
          await Location.getCurrentPositionAsync(
            {
              accuracy:
                Location
                  .Accuracy
                  .Balanced,
            }
          );

        const result =
          await Location.reverseGeocodeAsync(
            {
              latitude:
                location.coords
                  .latitude,
              longitude:
                location.coords
                  .longitude,
            }
          );

        if (
          result &&
          result.length >
            0
        ) {
          const item =
            result[0];

          const city =
            item.city ||
            item.subregion ||
            item.district ||
            "Unknown";

          const region =
            item.region ||
            "";

          setCityName(
            `${city}${
              region
                ? `, ${region}`
                : ""
            }`
          );
        } else {
          setCityName(
            user?.city ||
              "Pune, Maharashtra"
          );
        }
      } catch (
        error
      ) {
        setCityName(
          user?.city ||
            "Pune, Maharashtra"
        );
      } finally {
        setLoadingLocation(
          false
        );
      }
    };

  const getGreeting =
    () => {
      if (hour < 12)
        return "Good Morning 👋";

      if (hour < 17)
        return "Good Afternoon ☀️";

      if (hour < 21)
        return "Good Evening 🌇";

      return "Good Night 🌙";
    };

  const formatDate =
    () => {
      return now.toLocaleDateString(
        "en-IN",
        {
          weekday:
            "long",
          day: "numeric",
          month:
            "long",
        }
      );
    };

  const userName =
    user?.name ||
    user?.fullName ||
    "Technician";

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Glow */}
        <View
          style={
            styles.glowTop
          }
        />
        <View
          style={
            styles.glowBottom
          }
        />

        {/* TOP */}
        <View
          style={
            styles.topRow
          }
        >
          <View
            style={{
              flex: 1,
              paddingRight: 12,
            }}
          >
            <Text
              style={
                styles.greet
              }
            >
              {getGreeting()}
            </Text>

            <Text
              numberOfLines={
                1
              }
              style={
                styles.name
              }
            >
              {userName}
            </Text>

            <Text
              style={
                styles.role
              }
            >
              Solar Technician
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={
              0.9
            }
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
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* BOTTOM */}
        <View
          style={
            styles.bottomRow
          }
        >
          <View
            style={
              styles.infoChip
            }
          >
            <Ionicons
              name="location-outline"
              size={14}
              color="#fff"
            />

            {loadingLocation ? (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={{
                  marginLeft: 8,
                }}
              />
            ) : (
              <Text
                numberOfLines={
                  1
                }
                style={
                  styles.infoText
                }
              >
                {cityName}
              </Text>
            )}
          </View>

          <View
            style={
              styles.infoChip
            }
          >
            <Ionicons
              name="calendar-outline"
              size={14}
              color="#fff"
            />

            <Text
              style={
                styles.infoText
              }
            >
              {formatDate()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      marginBottom: 2,
      backgroundColor:
        "transparent",
    },

    card: {
      backgroundColor:
        Theme.colors
          .primary,
      borderRadius: 28,
      padding: 20,
      overflow:
        "hidden",

      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.06)",

      shadowColor:
        Theme.colors
          .primary,
      shadowOpacity: 0.18,
      shadowRadius: 16,
      shadowOffset: {
        width: 0,
        height: 10,
      },

      elevation: 0,
    },

    glowTop: {
      position:
        "absolute",
      top: -45,
      right: -15,
      width: 170,
      height: 170,
      borderRadius: 90,
      backgroundColor:
        "rgba(255,255,255,0.08)",
    },

    glowBottom: {
      position:
        "absolute",
      bottom: -55,
      left: -30,
      width: 140,
      height: 140,
      borderRadius: 80,
      backgroundColor:
        "rgba(255,255,255,0.05)",
    },

    topRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    greet: {
      fontSize: 15,
      fontWeight: "700",
      color:
        "rgba(255,255,255,0.92)",
    },

    name: {
      fontSize: 28,
      fontWeight: "900",
      color: "#fff",
      marginTop: 4,
      letterSpacing: 0.2,
    },

    role: {
      marginTop: 6,
      fontSize: 13,
      fontWeight: "600",
      color:
        "rgba(255,255,255,0.72)",
    },

    profileBtn: {
      width: 54,
      height: 54,
      borderRadius: 18,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "rgba(255,255,255,0.14)",
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.10)",
    },

    bottomRow: {
      marginTop: 18,
      gap: 10,
    },

    infoChip: {
      minHeight: 42,
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexDirection:
        "row",
      alignItems:
        "center",
      backgroundColor:
        "rgba(255,255,255,0.12)",
    },

    infoText: {
      flex: 1,
      marginLeft: 8,
      color: "#fff",
      fontSize: 13,
      fontWeight: "600",
    },
  });