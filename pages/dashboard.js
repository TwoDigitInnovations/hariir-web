import React, { useState, useEffect, useContext } from "react";
import { Search, Filter, Users, Building, ArrowLeft, X  } from "lucide-react";
import ProfileCard from "@/components/ProfessionalCard";
import CompanyCard from "@/components/CompanyCard";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Api } from "@/services/service";
import { userContext } from "./_app";


const ProfessionalDirectory = (props) => {
  const [activeTab, setActiveTab] = useState("professionals");
  const [Professional, setProfessional] = useState([]);
  const [companies, setCompaniesData] = useState([]);
  const router = useRouter();
  const [user, setuser] = useContext(userContext);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      getAllData();
    }
  }, [token]);

  const professionalsCount = Professional.length;
  const companiesCount = companies.length;

  const getAllData = () => {
    props.loader(true);

    Api("get", "auth/getAllProfileBaseOnRole", null, router).then(
      (res) => {
        props.loader(false);
        const allData = res.data || [];
        setCompaniesData(
          allData.filter(
            (item) => item.role === "company" && item._id !== user?._id
          )
        );

        setProfessional(
          allData.filter(
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
    if (!searchQuery) {
      getAllData();
      return;
    }

    props.loader(true);
    Api(
      "post",
      `auth/getAllSearchResult?searchTerm=${searchQuery}`,
      null,
      router
    ).then(
      (res) => {
        props.loader(false);
        const allData = res.data || [];
        setCompaniesData(allData.filter((item) => item.role === "company"));
        setProfessional(allData.filter((item) => item.role === "professional"));
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
    }, 400); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-6 md:mt-0">
      <div className="max-w-7xl mx-auto md:px-4 px-2">
        <div
          className="flex items-center md:mb-8 mb-0"
        >
          <button className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
        <div className="mb-8 md:mt-3 mt-6">
          <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-2">
            Find Professionals & Companies
          </h1>
          <p className="text-gray-600 md:text-lg text-sm">
            Discover talented professionals and innovative companies across East
            Africa
          </p>
        </div>

        <div className="mb-6">
          <div className="flex md:flex-row flex-col gap-4">

            <div className="flex-1 relative">
              {/* Search Icon */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              {/* Input */}
              <input
                type="text"
                placeholder="Search by name, skills, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black focus:border-transparent outline-none"
              />

              {/* Clear Icon (X) */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>


            <button className="flex items-center gap-2 text-black px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("professionals")}
              className={`flex items-center gap-2 md:px-4 py-3 border-b-2 font-medium transition-colors ${activeTab === "professionals"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              <Users className="w-5 h-5" />
              Professionals
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {professionalsCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("companies")}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${activeTab === "companies"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              <Building className="w-5 h-5" />
              Companies
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {companiesCount}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeTab === "professionals" &&
            Professional.map((profile, index) => (
              <ProfileCard key={index} profile={profile} />
            ))}

          {activeTab === "companies" &&
            companies.map((company, index) => (
              <CompanyCard key={index} company={company} />
            ))}
        </div>

        {((activeTab === "professionals" && Professional.length === 0) ||
          (activeTab === "companies" && companies.length === 0)) && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {activeTab === "professionals" ? (
                  <Users className="w-16 h-16 mx-auto" />
                ) : (
                  <Building className="w-16 h-16 mx-auto" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab} found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or check back later.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProfessionalDirectory;
