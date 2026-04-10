import ForgetPasswordForm from '../components/forgetPassword/forgetPasswordForm';
import ForgetPasswordHero from "../components/forgetPassword/forgetPasswordHero";

export default function ForgetPasswordScreen() {
    return (
        <main className="py-6">
            <div className="container p-5  grid lg:gap-12 lg:grid-cols-2 mx-auto max-w-7xl">
                <ForgetPasswordHero />
                <ForgetPasswordForm />
            </div>
        </main>
    );
}