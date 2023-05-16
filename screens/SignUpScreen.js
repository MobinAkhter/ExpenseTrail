import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../components/screenWrapper";
import { colors } from "../theme";
import BackButton from "../components/backButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUserLoading } from "../redux/slices/user";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await createUserWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
        alert("Please fill all fields: ", e);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4 ">
        <View>
          <View className="relative">
            <View style="absolute top-0 left-0">
              <BackButton />
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Sign Up
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-80 w-80"
              source={require("../assets/images/signup.png")}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
            <TextInput
              value={email}
              autoCapitalize="none"
              onChangeText={(value) => setEmail(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Password
            </Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
              onSubmitEditing={handleSubmit}
              className="p-4 bg-white rounded-full mb-3"
            />
          </View>
        </View>
        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={{ backgroundColor: colors.button }}
              className="my-6 rounded-full p-3 shadow-sm mx-2"
            >
              <Text className="text-center text-white text-lg font-bold">
                Sign Up
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
