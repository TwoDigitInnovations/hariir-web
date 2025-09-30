import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiOfficeBuilding } from "react-icons/hi";
import { Api } from "@/services/service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

const SingUp = ({ isOpen, onClose, loader, onSignInClick }) => {
  const [accountType, setAccountType] = useState("professional");
  const [showPassword, setShowPassword] = useState(false); // toggle password
  const router = useRouter();

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: SignupSchema,
      onSubmit: (value, { resetForm }) => {
        submit(value, resetForm);
      },
    });

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
        loader(false);
        if (res?.user) {
          toast.success("Registration successful. Verify your email to continue.");

          resetForm();
        } else {
          toast.error(res?.data?.message || "Something went wrong");
        }
      },
      (err) => {
        loader(false);
        console.log(err);
        toast.error(err?.message || "Error occurred");
      }
    );
  };

  return (
    <div className="md:m-0 p-3 fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="relative">
          <h2 className="text-xl text-black text-center font-semibold mb-2">
            Join Hariir
          </h2>

          <button
            className="text-gray-400 absolute right-0 top-0 text-2xl cursor-pointer hover:text-black"
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
            className={`flex flex-col items-center p-4 border rounded-lg w-1/2 cursor-pointer ${accountType === "professional"
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
            className={`flex flex-col items-center p-4 border rounded-lg w-1/2 cursor-pointer ${accountType === "company" ? "border-blue-400" : "border-gray-300"
              }`}
          >
            <HiOfficeBuilding className="text-2xl text-blue-400 mb-2" />
            <p className="font-medium text-sm text-black">Company</p>
            <span className="text-xs text-gray-400">Business profile</span>
          </div>
        </div>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className={`w-full border text-black border-gray-300 rounded px-3 py-2 mb-3 text-[13px] focus:outline-none bg-blue-50 ${errors.email && touched.email ? "border-red-400" : ""
            }`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && (
          <div className="text-red-400 text-xs mb-2">{errors.email}</div>
        )}

        {/* Password Input with Eye Toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className={`w-full border text-black border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none bg-blue-50 ${errors.password && touched.password ? "border-red-400" : ""
              }`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <span
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && touched.password && (
          <div className="text-red-400 text-xs mb-2">{errors.password}</div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-400 hover:bg-blue-600 text-white py-2 rounded text-sm font-medium"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={onSignInClick}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SingUp;
