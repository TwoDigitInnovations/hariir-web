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
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { UserRound, LogOut } from "lucide-react";

export const Navbar = ({ onSignInClick, onSingUpClick }) => {
  const [user, setUser] = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = user && Object.keys(user).length > 0;
  const path = router.pathname;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

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
        router.replace("/");
      }
    });
  }, [router, setUser]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <nav className="flex justify-center md:h-18 min-h-max h-auto drop-shadow-md bg-white w-full z-50 md:p-0 p-3">
        <div className="flex items-center justify-between w-full max-w-7xl px-4">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-blue-400 text-white rounded-lg px-2.5 py-1 font-bold text-xl">
              H
            </div>
            <span className="ml-2 text-blue-400 font-bold text-xl">Hariir</span>
          </div>

          {!isLoggedIn ? (
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <button
                  className="text-black border-blue-400 border-2 hover:text-gray-800  font-medium px-4 py-2 md:text-[15px] text-[14px] rounded-[12px] cursor-pointer"
                  onClick={onSignInClick}
                >
                  Sign In
                </button>
                <button
                  className="bg-blue-400 md:text-[15px] text-[14px] text-black px-4 py-2 rounded-[12px] hover:bg-blue-500 cursor-pointer transition-colors"
                  onClick={onSingUpClick}
                >
                  Join Now
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center ">
                <div className="hidden cursor-pointer md:flex items-center space-x-8">
                  <a
                    onClick={() => router.push("/")}
                    className={`flex items-center gap-4 ${
                      isActiveHome
                        ? "text-blue-400"
                        : "text-gray-700 hover:text-blue-400"
                    }`}
                  >
                    <AiOutlineHome className="text-xl" />
                    Home
                  </a>

                  <a
                    onClick={() => router.push("/dashboard")}
                    className={`flex cursor-pointer items-center gap-4 ${
                      isActive
                        ? "text-blue-400"
                        : "text-gray-700 hover:text-blue-400"
                    }`}
                  >
                    <IoSearchSharp className="text-xl" />
                    Browse
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 gap-4 hover:text-blue-400"
                  >
                    <LuMessageCircle className="text-xl" />
                    Messages
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex cursor-pointer items-center  text-black rounded-full md:px-4 ps-3 pr-3 md:py-2 py-3"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  >
                    <div className=" rounded-full w-10 h-10 flex border-[2px] border-gray-200 items-center justify-center font-bold mr-2 overflow-hidden">
                      <img
                        src={
                          user.role === "professional"
                            ? user.profileImage || "/profile.png"
                            : user.companyLogo || "/profile.png"
                        }
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="hidden md:block ms-2 font-medium">
                      {user?.fullName || user?.email}
                    </span>
                  </div>

                  {showDropdown && (
                    <div className="transition-all duration-500 absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          router.push("/MyProfile");
                        }}
                        className="w-full flex gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserRound className="w-4 h-4" />
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleLogout(); // custom signout logic
                        }}
                        className="w-full flex gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
