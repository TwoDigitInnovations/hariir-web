import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { Api } from "@/services/service";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const initialValue = {
  email: "",
  password: "",
};

const SingUp = ({ isOpen, onClose, loader }) => {
  const [accountType, setAccountType] = useState("professional");
  const router = useRouter();
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: SignupSchema,
      onSubmit: (value, { resetForm }) => {
        console.log(value);
        submit(value, resetForm);
      },
    });

  // Now you can safely return null conditionally
  if (!isOpen) return null;

  const submit = (value, resetForm) => {
    loader(true);
    const data = {
      email: value.email.toLowerCase(),
      password: value.password,
      role: accountType,
    };
    Api("post", "auth/register", data, router).then(
      (res) => {
        console.log("res================>", res);
        loader(false);
        toast.success("Register successfully");
        // router.push("/signIn");
        resetForm();
        toast.error(res?.data?.message);
      },
      (err) => {
        loader(false);
        console.log(err);
        toast.error(err?.message);
      }
    );
  };

  return (
    <div className=" md:m-0 p-3 fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-black text-center font-semibold">
            Join Hariir
          </h2>
          <button
            className="text-gray-400 text-2xl cursor-pointer hover:text-black"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-600 text-center mb-4">
          Create your professional profile today
        </p>

        <div className="flex space-x-4 mb-4">
          {/* Professional Option */}
          <div
            onClick={() => setAccountType("professional")}
            className={`flex flex-col items-center p-4 border rounded-lg w-1/2 cursor-pointer ${
              accountType === "professional"
                ? "border-blue-400"
                : "border-gray-300"
            }`}
          >
            <FaUser className="text-2xl text-blue-400 mb-2" />
            <p className="font-medium text-sm text-black">Professional</p>
            <span className="text-xs text-gray-400">Individual profile</span>
          </div>

          {/* Company Option */}
          <div
            onClick={() => setAccountType("company")}
            className={`flex flex-col items-center p-4 border rounded-lg w-1/2 cursor-pointer ${
              accountType === "company" ? "border-blue-400" : "border-gray-300"
            }`}
          >
            <HiOfficeBuilding className="text-2xl text-blue-400 mb-2" />
            <p className="font-medium text-sm text-black">Company</p>
            <span className="text-xs text-gray-400">Business profile</span>
          </div>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className={`w-full border text-black border-gray-300 rounded px-3 py-2 mb-3 text-[13px] focus:outline-none bg-blue-50 ${
            errors.email ? "border-red-400" : ""
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && (
          <div className="text-red-400 text-xs mb-2">{errors.email}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className={`w-full border text-black border-gray-300 rounded px-3 py-2 mb-4 text-[13px] focus:outline-none bg-blue-50 ${
            errors.password ? "border-red-400" : ""
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && (
          <div className="text-red-400 text-xs mb-2">{errors.password}</div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-400 hover:bg-blue-600 text-white py-2 rounded text-sm font-medium"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SingUp;
