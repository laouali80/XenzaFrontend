import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

type SendTab = "xenza_user" | "bank_account";

interface XenzaBeneficiary {
  id: string;
  initials: string;
  shortName: string;
  fullName: string;
  phone: string;
}

interface BankBeneficiary {
  id: string;
  initials: string;
  shortName: string;
  fullName: string;
  bankName: string;
  accountNumber: string;
}

const XENZA_BENEFICIARIES: XenzaBeneficiary[] = [
  {
    id: "1",
    initials: "AB",
    shortName: "Aisha",
    fullName: "Aisha Bello",
    phone: "+227 96 14 22 08",
  },
  {
    id: "2",
    initials: "IS",
    shortName: "Ibrahim",
    fullName: "Ibrahim Sow",
    phone: "+227 90 45 18 32",
  },
];

const BANK_BENEFICIARIES: BankBeneficiary[] = [
  {
    id: "1",
    initials: "AG",
    shortName: "Amina",
    fullName: "Amina Garba",
    bankName: "Access Bank (NG)",
    accountNumber: "0224118099",
  },
];

const CORRIDOR_BANKS = [
  "Access Bank (Nigeria)",
  "GTBank (Nigeria)",
  "Zenith Bank (Nigeria)",
  "First Bank (Nigeria)",
  "UBA (Nigeria)",
  "Ecobank Niger",
  "SONIBANK (Niger)",
  "BOA Niger (Bank of Africa)",
];

interface SendMoneyScreenProps {
  onContinueToAmount?: (payload: {
    mode: SendTab;
    recipientName: string;
    phoneOrAccount: string;
    bankName?: string;
  }) => void;
}

export default function SendMoneyScreen({
  onContinueToAmount,
}: SendMoneyScreenProps) {
  const tx = useTx();

  // Mode Tab State
  const [activeTab, setActiveTab] = useState<SendTab>("bank_account");

  // Xenza User Form State
  const [xenzaName, setXenzaName] = useState<string>("");
  const [xenzaPhone, setXenzaPhone] = useState<string>("");

  // Bank Account Form State
  const [bankRecipientName, setBankRecipientName] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [isBankModalOpen, setIsBankModalOpen] = useState<boolean>(false);

  // Validation Checks
  const isXenzaFormValid =
    xenzaName.trim().length >= 2 && xenzaPhone.trim().length >= 8;

  const isBankFormValid =
    bankRecipientName.trim().length >= 2 &&
    selectedBank.length > 0 &&
    accountNumber.trim().length >= 8;

  const isFormValid =
    activeTab === "xenza_user" ? isXenzaFormValid : isBankFormValid;

  const handleSelectXenzaBeneficiary = (person: XenzaBeneficiary) => {
    setXenzaName(person.fullName);
    setXenzaPhone(person.phone);
  };

  const handleSelectBankBeneficiary = (person: BankBeneficiary) => {
    setBankRecipientName(person.fullName);
    setSelectedBank(person.bankName);
    setAccountNumber(person.accountNumber);
  };

  const handleContinue = () => {
    if (!isFormValid) return;

    if (activeTab === "xenza_user") {
      const payload = {
        mode: "xenza_user" as const,
        recipientName: xenzaName.trim(),
        phoneOrAccount: xenzaPhone.trim(),
      };
      onContinueToAmount
        ? onContinueToAmount(payload)
        : console.log("Proceeding to amount:", payload);
    } else {
      const payload = {
        mode: "bank_account" as const,
        recipientName: bankRecipientName.trim(),
        bankName: selectedBank,
        phoneOrAccount: accountNumber.trim(),
      };
      onContinueToAmount
        ? onContinueToAmount(payload)
        : console.log("Proceeding to bank amount:", payload);
    }
  };

  console.log(activeTab);
  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 22,
            paddingTop: 18,
            paddingBottom: 32,
          }}
        >
          {/* Screen Title & Subtitle */}
          <Text className="text-[28px] font-bold text-[#1A1A1A] mb-1.5">
            Send money
          </Text>
          <Text className="text-[14px] text-[#666666] mb-6">
            Transfer to a Xenza user or a bank account.
          </Text>

          {/* Segmented Mode Switcher */}
          <View className="flex-row bg-[#F3EFEA] rounded-full p-1 mb-6">
            <Pressable
              //   activeOpacity={0.85}
              onPress={() => setActiveTab("xenza_user")}
              className={`flex-1 flex-row items-center justify-center py-2.5 rounded-full ${
                activeTab === "xenza_user" ? "bg-white shadow-sm" : ""
              }`}
            >
              <Text
                className={`text-xs mr-1.5 ${
                  activeTab === "xenza_user"
                    ? "text-[#1A1A1A]"
                    : "text-[#666666]"
                }`}
              >
                👤
              </Text>
              <Text
                className={`text-xs font-semibold ${
                  activeTab === "xenza_user"
                    ? "text-[#1A1A1A]"
                    : "text-[#666666]"
                }`}
              >
                To a Xenza user
              </Text>
            </Pressable>

            <Pressable
              //   activeOpacity={0.85}
              onPress={() => setActiveTab("bank_account")}
              className={`flex-1 flex-row items-center justify-center py-2.5 rounded-full ${
                activeTab === "bank_account" ? "bg-white shadow-sm" : ""
              }`}
            >
              <Text
                className={`text-xs mr-1.5 ${
                  activeTab === "bank_account"
                    ? "text-[#1A1A1A]"
                    : "text-[#666666]"
                }`}
              >
                🏛️
              </Text>
              <Text
                className={`text-xs font-semibold ${
                  activeTab === "bank_account"
                    ? "text-[#1A1A1A]"
                    : "text-[#666666]"
                }`}
              >
                To a bank account
              </Text>
            </Pressable>
          </View>

          {/* TAB 1: TO A XENZA USER */}
          {activeTab === "xenza_user" && (
            <View>
              {/* Saved Beneficiaries */}
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
                SAVED BENEFICIARIES
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                className="mb-6"
              >
                {XENZA_BENEFICIARIES.map((person) => (
                  <TouchableOpacity
                    key={person.id}
                    activeOpacity={0.75}
                    onPress={() => handleSelectXenzaBeneficiary(person)}
                    className="flex-row items-center bg-[#FAF8F5] border border-[#EAE5DC] rounded-full pl-1.5 pr-3.5 py-1.5"
                  >
                    <View className="w-7 h-7 rounded-full bg-[#D1F2DF] items-center justify-center mr-2">
                      <Text className="text-[11px] font-bold text-[#008744]">
                        {person.initials}
                      </Text>
                    </View>
                    <Text className="text-xs font-semibold text-[#1A1A1A]">
                      {person.shortName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Recipient Name Field */}
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
                RECIPIENT NAME
              </Text>
              <TextInput
                value={xenzaName}
                onChangeText={setXenzaName}
                placeholder="Aisha Bello"
                placeholderTextColor="#B0B0B0"
                className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[52px] text-[15px] text-[#1A1A1A] mb-5"
              />

              {/* Phone Number Field */}
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
                PHONE NUMBER
              </Text>
              <TextInput
                value={xenzaPhone}
                onChangeText={setXenzaPhone}
                placeholder="+227 96 14 22 08"
                placeholderTextColor="#B0B0B0"
                keyboardType="phone-pad"
                className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[52px] text-[15px] text-[#1A1A1A] mb-5"
              />

              {/* Info Callout Banner */}
              <View className="bg-[#E6F4F1] rounded-xl px-4 py-3 flex-row items-center mb-6">
                <Text className="text-xs text-[#1E7B6B] mr-2">🛡️</Text>
                <Text className="text-xs font-medium text-[#2C5E54]">
                  Instant transfer to any Xenza wallet.
                </Text>
              </View>
            </View>
          )}

          {/* TAB 2: TO A BANK ACCOUNT */}
          {activeTab === "bank_account" && (
            <View>
              {/* Saved Beneficiaries */}
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
                SAVED BENEFICIARIES
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                className="mb-6"
              >
                {BANK_BENEFICIARIES.map((person) => (
                  <TouchableOpacity
                    key={person.id}
                    activeOpacity={0.75}
                    onPress={() => handleSelectBankBeneficiary(person)}
                    className="flex-row items-center bg-[#FAF8F5] border border-[#EAE5DC] rounded-full pl-1.5 pr-3.5 py-1.5"
                  >
                    <View className="w-7 h-7 rounded-full bg-[#D1F2DF] items-center justify-center mr-2">
                      <Text className="text-[11px] font-bold text-[#008744]">
                        {person.initials}
                      </Text>
                    </View>
                    <Text className="text-xs font-semibold text-[#1A1A1A]">
                      {person.shortName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Recipient Name Field */}
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
                RECIPIENT NAME
              </Text>
              <TextInput
                value={bankRecipientName}
                onChangeText={setBankRecipientName}
                placeholder="Chidi Enterprises"
                placeholderTextColor="#B0B0B0"
                className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[52px] text-[15px] text-[#1A1A1A] mb-5"
              />

              {/* Bank Selector Dropdown */}
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
                BANK
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsBankModalOpen(true)}
                className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[52px] flex-row items-center justify-between mb-5"
              >
                <Text
                  className={`text-[15px] ${
                    selectedBank
                      ? "text-[#1A1A1A] font-medium"
                      : "text-[#4A4A4A]"
                  }`}
                >
                  {selectedBank || "Select a bank"}
                </Text>
                <Text className="text-xs text-[#666666]">⌄</Text>
              </TouchableOpacity>

              {/* Account Number Field */}
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
                ACCOUNT NUMBER
              </Text>
              <TextInput
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholder="0224 1180 9937"
                placeholderTextColor="#B0B0B0"
                keyboardType="number-pad"
                className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[52px] text-[15px] text-[#1A1A1A] mb-5"
              />

              {/* Bank Settlement Info Banner */}
              <View className="bg-[#E6F4F1] rounded-xl px-4 py-3 flex-row items-center mb-6">
                <Text className="text-xs text-[#1E7B6B] mr-2">🛡️</Text>
                <Text className="text-xs font-medium text-[#2C5E54]">
                  Bank transfers usually settle within minutes.
                </Text>
              </View>
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!isFormValid}
            onPress={handleContinue}
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

      {/* Bank Selection Bottom Sheet Modal */}
      <Modal
        visible={isBankModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsBankModalOpen(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-[#FCFAF7] rounded-t-3xl p-6 max-h-[70%]">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-[#1A1A1A]">
                Select a bank
              </Text>
              <TouchableOpacity
                onPress={() => setIsBankModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center"
              >
                <Text className="text-sm font-bold text-[#1A1A1A]">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {CORRIDOR_BANKS.map((bank) => {
                const isSelected = selectedBank === bank;
                return (
                  <TouchableOpacity
                    key={bank}
                    onPress={() => {
                      setSelectedBank(bank);
                      setIsBankModalOpen(false);
                    }}
                    className={`py-3.5 px-4 rounded-xl mb-2 flex-row items-center justify-between ${
                      isSelected ? "bg-[#E6F5EC]" : "bg-white"
                    }`}
                  >
                    <Text className="text-sm font-semibold text-[#1A1A1A]">
                      {bank}
                    </Text>
                    {isSelected && (
                      <Text className="text-sm font-bold text-[#008744]">
                        ✓
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
