import React, { useState } from "react";
import { useRef } from "react";

function SignUp() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, setProfilePic] = useState([]);

  let onSignup = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let dataToSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobile: mobileInputRef.current.value,
    };

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(dataToSend),
    };
    let JSONData = await fetch("http://localhost:9441/register", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let onSignupURL = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");
    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:9441/register", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let onSignupFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:9441/register", reqOptions);

    let JSOData = await JSONData.json();
  alert("Successfully Registered");

    console.log(JSOData);
  };

  return (
    <div className="signup">
      <form>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No</label>
          <input ref={mobileInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            accept="image/*"
            onChange={(eo) => {
              let selectedPicPath = URL.createObjectURL(eo.target.files[0]);

              setProfilePic(selectedPicPath);
            }}
          ></input>

          
        </div>
        <div>
          <button
            className="group"
            type="button"
            onClick={() => {
              onSignup();
            }}
          >
            SignUp
          </button>

          <button
            className="group"
            type="button"
            onClick={() => {
              onSignupURL();
            }}
          >
            SignUp URL
          </button>

          <button
            className="group"
            type="button"
            onClick={() => {
              onSignupFD();
            }}
          >
            SignUp FD
          </button>
          <img src={profilePic}></img>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
