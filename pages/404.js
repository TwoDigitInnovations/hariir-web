import React from "react";
import { Home, ArrowLeft, Search, AlertTriangle, Compass } from "lucide-react";
import { useRouter } from "next/router";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-400 to-blue-800 animate-pulse">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Compass
                className="w-16 h-16 text-blue-300 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-12 h-12 text-yellow-600" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>

          <p className="text-sm md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Lagta hai aap kisi galat raaste par aa gaye hain. Jo page aap dhund
            rahe hain, woh exist nahi karta ya phir move ho gaya hai.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              className="flex items-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => router.push("/")}
            >
              <Home className="w-5 h-5" />
              Go Home
            </button>

            <button
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          <div className="relative">
            <div
              className="absolute -top-20 -left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute -top-10 -right-16 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute -bottom-10 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
