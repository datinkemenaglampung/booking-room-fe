import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { getInitials } from "../../utils/helpers/getInitials";
import { BASE_URL_STORAGE } from "../../helpers/config";
import { data } from "react-router-dom";

const sizeClassMap = {
  xs: "avatar-xs",
  sm: "avatar-sm",
  md: "avatar-md",
  lg: "avatar-lg",
  xl: "avatar-xl",
};

const UserAvatar = ({
  fullName,
  imageUrl,
  size = "sm",
  className = "",
  justPhotoView = false,
  isMultiple = false,
  datas = [],
}) => {
  const hasImage = imageUrl && imageUrl.trim() !== "";
  const imageSrc = BASE_URL_STORAGE + imageUrl;
  const initials = getInitials(fullName);
  const sizeClass = sizeClassMap[size] || "avatar-md";

  return (
    <>
      {isMultiple && datas.length > 0 ? (
        <PhotoProvider
          // bannerVisible={false}
          maskOpacity={0.756}
          toolbarRender={({ onScale, scale, rotate, onRotate, index }) => {
            return (
              <div className="d-flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rotate-ccw"
                  onClick={() => onRotate(rotate - 90)}
                  style={{
                    cursor: "pointer",
                  }}>
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rotate-cw"
                  onClick={() => onRotate(rotate + 90)}
                  style={{
                    cursor: "pointer",
                  }}>
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-zoom-in"
                  onClick={() => onScale(scale + 1)}
                  style={{
                    cursor: "pointer",
                  }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                  <line x1="11" x2="11" y1="8" y2="14" />
                  <line x1="8" x2="14" y1="11" y2="11" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-zoom-out"
                  onClick={() => onScale(scale - 1)}
                  style={{
                    cursor: "pointer",
                  }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                  <line x1="8" x2="14" y1="11" y2="11" />
                </svg>
              </div>
            );
          }}
          overlayRender={({ index, data }) => {
            return (
              <div
                className="position-absolute bottom-0 w-100  text-white text-start py-2"
                style={{
                  left: "1em",
                  zIndex: 1200,
                }}
                key={index}>
                <span className="fw-bold mb-0" style={{ fontSize: "2.2em" }}>
                  {datas[index]?.image_path ? datas[index]?.image_path?.split("/").pop() : ""}{" "}
                  {datas[index]?.is_main ? (
                    <button type="button" class="btn btn-success btn-sm ms-2" style={{ padding: "0.2em 0.5em" }}>
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
                        class="lucide lucide-circle-star-icon lucide-circle-star">
                        <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </button>
                  ) : (
                    ""
                  )}
                </span>
                <p className="mb-0">{fullName}</p>
              </div>
            );
          }}>
          {datas.map((data, index) => {
            const dataImageUrl = data.image_path ? BASE_URL_STORAGE + data.image_path : null;
            const dataInitials = getInitials(data.fullName || "User");

            return (
              <div
                key={index}
                className={`avatar ${sizeClass} ${className} cursor-pointer overflow-hidden rounded-full bg-gray-100 flex items-center justify-center`}>
                <PhotoView src={dataImageUrl || ""}>
                  <div className="w-full h-full flex items-center justify-center text-muted">
                    {dataImageUrl ? (
                      <img src={dataImageUrl} alt={data.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-dark font-semibold text-sm">{dataInitials}</span>
                    )}
                  </div>
                </PhotoView>
              </div>
            );
          })}
        </PhotoProvider>
      ) : (
        <PhotoProvider bannerVisible={false} maskOpacity={0.6}>
          <div
            className={`avatar ${sizeClass} ${className} cursor-pointer overflow-hidden rounded-full bg-gray-100 flex items-center justify-center`}>
            <>
              {justPhotoView && hasImage ? (
                <img src={imageSrc} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <>
                  {hasImage ? (
                    <PhotoView src={imageSrc}>
                      <img src={imageSrc} alt={fullName} className="w-full h-full object-cover" />
                    </PhotoView>
                  ) : (
                    <span className="text-dark font-semibold text-sm">{initials}</span>
                  )}
                </>
              )}
            </>
          </div>
        </PhotoProvider>
      )}
    </>
  );
};

export default UserAvatar;
