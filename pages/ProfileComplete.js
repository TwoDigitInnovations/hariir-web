import React, { useState, useMemo, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { User, Upload, MapPin, Mail, Phone, Linkedin, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Select from "react-select";
import countryList from "react-select-country-list";
import Compressor from "compressorjs";
import { ApiFormData, Api } from "@/services/service";
import { useRouter } from "next/router";
import { userContext } from "./_app";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const config = {
  height: 400,
  toolbarAdaptive: false,
  readonly: false,
  uploader: { insertImageAsBase64URI: true },

  clipboard: {
    matchVisual: true,
    defaultActionOnPaste: "insert_as_html",
    denyPasteFromWord: false,
    cleanPaste: false,
  },

  buttons: [
    "bold",
    "italic",
    "underline",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "paragraph",
    "|",
    "link",
    "table",
    "image",
    "hr",
    "|",
    "source",
    "fullsize",
  ],

  enter: "P",
  defaultLineHeight: "1.6",
  defaultFontSizePoints: "14",
  defaultFont: "Arial",

  style: {
    font: "14px Arial, sans-serif",
    lineHeight: "1.6",
  },
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  professionalTitle: Yup.string()
    .min(2, "Professional title must be at least 2 characters")
    .required("Professional title is required"),
  location: Yup.string().required("Location is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format")
    .required("Phone number is required"),
  linkedinUrl: Yup.string()
    .url("Invalid LinkedIn URL")
    .matches(/linkedin\.com/, "Must be a LinkedIn URL"),
  bio: Yup.string()
    .min(1, "Bio must be at least 1 characters")
    .max(1500, "Bio must not exceed 500 characters")
    .required("Professional bio is required"),
});

export default function ProfileForm(props) {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const router = useRouter();
  const [user] = useContext(userContext);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      professionalTitle: "",
      location: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      bio: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (formik.isValid) {
        submit(values, resetForm);
      } else {
        console.log("Form is invalid", formik.errors);
      }
    },
  });

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // your key
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const urlUserId = router.query.id;
    if (token) {
      if (urlUserId) {
        getProfile(urlUserId);
      } else {
        getProfile(user._id);
      }
    }
  }, [router.query, token, user?._id]);

  const getProfile = (userId) => {
    props.loader(true);
    Api("post", "auth/profile", { userId: userId }, router).then(
      (res) => {
        props.loader(false);
        if (res.data) {
          setProfileData(res.data);
        }
      },
      (err) => {
        props.loader(false);
        toast.error(err?.data?.message || err?.message || "An error occurred");
      }
    );
  };

  const setProfileData = (data) => {
    formik.setValues({
      fullName: data.fullName || "",
      professionalTitle: data.professionalTitle || "",
      location: data.location || "",
      email: data.email || "",
      phone: data.phone || "",
      linkedinUrl: data.linkedinUrl || "",
      bio: data.bio || "",
    });

    if (data.profileImage) {
      setProfileImage(data.profileImage);
    }
    if (data.coverImage) {
      setCoverImage(data.coverImage);
    }

  };

  const submit = (values, resetForm) => {
    props.loader(true);
    const urlUserId = router.query.userId;
    const userId = urlUserId || user._id;

    const data = {
      ...values,
      userId: userId,
      email: values.email.toLowerCase(),
      profileImage: profileImage,
      coverImage: coverImage
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        console.log("Response:", res);
        props.loader(false);
        if (res.status) {
          toast.success("Profile updated successfully");
          localStorage.setItem("userDetail", JSON.stringify(res.data));
          if (!router.query.userId) {
            resetForm();
            setProfileImage(null);

            router.push("/MyProfile");
          }
        } else {
          toast.error(res.message || "An error occurred");
        }
      },
      (err) => {
        props.loader(false);
        console.error("Error:", err);
        toast.error(err?.message || "An error occurred");
      }
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);

    const fileSizeInMb = file.size / (1024 * 1024);
    if (fileSizeInMb > 1) {
      props.toaster({
        type: "error",
        message: "Too large file. Please upload a smaller image",
      });
      return;
    }

    new Compressor(file, {
      quality: 0.6,
      success: (compressedResult) => {
        console.log("Compressed result:", compressedResult);
        const data = new FormData();
        data.append("file", compressedResult);
        props.loader(true);
        ApiFormData("post", "auth/fileupload", data, router).then(
          (res) => {
            props.loader(false);
            console.log("File upload response:", res);
            if (res.status) {
              setProfileImage(res.data.file || res.data.fileUrl);
              toast.success(res.data.message);
            }
          },
          (err) => {
            props.loader(false);
            console.error("File upload error:", err);
            toast.error(err?.data?.message || "File upload failed");
          }
        );
      },
    });
  };
  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);

    const fileSizeInMb = file.size / (1024 * 1024);
    if (fileSizeInMb > 1) {
      props.toaster({
        type: "error",
        message: "Too large file. Please upload a smaller image",
      });
      return;
    }

    new Compressor(file, {
      quality: 0.6,
      success: (compressedResult) => {
        console.log("Compressed result:", compressedResult);
        const data = new FormData();
        data.append("file", compressedResult);
        props.loader(true);
        ApiFormData("post", "auth/fileupload", data, router).then(
          (res) => {
            props.loader(false);
            console.log("File upload response:", res);
            if (res.status) {
              setCoverImage(res.data.file || res.data.fileUrl);
              toast.success(res.data.message);
            }
          },
          (err) => {
            props.loader(false);
            console.error("File upload error:", err);
            toast.error(err?.data?.message || "File upload failed");
          }
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center h-16 md:mt-0 mt-4"
            onClick={() => window.history.back()}
          >
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Browse
            </button>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Complete your profile to start building your network and showcase
            your expertise.
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Basic Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">
                Basic Information
              </h2>
            </div>

            {/* Profile Picture */}
            <div className="mb-6 space-y-6">
              {/* Cover Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Cover Photo
                </label>
                <div className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No cover photo uploaded
                    </span>
                  )}
                  <label className="absolute bottom-2 right-2 px-3 py-1 text-xs bg-white border border-gray-300 rounded shadow cursor-pointer hover:bg-gray-100 text-black">
                    <Upload className="inline w-4 h-4 mr-1" />
                    Upload Cover
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  JPG or PNG up to 1MB. Recommended size: 1200x400px.
                </p>
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG up to 1MB. Square photos work best.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. John Doe"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-black focus:border-blue-500 ${formik.errors.fullName
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                    }`}
                />
                {formik.errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="professionalTitle"
                  placeholder="e.g. Software Engineer"
                  value={formik.values.professionalTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border text-black rounded-md shadow-sm focus:outline-none  focus:border-blue-500 ${formik.errors.professionalTitle
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                    }`}
                />
                {formik.errors.professionalTitle && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.professionalTitle}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <Select
                    options={countryOptions}
                    name="location"
                    value={countryOptions.find(
                      (option) => option.value === formik.values.location
                    )}
                    onChange={(selectedOption) => {
                      formik.setFieldValue("location", selectedOption.label);
                    }}
                    onBlur={() => formik.setFieldTouched("location", true)}
                    className="react-select-container text-black"
                    classNamePrefix="react-select"
                  />
                </div>

                {formik.touched.location && formik.errors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.location}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none text-black focus:border-blue-500 ${formik.errors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                </div>
                {formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1234567890"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none text-black focus:border-blue-500 ${formik.errors.phone
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                </div>
                {formik.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/in/johndoe"
                    value={formik.values.linkedinUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none text-black focus:border-blue-500 ${formik.errors.linkedinUrl
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                      }`}
                  />
                </div>
                {formik.errors.linkedinUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.linkedinUrl}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Professional Bio
            </h3>
            <div className="text-black">
              <JoditEditor
                className={`w-full px-3 py-2 border border-t-0 rounded-b-md shadow-sm focus:outline-none text-black focus:border-blue-500 resize-none ${formik.errors.bio
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
                  }`}
                value={formik.values.bio}
                onChange={(newContent) => {
                  formik.setFieldValue("bio", newContent);
                }}
                onBlur={() => formik.setFieldTouched("bio", true)}
                config={config}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Use the toolbar to format your text. Bold: **text**, Italic:
              *text*, Large: ## text, Small: text, Bullet: • item, Number: 1.
              item
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                setProfileImage(null);
              }}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => formik.handleSubmit()}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
