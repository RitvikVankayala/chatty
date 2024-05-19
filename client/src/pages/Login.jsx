import { React, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Logo from "../form/images/signin-image.jpg";
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
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { loginRoute } from "../utils/apirouts.js";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    Username: "",
    Password: "",
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
      const { Password, Username } = values;
      const response = await axios.post(loginRoute, {
        Username,
        Password,
      });
      const data = response.data;
      console.log(data);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.User));
        navigate("/");
      }
      window.history.pushState({}, document.title, window.location.pathname);
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { Password, Username } = values;
    if (Username === "") {
      toast.error("Please enter a valid username", toastOptions);
      return false;
    }
    if (Password === "") {
      toast.error("please enter a valid password", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <section class="sign-in">
          <div class="container">
            <div class="signin-content">
              <div class="signin-image">
                <figure class="si">
                  <img src={Logo} alt="sing up image"></img>
                </figure>
                <div className="r">
                  <Link to="/reg">Create an account</Link>
                </div>
              </div>

              <div class="signin-form">
                <h2 class="form-title">Sign in</h2>
                {/* <form method="POST" class="register-form" id="login-form"> */}
                <div class="form-group">
                  <label for="your_name">
                    <FontAwesomeIcon icon={faUser} size="xl" />
                  </label>
                  <input
                    type="text"
                    name="Username"
                    id="your_name"
                    placeholder="Your Name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="form-group">
                  <label for="your_pass">
                    <FontAwesomeIcon icon={faLock} size="xl" />
                  </label>
                  <input
                    type="password"
                    name="Password"
                    id="your_pass"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    class="agree-term"
                  />
                  <label for="remember-me" class="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    Remember me
                  </label>
                </div>
                <div className="form-group form-button">
                  <button type="submit">Log In</button>
                </div>
                {/* </form> */}
                <div class="social-login">
                  <span class="social-label">Or login with</span>
                  <ul class="socials">
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={faFacebook} size="2xl" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={faTwitter} size="2xl" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FontAwesomeIcon icon={faGoogle} size="2xl" />
                      </a>
                    </li>
                  </ul>
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
export default Login;
