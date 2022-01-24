import React from 'react';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';


import DayList from './component/DayList';


import Signin from './component/BeforeloginComponent/signin';
import Signup from './component/BeforeloginComponent/Signup';
import Password from './component/BeforeloginComponent/Password';


import Team from './component/TeamComponent/Team';
import Teamsetting from './component/TeamComponent/Teamsetting';


import Search from './component/SearchComponent/Search';
import Searchid from './component/SearchComponent/Searchid';

import ProfileInfo from './component/ProfileComponent/ProfileInfo';
import ProfileKeyword from './component/ProfileComponent/ProfileKeyword';
import ProfileMain from './component/ProfileComponent/ProfileMain';

import Group from './component/GroupComponent/Group';
import Groupstart from './component/GroupComponent/Groupstart';
import Groupchannel from './component/GroupComponent/Groupchannel';
import Grouplink from './component/GroupComponent/Grouplink';

import Error from './component/Error';
import Page404 from './component/Page404';


const App = () => {
    const routes = useRoutes([
        { path: "/", element: <DayList />,
            children: [
                {index: true, element: <DayList />},
                {path: "/signin", element: <Signin />},
                {path: "/signup", element: <Signup />},
                {path: "/password", element: <Password />},
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