import React, { useContext } from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
// import axios from "../../../../axios";
import { AuthContext } from '../../../../_context/authContext';
import { ThemeContext } from '../../../../_context/themeContext';
const Upload = require('../../../../images/upload.png');

function RightMenu(props) {

  const context = useContext(AuthContext);

  const { isAuthenticated, userData } = context.authData;
  const logoutHandler = () => {

    localStorage.clear();
    context.setUser("");
    console.log(localStorage, props);
    props.history.push("/login");

  };


  return (
    <ThemeContext.Consumer>{
      (context) => {
        const { isLightTheme, light, dark } = context;
        const theme = isLightTheme ? light : dark;
        console.log(theme);

        if (!isAuthenticated) {
          return <Menu mode={props.mode}
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <Menu.Item key="mail">
              <Link to="/login" style={{ color: theme.color }} >Signin</Link>
            </Menu.Item>
            <Menu.Item key="app">
              <Link to="/register" style={{ color: theme.color }}>Signup</Link>
            </Menu.Item>
          </Menu>
        } else {
          return <Menu mode={props.mode}
            style={{ backgroundColor: theme.backgroundColor }}>
            <Menu.Item key="create">
              <Link to="/video/upload" style={{ color: theme.color }} >
                <span
                //  style={{ border:`1px solid ${theme.border}`}}
                >
                  {userData.firstname}</span> <img src={Upload} alt="Upload" /></Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link onClick={logoutHandler} style={{ color: theme.color }} >Logout</Link>
            </Menu.Item>
          </Menu>
        }
      }
    }
    </ThemeContext.Consumer>
  )
}

export default withRouter(RightMenu);

