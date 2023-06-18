import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SideBar from "../../components/SideBar"
import NavigationBar from "../../components/NavigationBar";

const WorkareaWrapper = ({ children }) => {
  const knowtypes = useSelector(state => state.knowtype.list)
  const knowtype = useSelector(state => state.knowtype.current)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  let doLogOut = () => {
    dispatch({ type: "LOG_OUT" })
  }

  useEffect(() => {
    dispatch({type: "GET_KNOWTYPES"})
  }, [])


  return (
    <div className='main-wrapper'>
      <NavigationBar knowtype={knowtype} userName={user.name} onLogOut={doLogOut}/>
      <SideBar knowtypes={knowtypes}/>
      <main className="main-container container-fluid">
        {children}
      </main>
    </div>
  );
};

export default WorkareaWrapper;