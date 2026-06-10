// this is protection mechanism for our pages and routes.
// if  authanticted user is there then give him accese to the pages
// else redirect to the login page.

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {

// more easy to understand
/*

if (authStatus === true){
    navigate("/")
}else if (authStatus === false){
    navigate("/login")
}

*/
    
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <div>Loading...</div> : <>{children}</>;
}
