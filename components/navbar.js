import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { LuMessageCircle } from "react-icons/lu";
import { userContext } from "@/pages/_app";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import SingIn from "./SingIn";
import { MdOutlineLogout } from "react-icons/md";
import { useRouter } from "next/router";
import { Link, useLocation } from "react-router-dom";

import Swal from "sweetalert2";

export const Navbar = ({ onSignInClick, onSingUpClick }) => {
  const [user, setUser] = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = user && Object.keys(user).length > 0;
  const path = router.pathname;

  const isActive =
    path === "/FindProfessional" ||
    path === "/FindCompany" ||
    path === "/dashboard";

  const isActiveHome = path === "/";

  const handleLogout = useCallback(() => {
    Swal.fire({
      text: "Are you sure you want to Log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#2196F3",
      cancelButtonColor: "#2196F3",
      customClass: {
        confirmButton: "px-12 rounded-xl",
        cancelButton:
          "px-12 py-2 rounded-lg text-white border-[12px] border-custom-green hover:none",
        text: "text-[20px] text-black",
        actions: "swal2-actions-no-hover",
        popup: "rounded-[15px] shadow-custom-green",
      },
      buttonsStyling: true,
      width: "380px",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userDetail");
        localStorage.removeItem("token");
        setUser(null);
        // router.replace("/signIn");
      }
    });
  }, [router, setUser]);

  return (
    <>
      <nav className="flex justify-center md:h-24 min-h-max h-auto drop-shadow-md bg-white w-full z-50 md:p-0 p-3">
        <div className="flex items-center justify-between w-full max-w-7xl px-4">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-blue-500 text-white rounded-lg px-2.5 py-1 font-bold text-xl">
              H
            </div>
            <span className="ml-2 text-blue-500 font-bold text-xl">Hariir</span>
          </div>

          {!isLoggedIn ? (
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <button
                  className="text-blue-500 border-blue-500 border-2 hover:text-blue-600 font-medium px-4 py-2 rounded-[7px] cursor-pointer"
                  onClick={onSignInClick}
                >
                  Sign In
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-[7px] hover:bg-blue-600 transition-colors"
                  onClick={onSingUpClick}
                >
                  Join Now
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center ">
                <div className="hidden md:flex items-center space-x-8">
                  <a
                    onClick={() => router.push("/")}
                    className={`flex items-center gap-4 ${
                      isActiveHome
                        ? "text-blue-500"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    <AiOutlineHome className="text-xl" />
                    Home
                  </a>

                  <a
                    onClick={() => router.push("/dashboard")}
                    className={`flex cursor-pointer items-center gap-4 ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    <IoSearchSharp className="text-xl" />
                    Browse
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 gap-4 hover:text-blue-500"
                  >
                    <LuMessageCircle className="text-xl" />
                    Messages
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className="flex cursor-pointer items-center bg-blue-500 text-white rounded-full md:px-4 ps-3 pr-1 md:py-2 py-3"
                  onClick={() => router.push("/MyProfile")}
                >
                  <div className="bg-white uppercase text-blue-500 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">
                    {user?.fullName?.slice(0, 1) || user?.email?.slice(0, 1)}
                  </div>
                  {!user?.fullName && (
                    <span className="hidden md:block">{user.email}</span>
                  )}

                  {user?.fullName && (
                    <span className="hidden md:block">{user.fullName}</span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 text-3xl cursor-pointer"
                >
                  <MdOutlineLogout />
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
