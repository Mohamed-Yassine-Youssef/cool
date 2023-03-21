import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import MainSection from "../Components/MainSection";
import Restaurants from "../Components/Restaurants";
import Loader from "../Components/Loader";
const UserPage = () => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setisLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="userpage">
          <NavBar />
          <MainSection />
          <Restaurants />
        </div>
      )}
    </>
  );
};

export default UserPage;
