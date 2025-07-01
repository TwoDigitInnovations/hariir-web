import React, { useState, useEffect } from "react";
import {
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Building2,
  Search,
  Filter,
  Briefcase,
} from "lucide-react";
import CompanyCard from "../components/CompanyCard";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Api } from "@/services/service";

const FindCompany = (props) => {

  const [companies, setCompaniesData] = useState([]);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [SearchTearm, setSearchTearm] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      getAllCompany();
    }
  }, [token]);

  const getAllCompany = () => {
    props.loader(true);

    Api("get", "auth/getAllProfileBaseOnRole?role=company", null, router).then(
      (res) => {
        props.loader(false);
        setCompaniesData(
          (res.data || []).filter((item) => item.role === "company")
        );
      },
      (err) => {
        props.loader(false);
        toast.error(err?.data?.message || err?.message || "An error occurred");
      }
    );
  };

  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto md:px-10 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Find Companies</h1>
          </div>
          <p className="text-gray-600">
            Discover companies and organizations across East Africa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Search */}
              <div className="pb-5  border-b-[1.5px] border-b-gray-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, description, or service"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black  text-sm"
                    onChange={(e)=> setSearchTearm(e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="pb-5 mt-5 border-b-[1.5px] border-b-gray-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option>Select location</option>
                  <option>Kenya</option>
                  <option>Nigeria</option>
                  <option>South Africa</option>
                  <option>Uganda</option>
                </select>
              </div>

              {/* Industry Sector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 mt-4">
                  <Briefcase className="w-4 h-4 inline mr-2 text-gray-700" />
                  Industry Sector
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
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  4 Companies Found
                </h2>
                <p className="text-gray-600">
                  Explore organizations making an impact across East Africa
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 ">
              {companies.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCompany;
