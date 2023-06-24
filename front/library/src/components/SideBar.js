import React, { useState } from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next'
import AddKnowtypeForm from '../forms/Workarea/KnowTypes/AddKnowtypeForm'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {ReactComponent as ChatDotsComposite}  from '../images/chat_dots_composite.svg';

import SidebarMenu from 'react-bootstrap-sidebar-menu';
//https://github.com/ivp-dev/react-bootstrap-sidebar-menu
const SideBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const { t, i18n } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  const handleSelect = (knowtype) => {
    dispatch({type: 'SET_CURRENT_KNOWTYPE', payload:{knowtype}});
  };

  return (
    <SidebarMenu
      bg="light"
      expand="lg"
      hide="md"
      activeKey={props.current?.id + "_type"}
    >
      <SidebarMenu.Collapse>
        <SidebarMenu.Header className=''>
        </SidebarMenu.Header>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
            {props.knowtypes?.map((knowtype, idx) =>
              <SidebarMenu.Nav.Link key={knowtype.id + "_type"} eventKey={knowtype.id + "_type"} onSelect={() => handleSelect(knowtype)}> 
                <SidebarMenu.Nav.Icon><ChatDotsComposite color={knowtype.style} /></SidebarMenu.Nav.Icon>
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
                <SidebarMenu.Nav.Title>{t('action.add-knowtype')}</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
          }
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
      </SidebarMenu.Collapse>
    </SidebarMenu>
  );
};

export default SideBar;