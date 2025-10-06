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

      pdf.setFillColor("#2c3e50");
      pdf.rect(0, 0, 559 * (pdfWidth / canvas.width), pdfHeight, "F");

      pdf.setFillColor("#ecf0f1");
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

  const currentProfile = profile

  const contentHeight =
    140 +
    Math.max(
      // Left sidebar content
      300 +
      (currentProfile?.skills?.length || 0) * 25 +
      (currentProfile?.languages?.length || 0) * 30 +
      200,

      200 + // Summary
      (currentProfile?.education?.length || 0) * 80 + // Education
      (currentProfile?.experience?.length || 0) * 100 + // Experience
      (currentProfile?.referees?.length || 0) * 80 // References
    );

  const totalHeight = Math.max(contentHeight, 2240);

  return (
    <div className="">
      <div className="relative inline-block text-center">

        <Image
          src="/resume2.jpg"
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
          CV 3
        </button>
      </div>

      <div
        ref={resumeRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
          minHeight: "1130px",
          background: "white",
          color: "black",
          fontFamily: "Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            background: "#548DA5",
            height: "120px",
            width: "100%",
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            padding: "0 20px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left: Name & Title */}
          <div style={{ color: "white" }}>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                letterSpacing: "1.5px",
              }}
            >
              {currentProfile.fullName}
            </h1>
            <p
              style={{
                fontSize: "1.5rem",
                margin: "0",
                letterSpacing: "1px",
              }}
            >
              {currentProfile.professionalTitle}
            </p>
          </div>

          {/* Right: Circular Image */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "3px solid white",
              overflow: "hidden",
              backgroundImage: `url(${currentProfile.profileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginRight: "20px",
            }}
          />
        </div>

        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            minHeight: "100%",
            position: "relative",
          }}
        >
          {/* Left Sidebar - Fixed width, full height */}
          <div
            style={{
              width: "280px",
              background: "#2c3e50",
              color: "white",
              padding: "0",
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            <div style={{ padding: "20px", flex: 1 }}>
              {/* Personal Details */}
              <div style={{ marginBottom: "30px" }}>
                <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    <span style={{ marginRight: "10px", fontSize: "0.9rem" }}>
                      📞
                    </span>
                    {currentProfile.phone}
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    <span style={{ marginRight: "10px", fontSize: "0.9rem" }}>
                      ✉️
                    </span>
                    <span style={{ fontSize: "0.8rem" }}>
                      {currentProfile.email}
                    </span>
                  </div>

                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    <span style={{ marginRight: "10px", fontSize: "0.9rem" }}>
                      📍
                    </span>
                    {currentProfile.location}
                  </div>
                </div>
              </div>

              <hr style={{ border: "1px solid #34495e", margin: "20px 0" }} />

              {/* Skills Section */}
              {currentProfile?.skills && currentProfile.skills.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      paddingBottom: "8px",
                      marginBottom: "15px",
                      margin: "0 0 20px 0",
                    }}
                  >
                    SKILLS
                  </h3>
                  <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
                    {currentProfile.skills.map((skill, idx) => (
                      <div key={idx} style={{ marginBottom: "3px" }}>
                        • {skill}
                      </div>
                    ))}
                  </div>
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
                        margin: "0 0 2px 0",
                      }}
                    >
                      LANGUAGES
                    </h3>
                    <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
                      {currentProfile.languages.map((lang, idx) => (
                        <div key={idx} style={{ marginBottom: "5px" }}>
                          {lang.language} ({lang.level})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <hr style={{ border: "1px solid #34495e", margin: "20px 0" }} />
            </div>
          </div>

          {/* Right Content Area */}
          <div
            style={{
              flex: 1,
              background: "#ecf0f1",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
            }}
          >
            {/* Summary Section */}
            <div style={{ marginBottom: "25px" }}>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  margin: "0 0 15px 0",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "2px solid #2c3e50",
                  paddingBottom: "5px",
                }}
              >
                SUMMARY
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  margin: "0",
                  color: "#7f8c8d",
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{ __html: currentProfile.bio }}
              />
            </div>

            {/* Education Section */}
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
                EDUCATION
              </h3>
              {currentProfile?.education?.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "5px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "3px",
                        }}
                      >
                        <span
                          style={{ fontSize: "1.2rem", marginRight: "8px" }}
                        >
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
                          {edu.institution}
                        </h4>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "#7f8c8d",
                            margin: "0 0 3px 0",
                          }}
                        >
                          {edu.degree}
                        </p>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "#7f8c8d",
                            margin: "0",
                          }}
                        >
                          {edu.description}
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#7f8c8d",
                        fontWeight: "500",
                        marginLeft: "10px",
                      }}
                    >
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Work Experience Section */}
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
                WORK EXPERIENCE
              </h3>
              {currentProfile?.experience?.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "5px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "3px",
                        }}
                      >
                        <span
                          style={{ fontSize: "1.2rem", marginRight: "8px" }}
                        >
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
                          {exp.company}
                        </h4>
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "#7f8c8d",
                            margin: "0 0 8px 0",
                          }}
                        >
                          {exp.jobTitle}
                        </p>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            lineHeight: "1.5",
                            margin: "0",
                            color: "#7f8c8d",
                          }}
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        >
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#7f8c8d",
                        fontWeight: "500",
                        marginLeft: "10px",
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {currentProfile?.certifications && currentProfile?.certifications.length > 0 && (
              <div style={{ marginBottom: "25px" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "#374151",
                    textTransform: "uppercase",
                    borderBottom: "2px solid #2c3e50",
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
    </div>
  );
};

export default Resume;
