import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logOUT } from "../Services/functions";
import Cookies from "js-cookie";
// ICONS
import { SiCoinmarketcap } from "react-icons/si";
import { FaCartArrowDown } from "react-icons/fa";
import { BsShop, BsWhatsapp } from "react-icons/bs";
import { FiGrid, FiTruck } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { getSessionUser } from "../Services/functions";
import { CartQuantityContext } from "../pages/_app";

function Topbar({ dynamictriger, triga }) {
  // SET NAV LIST COLOR WITH PAGE PATH NAME
  const cartQty = useContext(CartQuantityContext).cartQty;
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    switch (router.asPath) {
      case "/":
        setActive(1);
        break;
      case "/products":
        setActive(2);
        break;
      case "/orders":
        setActive(3);
        break;
      default:
        setActive(0);
        break;
    }
  }, [router.asPath]);

  // // FETCHING SESSION USER NAME AND CART LENGTH
  const [name, setName] = useState(null);
  const [cartLength, setCartLength] = useState([]);
  const [session, setSession] = useState([]);
  useEffect(() => {
    async function fetchSessionUser() {
      const userData = await getSessionUser();
      if (userData && userData.user) {
        setSession(userData);
        setName(userData?.user?.username);
        setCartLength(userData?.user.cart);
      }
    }
    fetchSessionUser();
  }, [router, triga, dynamictriger]);
  // console.log(session.user.position);

  return (
    <div className="topbar-main-con">
      {/* TOPBAR  */}

      <div className="topbar-top-con">
        {/* logo side */}
        <div className="topbar-top-con-left">
          <Link href="/">
            {/* <SiCoinmarketcap className="icon" /> */}
            <img
              style={{ height: "40px" }}
              className="icon"
              src="https://res.cloudinary.com/dk3iqiy2e/image/upload/v1685825962/WhatsApp_Image_2023-05-30_at_12.36.37_AM-removebg-preview_kxnfud.png"
              alt=""
            />
          </Link>
          <p style={{ marginLeft: "5px", color: "#e9a321" }}>
            {name && "Hello! " + name.split(" ")[0]}
          </p>
        </div>
        {/* cart and user icon */}
        <div className="topbar-top-con-right">
          <div className="cart-icon-con">
            <Link href="/cart">
              <FaCartArrowDown className="icon" />
            </Link>
            <sup>{cartQty}</sup>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar-main-con">
        <nav>
          <ul>
            <Link href="/">
              <li
                className={`${active === 1 ? "listactive" : ""}`}
                onClick={() => setActive(1)}
              >
                {active == 1 ? <div className="nav-active"></div> : ""}
                <span>
                  <BsShop className="menu-icon" />
                </span>
                <p> Home</p>
              </li>
            </Link>
            <Link href="/products">
              <li
                className={`${active === 2 ? "listactive" : ""}`}
                onClick={() => setActive(2)}
              >
                {active == 2 ? <div className="nav-active"></div> : ""}
                <span>
                  <FiGrid className="menu-icon" />
                </span>
                <p> Products</p>
              </li>
            </Link>
            <Link href="/orders">
              <li
                className={`${active === 3 ? "listactive" : ""}`}
                onClick={() => setActive(2)}
              >
                {active == 3 ? <div className="nav-active"></div> : ""}
                <span>
                  <FiTruck className="menu-icon" />
                </span>
                <p> Order</p>
              </li>
            </Link>
            <a
              href="https://wa.me/+2348067279806?text=Hello, I am a customer on your platfor 'Houseof Hilda' and i need your support."
              target="_blank"
            >
              <li>
                <span>
                  <BsWhatsapp className="menu-icon" />
                </span>
                Support
              </li>
            </a>
            {session?.user?.position === "admin" ||
            session?.user?.position === "staff" ? (
              <Link href="/Adminpage/AdminDashboard">
                <li
                  className={`${active === 5 ? "listactive" : ""}`}
                  onClick={() => setActive(5)}
                >
                  {active == 5 ? <div className="nav-active"></div> : ""}
                  <span>
                    <GrUserAdmin className="menu-icon" />
                  </span>
                  <p> Admin</p>
                </li>
              </Link>
            ) : (
              ""
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
export const jgi = () => {};
export default Topbar;
