import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DailyLimitCard,
  PaymentSummary,
  ProviderBanner,
} from "../../../../../../components/service-payment/ServicePaymentPrimitives";
import { useServicePayment } from "../../../../../../hooks/useServicePayment";
import type { WalletCurrency } from "../../../../../../types/money";
import { formatMoney } from "../../../../../../utils/money";

export type PlanDurationTab = "daily" | "weekly" | "monthly";

export interface DataPlanItem {
  id: string;
  volumeLabel: string; // e.g., "100 MB", "1.5 GB", "20 GB"
  validityLabel: string; // e.g., "Valid 1 day", "Valid 7 days", "Valid 30 days"
  price: number;
}

interface DataBundlePaymentScreenProps {
  providerName?: string;
  currency?: WalletCurrency;
  availableBalance?: number;
  dailyLimit?: number;
  usedToday?: number;
  onBack?: () => void;
  onContinue?: (payload: {
    providerName: string;
    currency: WalletCurrency;
    mobileNumber: string;
    selectedPlan: DataPlanItem;
    fee: number;
    totalDebited: number;
  }) => void;
}

const PLANS_BY_CURRENCY: Record<
  WalletCurrency,
  Record<PlanDurationTab, DataPlanItem[]>
> = {
  NGN: {
    daily: [
      {
        id: "ng-d1",
        volumeLabel: "100 MB",
        validityLabel: "Valid 1 day",
        price: 100,
      },
      {
        id: "ng-d2",
        volumeLabel: "350 MB",
        validityLabel: "Valid 1 day",
        price: 200,
      },
      {
        id: "ng-d3",
        volumeLabel: "1 GB",
        validityLabel: "Valid 1 day",
        price: 350,
      },
      {
        id: "ng-d4",
        volumeLabel: "2.5 GB",
        validityLabel: "Valid 2 days",
        price: 600,
      },
    ],
    weekly: [
      {
        id: "ng-w1",
        volumeLabel: "1.5 GB",
        validityLabel: "Valid 7 days",
        price: 500,
      },
      {
        id: "ng-w2",
        volumeLabel: "3.5 GB",
        validityLabel: "Valid 7 days",
        price: 1000,
      },
      {
        id: "ng-w3",
        volumeLabel: "6 GB",
        validityLabel: "Valid 7 days",
        price: 1500,
      },
      {
        id: "ng-w4",
        volumeLabel: "11 GB",
        validityLabel: "Valid 7 days",
        price: 2500,
      },
    ],
    monthly: [
      {
        id: "ng-m1",
        volumeLabel: "1 GB",
        validityLabel: "Valid 30 days",
        price: 1000,
      },
      {
        id: "ng-m2",
        volumeLabel: "2 GB",
        validityLabel: "Valid 30 days",
        price: 1500,
      },
      {
        id: "ng-m3",
        volumeLabel: "6 GB",
        validityLabel: "Valid 30 days",
        price: 2500,
      },
      {
        id: "ng-m4",
        volumeLabel: "20 GB",
        validityLabel: "Valid 30 days",
        price: 7500,
      },
    ],
  },
  XOF: {
    daily: [
      {
        id: "ne-d1",
        volumeLabel: "150 MB",
        validityLabel: "Valid 1 day",
        price: 200,
      },
      {
        id: "ne-d2",
        volumeLabel: "500 MB",
        validityLabel: "Valid 1 day",
        price: 500,
      },
      {
        id: "ne-d3",
        volumeLabel: "1.5 GB",
        validityLabel: "Valid 1 day",
        price: 1000,
      },
    ],
    weekly: [
      {
        id: "ne-w1",
        volumeLabel: "1 GB",
        validityLabel: "Valid 7 days",
        price: 1000,
      },
      {
        id: "ne-w2",
        volumeLabel: "3 GB",
        validityLabel: "Valid 7 days",
        price: 2500,
      },
      {
        id: "ne-w3",
        volumeLabel: "7 GB",
        validityLabel: "Valid 7 days",
        price: 5000,
      },
    ],
    monthly: [
      {
        id: "ne-m1",
        volumeLabel: "2 GB",
        validityLabel: "Valid 30 days",
        price: 2500,
      },
      {
        id: "ne-m2",
        volumeLabel: "5 GB",
        validityLabel: "Valid 30 days",
        price: 5000,
      },
      {
        id: "ne-m3",
        volumeLabel: "12 GB",
        validityLabel: "Valid 30 days",
        price: 10000,
      },
      {
        id: "ne-m4",
        volumeLabel: "30 GB",
        validityLabel: "Valid 30 days",
        price: 20000,
      },
    ],
  },
};

export default function DataBundlePaymentScreen({
  providerName = "MTN Nigeria",
  currency = "NGN",
  availableBalance,
  dailyLimit,
  usedToday,
  onBack,
  onContinue,
}: DataBundlePaymentScreenProps) {
  const isXof = currency === "XOF";

  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [activeDurationTab, setActiveDurationTab] =
    useState<PlanDurationTab>("monthly");

  const currentPlans = useMemo(
    () => PLANS_BY_CURRENCY[currency][activeDurationTab],
    [currency, activeDurationTab],
  );

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    currentPlans[0]?.id || "",
  );

  // Auto-select first plan whenever duration tab or currency changes
  useEffect(() => {
    if (currentPlans.length > 0) {
      setSelectedPlanId(currentPlans[0].id);
    }
  }, [currentPlans]);

  const activePlan = useMemo(
    () => currentPlans.find((p) => p.id === selectedPlanId) || currentPlans[0],
    [currentPlans, selectedPlanId],
  );

  // Defaults matching your screenshot
  const activeUsedToday = usedToday ?? (isXof ? 1309.8 : 43);

  const fee = 0;
  const {
    activeBalance,
    activeDailyLimit,
    remainingDailyLimit,
    limitUsedPercent,
    totalDebited,
    isFormValid,
  } = useServicePayment({
    currency,
    amount: activePlan?.price || 0,
    fee,
    availableBalance,
    dailyLimit,
    usedToday: activeUsedToday,
    minimumRecipientLength: 8,
    recipient: mobileNumber,
    hasSelection: Boolean(activePlan),
  });

  const durationTabs: { id: PlanDurationTab; label: string }[] = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
  ];

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
          <ProviderBanner
            providerName={providerName}
            serviceLabel="Data bundles"
            icon="📶"
            iconContainerClassName="bg-[#D6F1F5]"
            iconTextClassName="text-[#167A8C]"
          />

          {/* MOBILE NUMBER Input */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            MOBILE NUMBER
          </Text>
          <View className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[54px] flex-row items-center justify-between mb-6">
            <TextInput
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder={isXof ? "96452511" : "07041444411"}
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
              className="flex-1 text-[15px] font-medium text-[#1A1A1A] h-full"
            />
            <Text className="text-[10px] font-bold text-[#888888] tracking-wider ml-2">
              PHONE
            </Text>
          </View>

          {/* CHOOSE A PLAN Section */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            CHOOSE A PLAN
          </Text>

          {/* Horizontal Scrolling Duration Tabs (Daily | Weekly | Monthly) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            className="mb-3.5"
          >
            {durationTabs.map((tab) => {
              const isSelected = activeDurationTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  activeOpacity={0.8}
                  onPress={() => setActiveDurationTab(tab.id)}
                  className={`px-4 py-2 rounded-full border ${
                    isSelected
                      ? "bg-[#009A49] border-[#009A49]"
                      : "bg-[#FAF8F5] border-[#E5E0D8]"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isSelected ? "text-white" : "text-[#555555]"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Bundle Option Cards under Active Duration Tab */}
          <View className="gap-2.5 mb-6">
            {currentPlans.map((plan) => {
              const isSelected = plan.id === activePlan?.id;
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
                  <View>
                    <Text className="text-[15px] font-bold text-[#1A1A1A]">
                      {plan.volumeLabel}
                    </Text>
                    <Text className="text-xs text-[#666666] mt-0.5">
                      {plan.validityLabel}
                    </Text>
                  </View>

                  <Text className="text-[15px] font-bold text-[#1A1A1A]">
                    {formatMoney(plan.price, currency)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <PaymentSummary
            currency={currency}
            fee={fee}
            totalDebited={totalDebited}
          />

          <DailyLimitCard
            currency={currency}
            usedToday={activeUsedToday}
            dailyLimit={activeDailyLimit}
            remaining={remainingDailyLimit}
            percent={limitUsedPercent}
          />

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
                mobileNumber: mobileNumber.trim(),
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
              Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
