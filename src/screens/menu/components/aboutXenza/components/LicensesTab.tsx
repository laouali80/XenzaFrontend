import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LicensesTab = () => {
  return (
    <View className="gap-4">
      {/* Our Partners Intro Card */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center pb-3.5 border-b border-[#EFECE6]">
          <View className="w-10 h-10 rounded-xl bg-[#D8F3E5] items-center justify-center mr-3">
            <Text className="text-base text-[#008744]">🔗</Text>
          </View>
          <View>
            <Text className="text-[15px] font-bold text-[#1A1A1A]">
              Our partners
            </Text>
            <Text className="text-[11px] text-[#666666] mt-0.5">
              🗓 Updated 1 November 2026
            </Text>
          </View>
        </View>

        <Text className="text-xs text-[#555555] leading-[18px] pt-3.5 pb-3.5 border-b border-[#EFECE6]">
          Xenza does not hold your money itself. Balances sit with licensed
          banks, mobile money operators and agent networks in Niger and Nigeria,
          and every one of them is named here.
        </Text>

        <View className="flex-row items-start pt-3">
          <View className="w-4 h-4 rounded-full border border-[#008744] items-center justify-center mr-2 mt-0.5">
            <Text className="text-[9px] font-bold text-[#008744]">✓</Text>
          </View>
          <Text className="flex-1 text-[11px] text-[#555555] leading-[16px]">
            A partner is only added once its agreement is signed and its licence
            is confirmed in the country where it operates.
          </Text>
        </View>
      </View>

      {/* NIGER (BCEAO licensed) Section Card */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden">
        {/* Country Header */}
        <View className="bg-[#F4F1EA] px-4 py-3 flex-row items-center justify-between border-b border-[#EAE5DC]">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-[#D8F3E5] items-center justify-center mr-2.5">
              <Text className="text-xs text-[#008744]">📍</Text>
            </View>
            <View>
              <Text className="text-sm font-bold text-[#1A1A1A]">Niger</Text>
              <Text className="text-[11px] text-[#666666]">
                CFA Franc wallet
              </Text>
            </View>
          </View>

          <View className="bg-[#D8F3E5] px-2.5 py-1 rounded-full">
            <Text className="text-[10px] font-bold text-[#008744]">
              BCEAO licensed
            </Text>
          </View>
        </View>

        {/* Partner 1: Bank of Africa Niger */}
        <View className="p-4 border-b border-[#EFECE6]">
          <View className="flex-row items-start">
            <View className="w-10 h-10 rounded-xl bg-[#F0EDE6] items-center justify-center mr-3">
              <Text className="text-xs font-extrabold text-[#1A1A1A]">BOA</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-0.5">
                <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                  Bank of Africa Niger
                </Text>
                <View className="bg-[#E0F2F1] px-2.5 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-[#1E7B6B]">
                    Bank
                  </Text>
                </View>
              </View>

              <Text className="text-[11px] font-medium text-[#666666] mb-1.5">
                Banking partner · CFA wallet custody
              </Text>
              <Text className="text-xs text-[#555555] leading-[18px]">
                Your CFA Franc balance is held in a segregated account at Bank
                of Africa Niger, so wallet money is kept apart from Xenza&apos;s
                own funds.
              </Text>
            </View>
          </View>
        </View>

        {/* Partner 2: Airtel Money Niger */}
        <View className="p-4">
          <View className="flex-row items-start">
            <View className="w-10 h-10 rounded-xl bg-[#F0EDE6] items-center justify-center mr-3">
              <Text className="text-xs font-extrabold text-[#1A1A1A]">AM</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-0.5">
                <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                  Airtel Money Niger
                </Text>
                <View className="bg-[#E0F2F1] px-2.5 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-[#1E7B6B]">
                    Mobile money
                  </Text>
                </View>
              </View>

              <Text className="text-[11px] font-medium text-[#666666] mb-1.5">
                Mobile money partner · cash in, cash out, airtime
              </Text>
              <Text className="text-xs text-[#555555] leading-[18px]">
                Airtel Money handles agent cash in and cash out in CFA, and
                supplies the airtime and data bundles sold in Niger.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* NIGERIA (CBN licensed) Section Card */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden">
        {/* Country Header */}
        <View className="bg-[#F4F1EA] px-4 py-3 flex-row items-center justify-between border-b border-[#EAE5DC]">
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-[#FBE5CE] items-center justify-center mr-2.5">
              <Text className="text-xs text-[#C86D1F]">📍</Text>
            </View>
            <View>
              <Text className="text-sm font-bold text-[#1A1A1A]">Nigeria</Text>
              <Text className="text-[11px] text-[#666666]">Naira wallet</Text>
            </View>
          </View>

          <View className="bg-[#FBE5CE] px-2.5 py-1 rounded-full">
            <Text className="text-[10px] font-bold text-[#B86318]">
              CBN licensed
            </Text>
          </View>
        </View>

        {/* Partner 1: OPay */}
        <View className="p-4 border-b border-[#EFECE6]">
          <View className="flex-row items-start">
            <View className="w-10 h-10 rounded-xl bg-[#F0EDE6] items-center justify-center mr-3">
              <Text className="text-xs font-extrabold text-[#1A1A1A]">OP</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-0.5">
                <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                  OPay
                </Text>
                <View className="bg-[#E0F2F1] px-2.5 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-[#1E7B6B]">
                    Mobile money
                  </Text>
                </View>
              </View>

              <Text className="text-[11px] font-medium text-[#666666] mb-1.5">
                Mobile money partner · Naira wallet operations
              </Text>
              <Text className="text-xs text-[#555555] leading-[18px]">
                OPay carries the day-to-day Naira wallet operations and
                wallet-to-wallet transfers inside Nigeria.
              </Text>
            </View>
          </View>
        </View>

        {/* Partner 2: Moniepoint */}
        <View className="p-4">
          <View className="flex-row items-start">
            <View className="w-10 h-10 rounded-xl bg-[#F0EDE6] items-center justify-center mr-3">
              <Text className="text-xs font-extrabold text-[#1A1A1A]">MP</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-0.5">
                <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                  Moniepoint
                </Text>
                <View className="bg-[#E0F2F1] px-2.5 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-[#1E7B6B]">
                    Agent network
                  </Text>
                </View>
              </View>

              <Text className="text-[11px] font-medium text-[#666666] mb-1.5">
                Agent network partner · cash in and cash out
              </Text>
              <Text className="text-xs text-[#555555] leading-[18px]">
                Moniepoint agents give you cash in and cash out in Naira, with a
                receipt in the app for every transaction.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* OTHER PARTNERSHIPS Section */}
      <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mt-1">
        OTHER PARTNERSHIPS
      </Text>

      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden">
        {/* Airtime & data networks */}
        <View className="p-4 border-b border-[#EFECE6] flex-row items-start">
          <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3 mt-0.5">
            <Text className="text-xs text-[#4A4A4A]">📱</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                Airtime & data networks
              </Text>
              <View className="bg-[#F0EDE6] px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-semibold text-[#666666]">
                  Airtime & data
                </Text>
              </View>
            </View>
            <Text className="text-xs text-[#555555] leading-[18px]">
              Airtel Niger, Orange Niger, MTN Nigeria, Airtel Nigeria, Glo and
              9mobile — every network on the corridor, bought at face value.
            </Text>
          </View>
        </View>

        {/* Electricity & water */}
        <View className="p-4 border-b border-[#EFECE6] flex-row items-start">
          <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3 mt-0.5">
            <Text className="text-xs text-[#4A4A4A]">💡</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                Electricity & water
              </Text>
              <View className="bg-[#F0EDE6] px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-semibold text-[#666666]">
                  Bills
                </Text>
              </View>
            </View>
            <Text className="text-xs text-[#555555] leading-[18px]">
              NIGELEC in Niger and the Nigerian distribution companies, so
              utility bills are paid from the same wallet.
            </Text>
          </View>
        </View>

        {/* Cross-border settlement */}
        <View className="p-4 border-b border-[#EFECE6] flex-row items-start">
          <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3 mt-0.5">
            <Text className="text-xs text-[#4A4A4A]">⇄</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                Cross-border settlement
              </Text>
              <View className="bg-[#F0EDE6] px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-semibold text-[#666666]">
                  Corridor
                </Text>
              </View>
            </View>
            <Text className="text-xs text-[#555555] leading-[18px]">
              Licensed settlement partners move value between the CFA and Naira
              sides, which is why a border transfer lands in seconds.
            </Text>
          </View>
        </View>

        {/* Identity verification */}
        <View className="p-4 flex-row items-start">
          <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3 mt-0.5">
            <Text className="text-xs text-[#4A4A4A]">🛡️</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-bold text-[#1A1A1A] flex-1 pr-2">
                Identity verification
              </Text>
              <View className="bg-[#F0EDE6] px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-semibold text-[#666666]">
                  Identity
                </Text>
              </View>
            </View>
            <Text className="text-xs text-[#555555] leading-[18px]">
              A regional KYC provider checks your document and selfie once, and
              both countries accept the result.
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Demo Wallet Notice Banner */}
      <View className="bg-[#F4F1EA] border border-[#EAE5DC] rounded-2xl px-4 py-3.5 flex-row items-start">
        <Text className="text-xs text-[#666666] mr-2 mt-0.5">ⓘ</Text>
        <Text className="flex-1 text-xs text-[#666666] leading-[18px]">
          Xenza is a demonstration wallet. No real money moves, and account data
          stays on this device.
        </Text>
      </View>
    </View>
  );
};

export default LicensesTab;

const styles = StyleSheet.create({});
