// app/splash.tsx

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";
import { useAuth } from "../src/context/AuthContext";

export default function SplashScreen() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/");
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Ionicons name="flash" size={34} color="#fff" />
        </View>

        <Text style={styles.title}>PVprotech</Text>
        <Text style={styles.subtitle}>Technician Workforce Platform</Text>

        <ActivityIndicator
          size="small"
          color={Theme.colors.primary}
          style={{ marginTop: 30 }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  logoBox: {
    width: 82,
    height: 82,
    borderRadius: 26,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
});