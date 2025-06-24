import { ArrowLeft, User, Edit, Download, Plus } from 'lucide-react';

export default function ProfileCompletion() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Browse
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Setup Banner */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex md:flex-row flex-col items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
              <p className="text-gray-600">Set up your professional profile to start connecting with others and showcase your expertise.</p>
            </div>
            <button className="flex mt-4 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Set Up Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User  className="w-6 h-6 text-blue-500 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50">
                      <Edit className="w-6 h-6 mr-2" />
                      Edit Profile
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50">
                      <Download className="w-5 h-5 mr-2" />
                      PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <User  className="w-10 h-10 text-blue-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Professional Profile</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Add your information to start building your network and showcase your expertise.
                </p>
                
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Profile Strength</span>
                  <span className="text-sm font-bold text-gray-900">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <p className="text-sm text-blue-600">Complete your profile to increase visibility</p>
            </div>

            {/* Additional Tips */}
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-blue-900 mb-3">Profile Tips</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Add a professional photo</li>
                <li>• Write a compelling headline</li>
                <li>• Include your work experience</li>
                <li>• List your key skills</li>
                <li>• Add education details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
