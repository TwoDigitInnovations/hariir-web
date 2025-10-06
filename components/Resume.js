import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";

const Resume = ({ profile }) => {
  const resumeRef = useRef(null);

  const downloadResume = async () => {
    const input = resumeRef.current;
    if (!input) return;

    await new Promise((res) => setTimeout(res, 500));

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const topMargin = 10;
    const bottomMargin = 13;
    const usableHeight = pdfHeight - topMargin - bottomMargin;

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let pageCanvasY = 0; // track y position on canvas

    while (heightLeft > 0) {
      const pageHeightInCanvas = (usableHeight * canvas.width) / imgWidth; // convert mm to canvas px
      const canvasPage = document.createElement("canvas");
      canvasPage.width = canvas.width;
      canvasPage.height = Math.min(
        pageHeightInCanvas,
        canvas.height - pageCanvasY
      );

      const ctx = canvasPage.getContext("2d");
      ctx.drawImage(
        canvas,
        0,
        pageCanvasY,
        canvas.width,
        canvasPage.height,
        0,
        0,
        canvas.width,
        canvasPage.height
      );

      const pageImgData = canvasPage.toDataURL("image/png");

      pdf.setFillColor("#1e3a8a");
      pdf.rect(0, 0, 559 * (pdfWidth / canvas.width), pdfHeight, "F");

      pdf.setFillColor("#f8f9fa");
      pdf.rect(559 * (pdfWidth / canvas.width), 0, pdfWidth, pdfHeight, "F");

      // ✅ अब resume content add करो
      pdf.addImage(
        pageImgData,
        "PNG",
        0,
        topMargin,
        imgWidth,
        (canvasPage.height * imgWidth) / canvas.width
      );

      heightLeft -= usableHeight;
      pageCanvasY += canvasPage.height;

      if (heightLeft > 0) pdf.addPage();
    }

    pdf.save(`Resume-${profile?.fullName?.replace(/\s+/g, "_")}.pdf`);
  };



  return (
    <div className="">
      <div className="relative inline-block text-center">
        <Image
          src="/resume1.png"
          alt="Resume Preview"
          width={320} // md:w-[320px]
          height={200} // approximate height, adjust as needed
          className="rounded-md shadow-md mx-auto mb-2"
        />
        <button
          className="flex items-center justify-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 mx-auto"
          onClick={downloadResume}
          type="button"
          aria-label="Download Resume"
        >
          <Download className="w-5 h-5 mr-2" />
          CV 1
        </button>
      </div>

      <div
        ref={resumeRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
          minHeight: "1120px",
          overflow: "hidden",// Changed to minHeight
          background: "white",
          color: "black",
          fontFamily: "Arial, sans-serif",
          display: "flex",
        }}
      >
        {/* Left Sidebar - Blue - Full Height */}
        <div
          style={{
            width: "280px",
            background: "#1e3a8a",
            color: "white",
            padding: "20px 30px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%", // Ensures full height coverage
          }}
        >
          {/* Contact Section */}
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
          {profile?.education && profile?.education?.length > 0 && (
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
              {profile?.education?.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
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
                  {edu.description && (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        lineHeight: "1.3",
                        marginTop: "3px",
                        opacity: "0.9",
                      }}
                    >
                      {edu.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}


          {profile?.skills && profile?.skills?.length > 0 && (
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


          {profile?.languages && profile?.languages?.length > 0 && (
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


          {/* Blue background extension to fill remaining space */}
          <div
            style={{
              background: "#1e3a8a",
              flex: 1,
              minHeight: "100px",
            }}
          />
        </div>

        {/* Right Content Area - Light Gray */}
        <div
          style={{
            flex: 1,
            background: "#f8f9fa",
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
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
              {profile?.fullName}
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
              {profile?.professionalTitle}
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
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: profile.bio }}
              />
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
                <div key={idx} style={{ marginBottom: "25px", pageBreakInside: "avoid" }}>
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
                          textTransform: "capitalize",
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
                  <div
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      margin: "8px 0 0 0",
                      color: "#374151",
                      whiteSpace: "pre-wrap",
                    }}
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  >
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {profile?.projects && profile.projects.length > 0 && (
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
                PROJECTS
              </h3>
              {profile.projects.map((project, idx) => (
                <div key={idx} style={{ marginBottom: "20px", pageBreakInside: "avoid" }}>
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

          {/* References Section */}
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
                <div key={idx} style={{ marginBottom: "15px", pageBreakInside: "avoid" }}>
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

          {profile?.certifications && profile?.certifications.length > 0 && (
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
                  margin: "0 0 20px 0",
                }}
              >
                Certifications
              </h3>

              {profile.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: "15px",
                    padding: "10px 12px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    backgroundColor: "#f9fafb",
                    pageBreakInside: "avoid",
                  }}
                >
                  <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#374151", }}>
                    <strong style={{ color: "#374151", fontSize: "0.95rem" }}>Name:</strong> {cert.certificateName}
                  </p>
                  <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#374151", }}>
                    <strong style={{ color: "#374151", fontSize: "0.95rem" }}>Issuer:</strong> {cert.issuerName}
                  </p>
                  <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#374151", }}>
                    <strong style={{ color: "#374151", fontSize: "0.95rem" }}>Issue Date:</strong> {cert.issueDate}
                  </p>
                  <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#374151", }}>
                    <strong style={{ color: "#374151", fontSize: "0.95rem" }}>Certificate No:</strong> {cert.certificateNumber}
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

export default Resume;