import React from 'react';
import Day from './component/Day';
import DayList from './component/DayList';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import Teamid from './component/Teamid';
import EmptyPage from './component/EmptyPage';
import Searchid from './component/Searchid';
import ProfileInfo from './component/ProfileInfo';
import ProfileKeyword from './component/ProfileKeyword';
import ProfileMain from './component/ProfileMain';


const App = () => {
    const routes = useRoutes([
        { path: "/", element: <DayList />,
            children: [
                {path: "/signin", element: <DayList />},
                {path: "/signup", element: <DayList />},
                {path: "/password", element: <DayList />},
            ]
        },
        {
            path: "/profile", element: <ProfileMain />,
            children: [
                // { index: true, element:<ProfileMain />},
                { path: "/profile/info", element: <ProfileInfo /> },
                { path: "/profile/keyword", element: <ProfileKeyword /> },
            ]
        },
        {
            path: "team/:id", element:  <Teamid />,
            children: [
                {path: "setting", element: <DayList />}
            ]
        },
        {
            path: "/search", element: <EmptyPage number={"search페이지"} />,
            children: [
                { index: true, elelment:<DayList/>},
                { path: "/search/:teamid", element: <Searchid /> },
            ],
        },
        {
            path: "/group", element: <DayList /> ,
            children: [
                { index: true, elelment: <DayList /> },
                { path: "/group/start", element: <EmptyPage number={"ㅅ,팉,페이지"} />  },
                { path: "/group/channels", element: <EmptyPage number={"채ㅔ너ㅏㄹ페이지"} /> },
                { path: "/group/link", element: <EmptyPage number={"링크페이지"} />  },
            ]    
        },
        {
            path: "error", element: <DayList />,
            children: [
                { path: "404page", element: <DayList /> },
            ]
        }, 
        {  path: '*', component: <DayList></DayList> },
    ])

    return routes;
}

export default App;