import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeForCompany = ({ profile }) => {
  const resumeRef = useRef(null);

  const downloadResume = async () => {
    const input = resumeRef.current;
    if (!input) return;

    await new Promise((res) => setTimeout(res, 500));

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Resume-${profile?.fullName?.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="">
      <div className="relative inline-block">
        <button
          className="flex items-start text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50"
          onClick={downloadResume}
          type="button"
          aria-label="Download Resume"
        >
          <Download className="w-5 h-5 mr-2" />
          PDF
        </button>
      </div>

      <div
        ref={resumeRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
          height: "1120px",
          background: "white",
          color: "black",
          fontFamily: "Arial, sans-serif",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "280px",
            background: "#1e3a8a",
            color: "white",
            padding: "40px 30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                borderBottom: "2px solid white",
                paddingBottom: "8px",
                marginBottom: "15px",
                margin: "0 0 20px 0",
              }}
            >
              CONTACT
            </h3>
            <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
              {profile?.phone && (
                <div style={{ marginBottom: "5px" }}>{profile.phone}</div>
              )}
              {profile?.email && (
                <div style={{ marginBottom: "5px" }}>{profile.email}</div>
              )}
              {profile?.location && (
                <div style={{ marginBottom: "5px" }}>{profile.location}</div>
              )}
            </div>
          </div>

          {/* Education Section */}
          {profile?.education && profile.education.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid white",
                  paddingBottom: "8px",
                  marginBottom: "20px",
                  margin: "0 0 20px 0",
                }}
              >
                EDUCATION
              </h3>
              {profile.education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: "15px" }}>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    {edu.year}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      marginBottom: "3px",
                    }}
                  >
                    {edu.institution}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {profile?.skills && profile.skills.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid white",
                  paddingBottom: "8px",
                  marginBottom: "20px",
                  margin: "0 0 20px 0",
                }}
              >
                SKILLS
              </h3>
              <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
                {profile.skills.map((skill, idx) => (
                  <div key={idx} style={{ marginBottom: "3px" }}>
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {profile?.languages && profile.languages.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid white",
                  paddingBottom: "8px",
                  marginBottom: "20px",
                  margin: "0 0 20px 0",
                }}
              >
                LANGUAGES
              </h3>
              <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
                {profile.languages.map((lang, idx) => (
                  <div key={idx} style={{ marginBottom: "5px" }}>
                    {lang.language} ({lang.level})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area - Light Gray */}
        <div
          style={{
            flex: 1,
            background: "#f8f9fa",
            padding: "40px 40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Section */}
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#374151",
                margin: "0 0 10px 0",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {profile?.fullName || "RISHABH TIWARI"}
            </h1>
            <h2
              style={{
                fontSize: "1.1rem",
                color: "#6b7280",
                margin: "0 0 20px 0",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {profile?.professionalTitle || "SOFTWARE ENGINEER"}
            </h2>
          </div>

          {/* Profile Section */}
          {profile?.bio && (
            <div style={{ marginBottom: "40px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #06b6d4",
                  paddingBottom: "8px",
                  marginBottom: "20px",
                  margin: "0 0 20px 0",
                }}
              >
                PROFILE
              </h3>
              <div
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  margin: "0",
                  color: "#374151",
                }}
                dangerouslySetInnerHTML={{ __html: profile.bio }}
              ></div>
            </div>
          )}

          {/* Work Experience Section */}
          {profile?.experience && profile.experience.length > 0 && (
            <div style={{ marginBottom: "40px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #06b6d4",
                  paddingBottom: "8px",
                  marginBottom: "20px",
                  margin: "0 0 20px 0",
                }}
              >
                WORK EXPERIENCE
              </h3>
              {profile.experience.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "25px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          margin: "0 0 3px 0",
                          color: "#374151",
                          textTransform: "lowercase",
                        }}
                      >
                        {exp.jobTitle}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#06b6d4",
                          margin: "0",
                          fontWeight: "500",
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#6b7280",
                        fontWeight: "500",
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      margin: "8px 0 0 0",
                      color: "#374151",
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {profile?.referees && profile.referees.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #06b6d4",
                  paddingBottom: "8px",
                  marginBottom: "20px",
                  margin: "0 0 20px 0",
                }}
              >
                REFERENCES
              </h3>
              {profile.referees.map((ref, idx) => (
                <div key={idx} style={{ marginBottom: "15px" }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      margin: "0 0 2px 0",
                      color: "#374151",
                    }}
                  >
                    {ref.fullName}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                      margin: "0 0 5px 0",
                    }}
                  >
                    {ref.title} - {ref.organization}
                  </p>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#374151",
                      margin: "0",
                    }}
                  >
                    {ref.email} | {ref.contact}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeForCompany;
