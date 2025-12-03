import React, { useState, useEffect } from "react";
import {
  fetchRooms,
  getRoomById,
  addRoom,
  updateRoom,
  updatePermissions,
  deleteRoom,
} from "../../../actions/roomAction";
import { fetchAccounts } from "../../../actions/accountAction";
import { fetchPermissions } from "../../../actions/permissionAction";
import { connect } from "react-redux";
import ModalDelete from "../../../components/Modals/ModalDelete";
import FormRoom from "./FormRoom";
import UserAvatar from "../../../components/UserAvatar";
// import FormPermissionPicker from "./FormPermissionPicker";

const RoomPage = (props) => {
  const {
    users,
    room,
    rooms,
    isLoading,
    fetchRooms,
    getRoomById,
    addRoom,
    updateRoom,
    updatePermissions,
    deleteRoom,
    total_data,
    fetchPermissions,
    permissions,
    isLoadingPermission,
    permissionsss,
    fetchAccounts,
  } = props;
  const [perPage, setPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const initialState = {
    id: "",
    name: "",
    description: "",
    capacity: "",
    pic_id: "",
    pic_name: "",
    images: [],
  };
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [items, setItems] = useState(rooms || []);
  const [formState, setFormState] = useState(initialState);

  const totalPages = Math.ceil(total_data / perPage) || 1;
  const paginatedItems = items;
  const openModal = () => {
    setFormState(initialState);
    setIsShowModal(true);
    setIsEdit(false);
  };
  const closeModal = () => {
    setFormState(initialState);
    setIsShowModal(false);
    setIsEdit(false);
  };
  const openModalDelete = () => {
    setFormState(initialState);
    setIsShowModalDelete(true);
  };
  const closeModalDelete = () => {
    setFormState(initialState);
    setIsShowModalDelete(false);
  };
  const handleDelete = () => {
    deleteRoom(formState?.id);
  };
  const handleAdd = () => {
    addRoom(formState);
  };
  const handleUpdate = () => {
    updatePermissions(formState?.id, formState);
  };
  const handleUpdateRoom = () => {
    updateRoom(formState?.id, formState);
  };
  const handleCheckboxChange = (e, id, datas) => {
    const isChecked = e.target.checked;
    const values = {
      name: datas?.name,
      id: datas?.id,
    };
    if (isChecked) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        permissions: [...prevFormState.permissions, values],
      }));
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        permissions: prevFormState.permissions.filter((item) => item?.id !== id),
      }));
    }
  };
  const handleCheckAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        permissions: permissions?.map((item) => ({
          name: item?.name,
          id: item?.id,
        })),
      }));
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        permissions: [],
      }));
    }
  };

  const ellipsisByWords = (text, maxWords = 15) => {
    if (typeof text !== "string") return "";

    const words = text.trim().split(/\s+/); // Pisah berdasarkan spasi
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  };

  useEffect(() => {
    fetchAccounts(500);
    fetchRooms(perPage, currentPage);
  }, [perPage, currentPage]);
  useEffect(() => {
    if (rooms) {
      const filteredItems = rooms?.filter((item) => {
        const isTextMatch =
          item?.username?.toLowerCase()?.includes(filterText?.toLowerCase()) ||
          item?.name?.toLowerCase()?.includes(filterText?.toLowerCase());

        return isTextMatch;
      });
      setItems(filteredItems);
    }
  }, [rooms, filterText]);

  return (
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <div class="page-pretitle">Master ROOM - RUANGAN</div>
              <h2 class="page-title">Room</h2>
            </div>
            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="#"
                  class="btn btn-primary btn-5 d-none d-sm-inline-block"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-form"
                  onClick={openModal}>
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
                  Tambah Room
                </a>
                <a
                  href="#"
                  class="btn btn-primary btn-6 d-sm-none btn-icon"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-form"
                  onClick={openModal}>
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container-xl">
          <div class="row row-deck row-cards">
            <div class="col-12">
              <div class="card">
                <div class="card-table">
                  <div class="card-header ">
                    <div class="row w-full">
                      <div class="col-md-9 col-12">
                        <h3 class="card-title mb-0">Room</h3>
                        <p class="text-secondary m-0">Master Room di Booking Room</p>
                      </div>
                      <div className="col-md-3 col-12 my-md-0 my-2">
                        <div class="input-group input-group-flat w-auto">
                          <span class="input-group-text">
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
                              class="icon icon-1">
                              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                              <path d="M21 21l-6 -6" />
                            </svg>
                          </span>
                          <input
                            id="advanced-table-search"
                            type="text"
                            class="form-control"
                            autocomplete="off"
                            onChange={(e) => {
                              setFilterText(e.target.value);
                            }}
                            placeholder="Cari..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="advanced-table">
                    <div class="table-responsive">
                      <table class="table table-vcenter table-selectable">
                        <thead>
                          <tr>
                            <th>
                              <button class="table-sort d-flex justify-content-between" data-sort="sort-name">
                                No
                              </button>
                            </th>
                            <th>
                              <button class="table-sort d-flex justify-content-between" data-sort="sort-city">
                                Room
                              </button>
                            </th>
                            <th>
                              <button class="table-sort d-flex justify-content-between" data-sort="sort-city">
                                Kapasitas
                              </button>
                            </th>
                            <th>
                              <button class="table-sort d-flex justify-content-between" data-sort="sort-city">
                                Deskripsi
                              </button>
                            </th>
                            <th>
                              <button class="table-sort d-flex justify-content-between" data-sort="sort-city">
                                PIC Ruangan
                              </button>
                            </th>

                            <th>
                              <button class="table-sort d-flex justify-content-between" data-sort="sort-status">
                                Foto
                              </button>
                            </th>

                            <th></th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody className="table-tbody">
                          {isLoading
                            ? [...Array(10)]?.map((_, index) => (
                                <tr
                                  key={`loading-${index}`}
                                  style={{
                                    cursor: "loader",
                                  }}>
                                  <td className="sort-name py-3">{(currentPage - 1) * perPage + index + 1}.</td>
                                  {[...Array(3)]?.map((_, i) => (
                                    <td key={i} className="w-25">
                                      <div className="placeholder placeholder-lg w-75"></div>
                                    </td>
                                  ))}
                                  <td>
                                    <div className="placeholder placeholder-lg w-100"></div>
                                  </td>
                                  <td>
                                    <div className="placeholder placeholder-lg w-75"></div>
                                  </td>
                                </tr>
                              ))
                            : paginatedItems?.map((room, index) => (
                                <tr key={room?.id}>
                                  <td className="sort-name">{(currentPage - 1) * perPage + index + 1}.</td>
                                  <td className="sort-city">{room?.name}</td>
                                  <td className="sort-city">
                                    {room?.capacity}{" "}
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
                                      class="lucide lucide-users-icon lucide-users">
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                      <circle cx="9" cy="7" r="4" />
                                    </svg>
                                  </td>
                                  <td className="sort-city">{ellipsisByWords(room?.description, 15)}</td>
                                  <td className="sort-city">{room?.pic_name}</td>
                                  <td className="sort-status">
                                    {/* {room?.images?.map((image, idx) => (
                                      <UserAvatar fullName={room?.name} imageUrl={image?.image_path} size="md" className="avatar avatar-lg m-1 shadow" />
                                    ))} */}
                                    <UserAvatar
                                      isMultiple={true}
                                      datas={room?.images}
                                      fullName={room?.name}
                                      size="md"
                                      className="avatar avatar-lg m-1 shadow"
                                    />
                                  </td>

                                  <td>
                                    <div class="btn-list flex-nowrap justify-content-center">
                                      <a
                                        href="#"
                                        class="btn btn-1 bg-secondary-lt"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal-form"
                                        aria-label="Create new report"
                                        onClick={() => {
                                          setIsEdit(true);
                                          setFormState({
                                            id: room?.id,
                                            name: room?.name,
                                            description: room?.description,
                                            capacity: room?.capacity,
                                            pic_id: room?.pic_id,
                                            pic_name: room?.pic_name,
                                            images: room?.images || [],
                                          });
                                          setIsShowModal(true);
                                        }}>
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
                                        </svg>{" "}
                                        Edit{" "}
                                      </a>
                                      <a
                                        href="#"
                                        class="btn btn-1 bg-danger-lt"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal-delete"
                                        aria-label="Create new report"
                                        onClick={() => {
                                          setFormState({
                                            id: room?.id,
                                            name: room?.name,
                                            permissions: room?.permissions || [],
                                          });
                                        }}>
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
                                          class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                          <path d="M4 7l16 0" />
                                          <path d="M10 11l0 6" />
                                          <path d="M14 11l0 6" />
                                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>{" "}
                                        Hapus
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                      <div className="dropdown">
                        <button className="btn dropdown-toggle" data-bs-toggle="dropdown">
                          <span id="page-count" className="me-1">
                            {perPage}
                          </span>
                          <span>records</span>
                        </button>
                        <div className="dropdown-menu">
                          {[50, 100, 250]?.map((value) => (
                            <button key={value} className="dropdown-item" onClick={() => handlePerPageChange(value)}>
                              {value} records
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="d-flex ">
                        <p class="ms-2 my-auto text-secondary">
                          {paginatedItems?.length} dari <span>{total_data}</span> <span>data</span>
                        </p>
                      </div>

                      <ul className="pagination m-0 ms-auto">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                            <svg width="24" height="24" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                              <path d="M15 6l-6 6l6 6" />
                            </svg>
                            prev
                          </button>
                        </li>

                        {[...Array(totalPages)]?.map((_, idx) => {
                          const page = idx + 1;
                          return (
                            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                              <button className="page-link" onClick={() => setCurrentPage(page)}>
                                {page}
                              </button>
                            </li>
                          );
                        })}

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
                            next
                            <svg width="24" height="24" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                              <path d="M9 6l6 6l-6 6" />
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormRoom
        isShowModal={isShowModal}
        isEdit={isEdit}
        closeModal={closeModal}
        formState={formState}
        setFormState={setFormState}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleUpdateRoom={handleUpdateRoom}
        users={users}
      />
      <ModalDelete
        labelModal={formState?.name}
        isShowModal={isShowModalDelete}
        closeModal={closeModalDelete}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state?.accounts?.datas?.data || [],
  room: state?.rooms?.data?.data,
  rooms: state?.rooms?.datas?.data || [],
  total_data: state?.rooms?.datas?.total,
  isLoading: state?.rooms?.loading,
  permissions: state?.permissions?.datas || [],
  isLoadingPermission: state?.permissions?.loading,
});

export default connect(mapStateToProps, {
  fetchRooms,
  fetchAccounts,
  fetchPermissions,
  getRoomById,
  addRoom,
  updatePermissions,
  updateRoom,
  deleteRoom,
})(RoomPage);
