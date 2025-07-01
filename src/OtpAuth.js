import React, { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const OtpAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");

  // Set up reCAPTCHA
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(confirmationResult);
      setMessage("OTP sent!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      await confirmation.confirm(otp);
      setMessage("Phone number verified!");
    } catch (error) {
      setMessage("Invalid OTP");
    }
  };

  return (
    <div>
      <form onSubmit={sendOtp}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number (+91...)"
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      <div id="recaptcha-container"></div>
      {confirmation && (
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      <p>{message}</p>
    </div>
  );
};

export default OtpAuth; 