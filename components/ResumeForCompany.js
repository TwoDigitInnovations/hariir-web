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
      scale: 1.5,
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

    const topMargin = 10; // Top margin for subsequent pages
    const bottomMargin = 10; // Bottom margin for first page

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position + topMargin,
        imgWidth,
        imgHeight
      );
      heightLeft -= pdfHeight;
    }

    pdf.save(`${companyData?.companyName?.replace(/\s+/g, "_")}.pdf`);

  };
  const companyData = profile

  return (
    <div className="">
      <div className="">
        <div className=" text-center">

          <button
            onClick={downloadProfile}
            className="flex items-center gap-2  text-black px-6 py-3 rounded-lg  transition-colors mx-auto"
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
            width: "800px",
            background: "white",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Page 1: Introduction & Company Profile */}
          <div style={{
            width: "800px",
            height: "1120px",
            background: "white",
            padding: "40px 40px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            pageBreakAfter: "always"
          }}>

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "50px",
              borderBottom: "3px solid #2563eb",
              paddingBottom: "30px",
              flexWrap: "wrap" // allows wrapping on small screens
            }}>
              {/* Left: Company Name */}
              <div style={{
                flex: "0 0 70%", // 70% width
                minWidth: "200px" // optional: prevent it from being too small
              }}>
                <h1 style={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  color: "#1e40af",
                  margin: "0 0 15px 0",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  wordBreak: "break-word" // wrap long company names
                }}>
                  {companyData?.companyName}
                </h1>
                <p style={{
                  fontSize: "1.2rem",
                  color: "#64748b",
                  margin: "0",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  Company Profile
                </p>
              </div>

              {/* Right: Company Logo */}
              <div style={{
                flex: "0 0 30%", // 30% width
                textAlign: "right",
                minWidth: "100px", // optional: prevent too small
                marginTop: "10px"
              }}>
                <img
                  src={companyData?.companyLogo || "https://via.placeholder.com/150"}
                  alt="Company Logo"
                  style={{
                    width: "100%",  // adjust size as needed
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "20px",
                textTransform: "uppercase",
                borderLeft: "5px solid #3b82f6",
                paddingLeft: "15px"
              }}>
                About Our Company
              </h2>
              <p style={{
                fontSize: "1rem",
                lineHeight: "1.8",
                color: "#374151",
                margin: "0",
                textAlign: "justify"
              }}>
                {companyData?.aboutUs?.slice(0, 450) + "..."}
              </p>
            </div>


            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "40px"
            }}>
              <div>
                <h3 style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e40af",
                  marginBottom: "15px",
                  textTransform: "uppercase"
                }}>
                  Company Information
                </h3>
                <div style={{ fontSize: "0.95rem", lineHeight: "2", color: "#374151" }}>
                  <div><strong>Founded:</strong> {companyData.foundedYear}</div>
                  <div><strong>Industry:</strong> {companyData.industrySector}</div>
                  <div><strong>Company Size:</strong> {companyData.companySize} employees</div>
                  <div><strong>Location:</strong> {companyData.location}</div>
                </div>
              </div>
              <div>
                <h3 style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e40af",
                  marginBottom: "15px",
                  textTransform: "uppercase"
                }}>
                  Contact Details
                </h3>
                <div style={{ fontSize: "0.95rem", lineHeight: "2", color: "#374151" }}>
                  <div><strong>Email:</strong> {companyData.email}</div>
                  <div><strong>Phone:</strong> {companyData.phone}</div>
                  <div><strong>Website:</strong> {companyData.website}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "20px",
                textTransform: "uppercase",
                borderLeft: "5px solid #3b82f6",
                paddingLeft: "15px"
              }}>
                Our Services
              </h3>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {companyData?.services?.slice(0, 13).map((service, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "flex",         // make it flex
                      alignItems: "center",    // vertical center
                      justifyContent: "center", // horizontal center (optional)
                      background: "#dbeafe",
                      color: "#1e40af",
                      padding: "10px 20px",
                      borderRadius: "25px",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  >
                    {service}
                  </span>

                ))}
              </div>

            </div>
          </div>





          {/* Page 2: Mission & Vision */}
          <div style={{
            width: "800px",
            height: "1120px",
            background: "white",
            padding: "40px 40px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            pageBreakAfter: "always"
          }}>
            {/* Header */}
            <div style={{
              textAlign: "center",
              marginBottom: "60px",
              borderBottom: "3px solid #2563eb",
              paddingBottom: "30px"
            }}>
              <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#1e40af",
                margin: "0",
                textTransform: "uppercase",
                letterSpacing: "2px"
              }}>
                Our Vision & Mission
              </h1>
            </div>

            {/* Mission Statement */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{
                background: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderLeft: "8px solid #3b82f6",
                padding: "20px",
                borderRadius: "8px"
              }}>
                <h2 style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#1e40af",
                  marginBottom: "15px",
                  textAlign: "center",
                  textTransform: "uppercase"
                }}>
                  Our Mission
                </h2>
                <p style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#374151",
                  margin: "0",
                  textAlign: "center",
                  fontStyle: "italic"
                }}>
                  {companyData?.missionStatement?.slice(0, 750) + "..."}
                </p>
              </div>
            </div>

            {/* Vision Statement */}
            <div style={{ marginBottom: "30px" }}>
              <div style={{
                background: "#eff6ff",
                border: "2px solid #bfdbfe",
                borderLeft: "8px solid #2563eb",
                padding: "20px",
                borderRadius: "8px"
              }}>
                <h2 style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#1e40af",
                  marginBottom: "15px",
                  textAlign: "center",
                  textTransform: "uppercase"
                }}>
                  Our Vision
                </h2>
                <p style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#374151",
                  margin: "0",
                  textAlign: "center",
                  fontStyle: "italic"
                }}>
                  {companyData?.visionStatement?.slice(0, 750) + "..."}
                </p>
              </div>
            </div>

          </div>
          <div style={{
            width: "800px",
            height: "1120px",
            background: "white",
            padding: "40px 40px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column"
          }}>

            <div style={{ marginBottom: "30px" }}>
              <h2 style={{
                fontSize: "1.9rem",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "15px",
                textTransform: "uppercase",
                borderLeft: "5px solid #3b82f6",
                paddingLeft: "15px"
              }}>
                Our Specializations
              </h2>
              <div style={{
                display: "grid",
                gap: "15px"
              }}>
                {companyData?.specializations?.slice(0, 2).map((spec, index) => (
                  <div key={spec._id} style={{
                    background: "#f8fafc",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "20px"
                  }}>
                    <h3 style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#1e40af",
                      margin: "0 0 10px 0"
                    }}>
                      {spec.title}
                    </h3>
                    <p style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.6",
                      color: "#374151",
                      margin: "0"
                    }}>
                      {spec.description.slice(0, 350) + "..."}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Project */}
            <div style={{ marginBottom: "30px" }}>
              <h2 style={{
                fontSize: "1.9rem",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "15px",
                textTransform: "uppercase",
                borderLeft: "5px solid #3b82f6",
                paddingLeft: "15px"
              }}>
                Featured Project
              </h2>

              <div style={{
                display: "grid",
                gap: "15px"
              }}>
                {companyData?.projects?.slice(0, 2).map((project) => (
                  <div key={project._id} style={{
                    background: "#f8fafc",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "20px"
                  }}>
                    <h3 style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#1e40af",
                      margin: "0 0 10px 0"
                    }}>
                      {project.title}
                    </h3>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                      marginBottom: "10px",
                      fontSize: "0.9rem",
                      color: "#374151"
                    }}>
                      <div>
                        <strong style={{ color: "#1e40af" }}>Client:</strong> {project.client}
                      </div>
                      <div>
                        <strong style={{ color: "#1e40af" }}>Year:</strong> {project.yearCompleted}
                      </div>
                    </div>
                    <p style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.6",
                      color: "#374151",
                      margin: "0"
                    }}>
                      {project.description.slice(0, 350) + "..."}

                    </p>
                  </div>
                ))}
              </div>
            </div>


          </div>
          {/* Page 3:  */}
          <div style={{
            width: "800px",
            height: "1120px",
            background: "white",
            padding: "40px 40px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Header */}
            <div style={{
              textAlign: "center",
              marginBottom: "50px",
              borderBottom: "3px solid #2563eb",
              paddingBottom: "30px"
            }}>
              <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#1e40af",
                margin: "0",
                textTransform: "uppercase",
                letterSpacing: "2px"
              }}>
                Connect With Us
              </h1>
            </div>

            {/* Company Description */}
            <div style={{ marginBottom: "50px" }}>
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "20px",
                textTransform: "uppercase",
                borderLeft: "5px solid #3b82f6",
                paddingLeft: "15px"
              }}>
                Company Overview
              </h2>
              <p style={{
                fontSize: "1rem",
                lineHeight: "1.8",
                color: "#374151",
                margin: "0",
                textAlign: "justify"
              }}>
                {companyData?.companyDescription?.slice(0, 850) + "..."}
              </p>
            </div>


            <div style={{ marginBottom: "50px" }}>
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1e40af",
                marginBottom: "30px",
                textTransform: "uppercase",
                textAlign: "center"
              }}>
                Get In Touch
              </h2>
              <div style={{
                background: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center"
              }}>
                <div style={{ marginBottom: "20px" }}>
                  <h3 style={{
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    color: "#1e40af",
                    margin: "0 0 10px 0"
                  }}>
                    {companyData.companyName}
                  </h3>
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "30px",
                  fontSize: "1rem",
                  color: "#374151"
                }}>
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <strong style={{ color: "#1e40af" }}>Email:</strong>
                      <br />{companyData.email}
                    </div>
                    <div>
                      <strong style={{ color: "#1e40af" }}>Phone:</strong>
                      <br />{companyData.phone}
                    </div>
                  </div>
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <strong style={{ color: "#1e40af" }}>Website:</strong>
                      <br />{companyData.website}
                    </div>
                    <div>
                      <strong style={{ color: "#1e40af" }}>Location:</strong>
                      <br />{companyData.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              background: "#1e40af",
              color: "white",
              padding: "30px",
              borderRadius: "8px",
              textAlign: "center",
              marginTop: "auto"
            }}>
              <h3 style={{
                fontSize: "1.2rem",
                margin: "0 0 10px 0",
                textTransform: "uppercase"
              }}>
                Thank You
              </h3>
              <p style={{
                fontSize: "1rem",
                margin: "0",
                opacity: "0.9"
              }}>
                We look forward to working with you
              </p>
            </div>

          </div>
          {/* Page 4:  */}

        </div>



      </div>
    </div>
  );
};

export default CompanyProfileGenerator;