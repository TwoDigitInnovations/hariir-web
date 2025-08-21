import React, { useContext, useEffect, useState } from "react";
import { Plus, Trash2, X, Edit3, Award, Upload, FileText, Eye } from "lucide-react";
import { Api, ApiFormData } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import Swal from "sweetalert2";
import Compressor from "compressorjs";


function CertificationComponent({ loader, profileData, getProfile }) {
    const [certificationOpen, setCertificationOpen] = useState(false);
    const [certifications, setCertifications] = useState([]);
    const router = useRouter();
    const [user] = useContext(userContext);

    useEffect(() => {
        if (profileData?.certifications?.length > 0) {
            setCertifications(profileData.certifications);
        } else {
            setCertifications([
                {
                    certificateName: "",
                    issuerName: "",
                    issueDate: "",
                    certificateNumber: "",
                    attachmentUrl: "",
                    status: "Pending"
                },
            ]);
        }
    }, [profileData]);

    const handleVerifyRequestForCert = (certId) => {
        Swal.fire({
            text: "Are you sure? You are about to request verification for this certification? Once verified, it cannot be edited or changed.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, request it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    userId: user._id,
                    certificationId: certId,
                    status: "Requested",
                };

                loader(true);
                Api("post", "auth/CertificationVerification", data, router).then(
                    (res) => {
                        loader(false);
                        if (res.status) {
                            toast.success(res.message);
                            getProfile();
                        } else {
                            toast.error(res.message);
                        }
                    },
                    (err) => {
                        loader(false);
                        console.error("Error:", err);
                        toast.error(err?.message || "An error occurred");
                    }
                );
            }
        });
    };

    const handleFileUpload = (event, index) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log("Selected file:", file);

        const fileSizeInMb = file.size / (1024 * 1024);
        if (fileSizeInMb > 1) {
            toast.error("Too large file. Please upload a smaller file");
            return;
        }

        if (file.type.startsWith('image/')) {
            new Compressor(file, {
                quality: 0.6,
                success: (compressedResult) => {
                    console.log("Compressed result:", compressedResult);
                    uploadFile(compressedResult, index);
                },
            });
        } else {

            uploadFile(file, index);
        }
    };

    const uploadFile = (file, index) => {
        const data = new FormData();
        data.append("file", file);
        loader(true);
        ApiFormData("post", "auth/fileupload", data, router).then(
            (res) => {
                loader(false);
                console.log("File upload response:", res);
                if (res.status) {
                    const updated = [...certifications];
                    updated[index].attachmentUrl = res.data.file || res.data.fileUrl;
                    setCertifications(updated);
                    toast.success(res.data.message || "File uploaded successfully");
                } else {
                    toast.error(res.message || "File upload failed");
                }
            },
            (err) => {
                loader(false);
                console.error("File upload error:", err);
                toast.error(err?.data?.message || "File upload failed");
            }
        );
    };

    const handleChange = (index, field, value) => {
        const updated = [...certifications];
        updated[index][field] = value;
        setCertifications(updated);
    };

    const addCertification = () => {
        setCertifications([
            ...certifications,
            {
                certificateName: "",
                issuerName: "",
                issueDate: "",
                certificateNumber: "",
                attachmentUrl: "",
                status: "Pending"
            },
        ]);
    };

    const removeCertification = (index) => {
        const updated = certifications.filter((_, i) => i !== index);
        setCertifications(updated);
    };

    const submit = () => {

        for (let i = 0; i < certifications.length; i++) {
            const cert = certifications[i];
            if (!cert.certificateName || !cert.issuerName || !cert.issueDate) {
                toast.error(`Please fill all required fields for certification ${i + 1}`);
                return;
            }
        }

        loader(true);
        const data = {
            certifications: certifications,
            userId: user._id,
        };

        Api("post", "auth/updateProfile", data, router).then(
            (res) => {
                loader(false);
                if (res.status) {
                    toast.success("Certifications updated successfully");
                    setCertificationOpen(false);
                    getProfile();
                } else {
                    toast.error(res.message || "An error occurred");
                }
            },
            (err) => {
                loader(false);
                console.error("Error:", err);
                toast.error(err?.message || "An error occurred");
            }
        );
    };

    const viewCertificate = (url) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <>
            {/* Display Section */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                        <Award size={24} />
                        Certifications
                    </h2>
                    <div className="flex gap-2">
                        <Edit3
                            size={26}
                            className="text-gray-400 hover:bg-gray-200 cursor-pointer p-1 rounded"
                            onClick={() => {
                                setCertificationOpen(true);
                            }}
                        />
                    </div>
                </div>

                {profileData?.certifications?.length > 0 ? (
                    profileData.certifications.map((certification, key) => (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4" key={key}>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-[16px] font-semibold text-gray-800 flex items-center gap-2 mb-1">
                                            {certification.certificateName || "N/A"}
                                            {certification.status === "Approved" ? (
                                                <RiVerifiedBadgeLine className="text-green-600 text-2xl" />
                                            ) : certification.status === "Rejected" ? (
                                                <img src="/reject.png" className="w-6 h-6" alt="Rejected" />
                                            ) : null}
                                        </h3>
                                        <div className="flex items-center">
                                            <button
                                                className={`text-[14px] font-semibold ${certification.status === "Pending"
                                                    ? "text-yellow-500"
                                                    : certification.status === "Requested"
                                                        ? "text-black"
                                                        : ""
                                                    }`}
                                            >
                                                {certification.status === "Requested" && "Verification Requested"}
                                                {/* {certification.status === "Pending" && "Pending"} */}
                                            </button>

                                            {certification.status !== "Requested" &&
                                                certification.status !== "Approved" && (
                                                    <button
                                                        onClick={() => handleVerifyRequestForCert(certification._id)}
                                                        className="mt-1 px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm cursor-pointer block"
                                                    >
                                                        Verify
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-blue-600 text-[16px] font-medium">
                                            {certification.issuerName || "N/A"}
                                        </p>
                                        <div className="flex gap-2 items-center">
                                            {certification.attachmentUrl && (
                                                <button
                                                    onClick={() => viewCertificate(certification.attachmentUrl)}
                                                    className="text-blue-600 flex items-center gap-2 hover:text-blue-800 p-1"
                                                    title="View Certificate"
                                                >
                                                  Document <Eye size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-[14px]">
                                        Issue Date: {certification.issueDate || "N/A"}
                                    </p>
                                    {certification.certificateNumber && (
                                        <p className="text-gray-500 text-[14px]">
                                            Certificate No: {certification.certificateNumber}
                                        </p>
                                    )}
                                </div>


                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">
                        Add certification details to showcase your professional qualifications.
                    </p>
                )}
            </section>

            {/* Editor Modal */}
            {certificationOpen && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Certifications</h2>
                            <X onClick={() => setCertificationOpen(false)} className="text-gray-600 hover:text-gray-800 cursor-pointer" size={24} />
                        </div>

                        {/* Content Area with Scroll */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-lg font-medium text-gray-800">Certification History</p>
                                <button
                                    onClick={addCertification}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Plus size={18} /> Add Certification
                                </button>
                            </div>

                            {certifications.map((cert, index) => {
                                const isApproved = cert.status === "Approved";

                                return (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-6 mb-4 bg-white shadow-sm relative"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-medium text-gray-800">
                                                Certification {index + 1}
                                                {cert.status === "Approved" ? (
                                                    <RiVerifiedBadgeLine className="text-green-600 text-2xl inline ml-2" />
                                                ) : cert.status === "Rejected" ? (
                                                    <img src="/reject.png" className="w-6 h-6 inline ml-2" alt="Rejected" />
                                                ) : null}
                                            </h3>
                                            <div
                                                className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                onClick={() => removeCertification(index)}
                                            >
                                                <Trash2 size={16} className="text-gray-600" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Certificate Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.certificateName}
                                                    onChange={(e) => handleChange(index, "certificateName", e.target.value)}
                                                    disabled={isApproved}
                                                    placeholder="e.g. AWS Certified Solutions Architect"
                                                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Issuer Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.issuerName}
                                                    onChange={(e) => handleChange(index, "issuerName", e.target.value)}
                                                    disabled={isApproved}
                                                    placeholder="e.g. Amazon Web Services"
                                                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Issue Date <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    value={cert.issueDate}
                                                    onChange={(e) => handleChange(index, "issueDate", e.target.value)}
                                                    disabled={isApproved}
                                                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Certificate Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cert.certificateNumber}
                                                    onChange={(e) => handleChange(index, "certificateNumber", e.target.value)}
                                                    disabled={isApproved}
                                                    placeholder="e.g. FSWD-2025-789"
                                                    className="border border-gray-300 rounded-lg px-4 py-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-100"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Certificate Attachment
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                                    <Upload size={18} />
                                                    Upload Certificate
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept=".pdf,.jpg,.jpeg,.png"
                                                        onChange={(e) => handleFileUpload(e, index)}
                                                        disabled={isApproved}
                                                    />
                                                </label>
                                                {cert.attachmentUrl && (
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <FileText size={18} />
                                                        <span className="text-sm">Certificate uploaded</span>
                                                        <button
                                                            onClick={() => viewCertificate(cert.attachmentUrl)}
                                                            className="text-blue-600 hover:text-blue-800 underline text-sm"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Supported formats: PDF, JPG, PNG (Max size: 1MB)
                                            </p>
                                        </div>

                                        {isApproved && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                                                <p className="text-green-700 text-sm font-medium">
                                                    ✓ This certification has been verified and cannot be edited.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end items-center p-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setCertificationOpen(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={submit}
                                    className="px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                                >
                                    <span>💾</span> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CertificationComponent;