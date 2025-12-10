import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/logo.png";
import { fetchRoomsPublic } from "../../actions/roomAction";

import { fetchBookingsPublic } from "../../actions/bookingAction";
import { connect } from "react-redux";
import { BASE_URL_STORAGE } from "../../helpers/config";
import DetailRoom from "./DetailRoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import kemenag from "../../assets/images/logo_kemenag.png";
import Select from "react-select";
import { toast } from "react-hot-toast";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import idLocale from "date-fns/locale/id";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { set } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
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
        - {event.room_name} ( {event.title} - {event.work_unit_name} )
      </span>
    </div>
  );
};

const LandingPage = (props) => {
  const { fetchRoomsPublic, rooms, fetchBookingsPublic, bookings, isLoadingBookings } = props;
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [view, setView] = useState("day");
  const initialFormState = {
    booking_date: "",
    start_time: "",
    end_time: "",
    purpose: "",
    status: "pending",
    room_id: "",
    room_name: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const buttonRef = useRef(null);
  const options = rooms?.map((item) => {
    return { value: item?.id, label: item?.name };
  });
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();

    if (!formState.room_id || formState.room_id === "" || !formState.booking_date || formState.booking_date === "") {
      toast.error("Isi aula dan tanggal terlebih dahulu", {
        position: "top-right",
        duration: 4000,
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
        },
      });
      return;
    } else {
      fetchBookingsPublic();
    }

    // lanjutkan proses booking di sini
  };

  const ellipsisByWords = (text, maxWords = 15) => {
    if (typeof text !== "string") return "";

    const words = text.trim().split(/\s+/); // Pisah berdasarkan spasi
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  };
  const closeModal = () => {
    setSelectedRoom(null);
  };

  useEffect(() => {
    fetchRoomsPublic();
  }, []);
  useEffect(() => {
    const target = document.body;

    const observer = new MutationObserver(() => {
      if (target.classList.contains("modal-open")) {
      } else {
        closeModal();
      }
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  const allImagesMainWithName = rooms?.map((room) => {
    return {
      image: BASE_URL_STORAGE + room?.images?.find((image) => image?.is_main)?.image_path,
      name: room?.name,
      description: ellipsisByWords(room?.description, 16),
    };
  });
  const events = bookings?.map((item) => {
    const start = new Date(`${item.booking_date}T${item.start_time}`);
    const end = new Date(`${item.booking_date}T${item.end_time}`);

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
      rejected_by: item.rejected_by,
      rejected_at: item.rejected_at,
      rejected_by_name: item.rejected_by_name,
      approved_by: item.approved_by,
      approved_at: item.approved_at,
      approved_by_name: item.approved_by_name,
      cancelled_by: item.cancelled_by,
      cancelled_at: item.cancelled_at,
      cancelled_by_name: item.cancelled_by_name,
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

  return (
    <div className="w-100 h-100" id="home">
      <header className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "4em",
                backgroundColor: "transparent",
                filter: "none",
                mixBlendMode: "normal",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#rooms">
                  Aula
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  Tentang Kami
                </a>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary ms-3" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Section dengan Carousel */}
      <div className="page-wrapper" id="home">
        <div className="page-header d-print-none p-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="hero-swiper">
            {allImagesMainWithName?.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="d-block w-100 hero-image"
                  style={{
                    height: "500px",
                    backgroundImage: `url('${item?.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                    position: "relative",
                    overflow: "hidden",
                    backgroundRepeat: "no-repeat",
                  }}></div>
                <div
                  className="carousel-caption d-md-block text-start"
                  style={{ bottom: "30%", left: "10%", position: "absolute" }}>
                  <h1 className="display-4 fw-bold text-white">{item?.name || "Temukan Kenyamanan Terbaik"}</h1>
                  <p
                    className="lead text-white  "
                    style={{ overflow: "hidden", whiteSpace: "wrap", textOverflow: "ellipsis" }}>
                    {item?.description || "Temukan "}
                  </p>
                  {/* <a href="#rooms" className="btn btn-primary btn-lg mt-3">
                    Lihat Kamar Tersedia
                  </a> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Booking Form Section */}
        <div
          className="container-xl mt-n5 mb-5"
          style={{
            zIndex: 2,
          }}>
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <form onSubmit={handleBooking}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Tanggal Booking</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formState?.booking_date}
                      onChange={(e) => setFormState({ ...formState, booking_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Ruangan</label>
                    <div class="input-icon">
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
                        value={
                          formState?.room_id ? options.find((option) => option.value === formState?.room_id) : null
                        }
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
                  <div className="col-md-2 d-flex align-items-end">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      ref={buttonRef}
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-1-flush"
                      aria-expanded="false">
                      Cari Data<div className="accordion-button-toggle"></div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {formState?.booking_date && formState?.room_id && (
          <div
            // className="page-body"
            id="collapse-1-flush"
            className="page-body accordion-collapse collapse mt-5"
            data-bs-parent="#accordion-flush">
            <div className="container-xl">
              {/* Welcome Section */}
              <div className="row row-cards ">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">
                        {formState?.room_name} pada{" "}
                        {format(formState?.booking_date, "EEEE, dd MMMM yyyy", { locale: id })}
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row row-cards">
                        <div className="col-12">
                          <div className="card">
                            <div className="accordion-item mt-5">
                              <div className="accordion-header"></div>

                              <div
                                id="collapse-1-flush"
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordion-flush">
                                <div className="accordion-body">
                                  {formState?.booking_date && formState?.room_id && (
                                    <div className="col-lg-12">
                                      {isLoadingBookings ? (
                                        <div
                                          className="text-center my-5 "
                                          style={{
                                            height: "28vh",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}>
                                          <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="mb-3 input-icon">
                                          <Calendar
                                            localizer={localizer}
                                            events={
                                              events?.filter((event) => event?.room_id === formState?.room_id) || events
                                            }
                                            startAccessor="start"
                                            endAccessor="end"
                                            style={{ height: "30vh" }}
                                            defaultView="week"
                                            selectable={false}
                                            date={formState?.booking_date || new Date()}
                                            views={["month", "week", "day", "agenda"]}
                                            view={view}
                                            eventPropGetter={eventStyleGetter}
                                            culture="id-ID"
                                            showAllDay={false}
                                            components={{
                                              event: EventCard,
                                              allDay: () => null,
                                            }}
                                            max={new Date(new Date().setHours(20, 0, 0, 0))}
                                            min={new Date(new Date().setHours(7, 0, 0, 0))}
                                            popup
                                            toolbar={false}
                                            onSelectEvent={(event) => {
                                              // pindah halaman
                                              navigate(`/login`);
                                            }}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="page-body">
          <div className="container-xl">
            {/* Welcome Section */}
            <div className="row row-cards mt-1">
              <div className="col-12">
                <div className="card mx-sm-0 mx-3">
                  <div className="card-header">
                    <h3 className="card-title text-center">Selamat Datang di Sistem Peminjaman/Booking Aula</h3>
                  </div>
                  <div className="card-body" style={{ border: "none" }}>
                    <div className="row align-items-center">
                      <div className="col-12 col-lg-6">
                        <div className="card-body text-center">
                          <img
                            src={allImagesMainWithName[0]?.image}
                            alt="Hotel LuxStay"
                            className="img-fluid rounded"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="card card-lg" style={{ border: "none" }}>
                          <div className="card-body" style={{ border: "none" }}>
                            <h3 className="card-title">Peminjaman Aula Jauh Lebih Mudah</h3>
                            <p className="card-text">
                              Sistem Peminjaman/Booking Aula menawarkan layanan peminjaman aula yang mudah digunakan dan
                              efisien. Dengan fitur-fitur yang lengkap, Anda dapat meminjam aula sesuai dengan kebutuhan
                              Anda dengan mudah.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Listing Section */}
            <h2 id="rooms" className="text-center my-5">
              Aula Tersedia
            </h2>
            <div className="row">
              {/* Room Card 1 */}
              {rooms?.map((room) => (
                <div className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm mx-sm-0 mx-3">
                    <img
                      src={BASE_URL_STORAGE + room?.images?.find((image) => image?.is_main)?.image_path}
                      className="card-img-top"
                      alt="Standard Room"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{room?.name}</h5>
                      <p className="card-text flex-grow-1">{ellipsisByWords(room?.description)}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 text-primary mb-0">{room?.capacity} orang</span>
                        <span className="text-muted">kapasitas</span>
                      </div>
                      <a
                        onClick={() => setSelectedRoom(room)}
                        href="#"
                        // class="btn btn-primary btn-6 d-sm-none btn-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-detail-room"
                        className="btn btn-primary mt-3">
                        Detail
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Facilities Section */}
            <h2 className="text-center my-5" id="about">
              Tentang Kami
            </h2>

            <section className="bg-white py-5 mb-5">
              <div className="container">
                <div className="row align-items-center">
                  {/* Left Content */}
                  <div className="col-md-5 d-flex d-md-none ">
                    <img
                      src={kemenag}
                      alt="kemenag"
                      className="img-fluid mx-auto mb-5"
                      style={{
                        filter: "grayscale(100%)",
                        maxWidth: "40%",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                      onMouseOut={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                    />
                  </div>
                  <div className="col-md-7 text-start">
                    <h1 className="mb-4 display-4 fw-bold">Kementerian Agama</h1>
                    <p className="mb-4 lead text-muted">KANTOR WILAYAH KEMENAG PROV. LAMPUNG</p>
                    <p>
                      Kementerian Agama mempunyai tugas menyelenggarakan urusan pemerintahan di bidang agama untuk
                      membantu Presiden dalam menyelenggarakan pemerintahan negara.
                    </p>
                    <a href="https://lampung.kemenag.go.id/" className="btn btn-primary btn-lg px-4 py-2">
                      Kunjungi Laman
                    </a>
                  </div>

                  {/* Right Image */}
                  <div className="col-md-5 d-none d-md-flex">
                    <img
                      src={kemenag}
                      alt="kemenag"
                      className="img-fluid"
                      style={{
                        filter: "grayscale(100%)",
                        maxWidth: "100%",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                      onMouseOut={(e) => (e.currentTarget.style.filter = "grayscale(100%)")}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="footer footer-transparent d-print-none bg-dark text-light">
          <div className="container-xl">
            <div className="row py-5">
              <div className="col-lg-4 mb-4">
                <h4>Sistem Peminjaman/Booking Aula</h4>
                <p>Sistem untuk peminjaman/booking aula di lingkungan Kemenag Provinsi Lampung</p>
                <div className="social-links">
                  <a href="#facebook" className="text-light me-2">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#twitter" className="text-light me-2">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#instagram" className="text-light me-2">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 mb-4">
                <h5>Tautan Cepat</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#home" className="text-light">
                      Beranda
                    </a>
                  </li>
                  <li>
                    <a href="#rooms" className="text-light">
                      Kamar
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-light">
                      Tentang Kami
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-4 mb-4">
                <h5>Kontak Kami</h5>
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-map-marker-alt me-2"></i> Jl. Gulak No. 1, Lampung
                  </li>
                  <li>
                    <i className="fas fa-phone me-2"></i> +62 21 1234 5678
                  </li>
                  <li>
                    <i className="fas fa-envelope me-2"></i> info@kemenag.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="row text-center align-items-center flex-row-reverse border-top pt-4">
              <div className="col-lg-auto ms-lg-auto"></div>
              <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    Copyright &copy; 2025{" "}
                    <a href="." className="text-light">
                      Data Informasi dan Transformasi Digital - Kementerian Agama Provinsi Lampung
                    </a>
                    . All rights reserved.
                  </li>
                  <li className="list-inline-item">
                    <a href="./changelog.html" className="text-light" rel="noopener">
                      v1.2.0
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <DetailRoom room={selectedRoom} baseUrlStorage={BASE_URL_STORAGE} closeModal={closeModal} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  rooms: state?.rooms?.datas?.data || [],
  isLoading: state?.rooms?.loading,
  bookings: state?.bookings?.datas?.data || [],
  isLoadingBookings: state?.bookings?.loading,
});
export default connect(mapStateToProps, {
  fetchRoomsPublic,
  fetchBookingsPublic,
})(LandingPage);
