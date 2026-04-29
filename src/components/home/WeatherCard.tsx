// src/components/home/WeatherCard.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

export default function WeatherCard() {
  const [loading, setLoading] =
    useState(true);

  const [weather, setWeather] =
    useState<any>(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current_weather=true"
      );

      const data = await res.json();

      setWeather(
        data.current_weather
      );
    } catch (error) {
      console.log(
        "Weather Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (
    code: number
  ) => {
    if (code === 0)
      return "sunny";
    if (code <= 3)
      return "partly-sunny";
    if (code <= 48)
      return "cloudy";
    if (code <= 67)
      return "rainy";
    if (code <= 77)
      return "snow";
    if (code <= 99)
      return "thunderstorm";

    return "cloud";
  };

  const getWeatherText = (
    code: number
  ) => {
    if (code === 0)
      return "Clear Sky";
    if (code <= 3)
      return "Partly Cloudy";
    if (code <= 48)
      return "Foggy";
    if (code <= 67)
      return "Rain";
    if (code <= 77)
      return "Snow";
    if (code <= 99)
      return "Storm";

    return "Weather";
  };

  const getSafetyTip = (
    code: number
  ) => {
    if (code <= 3)
      return "Perfect weather for rooftop maintenance";
    if (code <= 67)
      return "Use anti-slip shoes and safety harness";
    if (code <= 99)
      return "Avoid outdoor panel work if possible";

    return "Inspect tools before starting";
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.smallHead}>
            Live Forecast
          </Text>

          <Text style={styles.heading}>
            Weather Insight
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={fetchWeather}
          style={styles.refreshBtn}
        >
          <Ionicons
            name="refresh"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Glow Effects */}
        <View style={styles.glow1} />
        <View style={styles.glow2} />
        <View style={styles.glow3} />

        {loading ? (
          <View style={styles.loaderBox}>
            <ActivityIndicator
              size="large"
              color="#fff"
            />

            <Text
              style={styles.loadingText}
            >
              Fetching weather...
            </Text>
          </View>
        ) : (
          <>
            {/* LEFT SIDE */}
            <View style={styles.left}>
              <Text style={styles.city}>
                Pune, Maharashtra
              </Text>

              <Text style={styles.temp}>
                {Math.round(
                  weather?.temperature
                )}
                °C
              </Text>

              <Text style={styles.status}>
                {getWeatherText(
                  weather?.weathercode
                )}
              </Text>

              <View style={styles.metaRow}>
                <View
                  style={styles.metaChip}
                >
                  <Ionicons
                    name="speedometer-outline"
                    size={14}
                    color="#fff"
                  />

                  <Text
                    style={styles.metaText}
                  >
                    {
                      weather?.windspeed
                    } km/h
                  </Text>
                </View>

                <View
                  style={styles.metaChip}
                >
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color="#fff"
                  />

                  <Text
                    style={styles.metaText}
                  >
                    Live
                  </Text>
                </View>
              </View>

              <View style={styles.tipBox}>
                <Ionicons
                  name="shield-checkmark"
                  size={14}
                  color="#fff"
                />

                <Text style={styles.tip}>
                  {getSafetyTip(
                    weather?.weathercode
                  )}
                </Text>
              </View>
            </View>

            {/* RIGHT SIDE */}
            <View style={styles.right}>
              <View
                style={styles.iconWrap}
              >
                <Ionicons
                  name={getWeatherIcon(
                    weather?.weathercode
                  )}
                  size={58}
                  color="#fff"
                />
              </View>

              <Text style={styles.updated}>
                Updated Now
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrapper: {
      marginTop: 20,
    },

    topRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 14,
    },

    smallHead: {
      fontSize: 13,
      color:
        Theme.colors.subText,
      fontWeight: "700",
    },

    heading: {
      fontSize: 20,
      fontWeight: "900",
      color:
        Theme.colors.text,
      marginTop: 2,
    },

    refreshBtn: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor:
        Theme.colors.primary,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    card: {
      backgroundColor:
        Theme.colors.primary,
      borderRadius: 28,
      padding: 20,
      minHeight: 210,
      flexDirection: "row",
      overflow: "hidden",

      shadowColor:
        Theme.colors.shadow,
      shadowOpacity: 0.1,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 8,
      },

      elevation: 4,
    },

    glow1: {
      position: "absolute",
      top: -45,
      right: -20,
      width: 170,
      height: 170,
      borderRadius: 100,
      backgroundColor:
        "rgba(255,255,255,0.09)",
    },

    glow2: {
      position: "absolute",
      bottom: -50,
      left: -25,
      width: 130,
      height: 130,
      borderRadius: 80,
      backgroundColor:
        "rgba(255,255,255,0.05)",
    },

    glow3: {
      position: "absolute",
      top: 60,
      right: 30,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor:
        "rgba(255,255,255,0.04)",
    },

    loaderBox: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    loadingText: {
      color: "#fff",
      marginTop: 12,
      fontWeight: "700",
    },

    left: {
      flex: 1,
      paddingRight: 8,
    },

    city: {
      color:
        "rgba(255,255,255,0.75)",
      fontSize: 14,
      fontWeight: "700",
    },

    temp: {
      fontSize: 50,
      fontWeight: "900",
      color: "#fff",
      marginTop: 6,
      lineHeight: 56,
    },

    status: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "800",
      marginTop: 2,
    },

    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 14,
    },

    metaChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "rgba(255,255,255,0.14)",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 14,
    },

    metaText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "700",
      marginLeft: 6,
    },

    tipBox: {
      marginTop: 14,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor:
        "rgba(255,255,255,0.12)",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 16,
    },

    tip: {
      flex: 1,
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
      marginLeft: 8,
      lineHeight: 17,
    },

    right: {
      width: 118,
      alignItems: "center",
      justifyContent:
        "center",
      marginLeft: 8,
    },

    iconWrap: {
      width: 92,
      height: 92,
      borderRadius: 46,
      backgroundColor:
        "rgba(255,255,255,0.14)",
      justifyContent:
        "center",
      alignItems:
        "center",
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.08)",
    },

    updated: {
      marginTop: 12,
      fontSize: 11,
      color:
        "rgba(255,255,255,0.75)",
      fontWeight: "700",
    },
  });