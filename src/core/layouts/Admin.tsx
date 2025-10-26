// src/core/layouts/Admin.tsx
import type { JSX } from "react";
import Sidebar from "./components/Sidebar";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";

const Admin = (): JSX.Element => {
  return (
    <>
      <Sidebar />
      <div className="main d-flex flex-column">
        <PageHeader />
        <div className="content">
          <Container fluid>
            <Outlet />
          </Container>
        </div>
        <PageFooter />
      </div>
    </>
  );
};

export default Admin;
