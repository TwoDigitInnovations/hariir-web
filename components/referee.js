import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";

function RefereeEditor({ open, close, loader, profileData ,getProfile}) {
  const [referees, setReferees] = useState([]);
  const router = useRouter();
  const [user] = useContext(userContext);

  useEffect(() => {
    if (profileData?.referees?.length > 0) {
      setReferees(profileData.referees);
    } else {
      setReferees([
        {
          fullName: "",
          title: "",
          organization: "",
          email: "",
          contact: "",
        },
      ]);
    }
  }, [profileData]);

  const handleChange = (index, field, value) => {
    const updated = [...referees];
    updated[index][field] = value;
    setReferees(updated);
  };

  const addReferee = () => {
    setReferees([
      ...referees,
      {
        fullName: "",
        title: "",
        organization: "",
        email: "",
        contact: "",
      },
    ]);
  };

  const removeReferee = (index) => {
    const updated = referees.filter((_, i) => i !== index);
    setReferees(updated);
  };

  const submit = () => {
    loader(true);
    const data = {
      referees: referees,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Referees updated successfully");
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
   
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Referees</h2>
          <X onClick={close} className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
        </div>

    
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-medium text-gray-800">Professional Referees</p>
            <button
              onClick={addReferee}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus size={18} /> Add Referee
            </button>
          </div>

          {referees.map((referee, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 mb-4 bg-white shadow-sm relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Referee {index + 1}
                </h3>
                <div
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => removeReferee(index)}
                >
                  <Trash2 size={16} className="text-gray-600" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={referee.fullName}
                    onChange={(e) => handleChange(index, "fullName", e.target.value)}
                    placeholder="e.g. Dr. Jane Smith"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={referee.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    placeholder="e.g. Senior Manager"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={referee.organization}
                    onChange={(e) => handleChange(index, "organization", e.target.value)}
                    placeholder="e.g. Tech Corp"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={referee.email}
                    onChange={(e) => handleChange(index, "email", e.target.value)}
                    placeholder="jane@example.com"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={referee.contact}
                  onChange={(e) => handleChange(index, "contact", e.target.value)}
                  placeholder="+1234567890"
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full md:w-1/2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
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

export default RefereeEditor;