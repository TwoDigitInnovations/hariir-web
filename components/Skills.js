import React, { useContext, useEffect, useState } from "react";
import { Plus, X } from "lucide-react"; // or use react-icons if preferred
import { RxCross2 } from "react-icons/rx";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";

const suggestedSkills = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "SQL",
  "MongoDB",
  "Project Management",
  "Leadership",
  "Communication",
  "Problem Solving",
  "Data Analysis",
  "Marketing",
  "Sales",
  "Customer Service",
  "Finance",
  "Accounting",
  "Human Resources",
  "Operations",
  "Strategy",
  "Consulting",
];

export default function SkillEditor({ open, close, loader, profileData }) {
  const [inputSkill, setInputSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const router = useRouter();
  const [user] = useContext(userContext);

  if (!open) return null; // Return null instead of undefined

  const handleAddSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    }
  };

  useEffect(() => {
    if (profileData.skills) {
      setSkills(profileData.skills);
    }
  }, [profileData.skills]); // Add dependency array

  const handleRemoveSkill = (skill) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const submit = () => {
    loader(true);

    const data = {
      skills: skills,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Skills updated successfully");
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

  return (
    <div className="backdrop-blur-lg h-[500px] top-40 shadow-2xl rounded-lg fixed md:p-6 p-6 max-w-xl mx-auto inset-0 bg-white bg-opacity-50 z-50">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Edit Skills
        </h2>
        <RxCross2 onClick={close} className="text-black cursor-pointer" />
      </div>
      {skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button onClick={() => handleRemoveSkill(skill)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
          placeholder="Add a skill"
          className="flex-1 border text-gray-800 rounded px-4 py-2 focus:outline-none focus:ring"
        />
        <button
          onClick={() => {
            const trimmedSkill = inputSkill.trim();
            if (trimmedSkill) {
              handleAddSkill(trimmedSkill);
              setInputSkill("");
            }
          }}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2 text-gray-800">Suggested Skills:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill, index) => (
            <button
              key={index}
              onClick={() => handleAddSkill(skill)}
              className="border px-3 py-1 text-gray-600 rounded-full text-sm hover:bg-blue-100"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          className="px-4 py-2 rounded border border-gray-800 text-gray-800"
          onClick={close}
        >
          Cancel
        </button>
        <button
          onClick={submit}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
