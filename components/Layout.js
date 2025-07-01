import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../pages/_app";
import { IoList } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./navbar";
import SingIn from "./SingIn";
import SingUp from "./SingUp";

const Layout = ({ children, loader }) => {
  const [user, setUser] = useContext(userContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isSingUp, setIsSingUp] = useState(false);

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSingUp(true);
  };

  const menuItems = [
    { href: "/myProfile/profile", title: "Profile" },
    { href: "/myProfile/history", title: "My Booking" },
    { href: "/myProfile/changePassword", title: "Change Password" },
    { href: "/", title: "Signout" },
  ];

  useEffect(() => {
    router.events.on("routeChangeComplete", () => loader(false));
    router.events.on("routeChangeStart", () => loader(true));
    loader(false);
  }, []);

  const handleClickOpen = () => setIsModalOpen(true); // Open modal

  const handleSignOut = () => {
    setUser({});
    localStorage.removeItem("userDetail");
    localStorage.removeItem("token");
    router.push("/");
  };

  const showSidebar = router.route.includes("myProfile");

  return (
    <>
      {showSidebar ? (
        <div className="md:min-h-screen flex flex-col relative">
          {/* Header */}
          {router.route !== "/" && router.route !== "/signup" && (
            <header
              className={`bg-black fixed top-0 w-full h-16 flex items-center font-semibold uppercase shadow-lg z-30 ${
                toggleDrawer ? "ml-60" : "ml-0"
              }`}
            >
              <div className="flex justify-between w-full px-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 relative ml-2">
                    <Image
                      src={user?.profile || "/images.png"}
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="text-xs text-white font-bold ml-2 uppercase">
                    {userName}
                  </h2>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleClickOpen} // Trigger modal on click
                >
                  <IoList className="text-white" />
                </div>
              </div>
            </header>
          )}

          {/* Sidebar */}
          <aside className="bg-black w-60 fixed min-h-screen z-40 border-r-2 border-custom-lightBlu">
            <div className="w-60 h-60 p-4 flex justify-center items-center border-b-2 border-custom-lightBlue">
              <img
                src="/logo.png"
                alt="Logo"
                onClick={() => router.push("/")}
                className="rounded-md cursor-pointer"
              />
            </div>
            <nav>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.title} className="py-2 px-5">
                    {item.title === "Signout" ? (
                      <div
                        onClick={handleSignOut}
                        className="text-white font-nunito font-semibold text-lg cursor-pointer hover:text-custom-yellow hover:border-b-2 hover:border-custom-yellow"
                      >
                        {item.title}
                      </div>
                    ) : (
                      <Link href={item.href}>
                        <p
                          className={`${
                            router.route === item.href
                              ? "text-custom-yellow border-b-2 border-custom-yellow"
                              : "text-white"
                          } font-nunito font-semibold text-lg cursor-pointer hover:text-custom-yellow`}
                        >
                          {item.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main
            className={`flex-1 bg-white md:pt-16 ${
              toggleDrawer ? "md:pl-60" : ""
            }`}
          >
            {children}
          </main>
        </div>
      ) : (
        <div className="flex-1 flex-col bg-white relative">
          <div className="fixed w-full top-0 z-50">
            <Navbar
              user={user}
              setUser={setUser}
              loader={loader}
              onSignInClick={handleSignInClick}
              onSingUpClick={handleSignUpClick}
            />
          </div>
          <div className="z-0 md:pt-18 pt-14 max-w-screen min-h-screen overflow-x-hidden">
            <main className="flex-1">{children}</main>
          </div>
        </div>
      )}

      <SingIn
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        loader={loader}
        onClose={() => setIsModalOpen(false)}
      />
      <SingUp
        isOpen={isSingUp}
        loader={loader}
        onClose={() => setIsSingUp(false)}
      />
    </>
  );
};

export default Layout;
