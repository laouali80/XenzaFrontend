import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqGroup {
  title: string;
  items: FaqItem[];
}

interface HelpAndSupportScreenProps {
  defaultUserName?: string;
  defaultEmail?: string;
  onBack?: () => void;
  onSubmitMessage?: (payload: {
    name: string;
    email: string;
    topic: string;
    message: string;
  }) => void;
}

const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "GETTING STARTED",
    items: [
      {
        id: "faq-second-wallet",
        question: "How do I add my second wallet?",
        answer:
          'Go to Menu, then Profile, then Account status, or open your wallet and choose "Add second wallet". You can hold CFA Franc and Naira side by side and switch between them instantly.',
      },
      {
        id: "faq-verify-id",
        question: "What do I need to verify my identity?",
        answer:
          "You only need a valid government-issued ID (National ID card, Passport, Voter Card, or Driver’s License) and a quick selfie check. Verification usually takes a few minutes.",
      },
    ],
  },
  {
    title: "MONEY, RATES & FEES",
    items: [
      {
        id: "faq-corridor-rate",
        question: "Which rate is used when I send or convert?",
        answer:
          "All cross-border sends and wallet conversions use Xenza’s live corridor rate, which includes a transparent 1.2% margin shown before you confirm.",
      },
      {
        id: "faq-free-services",
        question: "Why are airtime, data and cash in free?",
        answer:
          "Xenza covers carrier and agent deposit fees so you can top up airtime, buy mobile data, pay TV subscriptions, and deposit cash at any Xenza agent with zero extra charge.",
      },
    ],
  },
  {
    title: "SAFETY & LIMITS",
    items: [
      {
        id: "faq-blocked-payment",
        question: "Why was my payment blocked?",
        answer:
          "Payments are paused if they exceed your current per-transaction or daily outgoing limit, or if your wallet balance is insufficient. Check Limits & usage in Menu for details.",
      },
      {
        id: "faq-raise-limits",
        question: "How do I raise my limits?",
        answer:
          "Complete your identity verification (KYC) from the Menu or Limits & usage screen to unlock higher daily and per-transaction limits.",
      },
      {
        id: "faq-forgot-pin",
        question: "I forgot my PIN. What now?",
        answer:
          'Go to Menu → Security → Change PIN, or tap "Forgot PIN?" on the confirmation screen to reset your 4-digit PIN after verifying your phone number.',
      },
      {
        id: "faq-money-safe",
        question: "Is my money safe with Xenza?",
        answer:
          "Yes. Your funds are safeguarded with licensed banking partners, protected by your 4-digit PIN and biometric lock, and monitored 24/7 against unauthorized access.",
      },
    ],
  },
];

const SUPPORT_TOPICS = [
  "Account & verification",
  "Transfers & conversions",
  "Agent cash in / cash out",
  "Airtime, data & bills",
  "Security & PIN",
  "Other",
];

export default function HelpAndSupportScreen({
  defaultUserName = "airt",
  defaultEmail = "",
  onBack,
  onSubmitMessage,
}: HelpAndSupportScreenProps) {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(
    "faq-second-wallet",
  );
  const [name, setName] = useState<string>(defaultUserName);
  const [email, setEmail] = useState<string>(defaultEmail);
  const [selectedTopic, setSelectedTopic] = useState<string>(
    "Account & verification",
  );
  const [topicModalVisible, setTopicModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  const handleCallUs = () => {
    Linking.openURL("tel:+22790000000").catch(() =>
      Alert.alert("Call Support", "+227 90 00 00 00"),
    );
  };

  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me").catch(() =>
      Alert.alert("WhatsApp Support", "+227 90 00 00 00"),
    );
  };

  const handleEmail = () => {
    Linking.openURL("mailto:help@xenza.app").catch(() =>
      Alert.alert("Email Support", "help@xenza.app"),
    );
  };

  const handleSendMessage = () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      Alert.alert("Required", "Please describe your question or issue.");
      return;
    }

    if (onSubmitMessage) {
      onSubmitMessage({
        name: name.trim(),
        email: email.trim(),
        topic: selectedTopic,
        message: message.trim(),
      });
    } else {
      Alert.alert(
        "Message sent",
        "Thank you! Our support team will reply to your email shortly.",
      );
    }
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
          <TouchableOpacity
            onPress={onBack ?? (() => console.log("Go back to Menu"))}
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-lg font-bold text-[#1A1A1A]">
              Help & support
            </Text>
            <Text numberOfLines={1} className="text-xs text-[#666666] mt-0.5">
              Answers to common questions, and a real person when you need one.
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 18,
            paddingBottom: 36,
          }}
        >
          {/* Green Hero Card */}
          <View className="bg-[#008744] rounded-2xl p-5 mb-5">
            <View className="w-10 h-10 rounded-xl bg-white/15 items-center justify-center mb-3.5">
              <Text className="text-lg text-white">🎧</Text>
            </View>

            <Text className="text-[18px] font-bold text-white mb-1.5">
              We are here to help
            </Text>

            <Text className="text-xs text-white/90 leading-[18px] mb-4">
              Most questions are answered below. If not, send us a message and
              we will reply by email.
            </Text>

            <View className="self-start bg-white/15 px-3 py-1.5 rounded-full flex-row items-center">
              <Text className="text-[11px] text-white mr-1.5">🕒</Text>
              <Text className="text-[11px] font-semibold text-white">
                Usually replies within a few hours
              </Text>
            </View>
          </View>

          {/* REACH US Section */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            REACH US
          </Text>

          <View className="flex-row gap-2.5 mb-6">
            {/* Call Us */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCallUs}
              className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl py-3.5 px-2 items-center"
            >
              <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mb-2">
                <Text className="text-sm text-[#008744]">📞</Text>
              </View>
              <Text className="text-xs font-bold text-[#1A1A1A] mb-0.5">
                Call us
              </Text>
              <Text numberOfLines={1} className="text-[9.5px] text-[#666666]">
                +227 90 00 00 00
              </Text>
            </TouchableOpacity>

            {/* WhatsApp */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleWhatsApp}
              className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl py-3.5 px-2 items-center"
            >
              <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mb-2">
                <Text className="text-sm text-[#008744]">💬</Text>
              </View>
              <Text className="text-xs font-bold text-[#1A1A1A] mb-0.5">
                WhatsApp
              </Text>
              <Text numberOfLines={1} className="text-[9.5px] text-[#666666]">
                +227 90 00 00 00
              </Text>
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleEmail}
              className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl py-3.5 px-2 items-center"
            >
              <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mb-2">
                <Text className="text-sm text-[#008744]">✉️</Text>
              </View>
              <Text className="text-xs font-bold text-[#1A1A1A] mb-0.5">
                Email
              </Text>
              <Text numberOfLines={1} className="text-[9.5px] text-[#666666]">
                help@xenza.app
              </Text>
            </TouchableOpacity>
          </View>

          {/* Frequently Asked Questions Header */}
          <Text className="text-[16px] font-bold text-[#1A1A1A] mb-0.5">
            Frequently asked questions
          </Text>
          <Text className="text-xs text-[#666666] mb-3.5">
            Tap a question to see the answer.
          </Text>

          {/* FAQ Accordion Groups */}
          <View className="gap-4 mb-6">
            {FAQ_GROUPS.map((group) => (
              <View
                key={group.title}
                className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden"
              >
                {/* Group Header Banner */}
                <View className="bg-[#F4F1EA] px-4 py-2.5 border-b border-[#EAE5DC]">
                  <Text className="text-[10px] font-bold text-[#666666] tracking-[0.6px]">
                    {group.title}
                  </Text>
                </View>

                {/* Questions */}
                {group.items.map((item, idx) => {
                  const isExpanded = expandedFaqId === item.id;
                  const isLast = idx === group.items.length - 1;

                  return (
                    <View
                      key={item.id}
                      className={!isLast ? "border-b border-[#EFECE6]" : ""}
                    >
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => toggleFaq(item.id)}
                        className="px-4 py-3.5 flex-row items-center justify-between"
                      >
                        <Text className="flex-1 text-[13px] font-semibold text-[#1A1A1A] pr-3 leading-[18px]">
                          {item.question}
                        </Text>

                        <View
                          className={`w-6 h-6 rounded-full items-center justify-center ${
                            isExpanded ? "bg-[#D8F3E5]" : "bg-[#F0EDE6]"
                          }`}
                        >
                          <Text
                            className={`text-xs font-bold ${
                              isExpanded ? "text-[#008744]" : "text-[#666666]"
                            }`}
                          >
                            {isExpanded ? "−" : "+"}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {isExpanded && (
                        <View className="px-4 pb-4">
                          <View className="border-l-2 border-[#009A49] pl-3">
                            <Text className="text-xs text-[#555555] leading-[18px]">
                              {item.answer}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Send Us a Message Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-4">
            <Text className="text-[16px] font-bold text-[#1A1A1A] mb-0.5">
              Send us a message
            </Text>
            <Text className="text-xs text-[#666666] mb-4">
              Tell us what happened and we will get back to you by email.
            </Text>

            {/* YOUR NAME Input */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.5px] mb-1.5">
              YOUR NAME
            </Text>
            <View className="bg-white border border-[#E0E0E0] rounded-xl px-3.5 h-12 flex-row items-center mb-3.5">
              <Text className="text-sm text-[#888888] mr-2.5">👤</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-sm font-medium text-[#1A1A1A] h-full"
              />
            </View>

            {/* EMAIL ADDRESS Input */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.5px] mb-1.5">
              EMAIL ADDRESS
            </Text>
            <View className="bg-white border border-[#E0E0E0] rounded-xl px-3.5 h-12 flex-row items-center mb-3.5">
              <Text className="text-sm text-[#888888] mr-2.5">✉️</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-sm font-medium text-[#1A1A1A] h-full"
              />
            </View>

            {/* WHAT IS THIS ABOUT? Selector */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.5px] mb-1.5">
              WHAT IS THIS ABOUT?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setTopicModalVisible(true)}
              className="bg-white border border-[#E0E0E0] rounded-xl px-3.5 h-12 flex-row items-center justify-between mb-3.5"
            >
              <View className="flex-row items-center">
                <Text className="text-sm text-[#888888] mr-2.5">🏷️</Text>
                <Text className="text-sm font-medium text-[#1A1A1A]">
                  {selectedTopic}
                </Text>
              </View>
              <Text className="text-sm text-[#666666]">⌄</Text>
            </TouchableOpacity>

            {/* MESSAGE Textarea */}
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.5px]">
                MESSAGE
              </Text>
              <Text className="text-[11px] text-[#888888]">
                {message.length} / 500 characters
              </Text>
            </View>
            <View className="bg-white border border-[#E0E0E0] rounded-xl p-3.5 min-h-[104px] mb-4">
              <TextInput
                value={message}
                onChangeText={(text) => setMessage(text.slice(0, 500))}
                placeholder="Describe your question or issue..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                className="text-sm text-[#1A1A1A] min-h-[80px]"
              />
            </View>

            {/* Send Message Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSendMessage}
              className="bg-[#009A49] h-[50px] rounded-xl items-center justify-center"
            >
              <Text className="text-white text-sm font-bold">Send message</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Urgent Callout Banner */}
          <View className="bg-[#E6F4F1] rounded-xl px-4 py-3.5 flex-row items-start">
            <Text className="text-xs text-[#1E7B6B] mr-2 mt-0.5">ⓘ</Text>
            <Text className="flex-1 text-xs font-medium text-[#2C5E54] leading-[18px]">
              For an urgent issue with a payment in progress, call us directly.
              It is the fastest way to reach a person.
            </Text>
          </View>
        </ScrollView>

        {/* Topic Picker Modal */}
        <Modal
          visible={topicModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setTopicModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setTopicModalVisible(false)}
            className="flex-1 bg-black/40 justify-end"
          >
            <View className="bg-[#FCFAF7] rounded-t-3xl p-5 pb-8">
              <Text className="text-base font-bold text-[#1A1A1A] mb-3">
                What is this about?
              </Text>
              {SUPPORT_TOPICS.map((topic) => {
                const isSelected = topic === selectedTopic;
                return (
                  <TouchableOpacity
                    key={topic}
                    onPress={() => {
                      setSelectedTopic(topic);
                      setTopicModalVisible(false);
                    }}
                    className={`py-3.5 px-3 rounded-xl flex-row items-center justify-between mb-1 ${
                      isSelected ? "bg-[#E6F5EC]" : ""
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected ? "text-[#008744]" : "text-[#1A1A1A]"
                      }`}
                    >
                      {topic}
                    </Text>
                    {isSelected && (
                      <Text className="text-sm font-bold text-[#008744]">
                        ✓
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
