import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import React, { useState, useEffect, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, add } from "date-fns";
import idLocale from "date-fns/locale/id";
import { id } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { fetchBookings, getBookingsByMonthUnit, getBookingsByRoom } from "../../actions/bookingAction";
import { fetchRooms } from "../../actions/roomAction";
import { fetchWorkUnits } from "../../actions/workUnitAction";
import { fetchAccounts } from "../../actions/accountAction";
import UserAvatar from "../../components/UserAvatar";

// import navigate
import { useNavigate } from "react-router-dom";

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
          className={`badge rounded-pill px-2 color-white ${bookingStatusBgColor[event.status]}`}
          style={{ fontSize: "0.5rem", alignSelf: "flex-start", color: "white" }}>
          {event.status}
        </span>
        <span
          className={`badge rounded-pill px-2 color-white `}
          style={{ fontSize: "0.5rem", alignSelf: "flex-start", color: "white", backgroundColor: backgroundColor }}>
          {event.room_name}
        </span>
      </div>
    </div>
  );
};
const HomePage = (props) => {
  const {
    fetchBookings,
    fetchRooms,
    fetchWorkUnits,
    bookings,
    isLoading,
    rooms,
    workUnits,
    fetchAccounts,
    accounts,
    getBookingsByMonthUnit,
    totalDataBookingsMonthUnit,
    getBookingsByRoom,
    totalDataBookingsRoom,
  } = props;
  const userProfile = useMemo(() => {
    const dataProfile = localStorage.getItem("userProfile");
    try {
      return dataProfile ? JSON.parse(dataProfile) : null;
    } catch {
      return null;
    }
  }, []);

  const permissions = userProfile?.permissions;
  const [view, setView] = useState("month"); // state untuk kontrol view
  const [date, setDate] = useState(new Date());
  const displayMonth = format(date, "MMMM yyyy", { locale: id });
  const [thisMonth, setThisMonth] = useState(new Date().getMonth());
  // membuat variabel bulan dengan bahasa indoensia dengan datefns

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const navigate = useNavigate();
  const options = {
    chart: {
      height: 230,
      type: "bar", // ganti ke bar
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: totalDataBookingsMonthUnit.map((item) => item?.unit_name),
      labels: {
        rotate: -45,
        // rotateAlways: true,
        // hideOverlappingLabels: true,
        // trim: true,
        minHeight: 50,
        maxHeight: 50,
        style: {
          colors: "#000",
          fontSize: "8px",
          // fontFamily: "Helvetica, Arial, sans-serif",
          // fontWeight: 500,
          cssClass: "applied-class",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: function (val) {
          return val;
        },
      },
      // title: {
      //   text: "Unit",
      // },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + " kali";
        },
      },
    },
  };

  const series = [
    {
      name: "Total Bookings",
      data: totalDataBookingsMonthUnit.map((item) => item?.total_bookings),
    },
  ];

  const optionsPieChart = {
    chart: {
      width: 1000,
      type: "donut",
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: function (val) {
          return val + " kali";
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 0,
    },
    labels: totalDataBookingsRoom.map((item) => item?.room_name),
    legend: {
      show: true,
      position: "bottom",
    },

    responsive: [
      {
        breakpoint: 10,
        options: {
          chart: {
            width: 1000,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],

    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: false, // label tengah dimatikan
          },
        },
      },
    },
  };
  const seriesPieChart = totalDataBookingsRoom.map((item) => item?.total_bookings);

  const events = bookings.map((item) => {
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

  const filteredEvents = events.filter((event) => {
    // bandingin dalam format YYYY-MM

    const eventMonth = format(new Date(event?.booking_date), "yyyy-MM");
    const selectedMonth = format(date, "yyyy-MM");
    return eventMonth === selectedMonth;
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
  const totalBookings = filteredEvents.length;
  const totalRooms = rooms.length;
  const totalWorkUnits = workUnits.length;
  const totalAccounts = accounts.length;

  useEffect(() => {
    fetchBookings();
    fetchRooms();
    fetchWorkUnits();
    fetchAccounts(500);
    getBookingsByMonthUnit(format(date, "yyyy-MM-dd"));
    getBookingsByRoom(format(date, "yyyy-MM-dd"));
  }, []);

  return (
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <div class="page-pretitle">Overview</div>
              <h2 class="page-title">{displayMonth}</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container-xl">
          <div class="row row-deck row-cards">
            <div class="col-12">
              <div class="row row-cards">
                <div class="col-sm-6 col-lg-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-primary text-white avatar">
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
                        </div>
                        <div class="col">
                          <div class="font-weight-medium">Ruangan</div>
                          <div class="text-secondary">{totalRooms} aula</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-green text-white avatar">
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
                              class="lucide lucide-users-icon lucide-users">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                          </span>
                        </div>
                        <div class="col">
                          <div class="font-weight-medium">Unit Kerja</div>
                          <div class="text-secondary">{totalWorkUnits} unit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-lg-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-facebook text-white avatar">
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
                              class="lucide lucide-user-icon lucide-user">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </span>
                        </div>
                        <div class="col">
                          <div class="font-weight-medium">Pengguna</div>
                          <div class="text-secondary">{totalAccounts} user</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-lg-3">
                  <div class="card card-sm">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="bg-primary text-white avatar">
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
                              class="lucide lucide-calendar-days-icon lucide-calendar-days">
                              <path d="M8 2v4" />
                              <path d="M16 2v4" />
                              <rect width="18" height="18" x="3" y="4" rx="2" />
                              <path d="M3 10h18" />
                              <path d="M8 14h.01" />
                              <path d="M12 14h.01" />
                              <path d="M16 14h.01" />
                              <path d="M8 18h.01" />
                              <path d="M12 18h.01" />
                              <path d="M16 18h.01" />
                            </svg>
                          </span>
                        </div>
                        <div class="col">
                          <div class="font-weight-medium">Booking</div>
                          <div class="text-secondary">{totalBookings} x</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                        style={{ height: "50vh" }}
                        defaultView="week"
                        selectable={false}
                        date={date}
                        onView={(newView) => setView(newView)}
                        views={["month", "week", "day", "agenda"]}
                        view={view}
                        onNavigate={(newDate) => setDate(newDate)}
                        eventPropGetter={eventStyleGetter}
                        culture="id-ID"
                        toolbar={false}
                        onSelectEvent={(event) => {
                          // pindah ke tanggal event yang diklik
                          setDate(event.start);
                          // ubah view jadi agenda
                          setView("month");
                          // pindah halaman
                          navigate(`/bookings`);
                        }}
                        components={{
                          month: {
                            // header: MyMonthHeader,
                            // dateHeader: MyMonthDateHeader,
                            event: EventCardMonth,
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
            {permissions?.some((item) => item?.slug == "view-reports") && (
              <>
                <div class="col-lg-9">
                  <div class="card">
                    <div class="card-body">
                      <h3 class="card-title">Unit Peminjam Terbanyak</h3>
                      <div id="chart-mentions" class="chart-lg">
                        <Chart options={options} series={series} type="bar" width="100%" height="100%" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="card">
                    <div class="card-body">
                      <h3 class="card-title">Aula Sering Digunakan</h3>
                      <div id="pie-chart" class="chart-lg">
                        <Chart
                          options={optionsPieChart}
                          series={seriesPieChart}
                          type="donut"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bookings: state?.bookings?.datas?.data || [],
  rooms: state?.rooms?.datas?.data || [],
  workUnits: state?.workUnits?.datas?.data || [],
  accounts: state?.accounts?.datas?.data || [],
  totalDataBookingsMonthUnit: state?.bookings?.dataByMonthUnit || [],
  totalDataBookingsRoom: state?.bookings?.dataByRoom || [],
  isLoading: state?.bookings?.loading,
  error: state?.bookings?.error,
});
export default connect(mapStateToProps, {
  fetchBookings,
  fetchRooms,
  fetchWorkUnits,
  fetchAccounts,
  getBookingsByMonthUnit,
  getBookingsByRoom,
})(HomePage);
