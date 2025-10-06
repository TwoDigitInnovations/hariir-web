import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X, Briefcase, AlertCircle } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import Image from "next/image";
import dynamic from "next/dynamic";
import { set } from "date-fns";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const config = {
  height: "400px", // responsive height, you can adjust
  minHeight: "300px", // for mobile
  maxHeight: "800px", // optional max height for desktop
  previewStyle: "vertical", // or "tab" for split view
  toolbarItems: [
    ["heading", "bold", "italic", "strike"], // basic text
    ["hr", "quote"],
    ["ul", "ol", "task"],
    ["table", "image", "link"],
    ["code", "codeblock"],
    ["scrollSync"]
  ],
  useCommandShortcut: true, // enable keyboard shortcuts
  toolbarAdaptive: true, // adaptive toolbar for mobile
  initialEditType: "wysiwyg", // or "markdown"
  placeholder: "Write something here...",
  readonly: false,
  uploader: { insertImageAsBase64URI: true },
};


function ExperienceEditor({ open, close, loader, profileData, getProfile }) {
  const [experiences, setExperiences] = useState([]);
  const [companies, setCompanies] = useState([]);
  const router = useRouter();
  const [user] = useContext(userContext);


  const calculateDuration = (startDate, endDate, isCurrentlyWorking) => {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = isCurrentlyWorking ? new Date() : new Date(endDate);

    if (isNaN(start.getTime()) || (!isCurrentlyWorking && isNaN(end.getTime()))) {
      return "";
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    const parts = [];
    if (years > 0) parts.push(`${years} yr${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} mo${months !== 1 ? 's' : ''}`);

    return parts.length > 0 ? parts.join(' ') : '0 mos';
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };


  const sortExperiences = (exps) => {
    return [...exps].sort((a, b) => {
      // If 'a' is currently working, it comes first
      if (a.isCurrentlyWorking && !b.isCurrentlyWorking) return -1;
      if (!a.isCurrentlyWorking && b.isCurrentlyWorking) return 1;

      // If both are currently working or both ended, compare end dates
      const dateA = a.isCurrentlyWorking ? new Date() : new Date(a.endDate);
      const dateB = b.isCurrentlyWorking ? new Date() : new Date(b.endDate);

      return dateB - dateA; // Most recent first
    });
  };


  const getMinStartDate = (currentIndex) => {
    if (currentIndex === 0) return null;

    const previousExp = experiences[currentIndex - 1];
    if (previousExp?.endDate && !previousExp.isCurrentlyWorking) {
      const date = new Date(previousExp.endDate);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }
    return null;
  };

  useEffect(() => {
    Api("get", "auth/getAllProfileBaseOnRole/?role=company", {}, router).then((res) => {
      if (res.status) {
        setCompanies(res.data || []);
      }
    });
  }, []);

  useEffect(() => {
    if (profileData?.experience?.length > 0) {
      const sortedForInput = [...profileData.experience].sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA - dateB;
      });
      setExperiences(sortedForInput);
    } else {
      setExperiences([
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrentlyWorking: false,
          description: "",
          employmentType: "",
          status: "Pending"
        },
      ]);
    }
  }, [profileData]);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;

    if (field === "isCurrentlyWorking" && value === true) {
      updated.forEach((exp, i) => {
        if (i !== index) {
          exp.isCurrentlyWorking = false;
        }
      });
      updated[index].endDate = "";
    }

    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrentlyWorking: false,
        description: "",
        employmentType: "",
        status: "Pending"
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  const validateExperiences = () => {
    const dateRanges = [];

    for (let i = 0; i < experiences.length; i++) {
      const exp = experiences[i];
      if (!exp.startDate) continue;
      const start = new Date(exp.startDate);
      const end = exp.isCurrentlyWorking ? new Date() : new Date(exp.endDate);
      if (!exp.isCurrentlyWorking && exp.endDate) {
        if (end < start) {
          toast.error(`Experience ${i + 1}: End date cannot be before start date`);
          return false;
        }
      }

      for (let j = 0; j < dateRanges.length; j++) {
        const existing = dateRanges[j];

        if (start.getTime() === existing.start.getTime() &&
          end.getTime() === existing.end.getTime()) {
          toast.error(`Experiences ${existing.index + 1} and ${i + 1} have the same date range. Please use unique date ranges for each experience.`);
          return false;
        }
      }

      dateRanges.push({ start, end, index: i });
    }

    for (let i = 1; i < experiences.length; i++) {
      const current = experiences[i];
      const previous = experiences[i - 1];

      if (current.startDate && previous.endDate && !previous.isCurrentlyWorking) {
        const currentStart = new Date(current.startDate);
        const previousEnd = new Date(previous.endDate);

        if (currentStart < previousEnd) {
          toast.error(`Experience ${i + 1}: Start date cannot be earlier than the end date of the previous experience. Please maintain chronological order.`);
          return false;
        }
      }
    }

    return true;
  };

  const submit = () => {
    if (!validateExperiences()) {
      return;
    }

    loader(true);
    const sortedExperiences = sortExperiences(experiences);
    const data = {
      experience: sortedExperiences,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Experience updated successfully");
          close();
          setExperiences([]);
          getProfile();
        } else {
          toast.error(res.message || "An error occurred");
        }
      },
      (err) => {
        loader(false);
        console.error("Error:", err);
        toast.error(err?.message || "An error occurred");
      }
    );
  };

  if (!open) return null;


  console.log("experiences state:", experiences);
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase size={24} className="text-blue-500" />
            Edit Experience
          </h2>
          <X onClick={close} className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Important: Add experiences in chronological order
                </p>
                <p className="text-sm text-blue-700">
                  Please add your <strong>earliest experience first</strong> (for companies you have left),
                  then add subsequent experiences, and finally add your <strong>current company</strong> last.
                  Experiences will be automatically arranged with the most recent at the top.
                </p>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col justify-start md:justify-between items-start md:items-center gap-2 md:gap-0 mb-6">
            <p className="text-lg font-medium text-gray-800">
              Work Experience ({experiences.length})
            </p>
            <button
              onClick={addExperience}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus size={18} /> Add Experience
            </button>
          </div>

          {experiences.map((exp, index) => {
            const isApproved = exp.ForAdminStatus === "Approved";
            const duration = calculateDuration(exp.startDate, exp.endDate, exp.isCurrentlyWorking);
            const startDateFormatted = formatDate(exp.startDate);
            const endDateFormatted = exp.isCurrentlyWorking ? "Present" : formatDate(exp.endDate);
            const minStartDate = getMinStartDate(index);

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 mb-4 bg-white shadow-sm relative"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Experience {index + 1}
                    {exp.isCurrentlyWorking && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                    {exp.status === "Approved" ? (
                      <RiVerifiedBadgeLine className="text-green-600 text-2xl inline ml-2" />
                    ) : exp.status === "Rejected" ? (
                      <Image src="/reject.png" className="w-6 h-6 inline ml-2" alt="rejected" width={24} height={24} />
                    ) : null}
                  </h3>
                  <div
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 size={16} className="text-gray-600" />
                  </div>
                </div>

                {/* Date Range and Duration Display */}
                {(startDateFormatted || endDateFormatted) && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex md:flex-row flex-col justify-start items-start md:items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700">Duration:</span>
                      <div className="gap-2 flex">
                        <span className="text-gray-800">
                          {startDateFormatted} - {endDateFormatted}
                        </span>
                        {duration && (
                          <>
                            <span className="text-gray-500 ">•</span>
                            <span className="font-semibold text-blue-600">{duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                      disabled={isApproved}
                      placeholder="e.g. Senior Software Engineer"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={companies.some(c => c.companyName === exp.company) ? exp.company : ""}
                      onChange={(e) => {
                        const selected = e.target.value;
                        if (selected === "custom") {
                          handleChange(index, "company", "");
                        } else {
                          handleChange(index, "company", selected);
                        }
                      }}
                      disabled={isApproved}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100 mb-2"
                    >
                      <option value="">Select Company</option>
                      {companies.map((c, i) => (
                        <option key={i} value={c.companyName}>
                          {c.companyName}
                        </option>
                      ))}
                      <option value="custom">Other (Enter manually)</option>
                    </select>

                    {/* Agar custom ho toh textbox open */}
                    {(!companies.some(c => c.companyName === exp.company) || exp.company === "") && (
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleChange(index, "company", e.target.value)
                        }
                        disabled={isApproved}
                        placeholder="Enter company name"
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Type
                    </label>
                    <select
                      value={exp.employmentType}
                      onChange={(e) => handleChange(index, "employmentType", e.target.value)}
                      disabled={isApproved}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select Employment Type</option>
                      <option value="fulltime">Full-time</option>
                      <option value="parttime">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleChange(index, "location", e.target.value)}
                      disabled={isApproved}
                      placeholder="e.g. New York, NY"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date  <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="month"
                      value={exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0].slice(0, 7) : ""}
                      onChange={(e) => handleChange(index, "startDate", e.target.value)}
                      disabled={isApproved}
                      min={minStartDate || undefined}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                    />
                    {minStartDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Must be after {formatDate(minStartDate)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date {!exp.isCurrentlyWorking && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type="month"
                      value={exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0].slice(0, 7) : ""}
                      onChange={(e) => handleChange(index, "endDate", e.target.value)}
                      disabled={isApproved || exp.isCurrentlyWorking}
                      min={exp.startDate || undefined}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.isCurrentlyWorking}
                      onChange={(e) => handleChange(index, "isCurrentlyWorking", e.target.checked)}
                      disabled={isApproved}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      I currently work here
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <JoditEditor
                    config={config}
                    value={exp.description}
                    onBlur={(newContent) => handleChange(index, "description", newContent)}
                    disabled={isApproved}
                    placeholder="Describe your responsibilities and achievements..."
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none disabled:bg-gray-100"
                  />

                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={close}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <span>💾</span> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceEditor;