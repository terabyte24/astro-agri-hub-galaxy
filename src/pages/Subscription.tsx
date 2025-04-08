
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import SubscriptionPlans from "@/components/subscription/subscription-plans";
import { useLanguage } from "@/lib/language-context";

const Subscription = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t("subscription")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a subscription plan that best fits your farming needs
            </p>
          </div>
          
          <SubscriptionPlans />
          
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="cosmic-card p-4">
                <h3 className="font-bold mb-2">What are the benefits of subscribing?</h3>
                <p className="text-muted-foreground">
                  Subscribers get access to premium features like priority disease detection, personalized crop 
                  recommendations, soil health analysis, expert consultations, and more, depending on the plan.
                </p>
              </div>
              
              <div className="cosmic-card p-4">
                <h3 className="font-bold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. Your benefits will continue until the end 
                  of the current billing period.
                </p>
              </div>
              
              <div className="cosmic-card p-4">
                <h3 className="font-bold mb-2">How do I get support as a subscriber?</h3>
                <p className="text-muted-foreground">
                  All subscribers get dedicated support via email. Pro and Premium subscribers also get 
                  phone support, with Premium members receiving priority 24/7 assistance.
                </p>
              </div>
              
              <div className="cosmic-card p-4">
                <h3 className="font-bold mb-2">Are there any discounts for annual subscriptions?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 20% discount for annual subscriptions compared to monthly payments. 
                  This option is available at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Subscription;
