
const profileFields = [
    "name",
    "email",
    "phone",
    "skills",
    "profileImage",
    "bio",
    "location",
    "coverImage",
    "experience", "education", "referees", "languages", "linkedinUrl", "role", "status"
];

const profileField = [
    "name",
    "email",
    "phone",
    "services",
    "aboutUs",
    "location",
    "coverImage",
    "foundedYear",
    "companyDescription", "companyLogo",
    "specializations", "projects", "teamMembers",
    "website", "visionStatement", "missionStatement", "industrySector", "companySize", "role", "status"
];

const calculateProfileCompletion = (user) => {
    const fields = user.role === "professional" ? profileFields : profileField;
    const totalFields = fields.length;
    let filledFields = 0;

    fields.forEach((field) => {
        const value = user[field];

        if (Array.isArray(value)) {
            if (value.length > 0) {
                filledFields += 1;
            }
        } else if (typeof value === "object" && value !== null) {
            if (Object.keys(value).length > 0) {
                filledFields += 1;
            }
        } else if (typeof value === "string") {
            // Check non-empty string
            if (value.trim() !== "") {
                filledFields += 1;
            }
        } else if (typeof value === "number" || typeof value === "boolean") {
            // Consider valid number or boolean
            filledFields += 1;
        }
    });

    const percentage = Math.round((filledFields / totalFields) * 100);
    return percentage;
};


export default calculateProfileCompletion;