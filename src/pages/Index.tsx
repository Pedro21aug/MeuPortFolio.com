import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import AccountTypePicker, { type AccountType } from "@/components/auth/account-type-picker";
import AuthCanvas from "@/components/auth/auth-canvas";
import CodeVerificationForm from "@/components/auth/code-verification-form";
import HeroStatement from "@/components/auth/hero-statement";
import LoginPanel from "@/components/auth/login-panel";
import NewPasswordForm from "@/components/auth/new-password-form";
import PasswordChangedPanel from "@/components/auth/password-changed-panel";
import PasswordRecoveryForm from "@/components/auth/password-recovery-form";
import SignupForm from "@/components/auth/signup-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

type AuthView = "login" | "recovery" | "code" | "new-password" | "success" | "profile" | AccountType;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const viewMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.42, ease: EASE },
};

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = React.useState<AuthView>("login");
  const [recoveryEmail, setRecoveryEmail] = React.useState("");

  /**
   * Ao (re)entrar na tela de acesso — inclusive quando o estado do fluxo foi
   * preservado (ex.: atualização em tempo real do editor) — volta para o login.
   */
  React.useEffect(() => {
    setView("login");
    setRecoveryEmail("");
  }, [location.key]);

  const goTo = React.useCallback((next: AuthView) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderCenteredView = (key: string, content: React.ReactNode) => (
    <motion.section
      key={key}
      {...viewMotion}
      className="w-full px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-20"
    >
      <div className="flex justify-center">{content}</div>
    </motion.section>
  );

  const renderView = () => {
    if (view === "profile") {
      return (
        <motion.section
          key="profile"
          {...viewMotion}
          className="w-full px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-20"
        >
          <AccountTypePicker onContinue={goTo} onBack={() => goTo("login")} />
        </motion.section>
      );
    }

    if (view === "code") {
      return renderCenteredView(
        "code",
        <CodeVerificationForm
          email={recoveryEmail}
          onChangeEmail={() => goTo("recovery")}
          onVerified={() => goTo("new-password")}
        />,
      );
    }

    if (view === "recovery") {
      return renderCenteredView(
        "recovery",
        <PasswordRecoveryForm
          onBack={() => goTo("login")}
          onCodeSent={(email) => {
            setRecoveryEmail(email);
            goTo("code");
          }}
        />,
      );
    }

    if (view === "new-password") {
      return renderCenteredView(
        "new-password",
        <NewPasswordForm onBack={() => goTo("code")} onSuccess={() => goTo("success")} />,
      );
    }

    if (view === "success") {
      return renderCenteredView(
        "success",
        <PasswordChangedPanel
          onDone={() => {
            setRecoveryEmail("");
            goTo("login");
          }}
        />,
      );
    }

    if (view === "login") {
      return (
        <motion.section
          key="login"
          {...viewMotion}
          className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-12 pt-24 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-16 lg:pt-20 xl:gap-20 xl:px-8 2xl:max-w-[1700px]"
        >
          <HeroStatement />
          <div className="flex justify-center lg:justify-end">
            <LoginPanel
              onCreateAccount={() => goTo("profile")}
              onForgotPassword={() => goTo("recovery")}
              onLoggedIn={() => navigate("/contratante")}
            />
          </div>
        </motion.section>
      );
    }

    return (
      <motion.section
        key={view}
        {...viewMotion}
        className="w-full px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-20"
      >
        <SignupForm
          profile={view}
          onBack={() => goTo("profile")}
          onSuccess={() =>
            navigate(view === "contratante" ? "/contratante" : "/profissional")
          }
        />
      </motion.section>
    );
  };

  return (
    <AuthCanvas>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex flex-1 items-center">
          <AnimatePresence mode="wait" initial={false}>
            {renderView()}
          </AnimatePresence>
        </main>

        <SiteFooter />
      </div>
    </AuthCanvas>
  );
};

export default Index;
