import React, { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";

export default function MainLayout() {
  return (
    <Fragment>
      <Navbar expand="sm" className="bg-body-tertiary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand>
            <NavLink to="/">LearnSphere</NavLink>
          </Navbar.Brand>
          <NavDropdown
            align="end"
            title={
              <img
                src="https://placehold.co/40"
                alt="Profile"
                className="profile-image"
              />
            }
            id="profile-dropdown"
          >
            <NavDropdown.Item as={"div"}>
              <NavLink to="/my-profile">View Profile</NavLink>
            </NavDropdown.Item >
            <NavDropdown.Item as={"div"}>Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={"div"}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>

      <Container fluid className="d-flex flex-column flex-fill p-0">
        <Outlet/>
      </Container>
    </Fragment>
  );
}
