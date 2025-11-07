import { useState } from "react";
import frameImage from "../assets/images/frame-image.png";

export default function SettingsAccountSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [password, setPassword] = useState("********");

  const handleEditAccount = () => setIsEditing(!isEditing);

  const handleEditPassword = () => {
    if (isEditingPassword) {
      console.log("Password saved:", password);
    }
    setIsEditingPassword(!isEditingPassword);
  };

  return (
    <section className="w-full bg-white  shadow-sm px-[24px] py-[24px] border border-[#E0E0E0] flex flex-col gap-[30px]">
      {/* ==============================================
          MY ACCOUNT SECTION
      ============================================== */}
      <div>
        <h2 className="text-[18px] font-semibold text-[#333] mb-[20px]">
          My Account
        </h2>

        {/* PROFILE PICTURE */}
        <div className="flex items-center gap-[20px] mb-[20px]">
          <img
            src={frameImage}
            alt="Profile"
            className="w-[80px] h-[80px] rounded-full object-cover border border-gray-200"
          />
          {isEditing && (
            <button
              className="h-[36px] px-[14px] rounded-[8px] bg-[#EB5B00] text-white text-[14px] font-normal 
                         hover:bg-[#d24d00] active:scale-95 transition-all"
            >
              Change Picture
            </button>
          )}
        </div>

        {/* ACCOUNT FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] font-normal mb-[4px]">
              Email
            </label>
            <input
              type="email"
              value="angelina@gmail.com"
              readOnly={!isEditing}
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] text-[#333] text-[14px]
                         focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-50"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] font-normal mb-[4px]">
              Username
            </label>
            <input
              type="text"
              value="Angelina"
              readOnly={!isEditing}
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] text-[#333] text-[14px]
                         focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-50"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] font-normal mb-[4px]">
              Role
            </label>
            <input
              type="text"
              value="Admin"
              readOnly
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] text-[#333] text-[14px] bg-gray-50"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] font-normal mb-[4px]">
              Status
            </label>
            <input
              type="text"
              value="Active"
              readOnly
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] text-[#333] text-[14px] bg-gray-50"
            />
          </div>

          {/* Language */}
          <div className="flex flex-col">
            <label className="text-[#5E5E5E] text-[14px] font-normal mb-[4px]">
              Language
            </label>
            <select
              disabled={!isEditing}
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] text-[#333] text-[14px]
                         focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-50"
            >
              <option>English</option>
              <option>Indonesian</option>
            </select>
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

        <div className="flex flex-col max-w-[400px] mb-[20px]">
          <label className="text-[#5E5E5E] text-[14px] font-normal mb-[4px]">
            Password
          </label>
          <input
            type={isEditingPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readOnly={!isEditingPassword}
            className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] text-[#333] text-[14px]
                       focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-50"
          />
        </div>

        <button
          onClick={handleEditPassword}
          className="h-[40px] px-[20px] rounded-[8px] bg-[#EB5B00] text-white text-[14px] font-medium 
                     hover:bg-[#d24d00] active:scale-95 transition-all"
        >
          {isEditingPassword ? "Save Changes" : "Edit"}
        </button>
      </div>
    </section>
  );
}
