import React, { useRef, useState, useEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/authAction/loginAction";
import OverlayLoading from "../../components/Loading/OverlayLoading";
import logo from "../../assets/images/logo_kemenag.png";
import { toast } from "react-hot-toast";

const LoginPage = (props) => {
  const { login, isLoading } = props;
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
  });
  const location = useLocation();
  const errorMessage = localStorage.getItem("verivyErrorMessage");
  const [showPassword, setShowPassword] = useState(false);
  const inputRefUsername = useRef(null);
  const inputRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    login(formState);
  };

  useEffect(() => {
    inputRefUsername.current?.focus();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      // Show toast error
      toast.error(decodeURIComponent(errorMessage));
      localStorage.removeItem("verivyErrorMessage");
    }
  }, []);

  return (
    <div class="container container-tight py-4">
      <div class="text-center mb-1">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "10em",
            backgroundColor: "#fff",
            filter: "none",
            mixBlendMode: "normal",
            borderRadius: "0.5em",
            boxShadow: "0 0 0.5em rgba(0, 0, 0, 0.1)",
            padding: "1em",
            marginTop: "1em",
            marginBottom: "1em",
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <div class="card card-md">
        <div class="card-body">
          <h2 class="h2 text-center mb-4">Login ke akun anda</h2>
          <form novalidate onSubmit={handleLogin}>
            <div class="mb-3">
              <label class="form-label">NIP</label>
              <input
                ref={inputRefUsername}
                type="text"
                class="form-control"
                placeholder="nomor induk pegawai"
                autocomplete="off"
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    email: e.target.value?.slice(0, 30),
                    username: e.target.value?.slice(0, 30),
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    inputRef.current?.focus();
                  }
                }}
              />
            </div>
            <div class="mb-2">
              <label class="form-label">
                Password
                <span class="form-label-description">
                  <a href="./forgot-password.html">Lupa password</a>
                </span>
              </label>
              <div class="input-group input-group-flat">
                <input
                  ref={inputRef}
                  type={showPassword ? "text" : "password"}
                  class="form-control"
                  placeholder="password"
                  autocomplete="off"
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      password: e.target.value?.slice(0, 30),
                    });
                  }}
                />
                <span class="input-group-text">
                  <div
                    class="link-secondary cursor-pointer"
                    title="Show password"
                    data-bs-toggle="tooltip"
                    onClick={() => {
                      const input = inputRef.current;
                      const length = input.value.length;
                      setShowPassword(!showPassword);
                      if (input) {
                        setTimeout(() => {
                          input.focus();
                          input.setSelectionRange(length, length);
                        }, 0);
                      }
                    }}>
                    {showPassword ? (
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
                        class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
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
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                      </svg>
                    )}
                  </div>
                </span>
              </div>
            </div>
            <div class="mb-2">
              <label class="form-check">
                <input type="checkbox" class="form-check-input" />
                <span class="form-check-label">Ingatkan di perangkat ini</span>
              </label>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="text-center text-secondary mt-3">
        Login dengan{" "}
        <a href="https://sso.kemenag.go.id/auth/signin?appid=7dca7a5d2dbb18d09a917af7525b9d4f" tabindex="-1">
          SSO KEMENAG
        </a>
      </div>
      <OverlayLoading isShow={isLoading} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state?.auth?.login?.loading,
});

export default connect(mapStateToProps, {
  login,
})(LoginPage);
