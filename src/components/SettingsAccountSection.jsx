import { useEffect, useRef, useState } from "react";
import frameImage from "../assets/images/Luna1.jpg";
import DropdownSelect from "../components/DropdownSelect";
import { getUserProfile, updateUserProfile } from "../services/api";

export default function SettingsAccountSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    role: "",
    status: "Active",
    language: "English",
    password: "********",
    photoFile: null,
    photoPreview: null,
  });

  /* ======================================================
     FETCH USER PROFILE (INIT)
     Loads user data + resolves correct photo URL
  ====================================================== */
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        const user = res?.data || {};

        const preview =
        user.photo_url?.startsWith("http")
          ? user.photo_url
          : user.photo_url
          ? `${baseURL}/${user.photo_url}`
          : frameImage;

        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
          username: user.username || "",
          role: user.role || "User",
          status: "Active",
          language: "English",
          photoPreview: preview,
        }));
      })
      .catch((err) => console.error("❌ Error fetching profile:", err));
  }, []);

  /* ======================================================
     UPDATE LOCAL FORM STATE
  ====================================================== */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

   /* ======================================================
     SAVE PROFILE (EDIT MODE)
     Sends updated fields to backend
     Handles password, photo upload, and localStorage sync
  ====================================================== */
  const handleEditSave = async () => {
    if (isEditing) {
      try {
        setIsSaving(true);

        const payload = {
          username: formData.username,
          email: formData.email,
        };

        // Only send password if changed
        if (formData.password !== "********") {
          payload.password = formData.password;
        }

        // Include photo if updated
        if (formData.photoFile) {
          payload.photo = formData.photoFile;
        }

        const res = await updateUserProfile(payload);

        // Update local photo URL for the header
        if (res.data?.photo_url) {
          localStorage.setItem("photo_url", res.data.photo_url);
        }

        // Notify global listeners (Header uses this)
        window.dispatchEvent(new Event("profile-updated"));

        alert("Profile updated!");

      } catch (err) {
        console.error("❌ Error updating profile:", err);
        alert("Failed to update profile");
      } finally {
        setIsSaving(false);
      }
    }

    // Toggle edit mode
    setIsEditing(!isEditing);
  };


  /* ======================================================
     UI
  ====================================================== */
  return (
    <section className="w-full bg-white shadow-sm px-[24px] py-[24px] border border-[#E0E0E0] flex flex-col gap-[30px]">
      
      {/* ==============================================
          MY ACCOUNT
      ============================================== */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#333] mb-[20px]">
          My Account
        </h2>

        {/* Profile Picture */}
        <div className="flex items-center gap-[20px] mb-[20px]">
          <img
            src={formData.photoPreview || frameImage}
            alt="Profile"
            className="w-[80px] h-[80px] rounded-full object-cover border border-gray-200"
          />

          {isEditing && (
            <div className="flex flex-col gap-[8px]">
              <button
               onClick={() => fileInputRef.current.click()}
                className="h-[36px] px-[14px] rounded-[8px] bg-[#EB5B00] text-white text-[14px] font-normal 
                  hover:bg-[#d24d00] active:scale-95 transition-all"
              >
                Change Picture
              </button>

              <input
                ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                  if (!file) return;

                handleChange("photoFile", file);
                handleChange("photoPreview", URL.createObjectURL(file));
                }}
              />
            </div>
          )}
        </div>

        {/* ACCOUNT FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] mb-[4px]">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              readOnly={!isEditing}
              className={`w-full h-[48px] rounded-[10px] px-[12px] border border-gray-300 
                ${!isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
                focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                focus:outline-none transition-all duration-200`}
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] mb-[4px]">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              readOnly={!isEditing}
              className={`w-full h-[48px] rounded-[10px] px-[12px] border border-gray-300 
                ${!isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
                focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                focus:outline-none transition-all duration-200`}
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] mb-[4px]">Role</label>
            <input
              type="text"
              value={formData.role}
              readOnly
              className="w-full h-[48px] rounded-[10px] px-[12px] border border-gray-300 bg-gray-50
              focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
              focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] mb-[4px]">Status</label>
            <input
              type="text"
              value={formData.status}
              readOnly
              className="w-full h-[48px] rounded-[10px] px-[12px] border border-gray-300 bg-gray-50
              focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
              focus:outline-none transition-all duration-200"
            />
          </div>

         {/* Language */}
<div className="flex flex-col min-w-[180px] relative overflow-visible z-[60]">
  <label className="text-[#5E5E5E] text-[14px] mb-[4px]">Language</label>

  <DropdownSelect
    placeholder="Select Language"
    options={[
      { label: "English", value: "English" },
      { label: "Indonesian", value: "Indonesian" },
    ]}
    value={formData.language}
    onChange={(val) => handleChange("language", val.value)}
    disabled={!isEditing}
  />
</div>


        </div>
      </div>

      {/* ==============================================
          PASSWORD SECTION
      ============================================== */}
      <div className="border-t border-[#E0E0E0] pt-[30px]">
        <h2 className="text-[18px] font-semibold text-[#333] mb-[20px]">
          Password
        </h2>

        <div className="flex flex-col max-w-[500px] mb-[20px] relative">
          <label className="text-[#5E5E5E] text-[14px] mb-[4px]">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            readOnly={!isEditing}
            onChange={(e) => handleChange("password", e.target.value)}
            className={`w-full h-[48px] rounded-[10px] pl-[12px] border border-gray-300 pr-[42px]
              ${!isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
              focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
              focus:outline-none transition-all duration-200`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[12px] top-[36px] text-[#9CA3AF] hover:text-[#EB5B00]"
          >
            <i
              className={`uil ${
                showPassword ? "uil-eye-slash" : "uil-eye"
              } text-[20px]`}
            ></i>
          </button>
        </div>

        {/* BUTTON EDIT/SAVE */}
        <button
          onClick={handleEditSave}
          disabled={isSaving}
          className="h-[40px] px-[20px] rounded-[8px] bg-[#EB5B00] text-white text-[14px] font-medium 
            hover:bg-[#d24d00] active:scale-95 transition-all disabled:opacity-60"
        >
          {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Edit"}
        </button>
      </div>
    </section>
  );
}
