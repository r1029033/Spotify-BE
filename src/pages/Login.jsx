import Logo from "../assets/images/Logo_Lingo.png";
import LoginButton from "../components/LoginButton";

export default function Login() {
  return (
    <main className="login-page  animate-fadeInUp">
        <img
            className="login-page__image"
            src={Logo}
            alt="Spotify visual"
        />
        <h2>
            Login to your Spotify account
        </h2>
        <LoginButton text="Continue with email" href="/transition" />
        <LoginButton text="Continue with Google" href="/transition" />
        <LoginButton text="Continue with Facebook" href="/transition" />

        <p className="signup-text">
          Don't have an account?
          <a href="/signup">Sign up</a>
        </p>

    </main>
  );
}

