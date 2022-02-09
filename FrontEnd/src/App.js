import React from 'react'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'

import Signin from './component/BeforeloginComponent/Signin'
// import Signup from './component/BeforeloginComponent/Signup'
import Password from './component/BeforeloginComponent/Password'

import BeforeLogin from './component/commonComponent/BeforeLogin'
import Firstpage from './component/BeforeloginComponent/Firstpage'
import Back from './component/commonComponent/Back'

import TeamDetail from './component/TeamComponent/TeamDetail'
import TeamSettings from './component/TeamComponent/TeamSettings'
import CreateTeam from './component/TeamComponent/CreateTeam'

import Dashboard from './component/dashboardComponent/Dashboard'
import Messanger from './component/MessengerComponent/Messenger'

import Search from './component/SearchComponent/Search'
import Searchid from './component/SearchComponent/Searchid'

import ProfileInfo from './component/ProfileComponent/ProfileInfo'
import ProfileKeyword from './component/ProfileComponent/ProfileKeyword'
import ProfileMain from './component/ProfileComponent/ProfileMain'

import Group from './component/GroupComponent/Group'
import Groupstart from './component/GroupComponent/Groupstart'
import Groupchannel from './component/GroupComponent/Groupchannel'
import Grouplink from './component/GroupComponent/Grouplink'

import Messenger from './component/MessengerComponent/Messenger'
import Message from './component/MessengerComponent/Message'
import Error from './component/Error'
import Page404 from './component/Page404'
import HeaderBox from './component/commonComponent/HeaderBox'

import 'bootstrap/dist/css/bootstrap.min.css'
const App = () => {
  const routes = useRoutes([
    //로그인하기전 페이지 관리
    //이전엔 상단하단에 페이지만 표시된다.
    {
      path: '/beforeLogin',
      element: <BeforeLogin />,
      children: [
        { index: true, element: <Firstpage /> },
        { path: '/beforeLogin/signin', element: <Signin /> },
        // { path: '/beforeLogin/signup', element: <Signup /> },
        { path: '/beforeLogin/password', element: <Password /> },
      ],
    },
    //로그인후 페이지 관리
    //공통내용으로 header와 sidebar가 생긴다.
    {
      path: '/afterlogin',
      element: <Back />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: '/afterlogin/dashboard', element: <Dashboard /> },
        { path: '/afterlogin/messanger', element: <Messanger /> },
        {
          path: '/afterlogin/profile/:id',
          element: <ProfileMain />,
          children: [
            { path: '/afterlogin/profile/:id/info', element: <ProfileInfo /> },
            {
              path: '/afterlogin/profile/:id/keyword',
              element: <ProfileKeyword />,
            },
          ],
        },
        {
          path: '/afterlogin/createteam',
          element: <CreateTeam />,
          children: [
            { path: '/afterlogin/createteam', element: <CreateTeam /> },
          ],
        },
        {
          path: '/afterlogin/team/:id',
          element: <TeamDetail/>,
          children: [
            { path: '/afterlogin/team/:id/setting', element: <TeamSettings /> },
          ],
        },
        {
          path: '/afterlogin/search',
          element: <Search />,
          children: [
            { index: true, elelment: <Search /> },
            { path: '/afterlogin/search/:teamid', element: <Searchid /> },
          ],
        },
        {
          path: '/afterlogin/group',
          element: <Group />,
          children: [
            { index: true, elelment: <Group /> },
            { path: '/afterlogin/group/start', element: <Groupstart /> },
            { path: '/afterlogin/group/channel', element: <Groupchannel /> },
            { path: '/afterlogin/group/link', element: <Grouplink /> },
          ],
        },
        {
          path: '/afterlogin/messenger',
          element: <Messenger />,
          children: [
            { index: true, elelment: <Messenger /> },
            { path: '/afterlogin/messenger/:id', element: <Message /> },
          ],
        },
        {
          path: 'error',
          element: <Error />,
          children: [{ path: '404page', element: <Page404 /> }],
        },
      ],
    },
  ])

  return routes
}

export default App
