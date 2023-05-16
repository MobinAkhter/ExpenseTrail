import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../components/screenWrapper";
import { colors } from "../theme";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { FlatList } from "react-native";
import EmptyList from "../components/emptyList";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackButton from "../components/backButton";
import ExpenseCard from "../components/expenseCard";
import { expensesRef } from "../config/firebase";
import { getDocs, query, where } from "firebase/firestore";

export default function TripExpensesScreen(props) {
  const navigation = useNavigation();
  const { id, place, country } = props.route.params;
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const q = query(expensesRef, where("tripId", "==", id));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setExpenses(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper className="flex-1">
      <View className="px-4">
        <View className="relative mt-5">
          <View style="absolute top-2 left-0">
            <BackButton />
          </View>
          <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              {place}
            </Text>
            <Text className={`${colors.heading} text-xs text-center`}>
              {country}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center items-center rounded-xl mb-4">
          <Image
            source={require("../assets/images/7.png")}
            className="w-80 h-80"
          />
        </View>
        <View className="space-y-4">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} font-bold text-xl`}>
              Expenses
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddExpense", { id, place, country })
              }
              className="p-2 px-3 bg-white border border-gray-200 rounded-full"
            >
              <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 430 }}>
            <FlatList
              data={expenses}
              ListEmptyComponent={
                <EmptyList message={"You have not recorded any expenses yet"} />
              }
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              className="mx-1"
              renderItem={({ item }) => {
                return <ExpenseCard item={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
