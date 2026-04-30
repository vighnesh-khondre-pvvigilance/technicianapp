// src/components/home/StatsRow.tsx

import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme/theme";

import {
  getAssignedClients,
  getPendingPlants,
  getTodayCompletedWork,
  getHighPriorityTask,
} from "../../services/workService";

export default function StatsRow() {
  const [clients, setClients] = useState(0);
  const [plants, setPlants] = useState(0);
  const [done, setDone] = useState(0);
  const [priorityTask, setPriorityTask] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 🔥 Auto reload when screen focuses
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      // Prevent multiple clicks
      if (refreshing) return;

      setRefreshing(true);
      console.log("Refreshing stats...");

      const results = await Promise.allSettled([
        getAssignedClients(),
        getPendingPlants(),
        getTodayCompletedWork(),
        getHighPriorityTask(),
      ]);

      const clientsData =
        results[0].status === "fulfilled"
          ? results[0].value
          : [];

      const plantsData =
        results[1].status === "fulfilled"
          ? results[1].value
          : [];

      const doneData =
        results[2].status === "fulfilled"
          ? results[2].value
          : [];

      const highTask =
        results[3].status === "fulfilled"
          ? results[3].value
          : null;

      setClients(() => clientsData?.length || 0);
      setPlants(() => plantsData?.length || 0);
      setDone(() => doneData?.length || 0);
      setPriorityTask(() => highTask || null);
    } catch (error) {
      console.log("Stats Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const stats = [
    {
      label: "Clients",
      value: clients,
      icon: "business",
      bg: "#EFF6FF",
      color: "#2563EB",
      onPress: () => router.push("/(tabs)/work"),
    },
    {
      label: "Plants",
      value: plants,
      icon: "leaf",
      bg: "#ECFDF5",
      color: "#16A34A",
      onPress: () => router.push("/(tabs)/work"),
    },
    {
      label: "Done",
      value: done,
      icon: "checkmark-done",
      bg: "#F5F3FF",
      color: "#7C3AED",
      onPress: () => router.push("/(tabs)/history"),
    },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.heading}>Dashboard</Text>
          <Text style={styles.subHeading}>
            Live work summary
          </Text>
        </View>

        <TouchableOpacity
          style={styles.refreshBtn}
          activeOpacity={0.85}
          onPress={loadData}
          disabled={refreshing} // ✅ Prevent spam clicks
        >
          {refreshing ? (
            <ActivityIndicator
              size="small"
              color={Theme.colors.primary}
            />
          ) : (
            <Ionicons
              name="refresh"
              size={18}
              color={Theme.colors.primary}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.row}>
        {stats.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.card}
            activeOpacity={0.9}
            onPress={item.onPress}
          >
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: item.bg },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={18}
                color={item.color}
              />
            </View>

            <Text style={styles.value}>
              {loading ? "--" : item.value}
            </Text>

            <Text style={styles.label}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Priority Task */}
      {!loading && priorityTask && (
        <TouchableOpacity
          style={styles.alertCard}
          activeOpacity={0.92}
          onPress={() => router.push("/(tabs)/work")}
        >
          <View style={styles.alertGlow} />

          <View style={styles.alertIcon}>
            <Ionicons
              name="flash"
              size={18}
              color="#fff"
            />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.alertTitle}>
              High Priority Visit
            </Text>

            <Text
              style={styles.alertText}
              numberOfLines={1}
            >
              {priorityTask.clientName} •{" "}
              {priorityTask.plantName}
            </Text>

            <Text
              style={styles.alertSub}
              numberOfLines={1}
            >
              {priorityTask.location}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      )}

      {/* No Priority */}
      {!loading && !priorityTask && (
        <View style={styles.safeCard}>
          <View style={styles.safeIcon}>
            <Ionicons
              name="shield-checkmark"
              size={16}
              color="#16A34A"
            />
          </View>

          <Text style={styles.safeText}>
            No urgent visits at the moment
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 6,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  heading: {
    fontSize: 20,
    fontWeight: "900",
    color: Theme.colors.text,
  },

  subHeading: {
    marginTop: 2,
    fontSize: 12,
    color: Theme.colors.subText,
    fontWeight: "600",
  },

  refreshBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  card: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },

  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 24,
    fontWeight: "900",
    color: Theme.colors.text,
  },

  label: {
    marginTop: 4,
    fontSize: 12,
    color: Theme.colors.subText,
    fontWeight: "700",
  },

  alertCard: {
    marginTop: 16,
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  alertGlow: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  alertIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
    alignItems: "center",
  },

  alertTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },

  alertText: {
    color: "#FEE2E2",
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
  },

  alertSub: {
    color: "#FECACA",
    marginTop: 2,
    fontSize: 12,
  },

  safeCard: {
    marginTop: 16,
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },

  safeIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  safeText: {
    flex: 1,
    color: "#166534",
    fontWeight: "800",
    fontSize: 13,
  },
});