import React, { useContext, useEffect, useState, useMemo } from "react";
import {
    MapPin,
    Mail,
    Phone,
    Building,
    Users,
    Target,
    Award,
    Briefcase,
    ArrowLeft,

} from "lucide-react";
import Image from "next/image";
import Head from "next/head";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { userContext } from "@/pages/_app";
import { Api } from "@/services/service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

countries.registerLocale(enLocale);

const CompanyProfile = ({ companyData: initialCompanyData, loader }) => {
    const [showFullAbout, setShowFullAbout] = useState(false);
    const [showSpecializations, setShowSpecializations] = useState({});
    const [showFullMission, setShowFullMission] = useState(false);
    const [showFullVision, setShowFullVision] = useState(false);
    const [companyData, setCompanyData] = useState(initialCompanyData || {});
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const [user] = useContext(userContext);

    // Memoize profile ID and country name
    const profileId = useMemo(() => router.query.id, [router.query.id]);
    const country = useMemo(() => {
        if (!companyData.country) return '';
        return countries.getName(companyData.country, "en") || companyData.country;
    }, [companyData.country]);


    const pageTitle = useMemo(() =>
        companyData.companyName
            ? `${companyData.companyName} - ${companyData.industry || 'Company Profile'}`
            : 'Company Profile'
        , [companyData.companyName, companyData.industry]);

    const pageDescription = useMemo(() =>
        companyData.aboutUs
            ? companyData.aboutUs.replace(/<[^>]*>/g, '').slice(0, 160)
            : `Learn about ${companyData.companyName || 'this company'}, their services, team, and more.`
        , [companyData.aboutUs, companyData.companyName]);

    useEffect(() => {
        if (profileId && !initialCompanyData) {
            getProfileById(profileId);
        }
    }, [profileId, initialCompanyData]);

    const getProfileById = async (id) => {
        try {
            setLoading(true);
            loader?.(true);

            const res = await Api("get", `auth/getProfileById?role=company&id=${id}`, "", router);
            setCompanyData(res.data || {});
        } catch (err) {
            toast.error(err?.data?.message || err?.message || "Failed to load company profile");
        } finally {
            setLoading(false);
            loader?.(false);
        }
    };

    const toggleSpecialization = (index) => {
        setShowSpecializations(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Show loading state
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={`${companyData.companyName}, ${companyData.industrySector}, company profile, ${companyData.services?.join(', ') || ''}`} />
            </Head>

            <article className="max-w-6xl mx-auto bg-white  overflow-hidden">

                <header className="bg-white border-b-2 border-b-gray-200 relative">
                    <div className="max-w-6xl mx-auto ps-4">
                        <div
                            className="flex items-center h-16 md:mt-0 mt-4"
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
                    {companyData.coverImage ? (
                        <div className="relative w-full h-34 md:h-44">
                            <Image
                                src={companyData.coverImage}
                                alt={`${companyData.companyName} cover image`}
                                fill
                                className="object-contain md:object-cover"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="h-40 md:h-44 bg-gradient-to-r from-blue-50 to-blue-100" />
                    )}

                    {/* Company Logo */}
                    <div className="absolute left-1/2 md:left-8 bottom-[17.5rem] -md:bottom-[5rem] md:-mb-20 transform -translate-x-1/2 md:translate-x-0 flex justify-center">
                        <div className="w-28 h-28 md:w-40 md:h-40 bg-blue-400 rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center">
                            <Image
                                src={companyData.companyLogo || "/profile.png"}
                                alt={`${companyData.companyName} logo`}
                                width={160}
                                height={160}
                                className="w-full h-full object-cover rounded-full"
                                priority
                            />
                        </div>
                    </div>

                    {/* Company Details */}
                    <div className="mt-16 md:mt-28 px-4 md:px-12 pb-6">
                        <h1 className="text-2xl md:text-[30px] text-black font-bold mb-2 text-center md:text-left">
                            {companyData.companyName}
                        </h1>
                        <h2 className="text-lg md:text-[20px] text-gray-700 mb-3 text-center md:text-left">
                            {companyData.industry}
                        </h2>

                        {/* Country */}
                        {country && (
                            <div className="flex justify-center md:justify-start text-gray-700 mb-3">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} aria-hidden="true" />
                                    <span>{country}</span>
                                </div>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2 text-center md:text-left">
                            {companyData.email && (
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                                    <Mail size={16} />
                                    <a
                                        href={`mailto:${companyData.email}`}
                                        className="hover:text-blue-600 transition-colors break-all"
                                    >
                                        {companyData.email}
                                    </a>
                                </div>
                            )}
                            {companyData.phone && (
                                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                                    <Phone size={16} />
                                    <a
                                        href={`tel:${companyData.phone}`}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {companyData.phone}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Extra Info */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-600 mt-6">
                            {companyData.foundedYear && (
                                <div className="flex flex-col items-center md:items-start">
                                    <p className="font-medium">Founded:</p>
                                    <span>{companyData.foundedYear}</span>
                                </div>
                            )}

                            {companyData.companySize && (
                                <div className="flex flex-col items-center md:items-start">
                                    <p className="font-medium">Size:</p>
                                    <span>{companyData.companySize} employees</span>
                                </div>
                            )}

                            {companyData.website && (
                                <div className="flex flex-col items-center md:items-start">
                                    <p className="font-medium">Website:</p>
                                    <a
                                        href={
                                            companyData.website.startsWith("http")
                                                ? companyData.website
                                                : `https://${companyData.website}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all"
                                    >
                                        {companyData.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </header>


                <div className="md:p-8 p-4 shadow-lg">
                    {/* About Section */}
                    {companyData.aboutUs && (
                        <section className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                    <Building size={24} aria-hidden="true" />
                                    About Company
                                </h3>
                            </div>
                            <div className="text-gray-600 leading-relaxed">
                                {showFullAbout || companyData.aboutUs.length <= 200
                                    ? companyData.aboutUs
                                    : companyData.aboutUs.slice(0, 200) + "..."}
                                {companyData.aboutUs.length > 200 && (
                                    <button
                                        className="text-blue-600 text-sm ml-1 hover:underline"
                                        onClick={() => setShowFullAbout(!showFullAbout)}
                                    >
                                        {showFullAbout ? "Show less" : "Show more"}
                                    </button>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Services Section */}
                    <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                <Briefcase size={24} aria-hidden="true" />
                                Services
                            </h3>
                        </div>

                        {!companyData?.services || companyData.services.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                                <p className="text-gray-400 mb-2">No services added yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {companyData.services.map((service, index) => (
                                    <span
                                        key={`service-${index}`}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Specializations Section */}
                    {companyData?.specializations?.length > 0 && (
                        <section className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                    <Award size={24} aria-hidden="true" />
                                    Fields of Specialization
                                </h3>
                            </div>

                            <div>
                                {companyData.specializations.map((spec, index) => (
                                    <div
                                        key={`specialization-${index}`}
                                        className="border-l-4 border-purple-400 pl-4 pr-4 py-3 ml-2 bg-purple-50 rounded-lg mb-4 shadow-sm"
                                    >
                                        <h4 className="text-[16px] font-semibold text-gray-800 mb-2">
                                            {spec.title}
                                        </h4>

                                        <div className="text-gray-600 leading-relaxed">
                                            {showSpecializations[index] || spec.description?.length <= 170
                                                ? spec.description
                                                : spec.description?.slice(0, 170) + "..."}
                                            {spec.description?.length > 170 && (
                                                <button
                                                    className="text-blue-600 text-sm ml-1 hover:underline"
                                                    onClick={() => toggleSpecialization(index)}
                                                >
                                                    {showSpecializations[index] ? "Show less" : "Show more"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Mission and Vision Section */}
                    {(companyData.missionStatement || companyData.visionStatement) && (
                        <section className="mb-8">
                            <div className="grid md:grid-cols-1 gap-6">
                                {companyData.missionStatement && (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                <Target size={24} aria-hidden="true" />
                                                Our Mission
                                            </h3>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-gray-700 text-[16px] leading-relaxed">
                                                {showFullMission || companyData.missionStatement.length <= 250
                                                    ? companyData.missionStatement
                                                    : companyData.missionStatement.slice(0, 250) + "..."}
                                                {companyData.missionStatement.length > 250 && (
                                                    <button
                                                        className="text-blue-600 text-sm ml-1 hover:underline"
                                                        onClick={() => setShowFullMission(!showFullMission)}
                                                    >
                                                        {showFullMission ? "Show less" : "Show more"}
                                                    </button>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {companyData.visionStatement && (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                                <Target size={24} aria-hidden="true" />
                                                Our Vision
                                            </h3>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-gray-700 text-[16px] leading-relaxed">
                                                {showFullVision || companyData.visionStatement.length <= 250
                                                    ? companyData.visionStatement
                                                    : companyData.visionStatement.slice(0, 250) + "..."}
                                                {companyData.visionStatement.length > 250 && (
                                                    <button
                                                        className="text-green-600 text-sm ml-1 hover:underline"
                                                        onClick={() => setShowFullVision(!showFullVision)}
                                                    >
                                                        {showFullVision ? "Show less" : "Show more"}
                                                    </button>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Team Members Section */}
                    {companyData?.teamMembers?.length > 0 && (
                        <section className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                    <Users size={24} aria-hidden="true" />
                                    Meet Our Team
                                </h3>
                            </div>

                            {companyData.teamMembers.map((member, index) => (
                                <div
                                    key={`team-member-${index}`}
                                    className="border-l-4 border-blue-400 md:pl-6 pl-4 ml-2 mb-6"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-2 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                                        <div className="flex-1">
                                            <h4 className="text-[16px] font-semibold text-gray-800">
                                                {member.fullName}
                                            </h4>
                                            <p className="text-blue-600 text-[14px] font-medium mb-1">
                                                {member.designation}
                                            </p>
                                            <p className="text-gray-600 text-[14px]">
                                                {member.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects Section */}
                    {companyData?.projects?.length > 0 && (
                        <section className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[18px] font-semibold text-gray-800 flex items-center gap-2">
                                    <Award size={24} aria-hidden="true" />
                                    Past Projects
                                </h3>
                            </div>

                            {companyData.projects.map((project, index) => (
                                <div key={`project-${index}`} className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-[16px] font-semibold text-gray-800">
                                            {project.title}
                                        </h4>
                                        {project.yearCompleted && (
                                            <span className="text-gray-400 text-[14px]">
                                                {project.yearCompleted}
                                            </span>
                                        )}
                                    </div>
                                    {project.client && (
                                        <p className="text-green-600 text-[14px] leading-relaxed mb-2">
                                            {project.client}
                                        </p>
                                    )}
                                    {project.description && (
                                        <p className="text-gray-600 text-[14px] leading-relaxed">
                                            {project.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </article>
        </>
    );
};

export default CompanyProfile;