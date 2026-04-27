// app/_layout.tsx

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "../src/context/AuthContext";
import { WorkProvider } from "../src/context/WorkContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <WorkProvider>
          <AuthProvider>
            <StatusBar style="dark" />

            <Stack
              initialRouteName="index"
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                contentStyle: {
                  backgroundColor: "#F8FAFC",
                },
              }}
            >
              {/* First Opening Screen */}
              <Stack.Screen name="index" />

              {/* Optional Splash */}
              <Stack.Screen name="splash" />

              {/* Public Flow */}
              <Stack.Screen name="(public)" />

              {/* Approved Technician */}
              <Stack.Screen name="(tabs)" />

              {/* Modal */}
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                }}
              />

              {/* 404 */}
              <Stack.Screen name="+not-found" />
            </Stack>
          </AuthProvider>
        </WorkProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}