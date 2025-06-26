import React from "react";
import {
  MapPin,
  Calendar,
  ExternalLink,
  Building2,
  Search,
  Filter,
  Users,
  Briefcase,
  ArrowLeft,
} from "lucide-react";

import ProfessionalCard from "../components/ProfessionalCard";

const FindProfessional = () => {
  const companies = [
    {
      initial: "TI",
      name: "TechInnovate Solutions",
      category: "AI & Machine Learning",
      location: "San Francisco, CA",
      color: "#3B82F6",
      colorSecondary: "#1D4ED8",
      description:
        "Leading AI solutions provider specializing in computer vision and natural language processing for enterprise clients. We build cutting-edge ML models that transform business operations.",
      size: "50-100",
      founded: "2019",
      growth: "+45%",
      rating: "4.8/5",
      featured: true,
      technologies: ["Python", "TensorFlow", "AWS", "Docker", "React"],
      projects: [
        "AI-powered customer service chatbot for Fortune 500 company",
        "Computer vision system for automated quality control in manufacturing",
      ],
    },
    {
      initial: "CL",
      name: "CloudLogic Systems",
      category: "Cloud Infrastructure",
      location: "Austin, TX",
      color: "#10B981",
      colorSecondary: "#059669",
      description:
        "Expert cloud architecture and DevOps consultancy helping businesses migrate to cloud-native solutions. We specialize in scalable, secure, and cost-effective cloud implementations.",
      size: "25-50",
      founded: "2020",
      growth: "+60%",
      rating: "4.9/5",
      featured: false,
      technologies: ["AWS", "Kubernetes", "Terraform", "Go", "Node.js"],
      projects: [
        "Multi-cloud migration for healthcare provider with 99.9% uptime",
        "Microservices architecture redesign reducing costs by 40%",
      ],
    },
    {
      initial: "DW",
      name: "DataWise Analytics",
      category: "Data Science",
      location: "New York, NY",
      color: "#8B5CF6",
      colorSecondary: "#7C3AED",
      description:
        "Full-stack data science consultancy providing end-to-end analytics solutions. From data pipeline design to advanced predictive modeling and business intelligence dashboards.",
      size: "30-75",
      founded: "2018",
      growth: "+35%",
      rating: "4.7/5",
      featured: true,
      technologies: ["Python", "R", "Tableau", "Spark", "PostgreSQL"],
      projects: [
        "Predictive analytics platform for retail chain optimization",
        "Real-time fraud detection system for fintech startup",
      ],
    },
    {
      initial: "MS",
      name: "MobileSpark Studio",
      category: "Mobile Development",
      location: "Seattle, WA",
      color: "#F59E0B",
      colorSecondary: "#D97706",
      description:
        "Premium mobile app development studio creating award-winning iOS and Android applications. We focus on user experience design and performance optimization for consumer and enterprise apps.",
      size: "15-40",
      founded: "2021",
      growth: "+80%",
      rating: "4.6/5",
      featured: false,
      technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Flutter"],
      projects: [
        "Social fitness app with 100K+ downloads and 4.8 App Store rating",
        "Enterprise field service app improving technician efficiency by 30%",
      ],
    },
  ];

  // Custom data array
  const profilesData = [
    {
      initials: "SK",
      avatarColor: "#3B82F6",
      name: "Samuel Kiprotich",
      title: "Senior Software Engineer",
      location: "Nairobi, Kenya",
      skills: ["React", "Node.js", "Python", "MongoDB", "AWS"],
      currentRole: "Senior Software Engineer at TechFlow Kenya",
    },
    {
      initials: "AM",
      avatarColor: "#10B981",
      name: "Asha Mwangi",
      title: "Full Stack Developer",
      location: "Lagos, Nigeria",
      skills: ["Vue.js", "Laravel", "PostgreSQL", "Docker"],
      currentRole: "Full Stack Developer at InnovateTech Solutions",
    },
    {
      initials: "RK",
      avatarColor: "#8B5CF6",
      name: "Rajesh Kumar",
      title: "DevOps Engineer",
      location: "Mumbai, India",
      skills: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Python"],
      currentRole: "DevOps Engineer at CloudScale Technologies",
    },
    {
      initials: "LS",
      avatarColor: "#F59E0B",
      name: "Lisa Smith",
      title: "Product Manager",
      location: "San Francisco, USA",
      skills: ["Product Strategy", "Agile", "Analytics", "UX Research"],
      currentRole: "Senior Product Manager at StartupFlow Inc",
    },
    {
      initials: "MO",
      avatarColor: "#EF4444",
      name: "Mohammed Omar",
      title: "Mobile App Developer",
      location: "Dubai, UAE",
      skills: ["Flutter", "React Native", "iOS", "Android", "Firebase"],
      currentRole: "Mobile Developer at DigitalCraft Solutions",
    },
    {
      initials: "JD",
      avatarColor: "#06B6D4",
      name: "Jane Doe",
      title: "Data Scientist",
      location: "Toronto, Canada",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "R"],
      currentRole: "Data Scientist at AI Innovations Lab",
    },
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">
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
                <Filter className="w-5 h-5 text-green-400" />
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
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 ">
                4 Professional Found
              </h2>
              <p className="text-gray-600">
                Discover talented Professional ready to Connect
              </p>
            </div>

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
