import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyEmail() {
    const router = useRouter();
    const { token } = router.query;
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) return;

        const verifyUserEmail = async () => {
            try {
                const res = await Api("get", `auth/verify-email?token=${token}`);
                if (res?.status) {
                    setSuccess(true);
                    setTimeout(() => {
                        router.push("/");
                    }, 3000);
                    toast.success(res?.message || res?.data?.message)
                } else {
                    toast.error(res?.message || res?.data?.message)
                    setError(res?.message || "Verification failed!");
                }
            } catch (err) {
                console.error(err);
                setError("Something went wrong during verification");
            } finally {
                setLoading(false);
            }
        };

        verifyUserEmail();
    }, [token]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Verifying your email...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4 relative">
                    <button
                        onClick={() => router.push("/")}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="mb-6">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <Check size={48} className="text-white" strokeWidth={3} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>

                    <p className="text-xl font-semibold text-gray-700 mb-4">
                        Your account has been created successfully!
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed mb-2">
                        Your account is under verification. Please wait for 2 working days for your account to be verified.
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        You will be able to access your account after verification.
                    </p>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-sm text-blue-500">Redirecting to home...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full mx-4">
                    <div className="mb-6">
                        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <X size={48} className="text-red-500" strokeWidth={3} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>

                    <p className="text-gray-600 mb-6">{error}</p>

                    <button
                        onClick={() => router.push("/")}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-500 hover:to-blue-700 transition-all"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return null;
}