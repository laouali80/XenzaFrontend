import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTx } from "../../../../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

export interface TvBouquetPlan {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface TVSubscriptionPaymentScreenProps {
  providerName?: string;
  currency?: WalletCurrency;
  availableBalance?: number;
  dailyLimit?: number;
  usedToday?: number;
  onBack?: () => void;
  onContinue?: (payload: {
    providerName: string;
    currency: WalletCurrency;
    smartcardNumber: string;
    selectedPlan: TvBouquetPlan;
    fee: number;
    totalDebited: number;
  }) => void;
}

const TV_PLANS_BY_PROVIDER: Record<string, TvBouquetPlan[]> = {
  // Niger Providers (XOF)
  "Canal+ Niger": [
    {
      id: "canal-access",
      name: "Access",
      description: "Standard bouquet",
      price: 9900,
    },
    {
      id: "canal-evasion",
      name: "Evasion",
      description: "Full entertainment",
      price: 18000,
    },
    {
      id: "canal-tout",
      name: "Tout Canal",
      description: "All channels",
      price: 32000,
    },
  ],
  "StarTimes Niger": [
    {
      id: "st-ne-nova",
      name: "Nova",
      description: "Basic channels",
      price: 3500,
    },
    {
      id: "st-ne-smart",
      name: "Smart",
      description: "Family entertainment",
      price: 6500,
    },
    {
      id: "st-ne-super",
      name: "Super",
      description: "All sports & movies",
      price: 11000,
    },
  ],

  // Nigeria Providers (NGN)
  DSTV: [
    {
      id: "dstv-padi",
      name: "DStv Padi",
      description: "40+ channels",
      price: 3600,
    },
    {
      id: "dstv-yanga",
      name: "DStv Yanga",
      description: "85+ channels",
      price: 5100,
    },
    {
      id: "dstv-confam",
      name: "DStv Confam",
      description: "105+ channels",
      price: 9300,
    },
    {
      id: "dstv-compact",
      name: "DStv Compact",
      description: "130+ channels & sports",
      price: 15700,
    },
    {
      id: "dstv-premium",
      name: "DStv Premium",
      description: "All channels & SuperSport",
      price: 37000,
    },
  ],
  GOtv: [
    {
      id: "gotv-smallie",
      name: "GOtv Smallie",
      description: "35+ channels",
      price: 1575,
    },
    {
      id: "gotv-jinja",
      name: "GOtv Jinja",
      description: "45+ channels",
      price: 3300,
    },
    {
      id: "gotv-jolli",
      name: "GOtv Jolli",
      description: "65+ channels",
      price: 4850,
    },
    {
      id: "gotv-max",
      name: "GOtv Max",
      description: "75+ channels & sports",
      price: 7200,
    },
  ],
  StarTimes: [
    {
      id: "st-ng-nova",
      name: "Nova",
      description: "Basic bouquet",
      price: 1700,
    },
    {
      id: "st-ng-basic",
      name: "Basic",
      description: "Family bouquet",
      price: 3300,
    },
    {
      id: "st-ng-smart",
      name: "Smart",
      description: "Entertainment & sports",
      price: 4200,
    },
    {
      id: "st-ng-super",
      name: "Super",
      description: "All channels",
      price: 8200,
    },
  ],
};

export default function TVSubscriptionPaymentScreen({
  providerName = "Canal+ Niger",
  currency = "XOF",
  availableBalance,
  dailyLimit,
  usedToday,
  onBack,
  onContinue,
}: TVSubscriptionPaymentScreenProps) {
  const tx = useTx();

  const isXof = currency === "XOF";

  const [smartcardNumber, setSmartcardNumber] = useState<string>("");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const plans = useMemo(() => {
    if (TV_PLANS_BY_PROVIDER[providerName]) {
      return TV_PLANS_BY_PROVIDER[providerName];
    }
    return isXof
      ? TV_PLANS_BY_PROVIDER["Canal+ Niger"]
      : TV_PLANS_BY_PROVIDER["DSTV"];
  }, [providerName, isXof]);

  const activePlan = useMemo(
    () => plans.find((p) => p.id === selectedPlanId) || null,
    [plans, selectedPlanId],
  );

  // Default balances & limits matching your screenshots
  const activeBalance = availableBalance ?? (isXof ? 267908.2 : 149496);
  const activeDailyLimit = dailyLimit ?? (isXof ? 5000000 : 10000000);
  const activeUsedToday = usedToday ?? (isXof ? 19309.8 : 0);

  const formatMoney = (val: number) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return isXof ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  const fee = 0;
  const totalDebited = activePlan ? activePlan.price + fee : 0;

  const remainingDailyLimit = Math.max(
    0,
    activeDailyLimit - activeUsedToday - totalDebited,
  );
  const limitUsedPercent = Math.min(
    100,
    ((activeUsedToday + totalDebited) / activeDailyLimit) * 100,
  );

  const isFormValid =
    smartcardNumber.trim().length >= 6 &&
    activePlan !== null &&
    totalDebited <= activeBalance &&
    totalDebited <= activeDailyLimit - activeUsedToday;

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center px-5 pt-3 pb-3.5">
          <TouchableOpacity
            onPress={
              onBack ?? (() => console.log("Go back to Choose provider"))
            }
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <Text className="text-lg font-bold text-[#1A1A1A]">
            Payment details
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 6,
            paddingBottom: 32,
          }}
        >
          {/* Selected Provider Summary Banner */}
          <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-4 flex-row items-center mb-6">
            <View className="w-11 h-11 rounded-xl bg-[#FBE5CE] items-center justify-center mr-3.5">
              <Text className="text-lg text-[#C86D1F]">📺</Text>
            </View>
            <View>
              <Text className="text-[15px] font-bold text-[#1A1A1A]">
                {providerName}
              </Text>
              <Text className="text-xs text-[#666666] mt-0.5">
                TV subscription
              </Text>
            </View>
          </View>

          {/* SMARTCARD / IUC NUMBER Input */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            SMARTCARD / IUC NUMBER
          </Text>
          <View className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[54px] flex-row items-center justify-between mb-6">
            <TextInput
              value={smartcardNumber}
              onChangeText={setSmartcardNumber}
              placeholder="0234 5678 9012"
              placeholderTextColor="#B0B0B0"
              keyboardType="number-pad"
              className="flex-1 text-[15px] font-medium text-[#1A1A1A] h-full"
            />
            <Text className="text-[10px] font-bold text-[#888888] tracking-wider ml-2">
              IUC
            </Text>
          </View>

          {/* CHOOSE A PLAN Section */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            CHOOSE A PLAN
          </Text>

          {/* TV Bouquet Plan Cards */}
          <View className="gap-2.5 mb-6">
            {plans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;
              return (
                <TouchableOpacity
                  key={plan.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedPlanId(plan.id)}
                  className={`flex-row items-center justify-between px-4 py-3.5 rounded-2xl border-[1.5px] ${
                    isSelected
                      ? "bg-[#F2FBF6] border-[#52B788]"
                      : "bg-[#FAF8F5] border-[#EAE5DC]"
                  }`}
                >
                  <View className="flex-1 pr-3">
                    <Text className="text-[15px] font-bold text-[#1A1A1A]">
                      {plan.name}
                    </Text>
                    <Text className="text-xs text-[#666666] mt-0.5">
                      {plan.description}
                    </Text>
                  </View>

                  <Text className="text-[15px] font-bold text-[#1A1A1A]">
                    {formatMoney(plan.price)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Pay From, Fee & Total Debited Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3 mb-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Pay from</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {currency} wallet
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Fee</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {formatMoney(fee)}
              </Text>
            </View>

            <View className="border-t border-[#E8E3D9] pt-3 flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-[#1A1A1A]">
                Total debited
              </Text>
              <Text className="text-[15px] font-bold text-[#008744]">
                {formatMoney(totalDebited)}
              </Text>
            </View>
          </View>

          {/* Daily Limit Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-6">
            <View className="flex-row items-center justify-between mb-2.5">
              <View className="flex-row items-center">
                <Text className="text-xs text-[#008744] mr-1.5">🛡️</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  Daily limit
                </Text>
              </View>
              <Text className="text-[11px] text-[#666666]">
                {formatMoney(activeUsedToday)} of{" "}
                {formatMoney(activeDailyLimit)} used today
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden mb-2">
              <View
                style={{ width: `${limitUsedPercent}%` }}
                className="h-full bg-[#009A49] rounded-full"
              />
            </View>

            <Text className="text-[11px] text-[#666666]">
              {formatMoney(remainingDailyLimit)} left today
            </Text>
          </View>

          {/* Insufficient Balance Warning */}
          {totalDebited > activeBalance && (
            <Text className="text-xs font-medium text-[#C86D1F] text-center mb-3">
              Insufficient balance in your {currency} wallet.
            </Text>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!isFormValid}
            onPress={() => {
              if (!activePlan) return;
              onContinue?.({
                providerName,
                currency,
                smartcardNumber: smartcardNumber.trim(),
                selectedPlan: activePlan,
                fee,
                totalDebited,
              });
            }}
            className={`h-[54px] rounded-xl items-center justify-center ${
              isFormValid ? "bg-[#009A49]" : "bg-[#8FD1AE]"
            }`}
          >
            <Text className="text-white text-base font-semibold">
              {tx.screens.preAuthCTA.continueBtn}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
