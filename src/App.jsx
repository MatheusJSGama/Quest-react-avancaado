import './App.css'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from './components/contexts/theme-context'



function App() {
  const {theme} = useContext(ThemeContext)
  
  return (
    <div className={`app ${theme === "light" ? "light" : "dark"}`}>
      <Outlet/>
    </div>
  )
}



export default App
