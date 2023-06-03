import React, { useEffect, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { getSessionUser } from "../../Services/functions";

// ICONS
import { GiBookCover } from "react-icons/gi";
import { useRouter } from "next/router";
function Topbar() {
  // FETCHING SESSION USER NAME AND CART LENGTH
  const router = useRouter();
  const [name, setName] = useState(null);
  const [userPosition, setUserPosition] = useState("");
  const [transactionNotification, setTransactionNotification] = useState([]);

  useEffect(() => {
    async function fetchSessionUser() {
      const userData = await getSessionUser(router);
      if (userData && userData.user) {
        setName(userData.user.username);
        setUserPosition(userData.user.position);
        setTransactionNotification(userData.user.transaction);
      }
    }
    fetchSessionUser();
  }, []);
  return (
    <div id="content">
      <nav>
        <span className="top-title">
          <img
            src="https://res.cloudinary.com/dk3iqiy2e/image/upload/v1685825962/WhatsApp_Image_2023-05-30_at_12.36.37_AM-removebg-preview_kxnfud.png"
            alt=""
            style={{ height: "50px" }}
          />
        </span>
        <div style={{ textAlign: "center", color: "#03a8a8" }}>
          {/* <p>{name}</p> */}
          <p style={{ textTransform: "uppercase" }}>{userPosition}</p>
        </div>
        <div className="dark-mode-con">
          <div className="notification">
            <AiFillBell className="bx bxs-bell" />
            <span className="num">{transactionNotification.length}</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
