// ReservationSchedule.jsx
import { useState } from "react";
import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import ScheduleSearchPanel from "../components/ScheduleSearchPanel";
import ScheduleContainer from "../components/ScheduleContainer";
import LayoutFooter from "../components/LayoutFooter";
import ReservationFormDrawer from "../components/ReservationFormDrawer";
import ReservationDetailModal from "../components/ReservationDetailModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import CustomToast from "../components/CustomToast";

import ReservationPagination from "../components/ReservationPagination";
import { deleteReservation } from "../services/api";

export default function ReservationSchedule() {

/* ======================================================
       STATES
     ====================================================== */

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false);

  const [reservationData, setReservationData] = useState(null);
  const [editingReservation, setEditingReservation] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [reloadReservationsFn, setReloadReservationsFn] = useState(null);

  // Pagination state provided by ScheduleContainer
  const [paginationState, setPaginationState] = useState({
    page: 0,
    totalPages: 0,
    setPage: () => {},
  });


/* ======================================================
       HANDLERS
     ====================================================== */

  const handleEdit = (event) => {
    setEditingReservation(event);
    setDrawerOpen(true);
  };

  const handleDelete = (event) => {
    setDeleteTarget(event);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteReservation(deleteTarget.id);
      showToast("Reservation deleted.", "success");
      setDeleteTarget(null);
      if (reloadReservationsFn) reloadReservationsFn();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete reservation.", "error");
    }
  };


  /* ======================================================
       UI
     ====================================================== */

  return (
    <div
      className="relative min-h-screen bg-gray-100 overflow-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <LayoutSidebar />
      <LayoutHeader pageTitle="Reservation Schedule" />

      <div
        className="
          absolute top-[80px] left-[80px] right-0 bottom-0
          flex flex-col
          pt-[20px] px-[20px]
        "
      >
        {/* SEARCH PANEL */}
        <div className="w-full bg-white z-30">
          <ScheduleSearchPanel
            onAddReservation={() => {
              setEditingReservation(null);
              setDrawerOpen(true);
            }}
            onSearch={(s, e) => {
              setStartDate(s);
              setEndDate(e);
            }}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            flex-1 bg-white
            overflow-auto
            px-[5px]
          "
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          <ScheduleContainer
            startDate={startDate}
            endDate={endDate}
            onReadyReload={(fn) => setReloadReservationsFn(() => fn)}
            onEditEvent={handleEdit}
            onDeleteEvent={handleDelete}
            onPaginationChange={(pg) => setPaginationState(pg)}
          />
        </div>

        {/* PAGINATION (STATIC BELOW CONTENT) */}
        <div className="mt-0 flex justify-center">
          <ReservationPagination
            page={paginationState.page}
            totalPages={paginationState.totalPages}
            onPrev={() =>
              paginationState.page > 0 &&
              paginationState.setPage(paginationState.page - 1)
            }
            onNext={() =>
              paginationState.page < paginationState.totalPages - 1 &&
              paginationState.setPage(paginationState.page + 1)
            }

            onGoto={(p) => paginationState.setPage(p)} 
          />
        </div>

        <LayoutFooter />
      </div>

      {/* DRAWER (ADD/EDIT) */}
      <ReservationFormDrawer
        isOpen={isDrawerOpen}
        editingData={editingReservation}
        onClose={() => {
          setDrawerOpen(false);
          setEditingReservation(null);
        }}
        onNext={(data) => {
          setReservationData(data);
          setDrawerOpen(false);
          setDetailOpen(true);
        }}
        onSaved={() => {
          showToast("Reservation updated successfully!", "success");
          setDrawerOpen(false);
          setEditingReservation(null);
          if (reloadReservationsFn) reloadReservationsFn();
        }}
        showToast={showToast}
      />

      {/* DETAIL MODAL */}
      <ReservationDetailModal
        isOpen={isDetailOpen}
        onClose={() => setDetailOpen(false)}
        onBack={() => {
          setDetailOpen(false);
          setDrawerOpen(true);
        }}
        formData={reservationData}
        showToast={showToast}
        onSubmitted={() => {
          showToast("Reservation berhasil disimpan!", "success");
          if (reloadReservationsFn) reloadReservationsFn();
          setDetailOpen(false);
        }}
      />

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* TOAST */}
      {toast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
