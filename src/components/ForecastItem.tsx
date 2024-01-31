import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";
import { WeatherForecast } from "@/types";

const ForecastItem = ({ forecast }: { forecast: WeatherForecast }) => {
  return (
    <BlurView intensity={30} style={styles.container}>
      <Text style={styles.temp}>{Math.round(forecast.main.temp)}°</Text>
      <Text style={styles.date}>
        {dayjs(forecast.dt * 1000).format("ddd ha")}
      </Text>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "#DCDCDC",
    borderWidth: StyleSheet.hairlineWidth,
  },

  temp: {
    fontFamily: "InterBlack",
    fontSize: 35,
    color: "white",
    marginVertical: 10,
  },

  date: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "ghostwhite",
  },
});

export default ForecastItem;
