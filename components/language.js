import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";

export default function LanguageEditor({ open, close, loader, profileData, getProfile }) {
  const [languages, setLanguages] = useState([]);
  const router = useRouter();
  const [user] = useContext(userContext);


  const languageOptions = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian",
    "Chinese (Mandarin)", "Japanese", "Korean", "Arabic", "Hindi", "Urdu", "Bengali",
    "Turkish", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Polish",
    "Czech", "Hungarian", "Romanian", "Bulgarian", "Greek", "Hebrew", "Thai",
    "Vietnamese", "Indonesian", "Malay", "Tagalog", "Swahili", "Amharic", "Somali",
    "Yoruba", "Igbo", "Hausa", "Zulu", "Afrikaans"
  ];

 
  const levelOptions = [
    "Beginner", "Elementary", "Intermediate", "Upper Intermediate", "Advanced", "Fluent", "Native"
  ];

  useEffect(() => {
    if (profileData?.languages?.length > 0) {
      setLanguages(profileData.languages);
    } else {
      setLanguages([
        {
          language: "",
          level: "",
        },
      ]);
    }
  }, [profileData]);

  const handleChange = (index, field, value) => {
    const updated = [...languages];
    updated[index][field] = value;
    setLanguages(updated);
  };

  const addLanguage = () => {
    setLanguages([
      ...languages,
      {
        language: "",
        level: "",
      },
    ]);
  };

  const removeLanguage = (index) => {
    if (languages.length > 1) {
      const updated = languages.filter((_, i) => i !== index);
      setLanguages(updated);
    }
  };

  const submit = () => {
    const hasEmptyFields = languages.some(lang => !lang.language || !lang.level);
    
    if (hasEmptyFields) {
      toast.error("Please select both language and level for all entries");
      return;
    }

    loader(true);
    const data = {
      languages: languages,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Languages updated successfully");
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Languages</h2>
          <X onClick={close} className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium text-gray-800">Languages</p>
            <button
              onClick={addLanguage}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus size={18} /> Add Language
            </button>
          </div>

          {/* Language Grid Headers */}
          <div className="grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-700">
            <div className="col-span-5">Language</div>
            <div className="col-span-5">Level</div>
            <div className="col-span-2"></div>
          </div>

          {languages.map((lang, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 mb-4 items-center">
              {/* Language Dropdown */}
              <div className="col-span-5">
                <select
                  value={lang.language}
                  onChange={(e) => handleChange(index, "language", e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select language</option>
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Dropdown */}
              <div className="col-span-5">
                <select
                  value={lang.level}
                  onChange={(e) => handleChange(index, "level", e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select level</option>
                  {levelOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delete Button */}
              <div className="col-span-2 flex justify-end">
                <div
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => removeLanguage(index)}
                >
                  <Trash2 size={16} className="text-gray-600" />
                </div>
              </div>
            </div>
          ))}
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
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <span>💾</span> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}