import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";

function ServicesEditor({ open, close, loader, profileData, getProfile }) {
  const [services, setServices] = useState([]);
  const router = useRouter();
  const [user] = useContext(userContext);

  useEffect(() => {
    if (profileData?.services?.length > 0) {
      setServices(profileData.services);
    } else {
      setServices([""]);
    }
  }, [profileData]);

  const handleChange = (index, value) => {
    const updated = [...services];
    updated[index] = value;
    setServices(updated);
  };

  const addService = () => {
    setServices([...services, ""]);
  };

  const removeService = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  const submit = () => {
    const filteredServices = services.filter(service => service.trim() !== "");
    
    if (filteredServices.length === 0) {
      toast.error("Please add at least one service");
      return;
    }

    loader(true);
    const data = {
      services: filteredServices,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", data, router).then(
      (res) => {
        loader(false);
        if (res.status) {
          toast.success("Services updated successfully");
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Edit services</h2>
          <button
            onClick={close}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="text-gray-500 hover:text-gray-700" size={20} />
          </button>
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-gray-600 mb-6">
            <span className="text-red-500">*</span> Indicates required
          </p>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Enter service name"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeService(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  disabled={services.length === 1}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Service Button */}
          <button
            onClick={addService}
            className="flex items-center gap-2 mt-4 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>Add Service</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={submit}
            className="w-full bg-blue-500 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesEditor;