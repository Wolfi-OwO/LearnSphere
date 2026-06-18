import React, { Fragment } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { currentUser } from "../data/mockData.js";
import { useAppStore } from "../store/AppStore.jsx";

export default function MainLayout() {
  const { state } = useAppStore();
  const unread = state.notifications.filter((n) => !n.read).length;

  return (
    <Fragment>
      <Navbar expand="md" className="bg-body-tertiary" data-bs-theme="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">LearnSphere</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>Dashboard</Nav.Link>
              <Nav.Link as={NavLink} to="/courses">Courses</Nav.Link>
              <Nav.Link as={NavLink} to="/invites">Invites</Nav.Link>
              <Nav.Link as={NavLink} to="/certificates">Certificates</Nav.Link>
            </Nav>
            <Nav className="align-items-md-center">
              <Nav.Link as={NavLink} to="/notifications" className="position-relative">
                <FontAwesomeIcon icon={faBell} />
                {unread > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {unread}
                  </Badge>
                )}
              </Nav.Link>
              <NavDropdown
                align="end"
                title={
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="profile-image"
                  />
                }
                id="profile-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/my-profile">View Profile</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/my-profile/edit">Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as="div">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="d-flex flex-column flex-fill p-0">
        <Outlet />
      </Container>
    </Fragment>
  );
}
