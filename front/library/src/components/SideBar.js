import React, { useState } from 'react';
import { Plus, ChatDotsFill, PlusLg } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next'
import AddKnowtypeForm from '../forms/Workarea/KnowTypes/AddKnowtypeForm'

import SidebarMenu from 'react-bootstrap-sidebar-menu';
//https://github.com/ivp-dev/react-bootstrap-sidebar-menu
const SideBar = (props) => {
  const { t, i18n } = useTranslation();

  const [isAdding, setIsAdding] = useState(false);

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
            {props.knowtypes?.map((knowtype, idx) =>
              <SidebarMenu.Nav.Link eventKey={idx + "_type"}>
                <SidebarMenu.Nav.Icon><ChatDotsFill color={knowtype.style} /></SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>{knowtype.name}</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            )}
          </SidebarMenu.Nav>
          <SidebarMenu.Nav>

          {isAdding ? 
              <SidebarMenu.Nav.Link>
                <AddKnowtypeForm addCallback={()=>setIsAdding(false)}/>
              </SidebarMenu.Nav.Link>
              : <SidebarMenu.Nav.Link onSelect={()=>setIsAdding(true)} eventKey="add">
                <SidebarMenu.Nav.Icon><PlusLg /></SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>{t('sidebar.add-knowtype')}</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
          }
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
      </SidebarMenu.Collapse>
    </SidebarMenu>
  );
};

export default SideBar;