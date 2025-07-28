import React from "react";
import Head from "next/head";
export default function StevenTerryResume() {
  
  const resumeData = {
    personalDetails: {
      name: "STEVEN TERRY",
      title: "GRAPHIC DESIGNER",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      gender: "Male",
      birthDate: "May 19, 1992",
      phone: "986-2323-3434",
      email: "Steven@3223.com",
      website: "Http://steven-info.me",
      location: "London, England",
    },

    objective:
      "Take advantages of sales skills & experience and understanding of market to become a professional Sales Staff and bring a lot value to Customers. From that, I will contribute to development of TOPCV Company.",

    education: [
      {
        university: "TOPCV University",
        major: "Major: Corporate Administration",
        gpa: "- GPA: 3.4",
        duration: "Oct 2010 - May 2014",
      },
      {
        university: "TOPCV University",
        major: "Major: Corporate Administration",
        gpa: "- GPA: 3.4",
        duration: "Oct 2010 - May 2014",
      },
    ],

    workExperience: [
      {
        company: "TopCV JSC",
        position: "Digital Marketing",
        duration: "2016 - Present",
        responsibilities: [
          "Write and upload product advertising post via Facebook, Forum...",
          "Introduce, consult products and answer customers' queries via phone and email.",
        ],
      },
      {
        company: "TopCV Shop",
        position: "Sales man",
        duration: "2016 - Present",
        responsibilities: [
          "Sell goods for Foreigners and Vietnamese at the Shop",
          "Advertise products on media publications such as: banner, posters, leaflets...",
          "Make reports of sales every day.",
        ],
      },
    ],

    skills: {
      computer: "Word, Excel, Power Point.",
      languages: "English, Japanese, Chinese",
    },

    honorsAwards:
      "2013: TOPCV Scholarship in 2nd semester 2012-2013 and 1st semester 2013-2014.",

    certifications: "2018: TOEIC Certificate with score 800 issued by TOPCV",

    activities: [
      {
        title: "TOPCV - EDUCATION TALK 2014",
        role: "Member of US Ambassador",
        duration: "2013 - 2017",
        description: [
          "Organize monthly events, network with US alumni.",
          "Share how to hunt scholarships and US student's life experiences to all students who have received offers from US universities.",
        ],
      },
    ],

    interests: "I like soccer, music..",
  };

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left sidebar */}
          <div className="w-1/3 bg-slate-700 text-white">
            {/* Header with name and title */}
            <div className="bg-blue-600 p-6 relative">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {resumeData.personalDetails.name}
                </h1>
                <p className="text-blue-100 text-sm font-medium">
                  {resumeData.personalDetails.title}
                </p>
              </div>
              {/* Profile Image */}
              <div className="absolute top-4 right-4">
                <div className="w-20 h-20 rounded-full border-4 border-pink-300 overflow-hidden">
                  <img
                    src={resumeData.personalDetails.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Personal Details */}
              <div className="mb-8 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">👤</span>
                  <span className="text-sm">
                    {resumeData.personalDetails.gender}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📅</span>
                  <span className="text-sm">
                    {resumeData.personalDetails.birthDate}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📞</span>
                  <span className="text-sm">
                    {resumeData.personalDetails.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">✉</span>
                  <span className="text-sm">
                    {resumeData.personalDetails.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">🌐</span>
                  <span className="text-sm">
                    {resumeData.personalDetails.website}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-400">📍</span>
                  <span className="text-sm">
                    {resumeData.personalDetails.location}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-500 mb-6"></div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">SKILLS</h2>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    Computer
                  </h3>
                  <p className="text-sm text-gray-300 ml-4">
                    - {resumeData.skills.computer}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    Languages
                  </h3>
                  <p className="text-sm text-gray-300 ml-4">
                    - {resumeData.skills.languages}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-500 mb-6"></div>

              {/* Honors & Awards */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">HONORS & AWARDS</h2>
                <p className="text-sm text-gray-300">
                  {resumeData.honorsAwards}
                </p>
              </div>

              <div className="border-t border-gray-500 mb-6"></div>

              {/* Certifications */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">CERTIFICATIONS</h2>
                <p className="text-sm text-gray-300">
                  {resumeData.certifications}
                </p>
              </div>

              <div className="border-t border-gray-500 mb-6"></div>

              {/* Interests */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">INTERESTS</h2>
                <p className="text-sm text-gray-300">{resumeData.interests}</p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="w-2/3 p-8 bg-gray-100">
            {/* Objective */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">
                OBJECTIVE
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {resumeData.objective}
              </p>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-400 pb-2">
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 flex items-center">
                        <span className="w-3 h-3 bg-gray-800 rounded-full mr-3"></span>
                        {edu.university}
                      </h3>
                      <p className="text-gray-600 ml-6">{edu.major}</p>
                      <p className="text-gray-600 ml-6">{edu.gpa}</p>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      {edu.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-400 pb-2">
                WORK EXPERIENCE
              </h2>
              {resumeData.workExperience.map((job, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 flex items-center">
                        <span className="w-3 h-3 bg-gray-800 rounded-full mr-3"></span>
                        {job.company}
                      </h3>
                      <p className="text-gray-600 ml-6">{job.position}</p>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      {job.duration}
                    </span>
                  </div>
                  <div className="ml-6">
                    {job.responsibilities.map((resp, respIndex) => (
                      <p key={respIndex} className="text-gray-600 text-sm mb-1">
                        - {resp}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Activities */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-400 pb-2">
                ACTIVITIES
              </h2>
              {resumeData.activities.map((activity, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 flex items-center">
                        <span className="w-3 h-3 bg-gray-800 rounded-full mr-3"></span>
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 ml-6">{activity.role}</p>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      {activity.duration}
                    </span>
                  </div>
                  <div className="ml-6">
                    {activity.description.map((desc, descIndex) => (
                      <p key={descIndex} className="text-gray-600 text-sm mb-1">
                        - {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
