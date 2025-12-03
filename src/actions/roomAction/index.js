import { BASE_URL } from "../../helpers/config";
import authorizedAxios from "../../helpers/authorizedAxios";
import { showToast } from "../../utils/helpers/ShowToast";
export const SET_ROOMS = "SET_ROOMS";
export const SET_ROOM = "SET_ROOM";
export const SET_ROOMS_LOADING = "SET_ROOMS_LOADING";
export const SET_ROOMS_ERROR = "SET_ROOMS_ERROR";

export const fetchRooms = (limit = 100, page = 1) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOMS_LOADING, status: true });

    try {
      const response = await authorizedAxios.get("/rooms?limit=" + limit + "&page=" + page);

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: SET_ROOMS,
          data: response?.data?.data,
        });
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ROOMS_ERROR,
        error: error?.response?.data || "Terjadi kesalahan saat mengambil data.",
      });
    } finally {
      dispatch({ type: SET_ROOMS_LOADING, status: false });
    }
  };
};
export const fetchRoomsPublic = (limit = 100, page = 1) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOMS_LOADING, status: true });

    try {
      const response = await authorizedAxios.get("/public/rooms?limit=" + limit + "&page=" + page);

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: SET_ROOMS,
          data: response?.data?.data,
        });
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ROOMS_ERROR,
        error: error?.response?.data || "Terjadi kesalahan saat mengambil data.",
      });
    } finally {
      dispatch({ type: SET_ROOMS_LOADING, status: false });
    }
  };
};

export const getRoomById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOMS_LOADING, status: true });

    try {
      const response = await authorizedAxios.get("/rooms/" + id);

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: SET_ROOM,
          data: response.data,
        });
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ROOMS_ERROR,
        error: error?.response?.data || "Terjadi kesalahan saat mengambil data.",
      });
    } finally {
      dispatch({ type: SET_ROOMS_LOADING, status: false });
    }
  };
};

export const addRoom = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOMS_LOADING, status: true });

    try {
      const response = await showToast(authorizedAxios.post(`${BASE_URL}/rooms`, data), {
        loading: "Menyimpan data...",
        success: "Data room berhasil ditambahkan!",
        error: (err) => err?.message || "Gagal menyimpan data!",
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchRooms());
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ROOMS_ERROR,
        error: error?.message || "Terjadi kesalahan.",
      });
    } finally {
      dispatch({ type: SET_ROOMS_LOADING, status: false });
    }
  };
};

export const updateRoom = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOMS_LOADING, status: true });

    try {
      const response = await showToast(authorizedAxios.put(`${BASE_URL}/rooms/${id}`, data), {
        loading: "Mengupdate data...",
        success: "Data room berhasil diupdate!",
        error: (err) => err?.message || "Gagal mengupdate data!",
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchRooms());
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ROOMS_ERROR,
        error: error?.message || "Terjadi kesalahan.",
      });
    } finally {
      dispatch({ type: SET_ROOMS_LOADING, status: false });
    }
  };
};

export const updatePermissions = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOMS_LOADING, status: true });

    try {
      const response = await showToast(authorizedAxios.put(`${BASE_URL}/rooms/${id}/room-permissions`, data), {
        loading: "Mengupdate data...",
        success: "Data room berhasil diupdate!",
        error: (err) => err?.message || "Gagal mengupdate data!",
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchRooms());
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ROOMS_ERROR,
        error: error?.message || "Terjadi kesalahan.",
      });
    } finally {
      dispatch({ type: SET_ROOMS_LOADING, status: false });
    }
  };
};

export const deleteRoom = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_ROOMS_LOADING, status: true });

    try {
      const response = await showToast(authorizedAxios.delete(`${BASE_URL}/rooms/${id}`), {
        loading: "Menghapus data...",
        success: "Data room berhasil dihapus!",
        error: (err) => err?.message || "Gagal menghapus data!",
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchRooms());
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ROOMS_ERROR,
        error: error?.message || "Terjadi kesalahan.",
      });
    } finally {
      dispatch({ type: SET_ROOMS_LOADING, status: false });
    }
  };
};
