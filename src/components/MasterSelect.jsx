import { useEffect, useState } from "react";
import {
  RoomTypeService,
  CapacityService,
  SnackService,
  OpenAPI,
} from "../generated-api";


/* ======================================================
   OPENAPI CONFIGURATION
   ====================================================== */
OpenAPI.BASE = "http://172.16.148.101:8883";
OpenAPI.TOKEN = localStorage.getItem("token") || "";

export default function MasterSelect({ type, label, value, onChange }) {


/* ======================================================
       STATES
     ====================================================== */
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
 /* ======================================================
       FETCH MASTER DATA BY TYPE
     ====================================================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        let res;
        switch (type) {
          case "room-types":
            res = await RoomTypeService.getApiV1RoomTypes(1, 50, "id", "asc");
            break;
          case "capacities":
            res = await CapacityService.getApiV1Capacities(1, 50, "id", "asc");
            break;
          case "snacks":
            res = await SnackService.getApiV1Snacks(1, 50, "id", "asc");
            break;
          default:
            throw new Error(`❌ Invalid master data type: ${type}`);
        }

        const result = Array.isArray(res.data) ? res.data : [];
        setOptions(result);
      } catch (err) {
        console.error(`❌ Gagal mengambil data ${type}:`, err);
        setError("Gagal memuat data, coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

 /* ======================================================
       UI
     ====================================================== */ 
  
  return (
    <div className="flex flex-col gap-[6px]">
      
       {/* LABEL */}
      {label && (
        <label className="text-[#2B2B2B] text-[15px] font-medium">{label}</label>
      )}

      
      {/* LOADING STATE */}
      {loading ? (
        <div className="h-[48px] flex items-center justify-center text-sm 
                      text-gray-400 border border-gray-300 rounded-[10px] bg-[#FFF8F3]">
          Loading...
        </div>

      /* ERROR STATE */
      ) : error ? (
        <div className="h-[48px] flex items-center justify-center text-sm 
                      text-red-500 border border-red-300 rounded-[10px] bg-[#FFF5F5]">
          {error}
        </div>
      
    /* EMPTY DATA */
    ) : options.length === 0 ? (
        <div className="h-[48px] flex items-center justify-center text-sm 
        text-gray-400 border border-gray-300 rounded-[10px] bg-[#FFF8F3]">
          Tidak ada data.
        </div>
      
    /* SELECT DROPDOWN */
    ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[48px] rounded-[10px] border border-[#F4B183] px-[14px]
                     text-[14px] text-[#A55200] bg-[#FFF8F3]
                     focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                     focus:outline-none transition-all duration-200 ease-in-out"
        >
          <option value="">Pilih {label}</option>
          {options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name || item.title || item.label || `ID ${item.id}`}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
