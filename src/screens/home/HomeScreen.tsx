import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTx } from "../../utils/tx";
import RecentActivitySection, {
  ActivityTransaction,
} from "./components/RecentActivitySection";
import WalletCarousel, { WalletItem } from "./components/WalletCarousel";
import QuickActionsAndRate from "./components/QuickActionsAndRate";

// const MOCK_TRANSACTIONS: ActivityTransaction[] = [
//   {
//     id: "1",
//     title: "Cash in • Agent Moussa",
//     subtitle: "Today · completed",
//     amountText: "+150,000 FCFA",
//     isIncoming: true,
//     icon: "+",
//   },
//   {
//     id: "2",
//     title: "Sent to Aisha Bello",
//     subtitle: "Yesterday · completed",
//     amountText: "-45,000 FCFA",
//     feeText: "fee 360 FCFA",
//     isIncoming: false,
//     icon: "➤",
//   },
//   {
//     id: "3",
//     title: "Airtime • Airtel Niger",
//     subtitle: "2 days ago · completed",
//     amountText: "-5,000 FCFA",
//     isIncoming: false,
//     icon: "📱",
//   },
//   {
//     id: "4",
//     title: "Received from Ibrahim Sow",
//     subtitle: "4 days ago · completed",
//     amountText: "+120,000 FCFA",
//     isIncoming: true,
//     icon: "⬇",
//   },
//   {
//     id: "5",
//     title: "Data bundle • Orange NE",
//     subtitle: "6 days ago · completed",
//     amountText: "-10,000 FCFA",
//     isIncoming: false,
//     icon: "📶",
//   },
//   {
//     id: "6",
//     title: "Electricity • NIGELEC",
//     subtitle: "02 Nov 2026 · completed",
//     amountText: "-25,000 FCFA",
//     feeText: "fee 250 FCFA",
//     isIncoming: false,
//     icon: "⚡",
//   },
// ];

type CountryCode = "NE" | "NG";

type HomeStackParamList = {
  WalletDetail: {
    countryCode: CountryCode;
    balanceFormatted: string;
    walletId: string;
  };
};

interface HomeScreenProps {
  userCountry?: CountryCode; // Comes from CreateAccount Step 4 ('NG' or 'NE')
  userName?: string;
  onNavigateAddWallet?: (targetCountry: CountryCode) => void;
}

export default function HomeScreen({
  userCountry = "NG", // Defaulting to 'NG' to preview Nigerian user flow
  userName = "aisha",
  onNavigateAddWallet,
}: HomeScreenProps) {
  const tx = useTx();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // Toggle between 1-wallet view (with "Add second wallet") and dual-wallet view
  const [hasSecondWallet, setHasSecondWallet] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "home" | "send" | "convert" | "services" | "profile"
  >("home");

  const isNigerianUser = userCountry === "NG";
  const targetSecondCountry: CountryCode = isNigerianUser ? "NE" : "NG";

  // Build ordered wallets array dynamically based on user's home country
  const wallets: WalletItem[] = useMemo(() => {
    const nigeriaWallet: WalletItem = {
      id: "ng-1",
      countryCode: "NG",
      title: "Nigeria wallet",
      currency: "NGN",
      balanceFormatted: "₦149,496",
      accountNumber: "9052393820",
      isPrimary: isNigerianUser, // Primary if Nigerian
    };

    const nigerWallet: WalletItem = {
      id: "ne-1",
      countryCode: "NE",
      title: "Niger wallet",
      currency: "XOF",
      balanceFormatted: "268,000 FCFA",
      accountNumber: "7047703551",
      isPrimary: !isNigerianUser, // Primary if Nigerien
    };

    if (isNigerianUser) {
      return hasSecondWallet ? [nigeriaWallet, nigerWallet] : [nigeriaWallet];
    } else {
      return hasSecondWallet ? [nigerWallet, nigeriaWallet] : [nigerWallet];
    }
  }, [isNigerianUser, hasSecondWallet]);

  // Dynamic Total Balance & Currency Footer Note
  const totalBalance = isNigerianUser
    ? hasSecondWallet
      ? "₦792,696"
      : "₦149,496"
    : hasSecondWallet
      ? "330,998.32 FCFA"
      : "268,000 FCFA";

  const currencyNote = isNigerianUser
    ? "Balances shown in Nigerian Naira."
    : "Balances shown in West African CFA Franc.";

  const transactions: ActivityTransaction[] = isNigerianUser
    ? [
        {
          id: "1",
          title: "Cash in • Bank Transfer",
          subtitle: "Today · completed",
          amountText: "+₦100,000",
          isIncoming: true,
          icon: "+",
        },
        {
          id: "2",
          title: "Sent to Moussa Diallo",
          subtitle: "Yesterday · completed",
          amountText: "-₦25,000",
          feeText: "fee ₦200",
          isIncoming: false,
          icon: "➤",
        },
        {
          id: "3",
          title: "Airtime • MTN Nigeria",
          subtitle: "2 days ago · completed",
          amountText: "-₦2,500",
          isIncoming: false,
          icon: "📱",
        },
      ]
    : [
        {
          id: "1",
          title: "Cash in • Agent Moussa",
          subtitle: "Today · completed",
          amountText: "+150,000 FCFA",
          isIncoming: true,
          icon: "+",
        },
        {
          id: "2",
          title: "Sent to Aisha Bello",
          subtitle: "Yesterday · completed",
          amountText: "-45,000 FCFA",
          feeText: "fee 360 FCFA",
          isIncoming: false,
          icon: "➤",
        },
        {
          id: "3",
          title: "Airtime • Airtel Niger",
          subtitle: "2 days ago · completed",
          amountText: "-5,000 FCFA",
          isIncoming: false,
          icon: "📱",
        },
      ];

  const navItems = [
    { id: "home" as const, label: tx.screens.navTabs.home, icon: "🏠" },
    { id: "send" as const, label: tx.screens.navTabs.send, icon: "➤" },
    { id: "convert" as const, label: tx.screens.navTabs.convert, icon: "⇄" },
    { id: "services" as const, label: tx.screens.navTabs.services, icon: "⊞" },
    { id: "profile" as const, label: "Menu", icon: "👤" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Top Greeting Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
              <Text className="text-base font-bold text-[#008744]">
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="text-xs text-[#666666]">Good morning,</Text>
              <Text className="text-base font-bold text-[#1A1A1A]">
                {userName}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            className="w-10 h-10 rounded-full bg-[#F5F2EC] items-center justify-center relative"
          >
            <Text className="text-base">🔔</Text>
            <View className="w-2 h-2 rounded-full bg-[#E87718] absolute top-2.5 right-2.5" />
          </TouchableOpacity>
        </View>

        {/* Total Balance Summary Card */}
        <View className="mx-5 mb-6 bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-5">
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-1.5">
            TOTAL BALANCE
          </Text>
          <Text className="text-[30px] font-extrabold text-[#1A1A1A] mb-2">
            {totalBalance}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-xs text-[#008744] font-bold mr-1.5">🛡️</Text>
            <Text className="text-xs font-medium text-[#666666]">Verified</Text>
          </View>
        </View>

        {/* Horizontal Wallet Carousel (Primary Card First, Second Wallet Opposite) */}
        <WalletCarousel
          wallets={wallets}
          hasSecondWallet={hasSecondWallet}
          onSelectWallet={(wallet) =>
            navigation.navigate("WalletDetail", {
              countryCode: wallet.countryCode,
              balanceFormatted: wallet.balanceFormatted,
              walletId: wallet.accountNumber,
            })
          }
          onAddSecondWallet={() => {
            if (onNavigateAddWallet) {
              onNavigateAddWallet(targetSecondCountry);
            } else {
              setHasSecondWallet(true);
            }
          }}
          onSeeAll={() => console.log("Navigate to All Wallets")}
        />

        {/* Quick Actions & Corridor Rate */}
        <QuickActionsAndRate
          onActionPress={(action) => console.log("Quick action:", action)}
        />

        {/* Recent Activity List + Dynamic Currency Footer Note */}
        <RecentActivitySection
          transactions={transactions}
          currencyNote={currencyNote}
          onSeeAll={() => console.log("Navigate to Full Activity")}
        />
      </ScrollView>

      {/* Bottom Tab Navigation Bar */}
      <View className="flex-row items-center justify-around bg-white border-t border-[#EFECE6] pt-2.5 pb-4 px-2">
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className="items-center px-3"
            >
              <Text
                className={`text-lg mb-1 ${
                  isActive ? "text-[#008744]" : "text-[#777777]"
                }`}
              >
                {tab.icon}
              </Text>
              <Text
                className={`text-[11px] font-semibold ${
                  isActive ? "text-[#008744]" : "text-[#666666]"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
