
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import ChatbotInterface from "@/components/chatbot/chatbot-interface";
import { useLanguage } from "@/lib/language-context";

const Chatbot = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t("chatbot")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get instant answers to your farming questions from our AI assistant
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ChatbotInterface />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Chatbot;
