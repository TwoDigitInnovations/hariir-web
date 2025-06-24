import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { LuMessageCircle } from "react-icons/lu";
import { userContext } from "@/pages/_app";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import SingIn from "./SingIn";
import { MdOutlineLogout } from "react-icons/md";

export const Navbar = ({ onSignInClick, onSingUpClick }) => {
  const [user, setUser] = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = user && Object.keys(user).length > 0;

  const handleLogout = () => {
    setUser({});
  };


  return (
    <>
      <nav className="flex justify-center md:h-24 min-h-max h-auto drop-shadow-md bg-white w-full z-50 md:p-0 p-3">
        <div className="flex items-center justify-between w-full max-w-7xl px-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-lg px-2.5 py-1 font-bold text-xl">
              H
            </div>
            <span className="ml-2 text-blue-500 font-bold text-xl">Hariir</span>
          </div>

          {!isLoggedIn ? (
            // Before Login Navbar
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <button
                  // onClick={() => setIsSignInModalOpen(true)}
                  className="text-blue-500 border-blue-500 border-2 hover:text-blue-600 font-medium px-4 py-2 rounded-[7px] cursor-pointer"
                  onClick={onSignInClick}
                >
                  Sign In
                </button>
                <button
                  // onClick={() => setIsJoinModalOpen(true)}
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
                    href="#"
                    className="flex items-center gap-4 text-gray-700 hover:text-blue-500"
                  >
                    <AiOutlineHome className="text-xl" />
                    Home
                  </a>
                  <a
                    href="#"
                    className="flex items-center text-gray-700 gap-4 hover:text-blue-500"
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
                <div className="flex items-center bg-blue-500 text-white rounded-full px-4 py-2">
                  <div className="bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">
                    C
                  </div>
                  <span className="hidden md:block">{user.email}</span>
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
