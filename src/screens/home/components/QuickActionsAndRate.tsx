import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTx } from "../../../utils/tx";

interface QuickActionsAndRateProps {
  corridorRateText?: string;
  onActionPress: (
    action: "send" | "convert" | "cash_in" | "cash_out" | "airtime",
  ) => void;
}

export default function QuickActionsAndRate({
  corridorRateText = "1,000 FCFA = ₦2,400",
  onActionPress,
}: QuickActionsAndRateProps) {
  const tx = useTx();

  const actions = [
    { id: "send" as const, label: tx.common.send, icon: "➤" },
    { id: "convert" as const, label: tx.common.convert, icon: "⇄" },
    { id: "cash_in" as const, label: "Cash in", icon: "⊕" },
    { id: "cash_out" as const, label: "Cash out", icon: "⊖" },
    { id: "airtime" as const, label: "Airtime", icon: "📱" },
  ];

  return (
    <View className="px-5 mb-6">
      {/* Quick Actions Title */}
      <Text className="text-base font-bold text-[#1A1A1A] mb-3.5">
        Quick actions
      </Text>

      {/* 5 Action Buttons Row */}
      <View className="flex-row justify-between mb-6">
        {actions.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.75}
            onPress={() => onActionPress(item.id)}
            className="items-center"
          >
            <View className="w-12 h-12 rounded-2xl bg-[#DDF5E7] items-center justify-center mb-2">
              <Text className="text-lg font-bold text-[#007A3D]">
                {item.icon}
              </Text>
            </View>
            <Text className="text-xs font-medium text-[#1A1A1A]">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Teal Corridor Rate Card */}
      <View className="bg-[#128C7E] rounded-2xl px-4 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xs font-medium text-white/85 mb-1">
            Corridor rate today
          </Text>
          <Text className="text-[17px] font-extrabold text-white">
            {corridorRateText}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onActionPress("convert")}
          className="bg-white/20 px-4 py-2 rounded-xl"
        >
          <Text className="text-xs font-bold text-white">
            {tx.common.convert}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
