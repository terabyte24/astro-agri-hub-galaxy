
import PageWrapper from "@/components/layout/page-wrapper";
import Navbar from "@/components/layout/navbar";
import LoginForm from "@/components/login/login-form";
import { useLanguage } from "@/lib/language-context";

const Login = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t("login")}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Login or create an account to access all features of AstroAgri
            </p>
          </div>
          
          <LoginForm />
        </div>
      </PageWrapper>
    </>
  );
};

export default Login;
