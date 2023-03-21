import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../Components/Loader";

const Home = () => {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="home-container">
            <div className="hero-section position-relative">
              <Link to="/">
                <img
                  alt=""
                  className="logo"
                  src="https://i.imgur.com/zOJoLoO.png"
                  width="100"
                />
              </Link>
              <div className="cta">
                <h2>Are You Hungry ?</h2>
                <h1>Don't Wait !</h1>
                <p>Let Start to Restaurant reservation...!</p>
                <div className="cta-btns">
                  <button
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="signbtn"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="logbtn"
                  >
                    Log In
                  </button>
                </div>
              </div>
              <div className="hero-icon">
                <img alt="" src="https://i.imgur.com/Cmszwks.png" width="100" />
              </div>
            </div>

            <div className="intro-section ">
              <div className="intro-section-container">
                <div className="intro-left-col">
                  <div className="intro-left-border">
                    <img alt="" src="https://i.imgur.com/u4pchdb.jpg" />
                  </div>
                </div>
                <div className="intro-right-col">
                  <div className="intro-section-text">
                    <h1>Our Vision, Our Culture</h1>
                    <p>
                      Whoever you are and wherever you’re going, you can always
                      count on the same comfort across our COOL home. Our
                      brand-new advert celebrates the consistency we’re famous
                      for, and all the different kinds of plats enjoyed by our
                      incredible guests across the world. COOL are here to help
                      the fast food lovers rest easy!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mid-columns">
              <div className="f-column">
                <h1>
                  YOU CHOOSE ANY QUANTITY
                  <br />
                  WE SERVE EVERY QUALITY
                </h1>
                <p>
                  with every meal you book through COOL, we guarantee an
                  exclusive experience with tasteful and fresh ingredients
                  because we evaluate every restaurant we have and offer you the
                  best quality available to you and your empty stomach.
                </p>
              </div>
              <div className="s-column">
                <img alt="" src="https://i.imgur.com/EWlxVxf.png" />
              </div>
            </div>
            <div className="end-section">
              <h1>Our COOL Gallery</h1>
              <div className="gallery">
                <div>
                  <img
                    alt=""
                    src="https://barakahit.net/html/brulee/assets/img/gallery/gallery-2.jpg"
                  />
                  <a href="#lightbox-1"></a>
                </div>
                <div>
                  <img
                    alt=""
                    src="https://barakahit.net/html/brulee/assets/img/gallery/gallery-6.jpg"
                  />
                  <a href="#lightbox-2"></a>
                </div>
                <div>
                  <img
                    alt=""
                    src="https://validthemes.live//themeforest/recafe/assets/img/menu/1.jpg"
                  />
                  <a href="#lightbox-5"> </a>
                </div>
                <div>
                  <img
                    alt=""
                    src="https://themes-themegoods.b-cdn.net/grandrestaurantv6/demo8/wp-content/uploads/sites/8/2021/01/stephan-valentin-l2viCaR3JUo-unsplash-768x768.jpg"
                  />
                  <a href="#lightbox-3"></a>
                </div>
                <div>
                  <img
                    alt=""
                    src="https://barakahit.net/html/brulee/assets/img/gallery/gallery-1.jpg"
                  />
                  <a href="#lightbox-4"></a>
                </div>
              </div>
            </div>
            <div className="testimonials-clean">
              <div className="container">
                <div className="intro">
                  <h2 className="text-center">Testimonials </h2>
                  <p className="text-center">
                    What our customers said about us!
                  </p>
                </div>
                <div className="row people">
                  <div className="col-md-6 col-lg-4 item">
                    <div className="box">
                      <p className="description">
                        Best Restaurant Booking System ever. There is a very
                        good reason why Opentable has been voted the best online
                        system. They understand their customers and their
                        restaurant partners.
                      </p>
                    </div>
                    <div className="author">
                      <img
                        alt=""
                        className="rounded-circle"
                        src="https://static.designboom.com/wp-content/uploads/2014/08/ino-zeljak-stitches-two-different-people-portraits-designboom-01.jpg"
                      />
                      <h5 className="name">Ben Johnson</h5>
                      <p className="title">
                        It makes booking a reservation super easy!
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 item">
                    <div className="box">
                      <p className="description">
                        {" "}
                        COOL makes booking a reservation at my favorite
                        restaurants super easy. I open the website and within a
                        few minutes I have a reservation just like that I even
                        earn points. I recently got a $50 rewards credit which I
                        can use at any participating restaurant. I just had to
                        share this. Get COOL and start using it today. Its the
                        best.
                      </p>
                    </div>

                    <div className="author">
                      <img
                        alt=""
                        className="rounded-circle"
                        src="https://i.imgur.com/o5uMfKo.jpg"
                      />
                      <h5 className="name">Carl Kent</h5>
                      <p className="title">Best Booking System ever</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 item">
                    <div className="box">
                      <p className="description">
                        Easy to use I've been using COOL for several months now.
                        I make reservations often - maybe once a month - and
                        have never had a single problem. It's very easy to use{" "}
                      </p>
                    </div>
                    <div className="author">
                      <img
                        alt=""
                        className="rounded-circle"
                        src="https://i.pinimg.com/originals/ef/e7/25/efe725e3aefbebac9217e01dbd172b52.jpg"
                      />
                      <h5 className="name">Emily Madison</h5>
                      <p className="title">Easy to use </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <h5>
              © Distributed By <span>ExpressTeam</span>
            </h5>
          </footer>
        </>
      )}
    </>
  );
};
export default Home;
