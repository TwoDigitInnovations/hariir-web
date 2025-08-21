import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Loader from "@/components/loader";

export const userContext = createContext();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    if (router.route === "/") {
      router.replace("/");
    }
    getUserDetail();
  }, []);

  const getUserDetail = () => {
    const user = localStorage.getItem("userDetail");
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  return (
  
      <userContext.Provider value={[user, setUser]}>
        <ToastContainer />
        <Layout loader={setOpen} toaster={(t) => toast(t.message)}>
          {open && <Loader open={open} />}
          <Component {...pageProps} loader={setOpen} user={user} />
        </Layout>
      </userContext.Provider>

  );
}
