
import React, { createContext, useContext, useEffect, useState } from "react";

// Available languages
export type Language = "en" | "hi" | "mr" | "bn";

// Type for the translations
export type TranslationKey = 
  | "home" 
  | "community" 
  | "weather" 
  | "prices" 
  | "map" 
  | "login" 
  | "chatbot" 
  | "uploadImage" 
  | "detectDisease" 
  | "results"
  | "welcomeMessage"
  | "cropDiseaseTitle"
  | "cropDiseaseDesc"
  | "communityTitle"
  | "communityDesc"
  | "weatherTitle"
  | "weatherDesc"
  | "findStores"
  | "subscription"
  | "askQuestion";

// Translation dictionaries
const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    home: "Home",
    community: "Community",
    weather: "Weather",
    prices: "Crop Prices",
    map: "Find Stores",
    login: "Login",
    chatbot: "Ask AstroBot",
    uploadImage: "Upload Image",
    detectDisease: "Detect Disease",
    results: "Results",
    welcomeMessage: "Welcome to AstroAgri",
    cropDiseaseTitle: "Crop Disease Detection",
    cropDiseaseDesc: "Upload an image of your crop to detect diseases",
    communityTitle: "Farmer Community",
    communityDesc: "Share your problems and solutions with other farmers",
    weatherTitle: "Weather Forecast",
    weatherDesc: "Check the weather forecast for your location",
    findStores: "Find Agricultural Stores",
    subscription: "Subscribe",
    askQuestion: "Ask a question"
  },
  hi: {
    home: "होम",
    community: "समुदाय",
    weather: "मौसम",
    prices: "फसल मूल्य",
    map: "स्टोर खोजें",
    login: "लॉगिन",
    chatbot: "एस्ट्रोबॉट से पूछें",
    uploadImage: "छवि अपलोड करें",
    detectDisease: "रोग का पता लगाएं",
    results: "परिणाम",
    welcomeMessage: "एस्ट्रोएग्री में आपका स्वागत है",
    cropDiseaseTitle: "फसल रोग का पता लगाना",
    cropDiseaseDesc: "फसल के रोगों का पता लगाने के लिए अपनी फसल की छवि अपलोड करें",
    communityTitle: "किसान समुदाय",
    communityDesc: "अन्य किसानों के साथ अपनी समस्याओं और समाधानों को साझा करें",
    weatherTitle: "मौसम का पूर्वानुमान",
    weatherDesc: "अपने स्थान के लिए मौसम का पूर्वानुमान देखें",
    findStores: "कृषि स्टोर खोजें",
    subscription: "सदस्यता लें",
    askQuestion: "प्रश्न पूछें"
  },
  mr: {
    home: "होम",
    community: "समुदाय",
    weather: "हवामान",
    prices: "पिकांचे भाव",
    map: "स्टोअर शोधा",
    login: "लॉगिन",
    chatbot: "एस्ट्रोबॉटला विचारा",
    uploadImage: "प्रतिमा अपलोड करा",
    detectDisease: "रोग शोधा",
    results: "परिणाम",
    welcomeMessage: "एस्ट्रोएग्री वर आपले स्वागत आहे",
    cropDiseaseTitle: "पिकांची रोग शोध",
    cropDiseaseDesc: "रोग शोधण्यासाठी तुमच्या पिकाची प्रतिमा अपलोड करा",
    communityTitle: "शेतकरी समुदाय",
    communityDesc: "इतर शेतकर्यांसह तुमच्या समस्या आणि उपाय शेअर करा",
    weatherTitle: "हवामान अंदाज",
    weatherDesc: "तुमच्या स्थानासाठी हवामान अंदाज तपासा",
    findStores: "कृषी स्टोअर शोधा",
    subscription: "सदस्यता घ्या",
    askQuestion: "प्रश्न विचारा"
  },
  bn: {
    home: "হোম",
    community: "সম্প্রদায়",
    weather: "আবহাওয়া",
    prices: "ফসলের দাম",
    map: "স্টোর খুঁজুন",
    login: "লগ ইন",
    chatbot: "অ্যাস্ট্রোবট জিজ্ঞাসা",
    uploadImage: "ছবি আপলোড করুন",
    detectDisease: "রোগ সনাক্ত করুন",
    results: "ফলাফল",
    welcomeMessage: "অ্যাস্ট্রোএগ্রি-তে আপনাকে স্বাগতম",
    cropDiseaseTitle: "ফসল রোগ সনাক্তকরণ",
    cropDiseaseDesc: "রোগ সনাক্ত করতে আপনার ফসলের ছবি আপলোড করুন",
    communityTitle: "কৃষক সম্প্রদায়",
    communityDesc: "অন্যান্য কৃষকদের সাথে আপনার সমস্যা ও সমাধান শেয়ার করুন",
    weatherTitle: "আবহাওয়া পূর্বাভাস",
    weatherDesc: "আপনার অবস্থানের জন্য আবহাওয়া পূর্বাভাস দেখুন",
    findStores: "কৃষি দোকান খুঁজুন",
    subscription: "সাবস্ক্রাইব করুন",
    askQuestion: "প্রশ্ন জিজ্ঞাসা করুন"
  }
};

// Context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("astro-agri-language") as Language;
    return saved || "en";
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("astro-agri-language", language);
  }, [language]);

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
