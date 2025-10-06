import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../pages/_app";
import { Navbar } from "./navbar";
import SingIn from "./SingIn";
import SingUp from "./SingUp";

const Layout = ({ children, loader }) => {
  const [user, setUser] = useContext(userContext);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [token, setToken] = useState(undefined); // undefined = not checked yet

  const protectedRoutes = ["/MyProfile", "/ProfileComplete", "/CompanyProfile"];

  // ✅ Load token once
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);
  }, []);

  // ✅ Show/hide loader on route change
  useEffect(() => {
    const handleStart = () => loader(true);
    const handleComplete = () => loader(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    loader(false); // initial load

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router.events, loader]);

  // ✅ Protect routes only after token is known
  useEffect(() => {
    if (!router.isReady) return;

    const currentPath = router.asPath.split("?")[0];

    if (token !== undefined && !token && protectedRoutes.includes(currentPath)) {
      setIsModalOpen(true);
      router.replace("/");
    }
  }, [token, router.isReady, router.asPath]);

  // Auth modal handlers
  const handleSignInClick = () => {
    setIsSignUp(false);
    setIsModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsModalOpen(false);
    setIsSignUp(true);
  };

  return (
    <>
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

        <div className="md:pt-18 pt-14 z-0 max-w-screen min-h-screen overflow-x-hidden">
          <main className="flex-1">{children}</main>
        </div>
      </div>

      <>
        <SingIn
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          loader={loader}
          onSignInClick={handleSignUpClick}
          onClose={() => setIsModalOpen(false)}
        />
        <SingUp
          isOpen={isSignUp}
          loader={loader}
          setIsOpen={setIsSignUp}
          onSignInClick={handleSignInClick}
          onClose={() => setIsSignUp(false)}
        />
      </>
    </>
  );
};

export default Layout;
