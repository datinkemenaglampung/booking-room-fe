import "./App.css";
// import { useEffect } from 'react';
import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { routes } from "./routers";
import { AppLayout } from "./layouts";
import { NotFoundPage } from "./pages";

function App(props) {
  const routeComponents = routes.map((item) => {
    return (
      <Route
        key={item.path}
        path={item.path}
        exact={item.exact}
        element={
          <AppLayout needAuthenticated={item.needAuthenticated}>
            <Toaster position="top-right" />
            <item.layout>
              <item.element />
            </item.layout>
          </AppLayout>
        }
      />
    );
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>{routeComponents}</Routes>
    </Suspense>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(App);
