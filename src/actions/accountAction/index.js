import { BASE_URL } from "../../helpers/config";
import authorizedAxios from "../../helpers/authorizedAxios";
import { showToast } from "../../utils/helpers/ShowToast";
export const SET_ACCOUNTS = "SET_ACCOUNTS";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_ACCOUNTS_LOADING = "SET_ACCOUNTS_LOADING";
export const SET_ACCOUNTS_ERROR = "SET_ACCOUNTS_ERROR";

export const fetchAccounts = (limit = 250, page = 1) => {
  return async (dispatch) => {
    dispatch({ type: SET_ACCOUNTS_LOADING, status: true });

    try {
      const response = await authorizedAxios.get("/users?limit=" + limit + "&page=" + page);

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: SET_ACCOUNTS,
          data: response?.data?.data,
        });
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ACCOUNTS_ERROR,
        error: error?.response?.data || "Terjadi kesalahan saat mengambil data.",
      });
    } finally {
      dispatch({ type: SET_ACCOUNTS_LOADING, status: false });
    }
  };
};

export const getAccountById = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_ACCOUNTS_LOADING, status: true });

    try {
      const response = await authorizedAxios.get("/users/" + id);

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: SET_ACCOUNT,
          data: response.data,
        });
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ACCOUNTS_ERROR,
        error: error?.response?.data || "Terjadi kesalahan saat mengambil data.",
      });
    } finally {
      dispatch({ type: SET_ACCOUNTS_LOADING, status: false });
    }
  };
};

export const addAccount = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_ACCOUNTS_LOADING, status: true });

    try {
      const response = await showToast(authorizedAxios.post(`${BASE_URL}/users`, data), {
        loading: "Menyimpan data...",
        success: "Data akun berhasil ditambahkan!",
        error: (err) => err?.message || "Gagal menyimpan data!",
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchAccounts());
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ACCOUNTS_ERROR,
        error: error?.message || "Terjadi kesalahan.",
      });
    } finally {
      dispatch({ type: SET_ACCOUNTS_LOADING, status: false });
    }
  };
};

export const updateAccount = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_ACCOUNTS_LOADING, status: true });

    try {
      const response = await showToast(authorizedAxios.put(`${BASE_URL}/users/${id}`, data), {
        loading: "Mengupdate data...",
        success: "Data akun berhasil diupdate!",
        error: (err) => err?.response?.data?.message || "Gagal mengupdate data!",
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchAccounts());
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ACCOUNTS_ERROR,
        error: error?.message || "Terjadi kesalahan.",
      });
    } finally {
      dispatch({ type: SET_ACCOUNTS_LOADING, status: false });
    }
  };
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_ACCOUNTS_LOADING, status: true });

    try {
      const response = await showToast(authorizedAxios.delete(`${BASE_URL}/users/${id}`), {
        loading: "Menghapus data...",
        success: "Data akun berhasil dihapus!",
        error: (err) => err?.message || "Gagal menghapus data!",
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchAccounts());
      }
    } catch (error) {
      console.error("error", error);
      dispatch({
        type: SET_ACCOUNTS_ERROR,
        error: error?.message || "Terjadi kesalahan.",
      });
    } finally {
      dispatch({ type: SET_ACCOUNTS_LOADING, status: false });
    }
  };
};
