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

      pdf.setFillColor("#002966");
      pdf.rect(0, 0, 559 * (pdfWidth / canvas.width), pdfHeight, "F");

      pdf.setFillColor("#fff");
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
  
  const currentProfile = profile;

  return (
    <div className="">
      <div className="relative inline-block text-center">

        <Image
          src="/resume3.jpg"
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
            width: "280px",
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
              padding: "20px 32px 20px 20px",
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
            padding: "20px 20px",
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
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    >
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Education Section */}
          {currentProfile.education && currentProfile.education.length > 0 && (
            <div style={{ marginBottom: "25px" }} className="avoid-break">
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  margin: "0 0 15px 0",
                  pageBreakInside: "avoid"
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


          {currentProfile?.certifications && currentProfile?.certifications.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  paddingBottom: "8px",
                  margin: "0 0 20px 0",
                }}
              >
                Certifications
              </h3>

              {currentProfile?.certifications.map((cert, idx) => (
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
          {currentProfile?.referees && currentProfile.referees.length > 0 && (
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  margin: "0 0 20px 0",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #2c3e50",
                  paddingBottom: "5px",
                }}
              >
                REFERENCES
              </h3>
              {currentProfile.referees.map((ref, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "3px",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>
                      •
                    </span>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        margin: "0",
                        color: "#2c3e50",
                      }}
                    >
                      {ref.fullName}
                    </h4>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#7f8c8d",
                        margin: "0 0 5px 0",
                      }}
                    >
                      {ref.title} - {ref.organization}
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#7f8c8d",
                        margin: "0",
                      }}
                    >
                      {ref.email} | {ref.contact}
                    </p>
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