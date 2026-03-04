import LoginBrandingPanel from "../../components/login/LoginBrandingPanel";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <LoginBrandingPanel />
      <LoginForm />
    </div>
  );
}
