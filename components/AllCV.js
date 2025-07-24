import React from "react";
import { X } from "lucide-react";
import Resume from "./Resume";
import Resume2 from "./Resume2";
import Resume3 from "./Resume3";
function AllCV({ open, close, loader, profileData, getProfile }) {
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col h-[650px]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">All CVs</h2>
          <X
            onClick={close}
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            size={24}
          />
        </div>
        {/* Content */}
        <div className="flex md:flex-row flex-wrap md:flex-nowrap  md:gap-20 gap-4 items-center justify-center overflow-y-auto p-6 h-full w-full">
          <Resume profile={profileData} />
          <Resume2 
          profile={profileData} 
          />
          <Resume3 
          profile={profileData} 
          />
        </div>
      </div>
    </div>
  );
}

export default AllCV;
