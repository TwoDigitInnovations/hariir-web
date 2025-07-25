import React, { useRef, useState } from "react";
import { Download } from "lucide-react";

const Resume = ({ profile }) => {
  const resumeRef = useRef(null);

 const downloadResume = async () => {
    const input = resumeRef.current;
    if (!input) return;

    await new Promise((res) => setTimeout(res, 500));

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(input, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      height: input.scrollHeight,
      width: input.scrollWidth,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pdfHeight;
    }

    pdf.save(`Resume-${profile?.fullName?.replace(/\s+/g, "_")}.pdf`);
  };

  const currentProfile = profile;

  return (
    <div className="">
      <div className="relative inline-block text-center">
        <img
          src="/resume3.jpg"
          alt="Resume Preview"
          className="md:w-[320px] w-44 h-auto mx-auto mb-2 rounded-md shadow-md"
        />

        <button
          className="flex items-center justify-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 mx-auto"
          onClick={downloadResume}
          type="button"
          aria-label="Download Resume"
        >
          <Download className="w-5 h-5 mr-2" />
          CV 2
        </button>
      </div>

      <div
        ref={resumeRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
          minHeight: "1130px", // Changed to minHeight to allow expansion
          background: "white",
          color: "black",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Left Sidebar - Blue - Full Height */}
        <div
          style={{
            width: "300px",
            background: "#002966",
            color: "white",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%", // Ensures full height coverage
            position: "relative",
          }}
        >
          {/* Curved Header Section */}
          <div
            style={{
              background: "#002966",
              padding: "40px 30px 60px 30px",
              position: "relative",
            }}
          >
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                margin: "0",
                color: "white",
              }}
            >
              {currentProfile.fullName}
            </h1>
            <h1
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                paddingTop: "10px",
                color: "white",
              }}
            >
              {currentProfile.professionalTitle}
            </h1>
          </div>

          <div style={{ padding: "20px 30px", flex: 1, background: "#002966" }}>
            {/* Personal Details */}
            <div style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  margin: "0 0 15px 0",
                  color: "#ffffff",
                }}
              >
                Personal details
              </h3>
              <div
                style={{
                  fontSize: "0.85rem",
                  lineHeight: "1.6",
                  color: "#ffffff",
                }}
              >
                {currentProfile.email && (
                  <div
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>✉</span>
                    {currentProfile.email}
                  </div>
                )}
                {currentProfile.phone && (
                  <div
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>📞</span>
                    {currentProfile.phone}
                  </div>
                )}
                {currentProfile.location && (
                  <div
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>🏠</span>
                    {currentProfile.location}
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {currentProfile.skills && (
              <div style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    margin: "0 0 15px 0",
                    color: "#ffffff",
                  }}
                >
                  Skills
                </h3>
                {currentProfile.skills.map((skill, idx) => (
                  <div key={idx} style={{ marginBottom: "12px" }}>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        marginBottom: "3px",
                        color: "#ffffff",
                      }}
                    >
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Languages Section */}
            {currentProfile?.languages &&
              currentProfile.languages.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      paddingBottom: "8px",
                      marginBottom: "15px",
                      margin: "0 0 15px 0",
                      color: "#ffffff",
                    }}
                  >
                    LANGUAGES
                  </h3>
                  <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
                    {currentProfile.languages.map((lang, idx) => (
                      <div key={idx} style={{ marginBottom: "5px", color: "#ffffff" }}>
                        {lang.language} ({lang.level})
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Blue background extension to fill remaining space */}
          <div
            style={{
              background: "#002966",
              flex: 1,
              minHeight: "100px",
            }}
          />
        </div>

        {/* Right Content Area - White */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: "40px 40px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
          {/* Summary Section */}
          {currentProfile.bio && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  margin: "0 0 15px 0",
                }}
              >
                Summary
              </h3>

              <div
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  margin: "0",
                  color: "#374151",
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: currentProfile.bio }}
              />
            </div>
          )}

          {/* Work Experience Section */}
          {currentProfile.experience &&
            currentProfile.experience.length > 0 && (
              <div style={{ marginBottom: "25px" }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#1e3a8a",
                    margin: "0 0 20px 0",
                  }}
                >
                  Work Experience
                </h3>
                {currentProfile.experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: "20px", pageBreakInside: "avoid" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "5px",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          margin: "0",
                          color: "#374151",
                        }}
                      >
                        {exp.jobTitle}
                      </h4>
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
                        fontSize: "0.9rem",
                        color: "#1e3a8a",
                        margin: "0 0 8px 0",
                        fontWeight: "500",
                      }}
                    >
                      {exp.company}
                    </p>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.5",
                        margin: "0",
                        color: "#374151",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Education Section */}
          {currentProfile.education && currentProfile.education.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  margin: "0 0 15px 0",
                }}
              >
                Education
              </h3>
              {currentProfile.education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          margin: "0 0 3px 0",
                          color: "#374151",
                        }}
                      >
                        {edu.degree}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#6b7280",
                          margin: "0",
                        }}
                      >
                        {edu.institution}
                      </p>
                      {edu.description && (
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#6b7280",
                            margin: "3px 0 0 0",
                          }}
                        >
                          {edu.description}
                        </p>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#6b7280",
                        fontWeight: "500",
                      }}
                    >
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Additional sections can be added here */}
          {currentProfile.certifications && currentProfile.certifications.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  margin: "0 0 15px 0",
                }}
              >
                Certifications
              </h3>
              {currentProfile.certifications.map((cert, idx) => (
                <div key={idx} style={{ marginBottom: "10px", pageBreakInside: "avoid" }}>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "#374151",
                      lineHeight: "1.5",
                    }}
                  >
                    {cert}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {currentProfile.projects && currentProfile.projects.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  margin: "0 0 15px 0",
                }}
              >
                Projects
              </h3>
              {currentProfile.projects.map((project, idx) => (
                <div key={idx} style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      margin: "0 0 5px 0",
                      color: "#374151",
                    }}
                  >
                    {project.title}
                  </h4>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      margin: "0",
                      color: "#374151",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {project.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;