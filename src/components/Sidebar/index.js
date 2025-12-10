import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authAction/loginAction";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import UserAvatar from "../../components/UserAvatar";
const Sidebar = (props) => {
  const { logout, userProfile } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const [isAreaExpanded, setAreaExpanded] = useState(false);
  useEffect(() => {
    setAreaExpanded(false);
  }, [pathname]);

  const permissions = userProfile?.permissions;

  return (
    <aside class="navbar navbar-vertical navbar-left navbar-expand-lg">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded={isAreaExpanded}
          aria-label="Toggle navigation"
          onClick={() => setAreaExpanded(!isAreaExpanded)}>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-brand navbar-brand-autodark">
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
        </div>
        <div class="navbar-nav flex-row d-lg-none">
          <div class="nav-item d-none d-lg-flex me-3">
            <div class="btn-list">
              <a href="https://github.com/tabler/tabler" class="btn btn-5" target="_blank" rel="noreferrer">
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
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
                Source code
              </a>
              <a href="https://github.com/sponsors/codecalm" class="btn btn-6" target="_blank" rel="noreferrer">
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
                  class="icon text-pink icon-2">
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
                Sponsor
              </a>
            </div>
          </div>
          <div class="d-none d-lg-flex">
            <div class="nav-item">
              <a
                href="?theme=dark"
                class="nav-link px-0 hide-theme-dark"
                title="Enable dark mode"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom">
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
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                </svg>
              </a>
              <a
                href="?theme=light"
                class="nav-link px-0 hide-theme-light"
                title="Enable light mode"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom">
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
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                </svg>
              </a>
            </div>
            <div class="nav-item dropdown d-none d-md-flex">
              <a
                href="#"
                class="nav-link px-0"
                data-bs-toggle="dropdown"
                tabindex="-1"
                aria-label="Show notifications"
                data-bs-auto-close="outside"
                aria-expanded="false">
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
                  <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <span class="badge bg-red"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                <div class="card">
                  <div class="card-header d-flex">
                    <h3 class="card-title">Notifications</h3>
                    <div class="btn-close ms-auto" data-bs-dismiss="dropdown"></div>
                  </div>
                  <div class="list-group list-group-flush list-group-hoverable">
                    <div class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="status-dot status-dot-animated bg-red d-block"></span>
                        </div>
                        <div class="col text-truncate">
                          <a href="#" class="text-body d-block">
                            Example 1
                          </a>
                          <div class="d-block text-secondary text-truncate mt-n1">
                            Change deprecated html tags to text decoration classes (#29604)
                          </div>
                        </div>
                        <div class="col-auto">
                          <a href="#" class="list-group-item-actions">
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
                              class="icon text-muted icon-2">
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="status-dot d-block"></span>
                        </div>
                        <div class="col text-truncate">
                          <a href="#" class="text-body d-block">
                            Example 2
                          </a>
                          <div class="d-block text-secondary text-truncate mt-n1">
                            justify-content:between ⇒ justify-content:space-between (#29734)
                          </div>
                        </div>
                        <div class="col-auto">
                          <a href="#" class="list-group-item-actions show">
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
                              class="icon text-yellow icon-2">
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="status-dot d-block"></span>
                        </div>
                        <div class="col text-truncate">
                          <a href="#" class="text-body d-block">
                            Example 3
                          </a>
                          <div class="d-block text-secondary text-truncate mt-n1">
                            Update change-version.js (#29736)
                          </div>
                        </div>
                        <div class="col-auto">
                          <a href="#" class="list-group-item-actions">
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
                              class="icon text-muted icon-2">
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col-auto">
                          <span class="status-dot status-dot-animated bg-green d-block"></span>
                        </div>
                        <div class="col text-truncate">
                          <a href="#" class="text-body d-block">
                            Example 4
                          </a>
                          <div class="d-block text-secondary text-truncate mt-n1">
                            Regenerate package-lock.json (#29730)
                          </div>
                        </div>
                        <div class="col-auto">
                          <a href="#" class="list-group-item-actions">
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
                              class="icon text-muted icon-2">
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <a href="#" class="btn btn-2 w-100">
                          {" "}
                          Archive all{" "}
                        </a>
                      </div>
                      <div class="col">
                        <a href="#" class="btn btn-2 w-100">
                          {" "}
                          Mark all as read{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="nav-item dropdown d-none d-md-flex me-3">
              <a
                href="#"
                class="nav-link px-0"
                data-bs-toggle="dropdown"
                tabindex="-1"
                aria-label="Show app menu"
                data-bs-auto-close="outside"
                aria-expanded="false">
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
                  <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                  <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                  <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                  <path d="M14 7l6 0" />
                  <path d="M17 4l0 6" />
                </svg>
              </a>
              <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">My Apps</div>
                    <div class="card-actions btn-actions">
                      <a href="#" class="btn-action">
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
                          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="card-body scroll-y p-2" style={{ maxHeight: "50vh" }}>
                    <div class="row g-0">
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/amazon.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Amazon</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/android.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Android</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/app-store.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Apple App Store</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/apple-podcast.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Apple Podcast</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/apple.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Apple</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/behance.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Behance</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/discord.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Discord</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/dribbble.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Dribbble</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/dropbox.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Dropbox</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/ever-green.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Ever Green</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/facebook.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Facebook</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/figma.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Figma</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/github.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">GitHub</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/gitlab.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">GitLab</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-ads.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Ads</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-adsense.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google AdSense</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-analytics.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Analytics</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-cloud.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Cloud</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-drive.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Drive</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-fit.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Fit</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-home.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Home</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-maps.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Maps</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-meet.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Meet</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-photos.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Photos</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-play.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Play</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-shopping.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Shopping</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google-teams.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google Teams</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/google.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Google</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/instagram.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Instagram</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/klarna.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Klarna</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/linkedin.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">LinkedIn</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/mailchimp.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Mailchimp</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/medium.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Medium</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/messenger.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Messenger</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/meta.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Meta</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/monday.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Monday</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/netflix.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Netflix</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/notion.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Notion</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/office-365.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Office 365</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/opera.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Opera</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/paypal.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">PayPal</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/petreon.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Patreon</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/pinterest.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Pinterest</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/play-store.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Play Store</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/quora.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Quora</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/reddit.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Reddit</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/shopify.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Shopify</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/skype.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Skype</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/slack.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Slack</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/snapchat.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Snapchat</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/soundcloud.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">SoundCloud</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/spotify.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Spotify</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/stripe.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Stripe</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/telegram.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Telegram</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/tiktok.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">TikTok</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/tinder.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Tinder</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/trello.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Trello</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/truth.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Truth</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/tumblr.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Tumblr</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/twitch.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Twitch</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/twitter.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Twitter</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/vimeo.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Vimeo</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/vk.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">VK</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/watppad.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Wattpad</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/webflow.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Webflow</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/whatsapp.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">WhatsApp</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/wordpress.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">WordPress</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/xing.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Xing</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/yelp.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Yelp</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/youtube.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">YouTube</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/zapier.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Zapier</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/zendesk.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Zendesk</span>
                        </a>
                      </div>
                      <div class="col-4">
                        <a
                          href="#"
                          class="d-flex flex-column flex-center text-center text-secondary py-2 px-2 link-hoverable">
                          <img
                            src="./static/brands/zoom.svg"
                            class="w-6 h-6 mx-auto mb-2"
                            width="24"
                            height="24"
                            alt=""
                          />
                          <span class="h5">Zoom</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item dropdown">
            <a href="#" class="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown" aria-label="Open user menu">
              <UserAvatar
                fullName={userProfile?.name}
                imageUrl={userProfile?.image_path}
                size="sm"
                className=""
                justPhotoView={true}
              />

              <div class="d-none d-xl-block ps-2">
                <div>Paweł Kuna</div>
                <div class="mt-1 small text-secondary">UI Designer</div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="#" class="dropdown-item">
                Status
              </a>
              <a href="./profile.html" class="dropdown-item">
                Profile
              </a>
              <a href="#" class="dropdown-item">
                Feedback
              </a>
              <div class="dropdown-divider"></div>
              <a href="./settings.html" class="dropdown-item">
                Settings
              </a>
              <a onClick={logout} class="dropdown-item cursor-pointer">
                Logout
              </a>
            </div>
          </div>
        </div>
        <div
          className={` ${isAreaExpanded ? "collapse navbar-collapse show" : "collapse navbar-collapse"}`}
          id="sidebar-menu">
          <ul class="navbar-nav pt-lg-0">
            <li className={`nav-item ${pathname?.split("/")[1] === "home" ? "active" : ""}`}>
              <Link to="/home" className="nav-link">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                  </svg>
                </span>
                <span class="nav-link-title"> Beranda </span>
              </Link>
            </li>
            {permissions?.some((item) => item?.slug == "view-reports") ||
            permissions?.some((item) => item?.slug == "view-users") ||
            permissions?.some((item) => item?.slug == "view-roles") ||
            permissions?.some((item) => item?.slug == "view-permissions") ||
            permissions?.some((item) => item?.slug == "view-rooms") ? (
              <li className={`nav-item dropdown ${pathname?.split("/")[1] === "master" ? "active" : ""}`}>
                <a
                  class="nav-link dropdown-toggle"
                  href="#navbar-base"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="false"
                  role="button"
                  aria-expanded="true">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                      class="icon icon-tabler icons-tabler-outline icon-tabler-list-details">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M13 5h8" />
                      <path d="M13 9h5" />
                      <path d="M13 15h8" />
                      <path d="M13 19h5" />
                      <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                      <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                    </svg>
                  </span>
                  <span class="nav-link-title"> Master </span>
                </a>
                <div className={`dropdown-menu  ${pathname?.split("/")[1] === "master" ? "show" : ""}`}>
                  <div class="dropdown-menu-columns">
                    <div class="dropdown-menu-column">
                      {permissions?.some((item) => item?.slug == "view-users") ? (
                        <Link
                          to="/master/accounts"
                          className={`dropdown-item   ${pathname?.split("/")[2] === "accounts" ? "active" : ""}`}
                          href="./alerts.html">
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
                            class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                          </svg>
                          Akun / User{" "}
                        </Link>
                      ) : (
                        ""
                      )}
                      {permissions?.some((item) => item?.slug == "view-rooms") ? (
                        <Link
                          to="/master/rooms"
                          className={`dropdown-item   ${pathname?.split("/")[2] === "rooms" ? "active" : ""}`}
                          href="./alerts.html">
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
                          Ruangan
                        </Link>
                      ) : (
                        ""
                      )}
                      {permissions?.some((item) => item?.slug == "view-roles") ||
                      permissions?.some((item) => item?.slug == "view-permissions") ? (
                        <div class="dropend">
                          <a
                            class="dropdown-item dropdown-toggle"
                            href="#sidebar-authentication"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="false"
                            role="button"
                            aria-expanded="false">
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
                              class="icon icon-tabler icons-tabler-outline icon-tabler-user-cog">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5" />
                              <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M19.001 15.5v1.5" />
                              <path d="M19.001 21v1.5" />
                              <path d="M22.032 17.25l-1.299 .75" />
                              <path d="M17.27 20l-1.3 .75" />
                              <path d="M15.97 17.25l1.3 .75" />
                              <path d="M20.733 20l1.3 .75" />
                            </svg>
                            Role Permission
                          </a>
                          <div
                            className={`dropdown-menu  ${pathname?.split("/")[2] === "role-permission" ? "show" : ""}`}>
                            <Link
                              to="/master/role-permission/roles"
                              className={`dropdown-item  ${pathname?.split("/")[3] === "roles" ? "active" : ""}`}>
                              {" "}
                              Role
                            </Link>
                            <Link
                              to="/master/role-permission/permissions"
                              className={`dropdown-item  ${pathname?.split("/")[3] === "permissions" ? "active" : ""}`}>
                              {" "}
                              Permission / Hak Akses
                            </Link>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ) : null}
            <li className={`nav-item ${pathname?.split("/")[1] === "bookings" ? "active" : ""}`}>
              <Link to="/bookings" className="nav-link">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                    class="lucide lucide-door-open-icon lucide-door-open">
                    <path d="M11 20H2" />
                    <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" />
                    <path d="M11 4H8a2 2 0 0 0-2 2v14" />
                    <path d="M14 12h.01" />
                    <path d="M22 20h-3" />
                  </svg>
                </span>
                <span class="nav-link-title"> Booking Ruangan </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  logout,
})(Sidebar);
