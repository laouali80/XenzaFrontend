import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Text>test</Text>
    // <Stack.Navigator id="AppStack">
    //   <Stack.Screen name="Home" component={HomeScreen} />
    //   <Stack.Screen
    //     name="Search"
    //     component={SearchScreen}
    //     options={({ navigation }) => ({
    //       headerShown: Platform.OS !== "android",
    //       headerTitle: "Search",
    //       headerTitleAlign: "center",
    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.goBack}>
    //           <Ionicons
    //             name="chevron-back-circle"
    //             size={30}
    //             color={COLORS.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //       headerStyle: { backgroundColor: "#f0f0f0" },
    //     })}
    //   />
    //   <Stack.Screen
    //     name="Auction"
    //     component={AuctionScreen}
    //     options={({ navigation }) => ({
    //       headerShown: Platform.OS !== "android",
    //       headerTitle: "Auction Detail",
    //       headerTitleAlign: "center",
    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.goBack}>
    //           <Ionicons
    //             name="chevron-back-circle"
    //             size={30}
    //             color={COLORS.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //       headerStyle: { backgroundColor: "#f0f0f0" },
    //     })}
    //   />
    //   <Stack.Screen
    //     name="BidHistory"
    //     component={BidHistory}
    //     options={({ navigation }) => ({
    //       headerShown: Platform.OS !== "android",
    //       headerTitle: "Bid History",
    //       headerTitleAlign: "center",
    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.goBack}>
    //           <Ionicons
    //             name="chevron-back-circle"
    //             size={30}
    //             color={COLORS.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //       headerStyle: { backgroundColor: "#f0f0f0" },
    //     })}
    //   />
    //   <Stack.Screen
    //     name="AuctionCreation"
    //     component={CreationScreen}
    //     options={({ navigation }) => ({
    //       headerShown: Platform.OS !== "android",
    //       headerTitle: "Create an Auction",
    //       headerTitleAlign: "center",
    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.goBack}>
    //           <Ionicons
    //             name="chevron-back-circle"
    //             size={30}
    //             color={COLORS.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //       headerStyle: { backgroundColor: "#f0f0f0" },
    //     })}
    //   />
    //   <Stack.Screen
    //     name="Chat"
    //     component={ChatScreen}
    //     options={({ navigation }) => ({
    //       headerShown: Platform.OS !== "android",

    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.goBack}>
    //           <Ionicons
    //             name="chevron-back-circle"
    //             size={30}
    //             color={COLORS.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //       headerStyle: { backgroundColor: "#f0f0f0" },
    //     })}
    //   />
    //   <Stack.Screen
    //     name="Notifications"
    //     component={NotificationsScreen}
    //     options={({ navigation }) => ({
    //       headerShown: Platform.OS !== "android",
    //       headerTitle: "Notifications",
    //       headerTitleAlign: "center",
    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.goBack}>
    //           <Ionicons
    //             name="chevron-back-circle"
    //             size={30}
    //             color={COLORS.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //       headerStyle: { backgroundColor: "#f0f0f0" },
    //     })}
    //   />
    //   <Stack.Screen
    //     name="MyAuctions"
    //     component={MyAuctionsScreen}
    //     options={({ navigation }) => ({
    //       headerShown: Platform.OS !== "android",
    //       headerTitle: "My Auctions",
    //       headerTitleAlign: "center",
    //       headerLeft: () => (
    //         <TouchableOpacity onPress={navigation.goBack}>
    //           <Ionicons
    //             name="chevron-back-circle"
    //             size={30}
    //             color={COLORS.primary}
    //           />
    //         </TouchableOpacity>
    //       ),
    //       headerStyle: { backgroundColor: "#f0f0f0" },
    //     })}
    //   />
    // </Stack.Navigator>
  );
}
