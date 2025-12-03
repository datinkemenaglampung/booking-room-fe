import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verivyToken } from "../../actions/authAction/loginAction";
import OverlayLoading from "../../components/Loading/OverlayLoading";

export default function AppLayout({ children, needAuthenticated = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const dispatch = useDispatch();

  // Loading dari redux: state.auth.login.loading
  const isLoading = useSelector((state) => state?.auth?.login?.loading);

  const token = params.get("token");
  const locationPathname = location.pathname;

  // Verifikasi token (hanya ketika masuk /home + token ada)
  useEffect(() => {
    if (token && locationPathname === "/home") {
      dispatch(verivyToken(token));
    }
  }, [token, locationPathname, dispatch]);

  // Ambil auth dari localStorage
  const auth = useMemo(() => {
    const stored = localStorage.getItem("auth");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  // Cek token expired
  useEffect(() => {
    if (auth?.expires_in) {
      const now = Math.floor(Date.now() / 1000);
      if (now >= auth.expires_in) {
        localStorage.removeItem("auth");
        // navigate("/", { replace: true });
      }
    }
  }, [auth]);

  // Tampilkan loading ketika verifikasi token / auth loading
  if (isLoading) {
    return <OverlayLoading isShow={true} />;
  }
  // Cek autentikasi
  if (needAuthenticated && !auth) {
    return null;
  }

  return children;
}
