import { Users, Building2, Search, MapPin, User, Eye } from "lucide-react";
import { useRouter } from "next/router";

export default function EastAfricaNetwork() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header Stats Section */}

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Professional Networks
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Connect with professionals and companies across East Africa. Build
            your network, find opportunities, and grow your career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Find Professionals Card */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Find Professionals
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with talented professionals across various industries.
                Find experts, mentors, and potential collaborators.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-3" />
                <span>Browse by expertise</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3" />
                <span>Filter by location</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Eye className="w-4 h-4 mr-3" />
                <span>View professional profiles</span>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
              onClick={() => router.push("/FindProfessional")}
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Professionals
            </button>
          </div>

          {/* Find Companies Card */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Find Companies
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover companies and organizations making an impact. Explore
                opportunities and learn about industry leaders.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 mr-3" />
                <span>Browse by industry</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3" />
                <span>Filter by location</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Eye className="w-4 h-4 mr-3" />
                <span>View company profiles</span>
              </div>
            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
              onClick={() => router.push("/FindCompany")}
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Companies
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-12 mt-10">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Growing Network Across East Africa
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of professionals and companies building the future
            together
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">10+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
