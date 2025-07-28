import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../pages/_app";
import { Navbar } from "./navbar";
import SingIn from "./SingIn";
import SingUp from "./SingUp"

const Layout = ({ children, loader }) => {
  const [user, setUser] = useContext(userContext);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSingUp, setIsSingUp] = useState(false);
  const [token, setToken] = useState(null);

const isPdfTemplate = ["/resume1", "/resume2", "/resume3"].includes(router.pathname);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const protectedRoutes = ["/MyProfile", "/ProfileComplete", "/CompanyProfile"];

  const handleSignInClick = () => {
    setIsSingUp(false);
    setIsModalOpen(true);
  };
  
  const handleSignUpClick = () => { 
    setIsModalOpen(false);
    setIsSingUp(true);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", () => loader(false));
    router.events.on("routeChangeStart", () => loader(true));
    loader(false);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    const currentPath = router.asPath.split("?")[0];

    if (!token && protectedRoutes.includes(currentPath)) {
      router.replace("/");
      setIsModalOpen(true);
    }
  }, [user, router.isReady]);

  return (
    <>
      <div className="flex-1 flex-col bg-white relative">
        {!isPdfTemplate && ( // 👈 only render Navbar if not on /pdf-template
          <div className="fixed w-full top-0 z-50">
            <Navbar
              user={user}
              setUser={setUser}
              loader={loader}
              onSignInClick={handleSignInClick}
              onSingUpClick={handleSignUpClick}
            />
          </div>
        )}

        <div className={`${!isPdfTemplate ? "md:pt-18 pt-14" : ""} z-0 max-w-screen min-h-screen overflow-x-hidden`}>
          <main className="flex-1">{children}</main>
        </div>
      </div>

      {!isPdfTemplate && ( // 👈 hide modals on /pdf-template
        <>
          <SingIn
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            loader={loader}
            onSignInClick={handleSignUpClick}
            onClose={() => setIsModalOpen(false)}
          />
          <SingUp
            isOpen={isSingUp}
            loader={loader}
            setIsOpen={setIsSingUp}
            onSignInClick={handleSignInClick}
            onClose={() => setIsSingUp(false)}
          />
        </>
      )}
    </>
  );
};

export default Layout;
