import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from './routes/siderouter';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import Head from './component/Header/Header';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;


function App() {
    return (
        <Layout>
            <StyledHeader><Head/></StyledHeader>
            <StyledSider>
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key={"1"}>
                        <Link to='/DashBoard'>
                            <HomeOutlined />
                            <a>DashBoard</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={"2"}>
                        <Link to='/Profile'>
                            <HomeOutlined />
                            <a>Profile</a>
                        </Link>    
                    </Menu.Item>
                    <Menu.Item key={"3"}>
                        <Link to='/Messenger'>
                            <UserOutlined />
                            <a>Messenger</a>
                        </Link>
                    </Menu.Item>
                </Menu>
            </StyledSider>
            <StyledContent>
                <SideBar />
            </StyledContent>
        </Layout>
    );
}
const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  background: white;
  left: 0;
`
const StyledHeader = styled(Header)`
  padding: 0;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  -webkit-box-shadow: 2px 1px 5px 0px rgba(0,0,0,0.26);
  -moz-box-shadow: 2px 1px 5px 0px rgba(0,0,0,0.26);
  box-shadow: 2px 1px 5px 0px rgba(0,0,0,0.26);
  background: #F0F3F4
`
const StyledContent = styled(Content)`
  height: 100vh;
  padding: 10px;
  overflow: initial;
`
export default App;