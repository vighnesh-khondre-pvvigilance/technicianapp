// app/not-found.tsx

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Screen from "../src/components/Screen";
import { Theme } from "../src/theme/theme";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={Theme.colors.primary}
          />
        </View>

        <Text style={styles.title}>Page Not Found</Text>

        <Text style={styles.subtitle}>
          The page you are trying to access does not exist or has been moved.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
  },

  iconWrap: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#64748B",
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 320,
  },

  button: {
    marginTop: 28,
    height: 54,
    minWidth: 180,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});