import React, { useContext } from 'react';
import { Menu } from 'antd';
import ThemeToggle from '../../../ThemeToggle';

import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../../_context/themeContext';

function LeftMenu(props) {

  const context = useContext(ThemeContext);
  const { isLightTheme, light, dark } = context;
  const theme = isLightTheme ? light : dark;

  return (
    <Menu mode={props.mode} style={{ 
      backgroundColor: theme.backgroundColor
       }}>
      <Menu.Item key="mail">
        <Link to="/" style={{ color: theme.color }}>Home</Link>
      </Menu.Item>
      <Menu.Item key="subscription">
        <Link to="/subscription" style={{ color: theme.color }}>Subscription</Link>
      </Menu.Item>
      <Menu.Item key="theme_toggle">
        <ThemeToggle />
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu;