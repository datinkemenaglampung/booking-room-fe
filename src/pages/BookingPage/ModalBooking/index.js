import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import idLocale from "date-fns/locale/id";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { set } from "date-fns";
import { fileToBase64 } from "../../../utils/helpers/fileToBase64";
import { BASE_URL_STORAGE } from "../../../helpers/config";

const ModalBooking = (props) => {
  const {
    workUnits,
    rooms,
    isShowModal,
    isEdit,
    closeModal,
    formState,
    setFormState,
    handleAdd,
    handleUpdate,
    events,
    initialFormState,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const inputRefName = useRef(null);
  const inputRef = useRef(null);
  const [view, setView] = useState("day");
  useEffect(() => {
    inputRefName.current?.focus();
  }, []);

  const options = rooms?.map((item) => {
    return { value: item?.id, label: item?.name };
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
  const buttonRef = useRef(null);

  useEffect(() => {
    if (
      formState?.booking_date &&
      formState?.room_id &&
      !document.getElementById("collapse-1-flush").classList.contains("show")
    ) {
      // trigger klik supaya animasi collapse jalan
      // buttonRef.current?.click();
      setTimeout(() => {}, 500);
      buttonRef.current.click(); // ini akan trigger event asli → animasi jalan
    }
  }, [formState?.room_id, isEdit]);
  useEffect(() => {
    const target = document.body;

    const observer = new MutationObserver(() => {
      if (target.classList.contains("modal-open")) {
        // hapus class dengna nama show, di id collapse-1-flush
      } else {
        document.getElementById("collapse-1-flush").classList.remove("show");
      }
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      class={isShowModal ? "modal modal-blur fade show" : "modal modal-blur fade "}
      id="modal-booking-preview"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      style={{
        display: isShowModal ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}>
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Booking !!!</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              oncClick={() => {
                setFormState(initialFormState);
              }}></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12">
                <label class="form-label">Ruangan</label>
                <div class="mb-3 input-icon">
                  <span
                    className="input-icon-addon"
                    style={{
                      zIndex: 9999,
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-warehouse-icon lucide-warehouse">
                      <path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" />
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" />
                      <path d="M6 13h12" />
                      <path d="M6 17h12" />
                    </svg>
                  </span>

                  <Select
                    options={options || []}
                    name="room_id"
                    className="form-select p-0"
                    styles={{
                      control: (base) => ({
                        ...base,
                        paddingLeft: "2rem", // beri ruang untuk ikon
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "none",
                        minHeight: "38px",
                        "&:hover": {
                          border: "none",
                          boxShadow: "none",
                        },
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#e3f2fd", // soft light blue
                        borderRadius: "20px",
                        padding: "2px 8px",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#1976d2", // soft blue text
                        fontWeight: "500",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: "#1976d2",
                        ":hover": {
                          backgroundColor: "#bbdefb", // hover soft blue
                          color: "#0d47a1",
                        },
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#90a4ae", // muted blue-gray
                      }),
                    }}
                    value={formState?.room_id ? options.find((option) => option.value === formState?.room_id) : null}
                    onChange={(selectedOptions) => {
                      setFormState({
                        ...formState,
                        room_id: selectedOptions?.value || "",
                        room_name: selectedOptions?.label || "",
                      });
                    }}
                    placeholder="-- pilih ruangan/aula --"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <label class="form-label">Tanggal Booking</label>
                <div class="mb-3 input-icon">
                  <span class="input-icon-addon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-calendar1-icon lucide-calendar-1">
                      <path d="M11 14h1v4" />
                      <path d="M16 2v4" />
                      <path d="M3 10h18" />
                      <path d="M8 2v4" />
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    name="booking_date"
                    placeholder="tanggal booking"
                    value={formState?.booking_date || ""}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        booking_date: e.target.value,
                      }))
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-header">
                  <button
                    ref={buttonRef}
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-1-flush"
                    aria-expanded="false">
                    <div className="accordion-button-toggle"></div>
                  </button>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Jam Mulai</label>
                  <input
                    type="time"
                    className="form-control"
                    value={formState?.start_time}
                    onChange={(e) =>
                      setFormState((prev) => {
                        const start = e.target.value;
                        let end = prev.end_time;

                        // kalau belum ada end_time atau start lebih besar/sama dengan end_time
                        // tambahkan 1 jam dari start
                        const [h, m] = start.split(":");
                        const newHour = String((parseInt(h, 10) + 1) % 24).padStart(2, "0");
                        end = `${newHour}:${m}`;

                        return {
                          ...prev,
                          start_time: start,
                          end_time: end,
                        };
                      })
                    }
                    min="07:00"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label class="form-label">Jam Selesai</label>
                  <input
                    type="time"
                    class="form-control"
                    value={formState?.end_time}
                    onChange={(e) => setFormState((prev) => ({ ...prev, end_time: e.target.value }))}
                    min={formState?.start_time || "07:00"}
                    max={"19:00"}
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <label class="form-label">Acara / Agenda</label>
                <div class="mb-3 input-icon">
                  <span class="input-icon-addon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-arrow-big-up-dash-icon lucide-arrow-big-up-dash">
                      <path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
                      <path d="M9 20h6" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="purpose"
                    placeholder="tujuan booking"
                    value={formState?.purpose || ""}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        purpose: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <label class="form-label">File bukti</label>
                <div class="mb-3 w-100 ">
                  <div
                    className="card  d-flex justify-content-center align-content-center w-100 "
                    style={{
                      border: formState?.attachment_file_path ? "none" : "1px solid #e9e9e9",
                    }}></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a
              href="#"
              class="btn btn-link link-secondary btn-3"
              data-bs-dismiss="modal"
              oncClick={() => {
                setFormState(initialFormState);
              }}>
              {" "}
              Cancel{" "}
            </a>
            {isEdit ? (
              <a
                href="#"
                class="btn bg-secondary-lt btn-5 ms-auto"
                data-bs-dismiss="modal"
                onClick={() => handleUpdate(formState?.id, formState)}>
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
                  class="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
                Edit Data
              </a>
            ) : (
              <a
                href="#"
                class="btn btn-primary btn-5 ms-auto"
                data-bs-dismiss="modal"
                onClick={() => handleAdd(formState)}>
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
                  class="icon icon-2">
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
                Tambah Data
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalBooking;
