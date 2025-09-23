import React, { useRef } from "react";
import { Download } from "lucide-react";

const CompanyProfileGenerator = ({ profile }) => {
  const profileRef = useRef(null);
  
  const downloadProfile = async () => {
    const input = profileRef.current;
    if (!input) return;

    await new Promise((res) => setTimeout(res, 500));

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      height: input.scrollHeight,
      width: input.scrollWidth,
      scrollX: 0,
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Margins in mm
    const topMargin = 10;
    const bottomMargin = 10;
    const usableHeight = pdfHeight - topMargin - bottomMargin;
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = topMargin;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= usableHeight;

    // Additional pages
    while (heightLeft > 0) {
      position = -(imgHeight - heightLeft) + topMargin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= usableHeight;
    }

    pdf.save(`${companyData?.companyName?.replace(/\s+/g, "_")}_Profile.pdf`);
  };

  const companyData = profile;

  return (
    <div className="">
      <div className="">
        <div className="text-center">
          <button
            onClick={downloadProfile}
            className="flex items-center gap-2 text-black px-6 py-3 rounded-lg transition-colors mx-auto hover:bg-gray-100"
          >
            <Download className="w-5 h-5" />
             PDF
          </button>
        </div>

        {/* Hidden PDF Content */}
        <div
          ref={profileRef}
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            width: "794px", // A4 width in pixels at 96 DPI
            background: "white",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "14px",
            lineHeight: "1.5",
            color: "#333",
            padding: "40px",
            boxSizing: "border-box"
          }}
        >
          {/* Company Header */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "50px",
            borderBottom: "4px solid #2563eb",
            paddingBottom: "30px",
            minHeight: "120px"
          }}>
            <div style={{ 
              flex: "1", 
              marginRight: "30px",
              maxWidth: "500px"
            }}>
              <h1 style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#1e40af",
                margin: "0 0 15px 0",
                textTransform: "uppercase",
                letterSpacing: "2px",
                lineHeight: "1.2",
                wordWrap: "break-word"
              }}>
                {companyData?.companyName || "Company Name"}
              </h1>
              <p style={{
                fontSize: "18px",
                color: "#64748b",
                margin: "0",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "500"
              }}>
                Company Profile
              </p>
            </div>
            <div style={{
              width: "150px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: "0"
            }}>
              {companyData?.companyLogo && (
                <img
                  src={companyData.companyLogo}
                  alt="Company Logo"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "100px",
                    objectFit: "contain"
                  }}
                />
              )}
            </div>
          </div>

          {/* About Section */}
          {companyData?.aboutUs && (
            <div style={{ 
              marginBottom: "40px",
              pageBreakInside: "avoid"
            }}>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "20px",
                textTransform: "uppercase",
                borderLeft: "6px solid #3b82f6",
                paddingLeft: "15px",
                lineHeight: "1.3"
              }}>
                About Our Company
              </h2>
              <div style={{
                fontSize: "15px",
                lineHeight: "1.7",
                color: "#374151",
                textAlign: "justify",
                padding: "0",
                margin: "0"
              }}>
                {companyData.aboutUs}
              </div>
            </div>
          )}

          {/* Company Information Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "40px",
            pageBreakInside: "avoid"
          }}>
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "20px",
                textTransform: "uppercase",
                lineHeight: "1.3"
              }}>
                Company Information
              </h3>
              <div style={{ 
                fontSize: "14px", 
                lineHeight: "1.8", 
                color: "#374151" 
              }}>
                {companyData.foundedYear && (
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#1e40af" }}>Founded:</strong> {companyData.foundedYear}
                  </div>
                )}
                {companyData.industry && (
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#1e40af" }}>Industry:</strong> {companyData.industry}
                  </div>
                )}
                {companyData.companySize && (
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#1e40af" }}>Company Size:</strong> {companyData.companySize} employees
                  </div>
                )}
                {companyData.location && (
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#1e40af" }}>Location:</strong> {companyData.location}
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "20px",
                textTransform: "uppercase",
                lineHeight: "1.3"
              }}>
                Contact Details
              </h3>
              <div style={{ 
                fontSize: "14px", 
                lineHeight: "1.8", 
                color: "#374151" 
              }}>
                {companyData.email && (
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#1e40af" }}>Email:</strong> {companyData.email}
                  </div>
                )}
                {companyData.phone && (
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#1e40af" }}>Phone:</strong> {companyData.phone}
                  </div>
                )}
                {companyData.website && (
                  <div style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#1e40af" }}>Website:</strong> {companyData.website}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Services Section */}
          {companyData?.services?.length > 0 && (
            <div style={{ 
              marginBottom: "50px",
              pageBreakInside: "avoid"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "25px",
                textTransform: "uppercase",
                borderLeft: "6px solid #3b82f6",
                paddingLeft: "15px",
                lineHeight: "1.3"
              }}>
                Our Services
              </h3>
              <div style={{ 
                display: "flex", 
                gap: "12px", 
                flexWrap: "wrap",
                alignItems: "flex-start"
              }}>
                {companyData.services.map((service, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#dbeafe",
                      color: "#1e40af",
                      padding: "10px 18px",
                      borderRadius: "25px",
                      fontSize: "13px",
                      fontWeight: "600",
                      display: "inline-block",
                      lineHeight: "1.2"
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mission Statement */}
          {companyData?.missionStatement && (
            <div style={{ 
              marginBottom: "50px",
              // pageBreakInside: "avoid"
            }}>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "25px",
                textTransform: "uppercase",
                borderLeft: "6px solid #3b82f6",
                paddingLeft: "15px",
                lineHeight: "1.3"
              }}>
                Our Mission
              </h2>
              <div style={{
                background: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderLeft: "8px solid #3b82f6",
                padding: "30px",
                borderRadius: "8px"
              }}>
                <p style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#374151",
                  margin: "0",
                  fontStyle: "italic",
                  textAlign: "justify"
                }}>
                  {companyData.missionStatement}
                </p>
              </div>
            </div>
          )}

          {/* Vision Statement */}
          {companyData?.visionStatement && (
            <div style={{ 
              marginBottom: "50px",
              pageBreakInside: "avoid"
            }}>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "25px",
                textTransform: "uppercase",
                borderLeft: "6px solid #3b82f6",
                paddingLeft: "15px",
                lineHeight: "1.3"
              }}>
                Our Vision
              </h2>
              <div style={{
                background: "#eff6ff",
                border: "2px solid #bfdbfe",
                borderLeft: "8px solid #2563eb",
                padding: "30px",
                borderRadius: "8px"
              }}>
                <p style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#374151",
                  margin: "0",
                  fontStyle: "italic",
                  textAlign: "justify"
                }}>
                  {companyData.visionStatement}
                </p>
              </div>
            </div>
          )}

          {/* Specializations */}
          {companyData?.specializations?.length > 0 && (
            <div style={{ marginBottom: "50px" }}>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "25px",
                textTransform: "uppercase",
                borderLeft: "6px solid #3b82f6",
                paddingLeft: "15px",
                lineHeight: "1.3"
              }}>
                Our Specializations
              </h2>
              <div style={{ display: "grid", gap: "25px" }}>
                {companyData.specializations.map((spec, index) => (
                  <div key={index} style={{
                    background: "#f8fafc",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "25px",
                    pageBreakInside: "avoid",
                    marginBottom: "15px"
                  }}>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#1e40af",
                      margin: "0 0 15px 0",
                      lineHeight: "1.3"
                    }}>
                      {spec.title}
                    </h3>
                    <p style={{
                      fontSize: "15px",
                      lineHeight: "1.6",
                      color: "#374151",
                      margin: "0",
                      textAlign: "justify"
                    }}>
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {companyData?.projects?.length > 0 && (
            <div style={{ marginBottom: "50px" }}>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "25px",
                textTransform: "uppercase",
                borderLeft: "6px solid #3b82f6",
                paddingLeft: "15px",
                lineHeight: "1.3"
              }}>
                Our Projects
              </h2>
              <div style={{ display: "grid", gap: "25px" }}>
                {companyData.projects.map((project, index) => (
                  <div key={index} style={{
                    background: "#f8fafc",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "25px",
                    pageBreakInside: "avoid",
                    marginBottom: "15px"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "15px"
                    }}>
                      <h3 style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        margin: "0",
                        lineHeight: "1.3",
                        flex: "1"
                      }}>
                        {project.title}
                      </h3>
                      {project.yearCompleted && (
                        <span style={{
                          fontSize: "14px",
                          color: "#64748b",
                          fontWeight: "500",
                          marginLeft: "20px"
                        }}>
                          {project.yearCompleted}
                        </span>
                      )}
                    </div>
                    {project.client && (
                      <p style={{
                        fontSize: "14px",
                        color: "#059669",
                        fontWeight: "600",
                        margin: "0 0 12px 0"
                      }}>
                        Client: {project.client}
                      </p>
                    )}
                    {project.description && (
                      <p style={{
                        fontSize: "15px",
                        lineHeight: "1.6",
                        color: "#374151",
                        margin: "0",
                        textAlign: "justify"
                      }}>
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {companyData?.teamMembers?.length > 0 && (
            <div style={{ marginBottom: "50px" }}>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "25px",
                textTransform: "uppercase",
                borderLeft: "6px solid #3b82f6",
                paddingLeft: "15px",
                lineHeight: "1.3"
              }}>
                Our Team
              </h2>
              <div style={{ display: "grid", gap: "20px" }}>
                {companyData.teamMembers.map((member, index) => (
                  <div key={index} style={{
                    borderLeft: "4px solid #3b82f6",
                    paddingLeft: "25px",
                    paddingBottom: "15px",
                    pageBreakInside: "avoid",
                    marginBottom: "10px"
                  }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#1e40af",
                      margin: "0 0 8px 0",
                      lineHeight: "1.3"
                    }}>
                      {member.fullName}
                    </h4>
                    <p style={{
                      fontSize: "14px",
                      color: "#059669",
                      fontWeight: "600",
                      margin: "0 0 10px 0"
                    }}>
                      {member.designation}
                    </p>
                    <p style={{
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: "#374151",
                      margin: "0",
                      textAlign: "justify"
                    }}>
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Footer */}
          <div style={{
            background: "#1e40af",
            color: "white",
            padding: "35px",
            borderRadius: "8px",
            textAlign: "center",
            marginTop: "50px",
            pageBreakInside: "avoid"
          }}>
            <h3 style={{
              fontSize: "20px",
              margin: "0 0 20px 0",
              textTransform: "uppercase",
              fontWeight: "bold"
            }}>
              {companyData.companyName}
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
              fontSize: "14px",
              marginBottom: "20px"
            }}>
              <div style={{ textAlign: "left" }}>
                {companyData.email && (
                  <div style={{ marginBottom: "10px", lineHeight: "1.5" }}>
                    <strong>Email:</strong> {companyData.email}
                  </div>
                )}
                {companyData.phone && (
                  <div style={{ lineHeight: "1.5" }}>
                    <strong>Phone:</strong> {companyData.phone}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                {companyData.website && (
                  <div style={{ marginBottom: "10px", lineHeight: "1.5" }}>
                    <strong>Website:</strong> {companyData.website}
                  </div>
                )}
                {companyData.location && (
                  <div style={{ lineHeight: "1.5" }}>
                    <strong>Location:</strong> {companyData.location}
                  </div>
                )}
              </div>
            </div>
            <p style={{
              fontSize: "15px",
              margin: "0",
              opacity: "0.9",
              fontStyle: "italic"
            }}>
              Thank you for your interest in our company
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileGenerator;