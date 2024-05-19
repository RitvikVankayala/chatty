import { React, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Logo from "../form/images/signup-image.jpg";
import "../form/css/style.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faUnlock,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { regRoute } from "../utils/apirouts.js";

export default function Reg() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    Username: "",
    Email: "",
    Password: "",
    Confirmpassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) navigate("/");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleValidation();
    if (handleValidation()) {
      window.history.pushState({}, document.title, window.location.pathname);
      const { Password, Confirmpassword, Username, Email } = values;
      const { data } = await axios.post(regRoute, {
        Username,
        Password,
        Email,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        // console.log(data);
        navigate("/SetAvatar");
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { Password, Confirmpassword, Username, Email } = values;
    if (Password !== Confirmpassword) {
      toast.error("passwords do not match", toastOptions);
      return false;
    }
    if (Username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }
    if (Password.length < 8) {
      toast.error(
        "password should be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    }
    if (Email === "") {
      toast.error("Please enter your Email", toastOptions);
      return false;
    }
    if (!document.getElementById("agree-term").checked) {
      toast.error("Please agree to terms and conditions", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                {/* <form className="register-form" id="register-form" > */}
                <div className="form-group">
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faUser} size="xl" />
                  </label>
                  <input
                    type="text"
                    name="Username"
                    id="name"
                    placeholder="Username"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} size="xl" />
                  </label>
                  <input
                    type="email"
                    name="Email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">
                    <FontAwesomeIcon icon={faUnlock} size="xl" />
                  </label>
                  <input
                    type="password"
                    name="Password"
                    id="pass"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    <FontAwesomeIcon icon={faLock} size="xl" />
                  </label>
                  <input
                    type="password"
                    name="Confirmpassword"
                    id="re_pass"
                    placeholder="Confirm password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agreeterm"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    I agree all statements in{" "}
                    <a href="#" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div className="form-group form-button">
                  {/* <input type="submit" name="signup" id="signup" className="form-submit" value="submit"/> */}

                  <button type="submit">Create User</button>
                </div>
                {/* </form> */}
              </div>
              <div className="signup-image">
                <figure>
                  <img src={Logo} alt="sing up image" className="igg"></img>
                </figure>
                <div className="l">
                  <Link to="/login">I am already a member</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
      <ToastContainer />
    </>
  );
}
