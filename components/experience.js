import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import Image from "next/image";

export default function ExperienceEditor({
  open,
  close,
  loader,
  profileData,
  getProfile,
}) {
  const [experiences, setExperiences] = useState([]);
  const [companies, setCompanies] = useState([]); // 🔹 listed companies
  const router = useRouter();
  const [user] = useContext(userContext);

  useEffect(() => {
    if (profileData?.experience?.length > 0) {
      setExperiences(profileData.experience);
    } else {
      setExperiences([
        {
          jobTitle: "",
          company: "",
          location: "",
          duration: "",
          description: "",
        },
      ]);
    }
  }, [profileData]);


  useEffect(() => {
    Api("get", "auth/getAllProfileBaseOnRole/?role=company", {}, router).then((res) => {
      if (res.status) {
        console.log(res?.data);
        console.log(res?.data?.data);
        setCompanies(res.data || []);
      }
    });
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: "",
        company: "",
        location: "",
        duration: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  const submit = () => {
    loader(true);
    const data = {
      experience: experiences,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Experience updated successfully");
          close();
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

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Experience
          </h2>
          <X
            onClick={close}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            size={24}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium text-gray-800">Work Experience</p>
            <button
              onClick={addExperience}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus size={18} /> Add Experience
            </button>
          </div>

          {experiences.map((exp, index) => {
            const isApproved = exp.ForAdminStatus === "Approved";

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 mb-4 bg-white shadow-sm relative"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Experience {index + 1}
                    {exp.ForAdminStatus === "Approved" ? (
                      <RiVerifiedBadgeLine className="text-green-600 text-2xl inline ml-2" />
                    ) : exp.ForAdminStatus === "Rejected" ? (
                      <Image
                        src="/reject.png"
                        className="w-6 h-6 inline ml-2"
                        alt="rejeted"
                        width={24}
                        height={24}
                      />
                    ) : null}
                  </h3>
                  <div
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 size={16} className="text-gray-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) =>
                        handleChange(index, "jobTitle", e.target.value)
                      }
                      disabled={isApproved}
                      placeholder="e.g. Software Engineer"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>

                  {/* 🔹 Company dropdown + custom input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={companies.includes(exp.company) ? exp.company : ""}
                      onChange={(e) => {
                        const selected = e.target.value;
                        if (selected === "custom") {
                          handleChange(index, "company", "");
                        } else {
                          handleChange(index, "company", selected);
                        }
                      }}
                      disabled={isApproved}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-2"
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
                    {(!companies.includes(exp.company) || exp.company === "") && (
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleChange(index, "company", e.target.value)
                        }
                        disabled={isApproved}
                        placeholder="Enter company name"
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        handleChange(index, "duration", e.target.value)
                      }
                      disabled={isApproved}
                      placeholder="e.g. Jan 2020 - Present"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        handleChange(index, "location", e.target.value)
                      }
                      disabled={isApproved}
                      placeholder="e.g. Nairobi, Kenya"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={exp.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    disabled={isApproved}
                    placeholder="Describe your role and achievements..."
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
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
