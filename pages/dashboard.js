import React, { useState } from 'react';
import { Search, Filter, Users, Building } from 'lucide-react';

// Mock data for professionals
const mockProfilesData = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Software Engineer",
    company: "Tech Solutions Ltd",
    location: "Nairobi, Kenya",
    skills: ["React", "Node.js", "Python"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Product Manager",
    company: "Innovation Hub",
    location: "Kampala, Uganda",
    skills: ["Product Strategy", "Agile", "Data Analysis"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "UX Designer",
    company: "Creative Studio",
    location: "Dar es Salaam, Tanzania",
    skills: ["UI/UX", "Figma", "User Research"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
];


const mockCompanies = [
  {
    id: 1,
    name: "Tech Solutions Ltd",
    industry: "Technology",
    location: "Nairobi, Kenya",
    employees: "50-100",
    description: "Leading software development company in East Africa",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Innovation Hub",
    industry: "Consulting",
    location: "Kampala, Uganda",
    employees: "20-50",
    description: "Strategic consulting and innovation services",
    logo: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Creative Studio",
    industry: "Design",
    location: "Dar es Salaam, Tanzania",
    employees: "10-20",
    description: "Creative design and branding solutions",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150&h=150&fit=crop"
  }
];

// Professional Card Component
const ProfessionalCard = ({ profile }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
        <p className="text-gray-600">{profile.title}</p>
        <p className="text-sm text-gray-500">{profile.company}</p>
      </div>
    </div>
    <div className="mb-3">
      <p className="text-sm text-gray-600 mb-2">📍 {profile.location}</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {profile.skills.map((skill, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// Company Card Component
const CompanyCard = ({ company }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4">
      <img
        src={company.logo}
        alt={company.name}
        className="w-16 h-16 rounded-lg object-cover mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
        <p className="text-gray-600">{company.industry}</p>
        <p className="text-sm text-gray-500">{company.employees} employees</p>
      </div>
    </div>
    <div className="mb-3">
      <p className="text-sm text-gray-600 mb-2">📍 {company.location}</p>
      <p className="text-sm text-gray-700">{company.description}</p>
    </div>
  </div>
);

// Main Professional Directory Component
const ProfessionalDirectory = () => {
  const [activeTab, setActiveTab] = useState('professionals');
  const [searchQuery, setSearchQuery] = useState('');

  const professionalsCount = mockProfilesData.length;
  const companiesCount = mockCompanies.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Professional Directory</h1>
          <p className="text-gray-600 text-lg">
            Discover talented professionals and innovative companies across East Africa
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skills, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black focus:border-transparent outline-none"
              />
            </div>
            <button className="flex items-center gap-2 text-black px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Toggle Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('professionals')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'professionals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              Professionals
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {professionalsCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'companies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
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

     
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {activeTab === 'professionals' &&
            mockProfilesData.map((profile, index) => (
              <ProfessionalCard key={index} profile={profile} />
            ))}
          
          {activeTab === 'companies' &&
            mockCompanies.map((company, index) => (
              <CompanyCard key={index} company={company} />
            ))}
        </div>

      
        {((activeTab === 'professionals' && mockProfilesData.length === 0) ||
          (activeTab === 'companies' && mockCompanies.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {activeTab === 'professionals' ? <Users className="w-16 h-16 mx-auto" /> : <Building className="w-16 h-16 mx-auto" />}
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