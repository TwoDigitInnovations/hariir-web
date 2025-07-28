import React, { useState } from "react";
import { X, Download } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";
import Resume from "./Resume";
import Resume2 from "./Resume2";
import Resume3 from "./Resume3";

function AllCV({ open, close, loader, profileData, getProfile }) {
  const router = useRouter();
  // const [viewMode, setViewMode] = useState("list"); // 'list' or 'preview'

  // const downloadPDF = async (filename) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await axios.get("http://localhost:3003/api/auth/genratePDF", {
  //       headers: {
  //         Authorization: `jwt ${token}`,
  //       },
  //       responseType: "blob",
  //       params: { name: filename }, // ⬅️ Send filename to backend
  //     });

  //     const blob = new Blob([res.data], { type: "application/pdf" });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `${filename}.pdf`; // ⬅️ Dynamic filename
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (err) {
  //     console.error("Download failed", err);
  //   }
  // };

  const resumeData = [
    { image: "/resume3.jpg", name: "resume1" },
    { image: "/resume1.png", name: "resume2" },
    { image: "/resume2.jpg", name: "resume3" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col h-[650px] overflow-hidden">
        {/* Header */}
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
