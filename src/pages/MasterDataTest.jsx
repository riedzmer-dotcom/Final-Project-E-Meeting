import { useEffect, useState } from "react";
import {
  getRooms,
  getReservations,
  getSnacks,
  getProfile,
  getDashboard,
} from "../services/api";

export default function MasterDataTest() {
  const [data, setData] = useState({
    rooms: [],
    reservations: [],
    snacks: [],
    dashboard: null,
    user: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRaw, setShowRaw] = useState(false);

  const safeFetch = async (fn, fallback = null) => {
    try {
      const res = await fn();
      return res;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const rooms = await safeFetch(() => getRooms());
        const reservations = await safeFetch(() => getReservations());
        const snacks = await safeFetch(() => getSnacks());
        const user = await safeFetch(() => getProfile());
        const dashboard = await safeFetch(() => getDashboard());

        setData({
          rooms: rooms?.data || [],
          reservations: reservations?.data || [],
          snacks: snacks?.data || [],
          dashboard: dashboard?.data || dashboard || {},
          user: user?.data || user || {},
        });
      } catch {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800 w-full">

      {/* HEADER */}
      <div className="flex justify-between mb-6 w-full">
        <h1 className="text-2xl font-bold">Master Data Test</h1>

        <button
          onClick={() => setShowRaw(!showRaw)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          {showRaw ? "Show UI" : "Show Raw JSON"}
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {showRaw ? (
            <pre className="bg-white p-4 mt-4 rounded border border-gray-300 overflow-auto text-sm w-full">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (

            <div className="h-[calc(100vh-160px)] overflow-y-auto w-full">

              <div className="flex flex-col md:flex-row gap-6 w-full">

                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-6 w-full md:w-1/2">

                  <StickyBox title="User Profile">
                    <DataCard list={[data.user]} />
                  </StickyBox>

                  <StickyBox title="Dashboard Summary">
                    <DataCard list={[data.dashboard]} />
                  </StickyBox>

                  <StickyBox title="Rooms">
                    <DataCard list={data.rooms} />
                  </StickyBox>

                  <StickyBox title="Snacks">
                    <DataCard list={data.snacks} />
                  </StickyBox>

                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-6 w-full md:w-1/2">

                  <StickyBox title="Reservations">
                    <DataCard list={data.reservations} />
                  </StickyBox>

                </div>

              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


/* ======================================================
         StickyBox — Card Container
====================================================== */
function StickyBox({ title, children }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <h2 className="text-base font-semibold mb-3 text-gray-900">
        {title}
      </h2>
      {children}
    </div>
  );
}


/* ======================================================
      DataCard — 4 COLUMNS 
====================================================== */
function DataCard({ list }) {
  const displayList = Array.isArray(list) ? list : [];

  const formatDate = (d) => {
    if (!d) return "-";
    try { return new Date(d).toLocaleString("en-GB"); }
    catch { return String(d); }
  };

  const makePairs = (obj) => {
    if (!obj || typeof obj !== "object") return [];
    const entries = Object.entries(obj);
    const pairs = [];
    for (let i = 0; i < entries.length; i += 2) {
      const left = entries[i];
      const right = entries[i + 1] || ["-", "-"];
      pairs.push([left, right]);
    }
    return pairs;
  };

  if (!displayList.length) {
    return <p className="text-gray-500 text-sm">Tidak ada data</p>;
  }

  return (
    <div className="space-y-4">

      {displayList.map((item, i) => {
        const rows = makePairs(item);

        return (
          <div key={i} className="bg-gray-50 p-4 border border-gray-200 rounded text-sm">

            <div className="font-semibold text-gray-900 mb-3">
              {item.room_name || item.username || item.name || `Item ${i + 1}`}
            </div>

            <div className="border border-gray-300 rounded overflow-hidden">

              {rows.map((row, idx) => {
                const [L, R] = row;
                const [lKey, lVal] = L;
                const [rKey, rVal] = R;

                const renderValue = (key, val) => {
                  if (val === "-" || val === null || val === undefined) return "-";
                  if (key.includes("date")) return formatDate(val);
                  return String(val);
                };

                return (
                  <div
                    key={idx}
                    className="grid [grid-template-columns:1fr_3fr_1fr_3fr] border-b border-gray-300"
                  >
                    <div className="p-2 bg-gray-200 font-semibold text-gray-700 capitalize border-r border-gray-300">
                      {lKey.replace(/_/g, " ")}
                    </div>

                    <div className="p-2 bg-white border-r border-gray-300 break-all">
                      {renderValue(lKey, lVal)}
                    </div>

                    <div className="p-2 bg-gray-200 font-semibold text-gray-700 capitalize border-r border-gray-300">
                      {rKey === "-" ? "-" : rKey.replace(/_/g, " ")}
                    </div>

                    <div className="p-2 bg-white break-all">
                      {renderValue(rKey, rVal)}
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        );
      })}

    </div>
  );
}
