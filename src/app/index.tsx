import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import { Stack } from "expo-router";

import ForecastItem from "@/components/ForecastItem";
import LottieView from "lottie-react-native";
import { weatherConditions } from "@/utils";
import { Weather, WeatherForecast } from "@/types";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
const bgImage =
  "https://images.pexels.com/photos/9460418/pexels-photo-9460418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export default function WeatherScreen() {
  const [weather, setWeather] = useState<Weather>();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [forecast, setForecast] = useState<WeatherForecast[]>();

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }

    const response = await fetch(
      `${BASE_URL}/weather?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeather(data);
  };

  const fetchForecast = async () => {
    if (!location) {
      return;
    }

    const response = await fetch(
      `${BASE_URL}/forecast?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    setForecast(data.list);
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <View style={styles.blur} />
      <Stack.Screen options={{ headerShown: false }} />
      {!weather ? (
        <View style={styles.bodyContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={styles.bodyContainer}>
            <LottieView
              autoPlay
              style={{
                width: 200,
                aspectRatio: 1,
              }}
              source={weatherConditions[weather.weather[0].main]}
            />
            <Text style={styles.location}>{weather.name}</Text>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
            <Text style={styles.condition}>
              {weather.weather[0].description}
            </Text>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.listContentContainer}
            data={forecast}
            renderItem={({ item }) => <ForecastItem forecast={item} />}
          />
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  bodyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },

  location: {
    fontFamily: "Inter",
    fontSize: 30,
    color: "lightgray",
  },

  temp: {
    fontFamily: "InterBlack",
    fontSize: 150,
    color: "#FEFEFE",
  },

  condition: {
    fontFamily: "InterSemi",
    fontSize: 22,
    color: "lightgray",
    textTransform: "capitalize",
  },

  list: { flexGrow: 0, height: 150, marginBottom: 40 },

  listContentContainer: { gap: 10, paddingHorizontal: 10 },
});
