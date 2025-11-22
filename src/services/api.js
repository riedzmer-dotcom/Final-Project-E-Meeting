import axios from "axios";

/* ======================================================
   BASE SETUP
====================================================== */
const BASE_URL = "https://emiting-be.vercel.app/api/v1";

console.log("🌐 Base URL API:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/* ======================================================
   REQUEST INTERCEPTOR (JWT Bearer Token)
====================================================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================================================
   AUTH
====================================================== */
export const loginUser = async ({ username, password }) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data;
};

export const registerUser = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

/* ======================================================
   PROFILE API
====================================================== */

/** 
 * Get logged-in user's profile
 */
export const getProfile = async () => {
  const res = await api.get("/profile");
  return res.data;
};



/** 
 * Update user profile
 * Accepts FormData payload: { username, email, password, photo }
 */
export const updateUserProfile = async (payload = {}) => {
  const fd = new FormData();

  // Append only fields that exist (avoid sending empty data)
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      fd.append(key, value);
    }
  });

  const res = await api.put("/profile", fd, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};



/* ======================================================
   ALIASES
====================================================== */

// Both alias refer to the same endpoint
export const getUserProfile = getProfile;
export const getUserById = getProfile;

/* ======================================================
   ROOMS
====================================================== */
export const getRooms = async (params = {}) => {
  const safeParams = {
    page: params.page ?? 1,
    limit: params.limit ?? 100,
    name: params.name,
    room_type: params.room_type,
    capacity: params.capacity,
  };

  const res = await api.get("/rooms", { params: safeParams });
  return res.data;
};

export const getRoomById = async (id) => {
  const res = await api.get(`/rooms/${id}`);
  return res.data;
};

export const createRoom = async (data) => {
  const res = await api.post("/rooms", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateRoom = async (id, formData) => {
  const res = await api.put(`/rooms/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteRoom = async (id) => {
  const res = await api.delete(`/rooms/${id}`);
  return res.data;
};

/* ======================================================
   RESERVATIONS
====================================================== */
export const getReservations = async () => {
  const res = await api.get("/reservations", {
    params: { page: 1, limit: 100 },
  });
  return res.data;
};

export const getReservationsByDate = async (date) => {
  const res = await api.get("/reservations", {
    params: {
      startDate: date,
      endDate: date,
      page: 1,
      limit: 100,
    },
  });
  return res.data;
};

export const getReservationById = async (id) => {
  const res = await api.get(`/reservations/${id}`);
  return res.data;
};

export const createReservation = async (payload) => {
  const res = await api.post("/reservations", payload);
  return res.data;
};

export const updateReservation = async (id, payload) => {
  const res = await api.put(`/reservations/${id}`, payload);
  return res.data;
};

export const deleteReservation = async (id) => {
  const res = await api.delete(`/reservations/${id}`);
  return res.data;
};

/* ======================================================
   SNACKS
====================================================== */
export const getSnacks = async () => {
  const res = await api.get("/snacks");
  return res.data;
};

/* ======================================================
   DASHBOARD
====================================================== */
export const getDashboard = async (params = {}) => {
  const res = await api.get("/dashboard", {
    params: {
      startDate: params.startDate ?? "2024-01-01",
      endDate: params.endDate ?? "2030-12-31",
    },
  });
  return res.data;
};

/* ======================================================
   REPORTS (alias of reservations)
====================================================== */
export const getReportData = async (params = {}) => {
  const safeParams = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,  
    startDate: params.startDate,
    endDate: params.endDate,
    room_id: params.room_id,
    room_type: params.room_type,
    status: params.status,
  };

  // use endpoint RESERVATIONS 
  const res = await api.get("/reservations", { params: safeParams });
  return res.data;
};




export default api;

