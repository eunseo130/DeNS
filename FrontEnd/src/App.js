import React from 'react'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'

import Signin from './component/BeforeloginComponent/Signin'
import Signup from './component/BeforeloginComponent/Signup'
import Password from './component/BeforeloginComponent/Password'

import BeforeLogin from './component/commonComponent/BeforeLogin'
import Firstpage from './component/BeforeloginComponent/Firstpage'
import Back from './component/commonComponent/Back'

import TeamDetail from './component/TeamComponent/TeamDetail'
import TeamSettings from './component/TeamComponent/TeamSettings'
import CreateTeam from './component/TeamComponent/CreateTeam'
import TeamIndex from './component/TeamComponent/TeamIndex'
import TeamMain from './component/TeamComponent/TeamMain'

import Dashboard from './component/dashboardComponent/Dashboard'

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
import LoginTest from './component/BeforeloginComponent/LoginTest'
// import auth from './component/hoc/auth'
const App = () => {
  const routes = useRoutes([
    //로그인하기전 페이지 관리
    //이전엔 상단하단에 페이지만 표시된다.
    {
      path: '/',
      element: <Firstpage />,
      children: [
        // { index: true, element: <Firstpage /> },
        { index: true, element: <Signin /> },
        { path: '/signin', element: <Signin /> },
        { path: '/signup', element: <Signup /> },
        { path: '/password', element: <Password /> },
      ],
    },
    //로그인후 페이지 관리
    //공통내용으로 header와 sidebar가 생긴다.
    {
      path: '/auth',
      element: <Back />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: '/auth/dashboard', element: <Dashboard /> },
        {
          path: '/auth/profile/:id',
          element: <ProfileMain />,
          children: [
            { path: '/auth/profile/:id/info', element: <ProfileInfo /> },
            {
              path: '/auth/profile/:id/keyword',
              element: <ProfileKeyword />,
            },
          ],
        },

        {
          path: '/auth/team',
          element: <TeamMain />,
          children: [
            { index: true, element: <TeamIndex /> },
            { path: '/auth/team/maketeam', element: <CreateTeam /> },
            { path: '/auth/team/:id', element: <TeamDetail /> },
            { path: '/auth/team/:id/settings', element: <TeamSettings /> },
          ],
        },
        {
          path: '/auth/search',
          element: <Search />,
          children: [
            { index: true, element: <Search /> },
            { path: '/auth/search/:teamid', element: <Searchid /> },
          ],
        },
        {
          path: '/auth/group',
          element: <Group />,
          children: [
            { index: true, element: <Group /> },
            { path: '/auth/group/start', element: <Groupstart /> },
            { path: '/auth/group/channel', element: <Groupchannel /> },
            { path: '/auth/group/link', element: <Grouplink /> },
          ],
        },
        {
          path: '/auth/messenger',
          element: <Messenger />,
          children: [
            { index: true, element: <Messenger /> },
            { path: '/auth/messenger/:id', element: <Message /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Error />
    },
  ])

  return routes
}

export default App
