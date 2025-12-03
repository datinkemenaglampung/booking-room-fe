import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";
import { fileToBase64 } from "../../../../utils/helpers/fileToBase64";
import { BASE_URL_STORAGE } from "../../../../helpers/config";
import { toast } from "react-hot-toast";

const FormRoom = (props) => {
  const {
    workUnits,
    users,
    isShowModal,
    isEdit,
    closeModal,
    formState,
    setFormState,
    handleAdd,
    handleUpdate,
    handleUpdateRoom,
  } = props;
  // const imageSrc = BASE_URL_STORAGE + imageUrl;
  const [showPassword, setShowPassword] = useState(false);
  const inputRefName = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRefName.current?.focus();
  }, []);

  const optionsUser = users.map((item) => {
    return { value: item?.id, label: item?.name };
  });

  return (
    <div
      className="modal modal-blur fade "
      id="modal-form"
      tabindex="-1"
      role="dialog"
      aria-hidden="false"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}>
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Master Ruangan {!isEdit ? "Baru" : "Edit"}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12">
                <label class="form-label">Nama Ruangan</label>
                <div class="mb-3 input-icon">
                  <span class="input-icon-addon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-warehouse-icon lucide-warehouse">
                      <path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" />
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" />
                      <path d="M6 13h12" />
                      <path d="M6 17h12" />
                    </svg>
                  </span>
                  <input
                    ref={inputRefName}
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="nama ruangan"
                    value={formState?.name || ""}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <label class="form-label">Deskripsi</label>
                <div class="mb-3 input-icon">
                  <span class="input-icon-addon">
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
                      class="icon icon-tabler icons-tabler-outline icon-tabler-at">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="deskripsi ruangan"
                    value={formState?.description || ""}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <label class="form-label">Kapasitas</label>
                <div class="mb-3 input-icon">
                  <span class="input-icon-addon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-users-icon lucide-users">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    onWheel={(e) => e.target.blur()}
                    name="description"
                    placeholder="kapasitas ruangan"
                    value={formState?.capacity || ""}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        capacity: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <label className="form-label">PIC / Penanggung Jawab</label>
                <div className="mb-3 input-icon">
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
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-user-cog-icon lucide-user-cog">
                      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                      <path d="m14.305 16.53.923-.382" />
                      <path d="m15.228 13.852-.923-.383" />
                      <path d="m16.852 12.228-.383-.923" />
                      <path d="m16.852 17.772-.383.924" />
                      <path d="m19.148 12.228.383-.923" />
                      <path d="m19.53 18.696-.382-.924" />
                      <path d="m20.772 13.852.924-.383" />
                      <path d="m20.772 16.148.924.383" />
                      <circle cx="18" cy="15" r="3" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </span>
                  <Select
                    options={optionsUser || []}
                    name="pic_id"
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
                    value={formState?.pic_id ? optionsUser.find((option) => option.value === formState?.pic_id) : null}
                    onChange={(selectedOptions) => {
                      setFormState({
                        ...formState,
                        pic_id: selectedOptions?.value || "",
                        pic_name: selectedOptions?.label || "",
                      });
                    }}
                    placeholder="-- pilih pic --"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <label class="form-label">Foto Ruangan</label>
                <div class="mb-3 w-100 ">
                  <div className="card  d-flex justify-content-center align-content-center w-100">
                    <DragDropFile setFormState={setFormState} formState={formState} />

                    {formState?.images?.length > 0 ? (
                      <div
                        className="list-group my-1 mx-1 d-flex flex-column gap-2 shadow-sm mt-4"
                        style={{
                          maxHeight: "21.7em",
                          overflowY: "auto",
                          overflowX: "hidden",
                        }}>
                        {formState?.images?.map((file, index) => (
                          <div
                            // key={file.id}
                            className="list-group-item d-flex align-items-center shadow-sm"
                            style={{
                              border: "1px solid #e9ecef",
                              borderRadius: "0.5rem",
                              padding: "0.5rem",
                              width: "100%",
                              boxSizing: "border-box",
                            }}>
                            {/* set main image button */}
                            <div className="d-flex align-items-center justify-content-center me-3">
                              <button
                                className={
                                  file?.is_main == 1
                                    ? "btn btn-success btn-sm"
                                    : " btn btn-outline-success btn-sm outline-0"
                                }
                                onClick={() => {
                                  setFormState((prev) => ({
                                    ...prev,
                                    images: prev?.images?.map((img, i) => ({
                                      ...img,
                                      is_main: i === index ? 1 : 0,
                                    })),
                                  }));
                                  toast.success(
                                    (file?.id ? file?.image_path : file?.file_name) + "  di set sebagai thumbnail",
                                    {
                                      position: "top-right",
                                      autoClose: 2000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    }
                                  );
                                }}
                                type="button"
                                title="Main File"
                                style={{
                                  borderRadius: "0.5rem",
                                  padding: "0.5rem",
                                  border: file?.is_main == 0 ? "none" : "1px ",
                                }}
                                // onClick={() => handleDelete(file.id)}
                                // disabled={loading}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="1.25"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="lucide lucide-circle-star-icon lucide-circle-star">
                                  <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
                                  <circle cx="12" cy="12" r="10" />
                                </svg>
                              </button>
                            </div>
                            {/* Preview file */}
                            <div className="d-flex align-items-center justify-content-center">
                              <object
                                data={file?.id ? BASE_URL_STORAGE + file?.image_path : file?.image_path} // URL atau path ke file
                                type={file?.image_path == "image" ? "image/png" : "image/png"} // Tipe konten dinamis berdasarkan jenis file
                                style={{
                                  borderRadius: "0.2rem",
                                  height: "3.8em",
                                  objectFit: "cover",
                                  // padding: "0 0.5rem",
                                  width: "6.8em",
                                }}
                                className="object-fit-cover border rounded">
                                {/* Fallback text atau komponen yang ditampilkan jika browser tidak mendukung objek ini */}
                                {/* <p>File tidak dapat ditampilkan</p> */}
                              </object>
                            </div>

                            {/* File details */}
                            <div className="d-flex flex-column w-100 justify-content-start ms-3">
                              <span className="fw-bold">
                                {file?.id ? file?.image_path?.split("/").pop() : file?.file_name}
                              </span>
                              <small className="text-muted">{file.sizeInMB} MB</small>
                            </div>

                            {/* Delete button */}
                            <div className="d-flex align-items-center justify-content-center">
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  // jika file yang dihapus adalah main image, set main image ke gambar pertama jika ada
                                  setFormState((prev) => ({
                                    ...prev,
                                    images: prev?.images?.map((img, i) => ({
                                      ...img,
                                      is_main: i === 0 ? 1 : 0,
                                    })),
                                  }));
                                  setFormState((prev) => ({
                                    ...prev,
                                    images: prev?.images?.filter((_, i) => i !== index),
                                  }));
                                }}
                                type="button"
                                title="Hapus File"
                                style={{
                                  borderRadius: "0.5rem",
                                  padding: "0.5rem",
                                }}
                                // onClick={() => handleDelete(file.id)}
                                // disabled={loading}
                              >
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
                                  class="lucide lucide-trash2-icon lucide-trash-2">
                                  <path d="M10 11v6" />
                                  <path d="M14 11v6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                  <path d="M3 6h18" />
                                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <a href="#" class="btn btn-link link-secondary btn-3" data-bs-dismiss="modal">
              {" "}
              Cancel{" "}
            </a>
            {isEdit ? (
              <a href="#" class="btn bg-secondary-lt btn-5 ms-auto" data-bs-dismiss="modal" onClick={handleUpdateRoom}>
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
              <a href="#" class="btn btn-primary btn-5 ms-auto" data-bs-dismiss="modal" onClick={handleAdd}>
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
const DragDropFile = (props) => {
  const { setFormState, formState } = props;
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

  return (
    <FileUploader
      multiple={false}
      handleChange={async (file) => {
        if (file.length !== 0) {
          const base64 = await fileToBase64(file);

          // setFormState({
          //   ...formState,
          //   image_path: base64,
          //   imageUrl: URL.createObjectURL(file),
          //   file_name: file?.name,
          // });
          setFormState((prev) => ({
            ...prev,
            images: [
              ...prev?.images,
              {
                room_id: formState?.id || null,
                is_main: prev?.images?.length === 0 ? 1 : 0,
                image_path: base64,
                imageUrl: URL.createObjectURL(file),
                file_name: file?.name,
              },
            ],
          }));
        }
      }}
      name="file"
      types={fileTypes}
      dropMessageStyle={{ margin: "0  0.5rem" }}
      style={{ position: "relative" }}>
      <div className="d-flex align-items-center justify-content-center w-100 ">
        <label
          htmlFor="dropzone-file"
          className="d-flex flex-column align-items-center justify-content-center w-100  rounded cursor-pointer bg-light"
          style={{ height: "16rem" }}>
          <div className="d-flex flex-column align-items-center justify-content-center pt-3 pb-3">
            <svg
              className="mb-3 text-secondary"
              width="32"
              height="32"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-muted small">
              <strong>Click Untuk upload</strong> atau drag and drop
            </p>
            <p className="text-muted small">SVG, PNG, JPG atau GIF (MAX. 3 Mb)</p>
          </div>
        </label>
      </div>

      {/* {formState?.image_path || formState?.image || formState?.imageUrl ? (
        <div
          className="d-flex align-items-center justify-content-center w-100 position-absolute bottom-0 z-0 border border-primary rounded transition-opacity"
          style={{
            height: "16rem",
            opacity: "1",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
          <img
            src={formState?.imageUrl || BASE_URL_STORAGE + formState?.image_path}
            className="rounded h-100 w-100 p-2 object-fit-contain"
            alt="image"
          />
        </div>
      ) : (
        ""
      )} */}
    </FileUploader>
  );
};

export default FormRoom;
