import React from 'react';
import Day from './component/Day';
import DayList from './component/DayList';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import Team from './component/Team';
import Teamsetting from './component/Teamsetting';
import EmptyPage from './component/EmptyPage';
import Search from './component/Search';
import Searchid from './component/Searchid';
import ProfileInfo from './component/ProfileInfo';
import ProfileKeyword from './component/ProfileKeyword';
import ProfileMain from './component/ProfileMain';
import Group from './component/Group';
import Groupstart from './component/Groupstart';
import Groupchannel from './component/Groupchannel';
import Grouplink from './component/Grouplink';
import Error from './component/Error';
import Page404 from './component/Page404';


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
                { index: true, element:<ProfileMain />},
                { path: "/profile/info", element: <ProfileInfo /> },
                { path: "/profile/keyword", element: <ProfileKeyword /> },
            ]
        },
        {
            path: "/team/:id", element: <Team number={ "팀아이디 부분" } />,
            children: [
                {path: "team/:id/setting", element: <Teamsetting />}
            ]
        },
        {
            path: "/search", element: <Search />,
            children: [
                { index: true, elelment:<Search />},
                { path: "/search/:teamid", element: <Searchid /> },
            ],
        },
        {
            path: "/group", element: <Group /> ,
            children: [
                //  { index: true, elelment: <GroupList /> },
                { path: "/group/start", element: <Groupstart />  },
                { path: "/group/channel", element: <Groupchannel /> },
                { path: "/group/link", element: <Grouplink />  },
            ]    
        },
        {
            path: "error", element: <Error />,
            children: [
                { path: "404page", element: <Page404 /> },
            ]
        }, 
        {  path: '*', component: <DayList></DayList> },
    ])

    return routes;
}

export default App;