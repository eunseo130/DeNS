import React from 'react';
import Day from './component/Day';
import DayList from './component/DayList';
import Header from "./component/Header";
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';

import EmptyPage from './component/EmptyPage';



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
            path: "profile", element: <DayList />,
            children: [
                { path: ":info", element: <DayList /> },
                { path: ":keyword", element: <DayList /> },
            ]
        },
        {
            path: "team/:id", element:  <EmptyPage number={"xla페이지"} />,
            children: [
                {path: "setting", element: <DayList />}
            ]
        },
        {
            path: "search/", element: <EmptyPage number={"search페이지"} />,
            children: [
                { path: ":teamid", element: <EmptyPage number={"search페[이지 내부"} /> },
            ],
        },
        {
            path: "group/*", element: <EmptyPage number={"그룹페이지"} /> ,
            children: [
                { path: "start", element: <EmptyPage number={"ㅅ,팉,페이지"} />  },
                { path: "channels", element: <EmptyPage number={"채ㅔ너ㅏㄹ페이지"} /> },
                { path: "link", element: <EmptyPage number={"링크페이지"} />  },
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