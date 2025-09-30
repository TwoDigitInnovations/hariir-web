import { ArrowLeft, User, Edit, Download, Plus, MapPin, Mail, Phone, Briefcase, GraduationCap, Languages, Users, Edit3 } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import { userContext } from "../_app";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { RiVerifiedBadgeLine } from "react-icons/ri";
export default function ProfessionalDetailsPage(props) {
    const router = useRouter();
    const [user] = useContext(userContext);
    const [profileData, setProfileData] = useState({});
    const [showFull, setShowFull] = useState(false);

    const profileId = useMemo(() => router.query.id, [router.query.id]);

    useEffect(() => {
        if (profileId) {
            getProfileById(profileId);
        }
    }, [profileId]);

    const getProfileById = async (id) => {
        try {
            props.loader?.(true);
            const res = await Api("get", `auth/getProfileById?role=professional&id=${id}`, "", router);

            setProfileData(res.data || {});
        } catch (err) {
            toast.error(err?.data?.message || err?.message || "Failed to load profile");
        } finally {
            props.loader?.(false);
        }
    };

    const pageTitle = useMemo(() =>
        profileData.fullName
            ? `${profileData.fullName} - ${profileData.professionalTitle || 'Professional'}`
            : 'Professional Profile'
        , [profileData.fullName, profileData.professionalTitle]);

    const pageDescription = useMemo(() =>
        profileData.bio
            ? profileData.bio.replace(/<[^>]*>/g, '').slice(0, 160)
            : `View ${profileData.fullName || 'professional'}'s profile, experience, skills and more.`
        , [profileData.bio, profileData.fullName]);


    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={`${profileData?.fullName}, ${profileData?.professionalTitle}, professional profile, ${profileData?.skills?.join(', ') || ''}`} />
                <meta property="og:title" content={pageTitle} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/professional/${profileId}`} />

            </Head>

            <div className="min-h-screen bg-gray-100">
                <header className="">
                    <div className="max-w-6xl mx-auto ">
                        <div
                            className="flex items-center h-16 md:mt-0 mt-4 ms-4"
                            onClick={() => window.history.back()}
                        >
                            <button
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                aria-label="Go back to browse page"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Browse
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-6xl mx-auto py-2">
                    <div className="w-full">
                        {/* Main Content */}
                        <article className="w-full">
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="max-w-6xl mx-auto bg-white shadow-lg overflow-hidden">
                                    {/* Profile Header */}
                                    <div className="bg-white text-white">
                                        <div className="w-full relative">
                                            {profileData.coverImage ? (
                                                <Image
                                                    src={profileData.coverImage}
                                                    alt={`${profileData.fullName}'s cover image`}
                                                    width={800}
                                                    height={176}
                                                    className="w-full md:h-44 h-40 object-cover"
                                                    priority
                                                />

                                            ) : (
                                                <div className="w-full h-40 bg-gradient-to-r from-gray-200 to-blue-50" />
                                            )}

                                            <div className="ms-6 md:-mt-20 -mt-12 flex md:justify-start justify-center">
                                                <div className="md:w-40 md:h-40 w-24 h-24 bg-blue-400 rounded-full border-4 border-white shadow-md overflow-hidden">
                                                    <Image
                                                        src={profileData?.isPublic && profileData?.profileImage ? profileData.profileImage : "/profile.png"}
                                                        alt={`${profileData.fullName}'s profile picture`}
                                                        width={160}
                                                        height={160}
                                                        className="w-full h-full object-cover"
                                                        priority
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="text-black md:px-8 p-2">
                                            <h1 className="md:text-[30px] text-2xl font-bold mb-2 text-center md:text-left">
                                                {profileData.fullName}
                                            </h1>
                                            <h2 className="md:text-[20px] text-lg text-gray-700 mb-1 text-center md:text-left">
                                                {profileData.professionalTitle}
                                            </h2>

                                            {profileData.location && (
                                                <div className="flex flex-wrap gap-4 text-gray-700 mb-2 justify-center md:justify-start">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin size={16} aria-hidden="true" />
                                                        <span>{profileData.location}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col md:flex-row justify-between text-center md:text-left gap-2 md:gap-0">
                                                {profileData.email && (
                                                    <div className="flex flex-row text-gray-500 items-center justify-center md:justify-start gap-2">
                                                        <Mail size={16} aria-hidden="true" />
                                                        <a href={`mailto:${profileData.email}`} className="hover:text-blue-600 transition-colors">
                                                            {profileData.email}
                                                        </a>
                                                    </div>
                                                )}
                                                {profileData.phone && (
                                                    <div className="flex flex-row text-gray-500 items-center justify-center md:justify-start gap-2">
                                                        <Phone size={16} aria-hidden="true" />
                                                        <a href={`tel:${profileData.phone}`} className="hover:text-blue-600 transition-colors">
                                                            {profileData.phone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:px-8 p-4">
                                        {/* About Section */}
                                        {profileData.bio && (
                                            <section className="mb-8">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                        <User size={24} aria-hidden="true" />
                                                        About
                                                    </h3>
                                                </div>
                                                <div
                                                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{
                                                        __html: profileData.bio,
                                                    }}
                                                />
                                            </section>
                                        )}

                                        {/* Skills Section */}
                                        <section className="mb-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-[18px] font-semibold text-gray-800">
                                                    Skills
                                                </h3>
                                            </div>
                                            {profileData?.skills?.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {profileData.skills.map((skill, index) => (
                                                        <span
                                                            key={`skill-${index}`}
                                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm">
                                                    No skills listed yet.
                                                </p>
                                            )}
                                        </section>

                                        {/* Experience Section */}
                                        <section className="mb-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                    <Briefcase size={24} aria-hidden="true" />
                                                    Experience
                                                </h3>
                                            </div>

                                            {profileData?.experience?.length > 0 ? (
                                                profileData.experience.map((experience, index) => {
                                                    const isLong = experience?.description?.length > 200;
                                                    const shortDesc = experience?.description?.slice(0, 200);

                                                    return (
                                                        <div
                                                            className="border-l-4 border-blue-500 md:pl-6 pl-4 ml-2 mb-6"
                                                            key={`experience-${index}`}
                                                        >
                                                            <h4 className="text-[16px] font-semibold text-gray-800 mb-1 flex items-center gap-2">
                                                                {experience.jobTitle}
                                                                {experience.ForAdminStatus === "Approved" ? (
                                                                    <RiVerifiedBadgeLine className="text-green-600 text-2xl" />
                                                                ) : experience.ForAdminStatus === "Rejected" ? (
                                                                    <Image
                                                                        width={24}
                                                                        height={24}
                                                                        src="/reject.png"
                                                                        alt="Rejected"
                                                                        className="w-6 h-6"
                                                                    />
                                                                ) : null}
                                                            </h4>

                                                            <p className="text-blue-600 text-[16px] font-medium">
                                                                {experience.company}
                                                            </p>
                                                            <p className="text-gray-500 text-[14px] mb-2">
                                                                {experience.location} - {experience.duration}
                                                            </p>
                                                            {experience.description && (
                                                                <div className="text-gray-600 text-[14px]">
                                                                    <div dangerouslySetInnerHTML={{
                                                                        __html: showFull || !isLong
                                                                            ? experience.description
                                                                            : shortDesc + "..."
                                                                    }} />
                                                                    {isLong && (
                                                                        <button
                                                                            className="text-blue-600 text-sm ml-1 hover:underline"
                                                                            onClick={() => setShowFull(!showFull)}
                                                                        >
                                                                            {showFull ? "Show less" : "Show more"}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-gray-500 text-sm">
                                                    No experience listed yet.
                                                </p>
                                            )}
                                        </section>

                                        {/* Education Section */}
                                        <section className="mb-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                    <GraduationCap size={24} aria-hidden="true" />
                                                    Education
                                                </h3>
                                            </div>
                                            {profileData?.education?.length > 0 ? (
                                                profileData.education.map((education, index) => (
                                                    <div
                                                        className="bg-gray-50 p-4 rounded-lg mb-4"
                                                        key={`education-${index}`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <h4 className="text-[16px] font-semibold text-gray-800 mb-1 flex items-center gap-2">
                                                                    {education?.degree
                                                                    }
                                                                    {education.status === "Approved" ? (
                                                                        <RiVerifiedBadgeLine className="text-green-600 text-2xl" />
                                                                    ) : education.status === "Rejected" ? (
                                                                        <Image
                                                                            width={24}
                                                                            height={24}
                                                                            src="/reject.png"
                                                                            alt="Rejected"
                                                                            className="w-6 h-6"
                                                                        />
                                                                    ) : null}
                                                                </h4>
                                                                <p className="text-blue-600 text-[16px] font-medium">
                                                                    {education.institution || "N/A"}
                                                                </p>
                                                                <p className="text-gray-500 text-[14px]">
                                                                    {education.year || "N/A"}
                                                                </p>
                                                                {education.description && (
                                                                    <p className="text-gray-600 text-[14px] mt-1">
                                                                        {education.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-sm">
                                                    No education details listed yet.
                                                </p>
                                            )}
                                        </section>

                                        {/* Languages Section */}
                                        {profileData?.languages?.length > 0 && (
                                            <section className="mb-8">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                        <Languages size={24} aria-hidden="true" />
                                                        Languages
                                                    </h3>
                                                </div>
                                                <div className="flex flex-wrap gap-4">
                                                    {profileData.languages.map((lang, index) => (
                                                        <span
                                                            key={`language-${index}`}
                                                            className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full md:text-sm text-[12px]"
                                                        >
                                                            {lang.language} ({lang.level})
                                                        </span>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {profileData?.certifications?.length > 0 && (
                                            <section className="mb-8">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                        <Users size={24} aria-hidden="true" />
                                                        Certifications
                                                    </h3>
                                                </div>

                                                <div className="grid gap-4">
                                                    {profileData?.certifications?.map((certification, index) => (
                                                        <div
                                                            key={`certification-${index}`}
                                                            className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
                                                        >
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="text-[16px] font-semibold text-gray-800 flex items-center gap-2">
                                                                    {certification?.certificateName || "N/A"}
                                                                    {certification.status === "Approved" ? (
                                                                        <RiVerifiedBadgeLine className="text-green-600 text-xl" />
                                                                    ) : certification.status === "Rejected" ? (
                                                                        <Image
                                                                            width={20}
                                                                            height={20}
                                                                            src="/reject.png"
                                                                            alt="Rejected"
                                                                            className="w-5 h-5"
                                                                        />
                                                                    ) : certification.status === "Pending" ? (
                                                                        <Image
                                                                            width={20}
                                                                            height={20}
                                                                            src="/pending.png"
                                                                            alt="Pending"
                                                                            className="w-5 h-5 animate-pulse"
                                                                        />
                                                                    ) : null}
                                                                </h4>

                                                                {/* Badge for status */}
                                                                <span
                                                                    className={`px-3 py-1 text-xs font-medium rounded-full ${certification.status === "Approved"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : certification.status === "Rejected"
                                                                                ? "bg-red-100 text-red-700"
                                                                                : "bg-yellow-100 text-yellow-700"
                                                                        }`}
                                                                >
                                                                    {certification.status || "Pending"}
                                                                </span>
                                                            </div>

                                                            <div className="text-sm text-gray-600 space-y-1">
                                                                <p>
                                                                    <span className="font-medium">Issuer:</span>{" "}
                                                                    {certification?.issuerName || "N/A"}
                                                                </p>
                                                                <p>
                                                                    <span className="font-medium">Issue Date:</span>{" "}
                                                                    {certification?.issueDate || "N/A"}
                                                                </p>
                                                                <p>
                                                                    <span className="font-medium">Certificate No.:</span>{" "}
                                                                    {certification?.certificateNumber || "N/A"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* References Section */}
                                        {profileData?.referees?.length > 0 && (
                                            <section className="mb-8">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                        <Users size={24} aria-hidden="true" />
                                                        References
                                                    </h3>
                                                </div>
                                                {profileData.referees.map((referee, index) => (
                                                    <div
                                                        key={`referee-${index}`}
                                                        className="border-l-4 border-green-500 pl-4 pr-4 py-3 ml-2 bg-green-50 rounded-lg mb-4 shadow-sm"
                                                    >
                                                        <h4 className="text-[16px] font-semibold text-gray-800">
                                                            {referee?.fullName || "N/A"}
                                                        </h4>
                                                        <p className="text-green-600 font-medium">
                                                            {referee?.title || "N/A"}
                                                        </p>
                                                        <p className="text-gray-600 text-[14px] mb-2">
                                                            {referee?.organization || "N/A"}
                                                        </p>
                                                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-gray-500">
                                                            {referee?.email && (
                                                                <a href={`mailto:${referee.email}`} className="hover:text-blue-600">
                                                                    {referee.email}
                                                                </a>
                                                            )}
                                                            {referee?.contact && (
                                                                <a href={`tel:${referee.contact}`} className="hover:text-blue-600">
                                                                    {referee.contact}
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </section>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </main>
            </div>
        </>
    );
}