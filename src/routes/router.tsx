import { createBrowserRouter } from 'react-router-dom'

import BlankLayout from '@/layouts/blank-layout'
import StepperLayout from '@/layouts/stepper-layout'
import Home from '@/pages/home'
import Planner from '@/pages/planner'

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
    element: <StepperLayout />,
    children: [
      {
        path: '/bri-leh-planner/planner',
        element: <Planner />,
      },
    ],
  },
])

export default router
