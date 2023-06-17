import React from 'react';
import { ChatDots, ChatDotsFill } from 'react-bootstrap-icons';

import SidebarMenu from 'react-bootstrap-sidebar-menu';
//https://github.com/ivp-dev/react-bootstrap-sidebar-menu
const SideBar = (props) => {
  return (
    <SidebarMenu
      bg="light"
      expand="lg"
      hide="md"
    >
      <SidebarMenu.Collapse>
        <SidebarMenu.Header className=''>
        </SidebarMenu.Header>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
              {props.knowtypes?.map((knowtype,idx) =>
                <SidebarMenu.Nav.Link eventKey="setup">
                  <SidebarMenu.Nav.Icon><ChatDotsFill color={knowtype.style}/></SidebarMenu.Nav.Icon>
                  <SidebarMenu.Nav.Title>{knowtype.name}</SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              )}
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
        <SidebarMenu.Footer>
        </SidebarMenu.Footer>
      </SidebarMenu.Collapse>
    </SidebarMenu>
  );
};

export default SideBar;