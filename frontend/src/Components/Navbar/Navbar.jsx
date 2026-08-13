import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const {getTotalCartAmount} = useContext(StoreContext);

    useEffect(() => {
        const sections = [
            { id: "explore-menu", name: "menu" },
            { id: "app-download", name: "mobile-app" },
            { id: "footer", name: "contact us" },
        ];

        const handleScroll = () => {
            const scrolledToBottom = 
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

            if (scrolledToBottom) {
                setMenu("contact us");
                return;
            }

            const scrollPos = window.scrollY + 150;
            let current = "home";

            for (const section of sections) {
                const el = document.getElementById(section.id);
                if (el && el.offsetTop <= scrollPos) {
                    current = section.name;
                }
            }

            setMenu(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link 
              to='/' 
              onClick={() => { 
                setMenu("home"); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className={menu === "home" ? "active" : ""}
            >
              home
            </Link>
            <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
            <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
            <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search">
                {showSearch && (
                    <input
                        type="text"
                        className="navbar-search-input"
                        placeholder="Search dishes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                )}
                <img 
                    src={assets.search_icon} 
                    alt="" 
                    onClick={() => setShowSearch(prev => !prev)}
                />
            </div>
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            <button onClick={()=> setShowLogin(true)}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar