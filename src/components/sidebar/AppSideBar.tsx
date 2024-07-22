import { useEffect, useState } from 'react';
import {  Route, Routes, useLocation } from 'react-router-dom';
import {Button, Layout, theme} from 'antd'
import { BsJustify } from "react-icons/bs";

import { Logo } from './Logo';
import { MenuList } from './MenuList';
import { Content } from 'antd/es/layout/layout';
import { LayoutView } from '../LayoutView';
import SearchFlights from '../reservation/SearchFlights';
import { Availabilty } from '../reservation/Availabilty';
import './sidebar.css'
import SummaryFlight from '../reservation/SummaryFlight';
import PassengersFlight from '../reservation/PassengersFlight';
import CompleteReservation from '../reservation/CompleteReservation';
const {Header, Sider} = Layout;

export const AppSideBar = () => {

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const location = useLocation();
  
    const {
        token: {colorBgContainer},

    } = theme.useToken();

    const onClickCollapse = () => {
        setCollapsed(!collapsed);
    }
    useEffect(() => {        
        const path = location.pathname;
        let keys: string[] = [];
        switch (true) {
            case path.includes('/home'):
            case path.includes('/availabilty'):
            case path.includes('/summaryFlight'):
            case path.includes('/PassengersFlight'):
            case path.includes('/CompleteReservation'):
              keys = ['home'];
              break;
            default:
              keys = ['home'];
              break;
        }

        setSelectedKeys(keys);
    }, [location.pathname]);
      

  return (
   <Layout>
    <Sider className = 'sidebar' collapsed={collapsed} collapsible trigger={null}>
        <Logo/>
        <MenuList selectedKeys={selectedKeys} />
    </Sider>
    <Layout>
        <Header style={{padding:0, background: colorBgContainer}} >
            <Button type='text'                 
                icon={<BsJustify />}
                className='toggle'
                onClick={onClickCollapse} ></Button>
        </Header>
        <Content>
            <Routes>  
                <Route path="/*" element={<LayoutView />}>
                    <Route index element={<SearchFlights />} />                  
                </Route>   
                <Route path="/home" element={<LayoutView />}>
                    <Route index element={<SearchFlights />} />                  
                </Route>      
                <Route path="/availabilty" element={<LayoutView />}>
                    <Route index element={<Availabilty />} />                  
                </Route>  
                <Route path="/summaryFlight" element={<LayoutView />}>
                    <Route index element={<SummaryFlight />} />                  
                </Route>
                <Route path="/PassengersFlight" element={<LayoutView />}>
                    <Route index element={<PassengersFlight />} />                  
                </Route>                
                <Route path="/CompleteReservation" element={<LayoutView />}>
                    <Route index element={<CompleteReservation />} />
                    <Route path=":id" element={<CompleteReservation />} />                     
                </Route>               
            </Routes>  
        </Content>
                     
    </Layout>
   </Layout>
  )
}
