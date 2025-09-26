import React, { useState, useEffect, useContext } from 'react';
import { User, Clock, CheckCircle, XCircle, Search, Filter, Eye } from 'lucide-react';
import { userContext } from './_app';
import { Api } from '@/services/service';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const OrganizationDashboard = (props) => {
    const [verifications, setVerifications] = useState([]);
    const [user] = useContext(userContext);
    const router = useRouter();
    const [filteredVerifications, setFilteredVerifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVerification, setSelectedVerification] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (!user?._id) return; // Wait until user is available

        setLoading(true);
        Api("get", `auth/getAllVerificationRequest?CompanyId=${user._id}`, {}, router)
            .then((res) => {
                const data = res?.status ? res.data?.data || [] : [];
                setVerifications(data);
                setFilteredVerifications(data);
            })
            .catch((err) => console.error("Error fetching verification requests:", err))
            .finally(() => setLoading(false));
    }, [user, router]);



    useEffect(() => {
        let filtered = verifications;
        if (filter !== 'All') {
            filtered = filtered.filter(v => v.organizationStatus === filter);
        }
        if (searchTerm) {
            filtered = filtered.filter(v =>
                v.user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                v.experience.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredVerifications(filtered);
    }, [filter, searchTerm, verifications]);

    const handleVerification = async (verificationId, status) => {
        try {
            const data = {
                verificationId,
                status,
                userId: user._id,
            };
            props.loader(true)
            const res = await Api("post", "auth/organizationVerify", data, router);
            if (res.status) {
                props.loader(false)
                console.log(res.data?.message);
                toast.success(res.data?.message)
            } else {
                toast.error(res.message)
            }

            setVerifications(prev => prev.map(v =>
                v._id === verificationId
                    ? { ...v, organizationStatus: status }
                    : v
            ));
            setShowModal(false);
            setSelectedVerification(null);
        } catch (error) {
            console.error('Error updating verification:', error);
        }
    };

    const StatusBadge = ({ status }) => {
        const config = {
            Pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
            Approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle },
            Rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: XCircle }
        };
        const { bg, text, border, icon: Icon } = config[status];
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${bg} ${text} ${border}`}>
                <Icon className="w-3.5 h-3.5" />
                {status}
            </span>
        );
    };

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${color.bg}`}>
                    <Icon className={`h-6 w-6 ${color.text}`} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const getStats = () => ({
        total: verifications.length,
        pending: verifications.filter(v => v.organizationStatus === 'Pending').length,
        approved: verifications.filter(v => v.organizationStatus === 'Approved').length,
        rejected: verifications.filter(v => v.organizationStatus === 'Rejected').length
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const stats = getStats();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className=" shadow-sm border-b border-gray-200 mt-8 md:mt-0 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user?.companyName}</h1>
                            <p className="text-gray-600 mt-1">Employee Experience Verification Dashboard</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    <StatCard icon={User} label="Total Requests" value={stats.total} color={{ bg: 'bg-blue-50', text: 'text-blue-600' }} />
                    <StatCard icon={Clock} label="Pending" value={stats.pending} color={{ bg: 'bg-amber-50', text: 'text-amber-600' }} />
                    <StatCard icon={CheckCircle} label="Approved" value={stats.approved} color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }} />
                    <StatCard icon={XCircle} label="Rejected" value={stats.rejected} color={{ bg: 'bg-red-50', text: 'text-red-600' }} />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by name or job title..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <select
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white min-w-[120px]"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">Verification Requests</h3>
                        <p className="text-sm text-gray-500 mt-1">Review employment history of former employees</p>
                    </div>

                    {filteredVerifications.length === 0 ? (
                        <div className="text-center py-16">
                            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No verification requests</h3>
                            <p className="text-gray-500">
                                {searchTerm || filter !== 'All' ? 'No requests match your filters.' : 'No requests from former employees yet.'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredVerifications.map((verification) => (
                                <div key={verification._id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                                                <User className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-lg font-semibold text-gray-900">{verification.user.fullName}</h4>
                                                <p className="text-sm text-gray-600 mb-1">{verification.user.email}</p>
                                                <p className="text-sm font-medium text-gray-900">{verification.experience.jobTitle}</p>
                                                <p className="text-xs text-gray-500">
                                                    {verification?.user?.experience?.duration}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
                                            <StatusBadge status={verification.organizationStatus} />
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedVerification(verification);
                                                        setShowModal(true);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View
                                                </button>

                                                {verification.organizationStatus === 'Pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleVerification(verification._id, 'Approved')}
                                                            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                            <span className="hidden sm:inline">Approve</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleVerification(verification._id, 'Rejected')}
                                                            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                            <span className="hidden sm:inline">Reject</span>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {showModal && selectedVerification && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">Verification Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Employee Information</h4>
                                <div className="space-y-2 text-sm text-black">
                                    <p><span className="font-medium text-gray-700">Name:</span> {selectedVerification.user.fullName}</p>
                                    <p><span className="font-medium text-gray-700">Email:</span> {selectedVerification.user.email}</p>
                                    <p><span className="font-medium text-gray-700">Phone:</span> {selectedVerification.user.phone}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Employment Details</h4>
                                <div className="space-y-2 text-sm text-black">
                                    <p><span className="font-medium text-gray-700">Position:</span> {selectedVerification.experience.jobTitle}</p>
                                    <p><span className="font-medium text-gray-700">Duration:</span> {formatDate(selectedVerification.experience.startDate)} - {formatDate(selectedVerification.experience.endDate)}</p>
                                    <p><span className="font-medium text-gray-700">Period:</span> {selectedVerification.experience.duration}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Verification Status</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Company Status:</span>
                                        <StatusBadge status={selectedVerification.organizationStatus} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Admin Status:</span>
                                        <StatusBadge status={selectedVerification.adminStatus} />
                                    </div>
                                    {selectedVerification.organizationRemark && (
                                        <p><span className="font-medium text-gray-700">HR Remark:</span> {selectedVerification.organizationRemark}</p>
                                    )}
                                </div>
                            </div>

                            {selectedVerification.organizationStatus === 'Pending' && (

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            handleVerification(selectedVerification._id, 'Approved');
                                        }}
                                        className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 font-medium transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleVerification(selectedVerification._id, 'Rejected');
                                        }}
                                        className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 font-medium transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>

                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganizationDashboard;