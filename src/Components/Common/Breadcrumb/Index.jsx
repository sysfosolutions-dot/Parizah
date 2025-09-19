import React from "react";
import { useLocation } from "react-router-dom";

function formatPathName(pathname) {
  // Extract last segment
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "Home";

  // Replace hyphens and capitalize words
  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
function Breadcrumb_Container(props) {
  const location = useLocation();
  const {pageName} = props
  const currentPage = formatPathName(location.pathname);

  return (
    <section className="tf-page-title">
      <div className="container">
        <div className="box-title text-center">
          <h4 className="title">{pageName ? pageName : currentPage}</h4>
          <div className="breadcrumb-list">
            <a className="breadcrumb-item" href="/">
              Home
            </a>
            <div className="breadcrumb-item dot">
              <span></span>
            </div>
            <div className="breadcrumb-item current">{pageName ? pageName : currentPage}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb_Container;
