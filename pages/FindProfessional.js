import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Filter,
  Users,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { Api } from "@/services/service";
import ProfessionalCard from "../components/ProfessionalCard";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const FindProfessional = (props) => {
  // const profilesData = [
  //   {
  //     initials: "SK",
  //     avatarColor: "#3B82F6",
  //     name: "Samuel Kiprotich",
  //     title: "Senior Software Engineer",
  //     location: "Nairobi, Kenya",
  //     skills: ["React", "Node.js", "Python", "MongoDB", "AWS"],
  //     currentRole: "Senior Software Engineer at TechFlow Kenya",
  //   },
  //   {
  //     initials: "AM",
  //     avatarColor: "#10B981",
  //     name: "Asha Mwangi",
  //     title: "Full Stack Developer",
  //     location: "Lagos, Nigeria",
  //     skills: ["Vue.js", "Laravel", "PostgreSQL", "Docker"],
  //     currentRole: "Full Stack Developer at InnovateTech Solutions",
  //   },
  //   {
  //     initials: "RK",
  //     avatarColor: "#8B5CF6",
  //     name: "Rajesh Kumar",
  //     title: "DevOps Engineer",
  //     location: "Mumbai, India",
  //     skills: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Python"],
  //     currentRole: "DevOps Engineer at CloudScale Technologies",
  //   },
  //   {
  //     initials: "LS",
  //     avatarColor: "#F59E0B",
  //     name: "Lisa Smith",
  //     title: "Product Manager",
  //     location: "San Francisco, USA",
  //     skills: ["Product Strategy", "Agile", "Analytics", "UX Research"],
  //     currentRole: "Senior Product Manager at StartupFlow Inc",
  //   },
  //   {
  //     initials: "MO",
  //     avatarColor: "#EF4444",
  //     name: "Mohammed Omar",
  //     title: "Mobile App Developer",
  //     location: "Dubai, UAE",
  //     skills: ["Flutter", "React Native", "iOS", "Android", "Firebase"],
  //     currentRole: "Mobile Developer at DigitalCraft Solutions",
  //   },
  //   {
  //     initials: "JD",
  //     avatarColor: "#06B6D4",
  //     name: "Jane Doe",
  //     title: "Data Scientist",
  //     location: "Toronto, Canada",
  //     skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "R"],
  //     currentRole: "Data Scientist at AI Innovations Lab",
  //   },
  // ];

  const [profilesData, setProfileData] = useState([]);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [SearchTearm, setSearchTearm] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      getAllProfessional();
    }
  }, [token]);

  const getAllProfessional = () => {
    props.loader(true);

    Api(
      "get",
      "auth/getAllProfileBaseOnRole?role=professional",
      null,
      router
    ).then(
      (res) => {
        props.loader(false);
        setProfileData(
          (res.data || []).filter((item) => item.role === "professional")
        ); // Optional filter safety
      },
      (err) => {
        props.loader(false);
        toast.error(err?.data?.message || err?.message || "An error occurred");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 md:p-6">
      <div className="max-w-7xl mx-auto md:px-10 p-4 md:py-0 py-8">
        {/* Header */}
        <div className="mb-8">
          <div
            className="flex items-center mb-8 "
            onClick={() => window.history.back()}
          >
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="md:text-3xl text-xl font-bold text-gray-900">
                Find Professional
              </h1>
              <p className="text-gray-600">
                Connect with talented professional across East Africa
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, description, or service"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black text-sm"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none text-black text-sm">
                  <option>Select location</option>
                  <option>Kenya</option>
                  <option>Nigeria</option>
                  <option>South Africa</option>
                  <option>Uganda</option>
                </select>
              </div>

              {/* Industry Sector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Briefcase className="w-4 h-4 inline mr-2 text-gray-700" />
                  Skills and expertise
                </label>
                <div className="space-y-2">
                  {[
                    "Technology",
                    "Finance",
                    "Healthcare",
                    "Education",
                    "Engineering",
                    "Manufacturing",
                    "Agriculture",
                    "Sales",
                    "Marketing",
                  ].map((sector) => (
                    <label key={sector} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {sector}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {SearchTearm && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 ">
                  4 Professional Found
                </h2>
                <p className="text-gray-600">
                  Discover talented Professional ready to Connect
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
              {profilesData.map((profile, index) => (
                <ProfessionalCard key={index} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindProfessional;
