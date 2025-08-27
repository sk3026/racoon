import Topbar from '../Layout/topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className="header-wrapper">
      <Topbar />
      <Navbar />
    </header>
  )
}

export default Header