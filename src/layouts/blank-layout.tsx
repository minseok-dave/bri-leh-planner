import { Outlet } from 'react-router-dom'

const BlankLayout = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  )
}

export default BlankLayout
