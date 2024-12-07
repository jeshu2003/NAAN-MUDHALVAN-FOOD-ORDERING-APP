import React, { useContext, useEffect, useState } from 'react'
import {BsCart3, BsPersonCircle} from 'react-icons/bs'
import { FaSearch } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext'
import axios from 'axios'
import {ImCancelCircle} from 'react-icons/im'

const Navbar = () => {


  const navigate = useNavigate();

  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username');

  const {logout, cartCount} = useContext(GeneralContext);

  const [productSearch, setProductSearch] = useState('');

  const [noResult, setNoResult] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = async() =>{

    await axios.get('http://localhost:6001/fetch-categories').then(
      (response)=>{
        setCategories(response.data);
      }
    )
  }


  const handleSearch = () =>{
    if (categories.includes(productSearch)){
      navigate(`/category/${productSearch}`);
    }else{
      setNoResult(true);
    }
  }

  return (

    <>
      {/* user navbar */}

        {!usertype ?
        
            <div className="navbar">
              <img className='logo' src='SB_Foods.jpg' onClick={()=> navigate('')} alt='SB Foods Logo' />
              <div className="nav-content">
                <div className="nav-search">
                  <input type="text" name="nav-search" id="nav-search" placeholder='Search Restaurants, cuisine, etc.,' onChange={(e)=>setProductSearch(e.target.value)}  />
                  <FaSearch className="nav-search-icon" onClick={handleSearch} />
                      {
                        noResult === true ?
                          <div className='search-result-data'>no items found.... try searching for Biriyani, Pizza, etc., <ImCancelCircle className='search-result-data-close-btn' onClick={()=> setNoResult(false)}  /></div>
                        :
                        ""
                      }
                </div>

                <button className='btn btn-outline-primary' onClick={()=> navigate('/auth')}>Login <IoMdContact style={{fontSize: "1.5rem"}} /></button>
                
              </div>
            </div>

        : 
        <>
            {usertype === 'customer' ?
                <div className="navbar">
                  <img className='logo' src='SB_Foods.jpg' onClick={()=> navigate('')} alt='SB Foods Logo' />
                  <div className="nav-content">
                    <div className="nav-search">
                      <input type="text" name="nav-search" id="nav-search" placeholder='Search Restaurants, cuisine, etc.,' onChange={(e)=>setProductSearch(e.target.value)}  />
                      <FaSearch className="nav-search-icon" onClick={handleSearch} />
                      {
                        noResult === true ?
                          <div className='search-result-data'>no items found.... try searching for Biriyani, Pizza, etc., <ImCancelCircle className='search-result-data-close-btn' onClick={()=> setNoResult(false)}  /></div>
                        :
                        ""
                      }
                    </div>
    
                    <div className='nav-content-icons' >
                      <div className="nav-profile" onClick={()=> navigate('/profile')}>
                        <BsPersonCircle className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Profile" />
                        <p>{username}</p>
                      </div>
                      <div className="nav-cart" onClick={()=> navigate('/cart')}>
                        <BsCart3 className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cart" />
                        <div className="cart-count">{cartCount}</div>
                      </div>
                    </div>
                  
                  </div>
                </div>
            :
            <>
              {usertype === 'admin' ? 
                <div className="navbar-admin">
                  <h3 onClick={()=> navigate('/admin')}>SB Foods (admin)</h3>
                  
                  <ul>
                    <li onClick={()=> navigate('/admin')}>Home</li>
                    <li onClick={()=> navigate('/all-users')}>Users</li>
                    <li onClick={()=> navigate('/all-orders')}>Orders</li>
                    <li onClick={()=> navigate('/all-restaurants')}>Restaurants</li>
                    <li onClick={()=> logout()}>Logout</li>
                  </ul>
                </div>

                :

                <>
                  {usertype === 'restaurant' ? 
                    <div className="navbar-admin">
                      <h3 onClick={()=> navigate('/restaurant')}>SB Foods (Restaurant)</h3>
                      
                      <ul>
                        <li onClick={()=> navigate('/restaurant')}>Home</li>
                        <li onClick={()=> navigate('/restaurant-orders')}>Orders</li>
                        <li onClick={()=> navigate('/restaurant-menu')}>Menu</li>
                        <li onClick={()=> navigate('/new-product')}>New Item</li>
                        <li onClick={()=> logout()}>Logout</li>
                      </ul>
                    </div>

                    :

                    ""
                  }
                </>
              }
            </>
          }
        </>
        }

    </>
  )
}

export default Navbar