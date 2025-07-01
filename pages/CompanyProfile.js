import React, { useState, useMemo, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Building2,
  Upload,
  MapPin,
  Mail,
  Phone,
  Globe,
  Users,
  Calendar,
  FileText,
  Briefcase,
  User,
  Plus,
  Trash2,
  Save,
  CheckCircle,
} from "lucide-react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { ApiFormData, Api } from "@/services/service";
import { toast } from "react-toastify";
import Compressor from "compressorjs";
import { useRouter } from "next/router";
import { userContext } from "./_app";

const validationSchema = Yup.object({
  companyName: Yup.string()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
  industrySector: Yup.string().required("Industry sector is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string().url("Invalid website URL"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format")
    .required("Phone number is required"),
  companySize: Yup.string().required("Company size is required"),
  foundedYear: Yup.number()
    .min(1800, "Founded year must be after 1800")
    .max(new Date().getFullYear(), "Founded year cannot be in the future")
    .required("Founded year is required"),
  companyDescription: Yup.string()
    .min(50, "Company description must be at least 50 characters")
    .required("Company description is required"),
  aboutUs: Yup.string()
    .min(100, "About us must be at least 100 characters")
    .required("About us is required"),
  missionStatement: Yup.string()
    .min(50, "Mission statement must be at least 50 characters")
    .required("Mission statement is required"),
  visionStatement: Yup.string()
    .min(50, "Vision statement must be at least 50 characters")
    .required("Vision statement is required"),
});

const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "construction", label: "Construction" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

const companySizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

function CompanyProfileForm(props) {
  const [companyLogo, setCompanyLogo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [user] = useContext(userContext);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // your key
    setToken(storedToken);
  }, []);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      industrySector: "",
      location: "",
      website: "",
      email: "",
      phone: "",
      companySize: "",
      foundedYear: "",
      companyDescription: "",
      aboutUs: "",
      missionStatement: "",
      visionStatement: "",
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

  const submit = async (values, resetForm) => {
    props.loader(true);

    const userId = router.query.userId || user._id;
    console.log(userId);
    const data = {
      ...values,
      userId: userId,
      companyLogo,
      projects,
      teamMembers,
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
            setCompanyLogo("");
            setProjects([]);
            setTeamMembers([]);
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
      companyName: data.companyName || "",
      industrySector: data.industrySector || "",
      location: data.location || "",
      website: data.website || "",
      email: data.email || "",
      phone: data.phone || "",
      companySize: data.companySize || "",
      foundedYear: data.foundedYear || "",
      companyDescription: data.companyDescription || "",
      aboutUs: data.aboutUs || "",
      missionStatement: data.missionStatement || "",
      visionStatement: data.visionStatement || "",
    });

    if (data.companyLogo) {
      setCompanyLogo(data.companyLogo);
    }

    if (Array.isArray(data.projects)) {
      setProjects(data.projects);
    }

    if (Array.isArray(data.teamMembers)) {
      setTeamMembers(data.teamMembers);
    }
  };

  const handleLogoChange = (event) => {
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

            if (res.status) {
              setCompanyLogo(res.data.file || res.data.fileUrl);
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

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        title: "",
        client: "",
        yearCompleted: "",
        description: "",
      },
    ]);
  };

  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        id: Date.now(),
        fullName: "",
        designation: "",
        description: "",
      },
    ]);
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const updateTeamMember = (id, field, value) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="md:text-3xl text-xl font-bold text-gray-900 mb-2">
            Set Up Your Company Profile
          </h1>
          <p className="text-gray-600 text-sm md:text-lg">
            Complete your profile to start building your network and showcase
            your expertise.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Company Information Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Company Information
              </h2>
            </div>

            {/* Company Logo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Company Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                  {companyLogo ? (
                    <img
                      src={companyLogo}
                      alt="Company Logo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload Logo
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG up to 5MB. Square logos work best.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="e.g. Acme Corporation"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                    formik.touched.companyName && formik.errors.companyName
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Sector *
                </label>
                <select
                  name="industrySector"
                  value={formik.values.industrySector}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                    formik.touched.industrySector &&
                    formik.errors.industrySector
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select industry</option>
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formik.touched.industrySector &&
                  formik.errors.industrySector && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.industrySector}
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                    formik.touched.location && formik.errors.location
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select country</option>

                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                  
                </select>
                {formik.touched.location && formik.errors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.location}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    placeholder="https://www.yourcompany.com"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                      formik.touched.website && formik.errors.website
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {formik.touched.website && formik.errors.website && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.website}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="info@yourcompany.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-3 py-2 border text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 xxx xxx xxxx"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md text-black shadow-sm focus:outline-none focus:border-blue-500 ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size *
                </label>
                <select
                  name="companySize"
                  value={formik.values.companySize}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md text-black shadow-sm focus:outline-none focus:border-blue-500 ${
                    formik.touched.companySize && formik.errors.companySize
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select company size</option>
                  {companySizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formik.touched.companySize && formik.errors.companySize && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.companySize}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Founded Year *
                </label>
                <input
                  type="number"
                  name="foundedYear"
                  placeholder="e.g. 2020"
                  value={formik.values.foundedYear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
                    formik.touched.foundedYear && formik.errors.foundedYear
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.foundedYear && formik.errors.foundedYear && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.foundedYear}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description *
              </label>
              <textarea
                name="companyDescription"
                rows={4}
                placeholder="Brief description of your company..."
                value={formik.values.companyDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 py-2 border rounded-md text-black shadow-sm focus:outline-none focus:border-blue-500 resize-none ${
                  formik.touched.companyDescription &&
                  formik.errors.companyDescription
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.companyDescription &&
                formik.errors.companyDescription && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.companyDescription}
                  </p>
                )}
            </div>
          </div>

          {/* About Us, Mission & Vision Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                About Us, Mission & Vision
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Us *
                </label>
                <textarea
                  name="aboutUs"
                  rows={6}
                  placeholder="Tell your company story, values, and what makes you unique..."
                  value={formik.values.aboutUs}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border text-black rounded-md shadow-sm focus:outline-none focus:border-blue-500 resize-none ${
                    formik.touched.aboutUs && formik.errors.aboutUs
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.aboutUs && formik.errors.aboutUs && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.aboutUs}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement *
                </label>
                <textarea
                  name="missionStatement"
                  rows={4}
                  placeholder="What is your company's mission and purpose?"
                  value={formik.values.missionStatement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md text-black shadow-sm focus:outline-none focus:border-blue-500 resize-none ${
                    formik.touched.missionStatement &&
                    formik.errors.missionStatement
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.missionStatement &&
                  formik.errors.missionStatement && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.missionStatement}
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Statement *
                </label>
                <textarea
                  name="visionStatement"
                  rows={4}
                  placeholder="What is your company's long-term vision?"
                  value={formik.values.visionStatement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md text-black shadow-sm focus:outline-none focus:border-blue-500 resize-none ${
                    formik.touched.visionStatement &&
                    formik.errors.visionStatement
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.visionStatement &&
                  formik.errors.visionStatement && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.visionStatement}
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="md:flex-row flex-col flex items-start gap-3 justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Past Projects & Portfolio
                </h2>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center md:w-[150px] w-full justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            <div className="space-y-6">
              {projects.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No projects added yet</p>
                  <button
                    type="button"
                    onClick={addProject}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Project
                  </button>
                </div>
              ) : (
                projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">
                        Project #{index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeProject(project.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Modern Office Complex Design"
                          value={project.title}
                          onChange={(e) =>
                            updateProject(project.id, "title", e.target.value)
                          }
                          className="w-full cols-span-2 text-black text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Client
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ABC Corporation"
                          value={project.client}
                          onChange={(e) =>
                            updateProject(project.id, "client", e.target.value)
                          }
                          className="w-full px-3 py-2 text-black text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year Completed
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2023"
                          value={project.yearCompleted}
                          onChange={(e) =>
                            updateProject(
                              project.id,
                              "yearCompleted",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border text-black text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Description *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe the project scope, your role, technologies used, and key achievements..."
                        value={project.description}
                        onChange={(e) =>
                          updateProject(
                            project.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border text-black text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Meet our Team Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="md:flex-row flex-col flex items-start gap-3 justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Meet our Team
                </h2>
              </div>
              <button
                type="button"
                onClick={addTeamMember}
                className="flex md:w-[200px] w-full justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
              >
                <Plus className="w-4 h-4" />
                Add Team Member
              </button>
            </div>

            <div className="space-y-6">
              {teamMembers.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    No team members added yet
                  </p>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Team Member
                  </button>
                </div>
              ) : (
                teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">
                        Team Member #{index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeTeamMember(member.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={member.fullName}
                          onChange={(e) =>
                            updateTeamMember(
                              member.id,
                              "fullName",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Eng Abdirahim Mohamed"
                          className="w-full border text-black text-sm border-gray-300 px-3 py-2 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Designation *
                        </label>
                        <input
                          type="text"
                          value={member.designation}
                          onChange={(e) =>
                            updateTeamMember(
                              member.id,
                              "designation",
                              e.target.value
                            )
                          }
                          placeholder="e.g. CEO & Director"
                          className="w-full border text-sm text-black border-gray-300 px-3 py-2 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={5}
                        value={member.description}
                        onChange={(e) =>
                          updateTeamMember(
                            member.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="BSc Civil Engineering from UoN (2014)
                            Registered with engineers Board of Kenya & Institute of Engineers of Kenya. Over 10 Yrs experience in various complex civil engineering projects design and supervision"
                        className="w-full border  text-sm text-black border-gray-300 px-3 py-2 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-end mb-6">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    setCompanyLogo("");
                    setProjects([]);
                    setTeamMembers([]);
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
        </form>
      </div>
    </div>
  );
}

export default CompanyProfileForm;
