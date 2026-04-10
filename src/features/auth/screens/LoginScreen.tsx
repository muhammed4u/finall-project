import LoginForm from "../components/login/LoginForm";
import LoginHero from "../components/login/LoginHero";

export default function LoginScreen() {
    return (
        <>
        <main className="py-6">
            <div className="container p-5  grid lg:gap-12 lg:grid-cols-2 mx-auto max-w-7xl">
                <LoginHero/>
                <LoginForm/>
            </div>
        </main>
        </>
    )
}