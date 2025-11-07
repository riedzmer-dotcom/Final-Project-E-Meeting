export default function LayoutTitleBar({ title = "Dashboard" }) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* 🔹 Title dinamis */}
      <h1 className="text-[28px] font-bold text-[#0F172A]">{title}</h1>

      {/* 🔹 User account */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium text-[#0F172A]">Angelina</p>
          <p className="text-sm text-gray-500">Admin</p>
        </div>
        <img
          src="/src/assets/images/avatar.png"
          alt="User Avatar"
          className="w-[45px] h-[45px] rounded-full object-cover"
        />
      </div>
    </div>
  );
}
