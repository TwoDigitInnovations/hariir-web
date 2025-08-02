import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";
import { RiVerifiedBadgeLine } from "react-icons/ri";

function EducationEditor({ open, close, loader, profileData, getProfile }) {
  const [educations, setEducations] = useState([]);
  const router = useRouter();
  const [user] = useContext(userContext);

  useEffect(() => {
    if (profileData?.education?.length > 0) {
      setEducations(profileData.education);
    } else {
      setEducations([
        {
          degree: "",
          institution: "",
          year: "",
          description: "",
          status: "Pending"
        },
      ]);
    }
  }, [profileData]);

  const handleChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        degree: "",
        institution: "",
        year: "",
        description: "",
        status: "Pending"
      },
    ]);
  };

  const removeEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  const submit = () => {
    loader(true);
    const data = {
      education: educations,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Education updated successfully");
          close();
          getProfile()
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
          <h2 className="text-xl font-semibold text-gray-800">Edit Education</h2>
          <X onClick={close} className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium text-gray-800">Education History</p>
            <button
              onClick={addEducation}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus size={18} /> Add Education
            </button>
          </div>

          {educations.map((edu, index) => {
            const isApproved = edu.status === "Approved";

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 mb-4 bg-white shadow-sm relative"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Education {index + 1}
                    {edu.status === "Approved" ? (
                      <RiVerifiedBadgeLine className="text-green-600 text-2xl inline ml-2" />
                    ) : edu.status === "Rejected" ? (
                      <img src="/reject.png" className="w-6 h-6 inline ml-2" />
                    ) : null}
                  </h3>
                  <div
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 size={16} className="text-gray-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleChange(index, "degree", e.target.value)}
                      disabled={isApproved}
                      placeholder="e.g. Bachelor of Computer Science"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleChange(index, "institution", e.target.value)}
                      disabled={isApproved}
                      placeholder="e.g. University of Nairobi"
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleChange(index, "year", e.target.value)}
                    disabled={isApproved}
                    placeholder="e.g. 2020"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-1/2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={edu.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    disabled={isApproved}
                    placeholder="Additional details about your education..."
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            );
          })}


        </div>

        {/* Footer */}
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


export default EducationEditor