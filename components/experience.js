import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";

export default function ExperienceEditor({ open, close, loader, profileData }) {
  const [experiences, setExperiences] = useState([]);
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
    <div className="backdrop-blur-lg md:h-[550px] h-[80%] md:top-40 h-auto overflow-y-auto shadow-2xl rounded-lg fixed md:p-6 p-4 max-w-4xl mx-auto inset-0 bg-white bg-opacity-50 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Edit Experience</h2>
        <X onClick={close} className="text-black cursor-pointer" />
      </div>
      <div className="flex justify-between my-8">
        <p className="flex items-center gap-2 px-4 py-2  text-gray-800  hover:bg-gray-100">
          Work Experience
        </p>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 border text-gray-800 rounded hover:bg-gray-100"
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="border p-8 rounded mb-4 bg-white shadow-sm relative"
        >
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => removeExperience(index)}
          >
            <Trash2 size={16} className="text-black" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              value={exp.jobTitle}
              onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
              placeholder="e.g. Software Engineer"
              className="border text-gray-800 rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              placeholder="e.g. Tech Corp"
              className="border text-gray-800  rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              value={exp.duration}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
              placeholder="e.g. Jan 2020 - Present"
              className="border text-gray-800  rounded px-4 py-2 w-full"
            />
            <input
              type="text"
              value={exp.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
              placeholder="e.g. Nairobi, Kenya"
              className="border text-gray-800 rounded px-4 py-2 w-full"
            />
          </div>

          <textarea
            rows={3}
            value={exp.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            placeholder="Describe your role and achievements..."
            className="mt-4 border text-gray-800 rounded px-4 py-2 w-full"
          />
        </div>
      ))}

      <div className="flex justify-end items-center mt-4">
        <div className="flex gap-4">
          <button
            onClick={close}
            className="px-4 cursor-pointer py-2 border border-gray-800 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
