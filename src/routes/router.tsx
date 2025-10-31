import { createBrowserRouter } from 'react-router-dom'

import BlankLayout from '@/layouts/blank-layout'
import Home from '@/pages/home'
import Planner from '@/pages/planner'
import ProfileEditor from '@/pages/profile-editor'

const router = createBrowserRouter([
  {
    path: '/bri-leh-planner',
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/bri-leh-planner/planner',
    element: <Planner />,
  },
  {
    path: '/bri-leh-planner/profile-editor',
    element: <ProfileEditor />,
  },
])

export default router
