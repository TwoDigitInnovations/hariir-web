import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Resume from "./Resume";
import Resume2 from "./Resume2";
import Resume3 from "./Resume3";

function AllCV({ open, close, profileData, }) {


  if (!open) return null

  console.log("profileData", profileData)
  return (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col h-[650px] overflow-hidden">

        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All CVs</h2>
          <X
            onClick={close}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            size={24}
          />
        </div>

        <div className="flex justify-center items-start p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center w-full">
            <Resume profile={profileData} />
            <Resume2 profile={profileData} />
            <Resume3 profile={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCV;
