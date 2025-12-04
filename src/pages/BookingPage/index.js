import React, { useState, useEffect, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, add } from "date-fns";
import idLocale from "date-fns/locale/id";
import { id } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import {
  fetchBookings,
  addBooking,
  cancelBooking,
  approveBooking,
  rejectBooking,
  updateBooking,
  deleteBooking,
} from "../../actions/bookingAction";
import { fetchRooms } from "../../actions/roomAction";
import UserAvatar from "../../components/UserAvatar";
import FormBooking from "./FormBooking";
import ModalBooking from "./ModalBooking";

import Swal from "sweetalert2";
import ModalDelete from "../../components/Modals/ModalDelete";
import { BASE_URL_STORAGE } from "../../helpers/config";
import { fileToBase64, urlToBase64 } from "../../utils/helpers/fileToBase64";

// Locale untuk bahasa Indonesia
const locales = {
  "id-ID": idLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const EventCardMonth = ({ event }) => {
  const bookingStatusBgColor = {
    approved: "bg-success",
    pending: "bg-info",
    rejected: "bg-danger",
    cancelled: "bg-danger",
  };
  let backgroundColor = "var(--bs-indigo)";
  if (event?.room_id == "1") backgroundColor = "var(--bs-success)";
  if (event?.room_id == "2") backgroundColor = "var(--bs-info)";
  if (event?.room_id == "3") backgroundColor = "var(--bs-primary)";

  return (
    <div className="d-flex flex-column my-1">
      <span
        className="fw-bold"
        style={{ fontSize: "0.5rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {event.title}
      </span>
    </div>
  );
};
const EventCard = ({ event }) => {
  const bookingStatusBgColor = {
    approved: "bg-success",
    pending: "bg-info",
    rejected: "bg-danger",
    cancelled: "bg-danger",
  };
  let backgroundColor = "var(--bs-indigo)";
  if (event?.room_id == "1") backgroundColor = "var(--bs-success)";
  if (event?.room_id == "2") backgroundColor = "var(--bs-secondary)";
  if (event?.room_id == "3") backgroundColor = "var(--bs-primary)";

  return (
    <div className="d-flex flex-column justifu-content-between">
      <span
        className="fw-bold"
        style={{ fontSize: "0.7rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {event.title}
      </span>

      <div className="w-100 d-flex justify-content-start gap-1 align-items-center my-1">
        <span
          className={`badge rounded-pill px-2 color-white `}
          style={{ fontSize: "0.5rem", alignSelf: "flex-start", color: "white", backgroundColor: backgroundColor }}>
          {event.room_name}
        </span>
        <span
          className={`badge rounded-pill px-2 color-white ${bookingStatusBgColor[event.status]}`}
          style={{ fontSize: "0.5rem", alignSelf: "flex-start", color: "white" }}>
          {event.status}
        </span>
      </div>
    </div>
  );
};
const EventAgenda = ({
  event,
  cancelBooking,
  approveBooking,
  rejectBooking,
  setFormState,
  setIsEdit,
  permissions,
  userId,
}) => {
  const bookingStatusBgColor = {
    approved: "bg-success",
    pending: "bg-info",
    rejected: "bg-danger",
    cancelled: "bg-danger",
  };
  let backgroundColor = "var(--bs-indigo)";
  if (event?.room_id == "1") backgroundColor = "var(--bs-success)";
  if (event?.room_id == "2") backgroundColor = "var(--bs-secondary)";
  if (event?.room_id == "3") backgroundColor = "var(--bs-primary)";

  const handleRejectEvent = async (id, data) => {
    const result = await Swal.fire({
      title: "Reject",
      text: `Permintaan booking untuk "${data?.title}" dari ${data.user_name} ${data.work_unit_name}?`,
      icon: "warning",
      input: "text", // <- WAJIB ada agar bisa input alasan
      inputPlaceholder: "alasan reject",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      preConfirm: (alasan) => {
        if (!alasan) {
          Swal.showValidationMessage("Alasan Batal Harus Diisi");
        }
        return alasan;
      },
    });

    if (result.isConfirmed) {
      const data = { reason: result.value };
      rejectBooking(id, data);
      Swal.fire("Sukses", "Permintaan booking berhasil ditolak.", "success");
    }
  };
  const handleApproveEvent = async (data) => {
    const result = await Swal.fire({
      title: "Approve",
      text: `Permintaan booking untuk "${data.title}" dari ${data.user_name} ${data.work_unit_name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    });

    if (result.isConfirmed) {
      await approveBooking(data.id);
      Swal.fire("Sukses", "Permintaan booking berhasil disetujui.", "success");
    }
  };

  return (
    <div className="w-100 d-flex flex-row justifu-content-between align-items-center my-1 py-2">
      <UserAvatar size="xl" className="me-2" imageUrl={`${event.room_image}`} />
      <div className="d-flex flex-column justifu-content-between">
        <a
          data-bs-toggle="modal"
          data-bs-target="#modal-booking-preview"
          className="fw-bold"
          style={{
            fontSize: "1.3rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#333333",
            cursor: "pointer",
            textDecoration: "none",
          }}>
          {event.title}
        </a>
        <div className="w-100 d-flex justify-content-start gap-1 align-items-center my-1">
          <span
            className={`badge rounded-pill px-2 color-white `}
            style={{ fontSize: "0.8rem", alignSelf: "flex-start", color: "white", backgroundColor: backgroundColor }}>
            {event.room_name}
          </span>
          <span
            className={`badge rounded-pill px-2 color-white ${bookingStatusBgColor[event.status]}`}
            style={{ fontSize: "0.8rem", alignSelf: "flex-start", color: "white" }}>
            {event.status}
          </span>

          <span
            className={`badge rounded-pill px-2 bg-white text-dark border border-dark`}
            style={{ fontSize: "0.8rem", alignSelf: "flex-start", color: "white" }}>
            {event.work_unit_name + " • " + event.user_name}
          </span>
        </div>
        {event.status !== "pending" ? (
          <div className="w-100 d-flex justify-content-start gap-1 align-items-center my-1">
            {event.status === "approved" ? (
              <div
                className="badge rounded-pill px-2 bg-light text-dark underline"
                style={{
                  fontSize: "0.6rem",
                  alignSelf: "flex-start",
                  color: "white",
                  textDecoration: "underline ",
                  textDecorationColor: "green",
                }}>
                {event?.status === "approved" ? "Disetujui" : event?.status === "rejected" ? "Ditolak" : ""} pada{" "}
                {event?.approved_at
                  ? "• " + event?.approved_at
                    ? format(new Date(event.approved_at), "EEEE, d MMMM yyyy HH:mm", { locale: id })
                    : ""
                  : ""}{" "}
                oleh - {event?.approved_by_name}{" "}
              </div>
            ) : (
              ""
            )}
            {event.status === "cancelled" ? (
              <div
                className="badge rounded-pill px-2 bg-light text-dark underline"
                style={{
                  fontSize: "0.6rem",
                  alignSelf: "flex-start",
                  color: "white",
                  textDecoration: "underline ",
                  textDecorationColor: "red",
                }}>
                {event?.cancelled_at
                  ? "• " + event?.cancelled_at
                    ? format(new Date(event.cancelled_at), "EEEE, d MMMM yyyy HH:mm", { locale: id })
                    : ""
                  : ""}{" "}
                oleh -{event?.cancelled_by_name}{" "}
              </div>
            ) : (
              ""
            )}
            {event.status === "rejected" ? (
              <div
                className="badge rounded-pill px-2 bg-light text-dark underline"
                style={{
                  fontSize: "0.6rem",
                  alignSelf: "flex-start",
                  color: "white",
                  textDecoration: "underline ",
                  textDecorationColor: "red",
                }}>
                {event?.rejected_reason} -
                {event?.rejected_at
                  ? "• " + event?.rejected_at
                    ? format(new Date(event.rejected_at), "EEEE, d MMMM yyyy HH:mm", { locale: id })
                    : ""
                  : ""}{" "}
                oleh -{event?.rejected_by_name}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {event.status === "pending" ? (
        <span style={{ marginLeft: "auto" }}>
          {permissions?.some((item) => item?.slug == "edit-status-bookings") && (
            <>
              <a
                class="btn btn-1 bg-danger-lt me-3 p-1"
                style={{
                  fontSize: "0.6rem",
                }}
                onClick={() => {
                  handleRejectEvent(event.id, event);
                }}>
                Reject
              </a>
              <a
                href="#"
                class="btn btn-1 bg-success-lt me-3 p-1"
                style={{
                  fontSize: "0.6rem",
                }}
                onClick={() => {
                  handleApproveEvent(event);
                }}>
                Approve
              </a>
            </>
          )}
          {permissions?.some((item) => item?.slug == "edit-bookings") || event?.created_by == userId ? (
            <a
              data-bs-toggle="modal"
              data-bs-target="#modal-booking"
              class="btn btn-1 bg-warning-lt me-3 p-1"
              style={{
                fontSize: "0.6rem",
              }}
              onClick={async () => {
                setIsEdit(true);
                setFormState({
                  ...event,
                  booking_date: event.start.toISOString().split("T")[0],
                  attachment_file_url: event?.attachment_file,
                });
              }}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-square-pen-icon lucide-square-pen">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
            </a>
          ) : (
            ""
          )}
          {permissions?.some((item) => item?.slug == "delete-bookings") || event?.created_by == userId ? (
            <a
              href="#"
              class="btn btn-1 bg-danger-lt m-0 p-1"
              data-bs-toggle="modal"
              data-bs-target="#modal-delete"
              onClick={() => {
                setFormState({
                  id: event?.id,
                  title: event?.title,
                  name: event?.purpose,
                  start: event?.start,
                  end: event?.end,
                  room_id: event?.room_id,
                  room_name: event?.room_name,
                  status: event?.status,
                });
              }}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-trash m-0">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </a>
          ) : (
            ""
          )}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

const BookingPage = (props) => {
  const {
    addBooking,
    bookings,
    isLoading,
    fetchBookings,
    cancelBooking,
    approveBooking,
    rejectBooking,
    fetchRooms,
    rooms,
    updateBooking,
    deleteBooking,
  } = props;
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [view, setView] = useState("week"); // state untuk kontrol view
  const [date, setDate] = useState(new Date());
  const initialFormState = {
    id: null,
    user_id: "",
    room_id: "",
    booking_date: new Date().toISOString().split("T")[0],
    start_time: "",
    end_time: "",
    purpose: "",
    status: "pending",
    attachment_file_path: null,
  };

  const [formState, setFormState] = useState(initialFormState);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleAdd = async (data) => {
    await addBooking(data);
    // setIsEdit(false);
    // setIsShowModal(true);
  };
  const handleUpdate = async (id, data) => {
    await updateBooking(id, data);
  };
  const handleUpdateRoom = (room_id) => {
    setFormState({ ...formState, room_id: room_id });
  };
  const closeModal = () => {
    setIsShowModal(false);
    setFormState(initialFormState);
    setIsEdit(false);
  };
  const openModalDelete = () => {
    setFormState(initialFormState);
    setIsShowModalDelete(true);
  };
  const closeModalDelete = () => {
    setFormState(initialFormState);
    setIsShowModalDelete(false);
  };
  const handleDelete = () => {
    deleteBooking(formState?.id);
  };

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  const events = bookings?.map((item) => {
    const start = new Date(`${item.booking_date}T${item.start_time}`);
    const end = new Date(`${item.booking_date}T${item.end_time}`);
    const attachment_file_path = item?.attachment_file_path ? BASE_URL_STORAGE + item?.attachment_file_path : null;

    return {
      id: item.id,
      title: item.purpose,
      start,
      end,
      start_time: item.start_time,
      end_time: item.end_time,
      booking_date: item.booking_date,
      room_id: item.room_id,
      user: item.user_id,
      status: item.status,
      tooltip: `Ruangan: ${item.room_id} • Status: ${item.status}`,
      purpose: item.purpose,
      room_name: item.room_name,
      work_unit_name: item.work_unit_name,
      room_image: item.room_image,
      user_name: item.user_name,
      rejected_reason: item.rejected_reason,
      created_by: item.created_by,
      created_at: item.created_at,
      updated_by: item.updated_by,
      updated_at: item.updated_at,
      rejected_by: item.rejected_by,
      rejected_at: item.rejected_at,
      rejected_by_name: item.rejected_by_name,
      approved_by: item.approved_by,
      approved_at: item.approved_at,
      approved_by_name: item.approved_by_name,
      cancelled_by: item.cancelled_by,
      cancelled_at: item.cancelled_at,
      cancelled_by_name: item.cancelled_by_name,
      attachment_file: attachment_file_path,
    };
  });
  const eventStyleGetter = (event) => {
    let backgroundColor = "var(--bs-indigo)";
    if (event?.room_id == "1") backgroundColor = "var(--bs-success)";
    if (event?.room_id == "2") backgroundColor = "var(--bs-info)";
    if (event?.room_id == "3") backgroundColor = "var(--bs-primary)";
    const bookingStatusBgColor = {
      approved: "var(--bs-success)",
      pending: "var(--bs-info)",
      rejected: "var(--bs-danger)",
      cancelled: "var(--bs-danger)",
    };

    return {
      style: {
        backgroundColor: "white",
        color: "black",
        borderRadius: "0.5rem",
        padding: "4px 6px",
        border: "none",
        fontSize: "0.85rem",
        width: "fit-content",
        height: "fit-content",
        maxWidth: "100%",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        cursor: "pointer",
        borderLeft: `6px solid ${bookingStatusBgColor[event.status] || backgroundColor}`,
      },
      title: `${event.title} | ${event.start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
    };
  };
  useEffect(() => {
    const target = document.body;

    const observer = new MutationObserver(() => {
      if (target.classList.contains("modal-open")) {
      } else {
        setFormState(initialFormState);
        setIsEdit(false);
      }
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  const userProfile = useMemo(() => {
    const dataProfile = localStorage.getItem("userProfile");
    try {
      return dataProfile ? JSON.parse(dataProfile) : null;
    } catch {
      return null;
    }
  }, []);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">Booking</div>
              <h2 className="page-title">Jadwal Booking</h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <a
                  href="#"
                  className="btn btn-primary btn-5 d-none d-sm-inline-block"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-booking">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-2">
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                  Tambah Booking
                </a>
                <a
                  href="#"
                  className="btn btn-primary btn-6 d-sm-none btn-icon"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-booking">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-2">
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  {isLoading ? (
                    <div
                      className="text-center my-5 "
                      style={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive p-lg-3 p-0">
                      <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: "70vh" }}
                        defaultView="week"
                        selectable={false}
                        date={date}
                        onView={(newView) => setView(newView)}
                        views={["month", "week", "day", "agenda"]}
                        view={view}
                        onNavigate={(newDate) => setDate(newDate)}
                        eventPropGetter={eventStyleGetter}
                        culture="id-ID"
                        onSelectEvent={(event) => {
                          // pindah ke tanggal event yang diklik
                          setDate(event.start);
                          // ubah view jadi agenda
                          setView("agenda");
                        }}
                        components={{
                          event: EventCard,
                          month: {
                            // header: MyMonthHeader,
                            // dateHeader: MyMonthDateHeader,
                            event: EventCardMonth,
                          },
                          week: {
                            // header: MyWeekHeader,
                            // dateHeader: MyWeekDateHeader,
                            // event: EventCard,
                          },
                          day: {
                            // header: MyDayHeader,
                            // dateHeader: MyDayDateHeader,
                            // event: EventCard,
                          },
                          agenda: {
                            event: (props) => (
                              <EventAgenda
                                {...props}
                                approveBooking={approveBooking}
                                rejectBooking={rejectBooking}
                                cancelBooking={cancelBooking}
                                setFormState={setFormState}
                                setIsEdit={setIsEdit}
                                permissions={userProfile?.permissions}
                                userId={userProfile?.id}
                              />
                            ),
                          },
                        }}
                        max={new Date(new Date().setHours(20, 0, 0, 0))} // batas jam akhir hari
                        min={new Date(new Date().setHours(7, 0, 0, 0))} // batas jam awal hari
                        messages={{
                          showMore: (total) => `+${total} lainnya`,
                        }}
                        popup
                      />
                      <div className="d-flex justify-content-center mt-3">
                        <div className="d-flex gap-4">
                          <div className="d-flex align-items-center">
                            <span
                              className="rounded-circle bg-success d-inline-block me-2"
                              style={{ width: "12px", height: "12px" }}></span>
                            <span>Approved</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span
                              className="rounded-circle bg-info d-inline-block me-2"
                              style={{ width: "12px", height: "12px" }}></span>
                            <span>Pending</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span
                              className="rounded-circle bg-danger d-inline-block me-2"
                              style={{ width: "12px", height: "12px" }}></span>
                            <span>Rejected</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormBooking
        isShowModal={isShowModal}
        isEdit={isEdit}
        closeModal={closeModal}
        formState={formState}
        setFormState={setFormState}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleUpdateRoom={handleUpdateRoom}
        rooms={rooms}
        events={events}
        initialFormState={initialFormState}
      />
      <ModalDelete
        labelModal={formState?.name}
        isShowModal={isShowModalDelete}
        closeModal={closeModalDelete}
        handleDelete={handleDelete}
      />
      <ModalBooking isShowModal={isShowModal} closeModal={closeModal} formState={formState} rooms={rooms} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  bookings: state?.bookings?.datas?.data || [],
  isLoading: state?.bookings?.loading,
  error: state?.bookings?.error,
  rooms: state?.rooms?.datas?.data || [],
});

export default connect(mapStateToProps, {
  addBooking,
  fetchBookings,
  cancelBooking,
  approveBooking,
  rejectBooking,
  fetchRooms,
  updateBooking,
  deleteBooking,
})(BookingPage);
