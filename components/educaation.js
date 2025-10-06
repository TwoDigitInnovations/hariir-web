import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X, Calendar, GraduationCap } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import Image from "next/image";

function EducationEditor({ open, close, loader, profileData, getProfile }) {
  const [educations, setEducations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    description: "",
    levelOfEducation: "",
    status: "Pending",
    currentlyStudying: false
  });
  const router = useRouter();
  const [user] = useContext(userContext);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear + 5 - i);

  useEffect(() => {
    if (profileData?.education?.length > 0) {
      const sorted = [...profileData.education].sort((a, b) => {
        const yearA = parseInt(a.startYear || a.year || 0);
        const yearB = parseInt(b.startYear || b.year || 0);
        return yearB - yearA;
      });
      setEducations(sorted);
    }
  }, [profileData]);

  const handleCurrentEducationChange = (field, value) => {
    setCurrentEducation(prev => ({
      ...prev,
      [field]: value,
      ...(field === "currentlyStudying" && value ? { endYear: "Present" } : {})
    }));
  };

  const validateEducation = () => {
    if (!currentEducation.degree.trim()) {
      toast.error("Qualification is required");
      return false;
    }
    if (!currentEducation.institution.trim()) {
      toast.error("Institution is required");
      return false;
    }
    if (!currentEducation.startYear) {
      toast.error("Start Year is required");
      return false;
    }
    if (!currentEducation.currentlyStudying && !currentEducation.endYear) {
      toast.error("End Year is required (or check 'Currently studying')");
      return false;
    }
    if (!currentEducation.currentlyStudying && 
        parseInt(currentEducation.startYear) >= parseInt(currentEducation.endYear)) {
      toast.error("End Year must be greater than Start Year");
      return false;
    }
    return true;
  };

  const saveCurrentEducation = () => {
    if (!validateEducation()) return;

    let updatedEducations;
    if (editingIndex !== null) {
      updatedEducations = [...educations];
      updatedEducations[editingIndex] = currentEducation;
    } else {
      updatedEducations = [...educations, currentEducation];
    }

    updatedEducations.sort((a, b) => {
      const yearA = parseInt(a.startYear || a.year || 0);
      const yearB = parseInt(b.startYear || b.year || 0);
      return yearB - yearA;
    });

    setEducations(updatedEducations);
    resetForm();
  };

  const resetForm = () => {
    setCurrentEducation({
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      description: "",
      levelOfEducation: "",
      status: "Pending",
      currentlyStudying: false
    });
    setShowForm(false);
    setEditingIndex(null);
  };

  const startEditing = (index) => {
    const edu = educations[index];
    if (edu.status === "Approved") {
      toast.info("Cannot edit approved education");
      return;
    }
    setCurrentEducation({
      ...edu,
      currentlyStudying: edu.endYear === "Present"
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const removeEducation = (index) => {
    const edu = educations[index];
    if (edu.status === "Approved") {
      toast.info("Cannot delete approved education");
      return;
    }
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  const submit = () => {
    if (showForm) {
      toast.warning("Please save or cancel the current education entry first");
      return;
    }

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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-blue-600" size={28} />
            <h2 className="text-xl font-semibold text-gray-800">Edit Education</h2>
          </div>
          <X onClick={close} className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium text-gray-800">Education History</p>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors shadow-sm"
              >
                <Plus size={18} /> Add Education
              </button>
            )}
          </div>

          {/* Education Form */}
          {showForm && (
            <div className="border-2 border-blue-400 rounded-lg p-6 mb-6 bg-blue-50 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-800">
                  {editingIndex !== null ? "Edit Education" : "Add New Education"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentEducation.degree}
                    onChange={(e) => handleCurrentEducationChange("degree", e.target.value)}
                    placeholder="e.g. Bachelor of Computer Science"
                    className="border border-blue-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentEducation.institution}
                    onChange={(e) => handleCurrentEducationChange("institution", e.target.value)}
                    placeholder="e.g. BBD University"
                    className="border border-blue-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={currentEducation.startYear}
                    onChange={(e) => handleCurrentEducationChange("startYear", e.target.value)}
                    className="border border-blue-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Start Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Year {!currentEducation.currentlyStudying && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={currentEducation.endYear}
                    onChange={(e) => handleCurrentEducationChange("endYear", e.target.value)}
                    disabled={currentEducation.currentlyStudying}
                    className={`border border-blue-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      currentEducation.currentlyStudying ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select End Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentEducation.currentlyStudying}
                    onChange={(e) => handleCurrentEducationChange("currentlyStudying", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  Currently studying here
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level of Education
                </label>
                <select
                  value={currentEducation.levelOfEducation}
                  onChange={(e) => handleCurrentEducationChange("levelOfEducation", e.target.value)}
                  className="border border-blue-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Level of Education</option>
                  <option value="highschool">High School</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={currentEducation.description}
                  onChange={(e) => handleCurrentEducationChange("description", e.target.value)}
                  placeholder="Additional details about your education..."
                  className="border border-blue-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCurrentEducation}
                  className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingIndex !== null ? "Update" : "Save"} Education
                </button>
              </div>
            </div>
          )}

        
          <div className="space-y-4">
            {educations.map((edu, index) => {
              const isApproved = edu.status === "Approved";
              const displayEndYear = edu.currentlyStudying ? "Present" : edu.endYear;
              const displayStartYear = edu.startYear 

              return (
                <div
                  key={index}
                  className="border-l-4 border-blue-400 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {edu.degree}
                        </h3>
                        {edu.status === "Approved" ? (
                          <RiVerifiedBadgeLine className="text-green-600 text-xl" />
                        ) : edu.status === "Rejected" ? (
                          <Image src="/reject.png" className="w-5 h-5" alt="rejected" width={20} height={20} />
                        ) : (
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                      
                      <p className="text-blue-400 font-medium mb-2">{edu.institution}</p>
                      
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                        <Calendar size={14} />
                        <span>
                          {displayStartYear} - {displayEndYear}
                          {displayEndYear === "Present" && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-500 text-xs rounded-full">
                              Ongoing
                            </span>
                          )}
                        </span>
                      </div>
                      
                      {edu.levelOfEducation && (
                        <p className="text-xs text-gray-500 mb-2">
                          Level: {edu.levelOfEducation.charAt(0).toUpperCase() + edu.levelOfEducation.slice(1)}
                        </p>
                      )}
                      
                      {edu.description && (
                        <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      {!isApproved && (
                        <>
                          <button
                            onClick={() => startEditing(index)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeEducation(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {educations.length === 0 && !showForm && (
            <div className="text-center py-12 text-gray-500">
              <GraduationCap size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No education added yet. Click "Add Education" to get started.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={close}
              className="px-6 py-2 border border-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="px-6 py-2 bg-blue-400 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>💾</span> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationEditor;