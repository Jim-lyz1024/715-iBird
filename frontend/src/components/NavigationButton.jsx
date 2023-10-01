import React from 'react'
import { useNavigate } from "react-router-dom";
import { NavBar, Space, Toast } from 'antd-mobile'
import { AddOutline  } from 'antd-mobile-icons'

export default function NavigationButton({ path, text,addBl, state }) {
    const navigate = useNavigate();



    const back = () =>{
        navigate(path, { replace: true, state });
    }

    const openAdd = () =>{
        navigate("/community/findfriends", { replace: true });
    }

    const right = (
        <div style={{ fontSize: 24 }}  >
          <AddOutline style={{ cursor:'pointer'}} onClick={openAdd}/>
        </div>
    )
        
    return (
        <div>
            <NavBar className='navBar' onBack={back} right={addBl?right:""}>
                {text}
            </NavBar>
        </div>
    )
}
