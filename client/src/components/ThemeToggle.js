import React, { Component } from 'react';
import { Button } from 'antd';
import { ThemeContext } from '../_context/themeContext';


class ThemeToggle extends Component {
    static contextType = ThemeContext;

    render() {
        const { toggleTheme } = this.context;
        return (<Button onClick={toggleTheme} style={{margin:'14px'}}>Toggle Theme</Button>)
    }

}

export default ThemeToggle;