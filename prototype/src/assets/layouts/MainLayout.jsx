import React, { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

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
            <NavDropdown.Item>
              <NavLink to="/my-profile">View Profile</NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>

      <Outlet />
    </Fragment>
  );
}
