const ha = {
  translation: {
    common: {
      stepIndicator: { step: "Step", of: "of" },
      nigerLabel: "Niger",
      nigeriaLabel: "Nigeria",

      seeAll: "See all",
      primary: "Primary",
      notVerified: "Not verified",
      convert: "Convert",
      send: "Send",
      amount: "Amount",
      cashIn: "Cash in",
      nigerWalletLabel: "Niger wallet",
      fee: "fee",
      completed: "completed",
      verified: "Verified",
      noLimit: "No limit",
      walletHistory: "Wallet history",
    },
    screens: {
      // Pre-Auth Call To Action CTA
      preAuthCTA: {
        createAcctBtn: "Create account",

        continueBtn: "Continue",
      },

      // Onbording
      onboarding: {
        CTA: {
          backBtn: "Back",
          skip: "Skip",
          alreadyAcctBtn: "I already have an account",
          getStartBtn: "Get started",
        },
        onbg1: {
          title: "Two currencies, one wallet",
          text: "Hold CFA Franc and Naira side by side. Unlock your second corridor wallet whenever you are ready.",
        },

        onbg2: {
          title: "Send across the border",
          text: "Move money from Niger to Nigeria — or the other way — without manually converting a thing.",
        },

        onbg3: {
          title: "Bank-grade safety",
          text: "PIN, biometrics and full KYC keep every transaction protected end to end.",
        },

        onbg4: {
          title: "Everyday services built in",
          text: "Buy airtime, data, TV and pay bills — locally or for family across the corridor.",
        },
      },

      //
      languageSelect: {
        title: "Choose your language",
        text: "You can change this any time in settings.",
      },

      //
      createAcct: {
        CTA: {
          CTAMssg: "Already have an account?",
          toggleLink: "Log In",
        },
        step1: {
          title: "What is your number?",
          text: "We will send a 6-digit code to verify it.",
        },
        step2: {
          title: "Enter the code",
          text: "We sent a 6-digit code to ",
          resendCode: "Resend code",
        },
        step3: {
          title: "Create a PIN",
          text: "This 4-digit PIN secures your wallet.",
          text2: "Create a PIN",
          text3: "Confirm PIN",
        },
        step4: {
          title: "Where do you live?",
          text: "This sets up your first partner wallet.",
          nigerText: "XOF · Niger Partner Wallet",
          nigeriaText: "NGN · Nigeria Partner Wallet",
        },
        step5: {
          title: "Almost done",
          text: "Tell us a little about you.",
          nameLabel: "FULL NAME",
          dobLabel: "DATE OF BIRTH",
        },
      },

      //
      logIn: {
        title: "Welcome back",
        text: "Log in with your phone number and PIN.",
        inputLabel: "Phone number",
        CTAMssg: "New to Xenza?",
        toggleLink: "Create an account",
      },

      //
      KYC: {
        CTA: {
          skipForNowBtn: "Skip for now",
        },
        step1: {
          title: "Verify your identity",
          text: "Required to unlock higher limits and cross-border transfers.",
          selectLabel: "Choose a document",
          doc1Label: "Passport",
          doc2Label: "National ID card",
          doc3Label: "Driver's licence",
        },
        step2: {
          title: "Verify your identity",
          text: "Required to unlock higher limits and cross-border transfers.",
          inputLabel: "DOCUMENT NUMBER",
          uploadLabel: "UPLOAD DOCUMENT",
          instruction1: "Upload document",
          instruction2: "Take a clear photo of the front of your document.",
        },
        step3: {
          title: "Verify your identity",
          text: "Required to unlock higher limits and cross-border transfers.",
          fieldLabel: "TAKE A SELFIE",
          instruction1: "Take a selfie",
          instruction2: "Look straight at the camera in good light.",
          submitBtn: "Submit for Review",
        },
      },
      pendingKYC: {
        title: "Verification in progress",
        text: "We are reviewing your documents. This usually takes a few hours.",
      },
      rejectedKYC: {
        title: "Verification unsuccessful",
        text: "The document photo was blurry.",
        tryAgainBtn: "Try again",
      },
      successfullKYC: {
        title: "Identity verified",
        text: "You now have full access to Xenza.",
        limitsCard: {
          title: "Your limits",
          perTransaction: "Per transaction",
          dailyOutgoing: "Daily outgoing",
          walletBalanceCap: "Wallet balance cap",
        },
      },

      //
      forgetOrResetPIN: {
        title: "Reset your PIN",
        view1: {
          text: "Verify your number and set a new PIN.",
        },
        view2: {
          text: "We sent a 6-digit code to +2271524224545.",
        },
        view3: {
          text1: "Reset PIN",
          text2: "New PIN",
          text3: "Confirm PIN",
        },
      },
      successfulResetPIN: {
        title: "Reset PIN",
        text: "Your PIN has been updated. Log in using your new PIN.",
        logInBtn: "Log In",
      },
      termsAndCond: {},

      //
      navTabs: {
        home: "Home",
        send: "Send",
        convert: "Convert",
        services: "Services",
        account: "Account",
      },

      //
      home: {
        greeting: "Good morning.",
        totalBalance: "TOTAL BALANCE",
        yourWallets: "Your wallets",
        availableBalance: "AVAILABLE BALANCE",
        addSecondWalletTitle: "Add second wallet",
        addSecondWalletText: "Hold and use other corridor currency.",
        quickActions: "Quick actions",
        actions: {
          send: "Send",
          convert: "Convert",
          cashIn: "Cash in",
          cashOut: "Cash out",
          airtime: "Airtime",
        },

        corridorRate: "Corridor rate today",
        recentActivity: "Recent activity",
      },

      creationOfSecondWallet: {
        title: "",
        description: "Hold and use the other corridor currency.",
        infoCallOut1: "",
        infoCallOut2: "Instant conversion with your other wallet",
        infoCallOut3: "Same PIN and security as your main wallet",
      },

      //
      send: {
        title: "Send money",
        subTitle: "Transfer to a Xenza user or a bank account.",
        sendToXenza: "To a Xenza user",
        sendToBank: "To a bank account",
        savedBenefLabel: "SAVED BENEFIVIARIES",
        recipientNameLabel: "RECIPIENT NAME",
        phoneNumberLabel: "PHONE NUMBER",
        bankLabel: "BANK",
        selectPlaceholder: "Select a bank",
        acctLabel: "ACCOUNT NUMBBER",
        helperMssgToXenza: "Instant transfer to any Xenza wallet.",
        helperMssgToBank: "Bank transfers usually settle within minutes.",
      },

      //
      convert: {
        title: "Convert",
        subTitle: "Move money between your wallets at the corridor rate.",
        beforeSecondWalletCreation: {
          title: "You need two wallets",
          subTitle:
            "Add your second corridor wallet to start converting between currencies.",
          addSecondWalletBtn: "Add second wallet",
        },
      },

      //
      services: {
        title: "Services",
        subTitle: "Buy airtime, data and TV, or pay your bills.",
        options: {
          airtime: {
            title: "Airtime",
            subTitle: "Top up any mobile line",
          },
          dataBundles: {
            title: "Data bundles",
            subTitle: "Buy a bundle for any network",
          },
          tvSubscription: {
            title: "TV subscription",
            subTitle: "Renew your TV subscription",
          },
          utilityBills: {
            title: "Utility bills",
            subTitle: "Pay electricity and water",
          },
          recentPayment: "Recent paymentd",
        },
      },

      // Account
      account: {
        CTA: {
          logOutBtn: "Log out",
        },
        primaryBalance: "Primary balance",
        secondaryBalance: "Secondary balance",
        pendingReview: "Pending review",
        limitsAndVerif: "Limits & verification",
        inReview: "In review",
        verify: "Verify",
        unverify: "Unverified",
        profile: {
          title: "Profile",
        },
        notifications: {
          title: "Notifications",
        },
        KYCStatus: {
          title: "KYC status",
          pendingStatus: "Pending review",
        },
        language: {
          title: "Language",
        },
        security: {
          title: "Security",
        },
        rateAndFees: {
          title: "Rate & Fees",
        },
        helpAndSupport: {
          title: "Help & Support",
        },
        aboutXenza: {
          title: "About Xenza",
        },
      },

      // Limit and Usage
      limitsAndUsage: {
        navTitle: "Limits & usage",
        description: "Your ceilings and how much you have used.",
        yourTier: "Your tier",
        inReview: "In review",
        infoCallout1: "Verify your identity to rasise your limits.",
        perTransaction: {
          title: "Per transaction",
          description: "Largest single payment today",
        },
        dailyOutgoing: {
          title: "Daily outgoing",
          description: "Total sent today",
        },
        walletBalanceCap: {
          title: "Wallet balance cap",
          description: "Current wallet balance",
        },
        infoCallout2: "Verify your identity to unlock higher limits.",
      },
      // Notifications
      notifications: {
        navTitle: "Notifications",
        navRightBtn: "Mark all as read",
      },

      // Language
      languageChange: {
        title: "Choose your language",
        description: "You can change this any time in settings.",
      },

      // Rate and Fees
      rateAndFees: {
        navTitle: "Rate & Fees",
        description: "The corridor rate and every fee, in one place.",
        live: "Live",
        explanation:
          "The rate includes a 1.2% corridor margin. Sends and conversions use this rate.",
        showFeesIn: "SHOW FEES IN",
        sendsAndTransfers: {
          label: "SENDS & TRANSFERS",
          title: "Send money",
          description: "To a Xenza user or a bank account",
        },
        conversions: {
          label: "CONVERSIONS",
          title: "Convert",
          description: "Move money between your wallets",
        },

        agentCash: {
          label: "AGENT CASH",
          cashOut: {},
          cashIn: {},
        },

        airtimeDataAndBills: {
          label: "AIRTIME, DATA & BILLS",
          airtimeDataAndTV: {},
          utilityBills: {},
        },

        quickFeeEstimate: {
          label: "Quick fee estimate",
          description: "Enter an amount to see what each fee costs.",
        },
        infoCallout:
          "Airtime, data, TV and cash in are always free. Capped fees mean large amounts never overpay.",
      },
    },
    uiErrMssg: {
      common: {},
      preAuth: {
        phoneNumberValidation: "Enter a valid phone number",
        incorrectOTP: "That code is not correct",
        missMatchPIN: "PINs do not match",
        emptyName: "Please enter your name",
      },
    },
    welcome: "Barka da zuwa",
    greeting: "Sannu! Barka da zuwa Xenza.",
  },
};

export default ha;
export type TranslationKeys = keyof typeof ha.translation;
