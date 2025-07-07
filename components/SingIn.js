import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "@/pages/_app";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValue = {
  email: "",
  password: "",
};

const JoinNowModal = ({ isOpen, setIsOpen ,onClose, loader ,onSignInClick }) => {
  const router = useRouter();
  const [user, setUser] = useContext(userContext);
  const [eyeIcon, setEyeIcon] = useState(false);

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: SigninSchema,
    onSubmit: (value) => {
      submit(value);
    },
  });

  const submit = (value) => {
    const data = {
      email: value.email.toLowerCase(),
      password: value.password,
    };
    Api("post", "auth/login", data, router).then(
      (res) => {
        localStorage.setItem("userDetail", JSON.stringify(res?.data?.user));
        localStorage.setItem("token", res?.data?.token);
        setUser(res.data.user);
        resetForm();
        toast.success("You are successfully logged in");
        router.push("/");
        setIsOpen(false)
      },
      (err) => {
        console.log(err);
        toast.error(err?.data?.message || err?.message);
      }
    );
  };

  if (!isOpen) return null;
  if (user) return null;
  
  return (
    <div className="fixed md:p-0 p-3 inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md md:w-[350px]  p-6 relative rounded-md shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-1 text-center text-black">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-[16px] text-gray-400">
          Sign in to your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black px-4 py-2 border text-[13px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <p className="text-[14px] text-red-600 font-normal">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              type={!eyeIcon ? "password" : "text"}
              placeholder="Password"
              className="w-full text-black px-4 py-2 border bg-blue-50 text-[13px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={values.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div
              className="absolute right-8 top-[175px] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setEyeIcon(!eyeIcon)}
            >
              {!eyeIcon ? (
                <IoEyeOffOutline className="w-[20px] h-[20px] text-gray-300" />
              ) : (
                <IoEyeOutline className="w-[20px] h-[20px] text-gray-300" />
              )}
            </div>
            {errors.password && (
              <p className="text-[14px] text-red-600 font-normal">
                {errors.password}
              </p>
            )}
          </div>
          <button
            className="w-full bg-blue-400 hover:bg-blue-600 text-[14px] text-white py-2 rounded-md transition duration-200 cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <p className="text-black py-3 text-center">
          Don't have an account?{" "}
          <span className="text-blue-400 cursor-pointer" onClick={onSignInClick}>
            Join Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default JoinNowModal;
