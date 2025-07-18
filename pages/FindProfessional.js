import React, { useState, useEffect, useMemo, useContext } from "react";
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
import countryList from "react-select-country-list";
import { userContext } from "./_app";

const FindProfessional = (props) => {
  const [profilesData, setProfileData] = useState([]);
  const router = useRouter();
  const [user, setuser] = useContext(userContext);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const countryOptions = useMemo(() => countryList().getData(), []);

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
          (res.data || []).filter(
            (item) => item.role === "professional" && item._id !== user?._id
          )
        );
      },
      (err) => {
        props.loader(false);
        toast.error(err?.data?.message || err?.message || "An error occurred");
      }
    );
  };

  const getProfileOnSearch = () => {
    if (!searchQuery && !selectedLocation) {
      getAllProfessional();
      return;
    }
    const data = {
      selectedLocation,
    };
    props.loader(true);
    Api(
      "post",
      `auth/getAllSearchResult?searchTerm=${searchQuery}&role=professional`,
      data,
      router
    ).then(
      (res) => {
        props.loader(false);
        setProfileData(
          (res.data || []).filter(
            (item) => item.role === "professional" && item._id !== user?._id
          )
        );
      },
      (err) => {
        props.loader(false);
        toast.error(err?.data?.message || err?.message || "An error occurred");
      }
    );
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getProfileOnSearch();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedLocation]);

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, skills"
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
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none text-black text-sm"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option>Select location</option>
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
            {profilesData.length === 1 && searchQuery && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 ">
                  {profilesData.length} Professional Found
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

            {profilesData.length === 0 && (
              <div className="text-center py-12 mt-20">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Professional found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindProfessional;
