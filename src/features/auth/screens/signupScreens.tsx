import SignupForm from "../components/signup/SignupForm";
import SignupHero from "../components/signup/SignupHero";

export default function SignupScreens() {
    return (
        <>
        <main className="pb-6">
            <div className="container p-5  grid lg:gap-12 lg:grid-cols-2 mx-auto max-w-7xl">
                <SignupHero/>
                <SignupForm/>
            </div>
        </main>
        </>
    )
}
