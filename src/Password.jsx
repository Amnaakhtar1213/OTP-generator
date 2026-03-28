import React, {useState, useEffect} from "react";

export const OTPGenerator = () => {

  const [otp, setOtp] =  useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const generatePassword = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(newOtp);
    setTimeLeft(5);
    setIsRunning(true);
}
 
useEffect(() => {
  let countDown;
  if(isRunning &&timeLeft > 0) {
    countDown = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000);
  } else if(timeLeft === 0 && isRunning) {
    setIsRunning(false);
  }
  return () => clearInterval(countDown)
}, [isRunning, timeLeft]);



  return(<div className="container">
    <h1 className="otp-title">OTP Generator</h1>
    <h2 className="otp-display">{otp ? `Your OTP is : ${otp}` : "Click 'Generate OTP' to get a code"}</h2>
    <p is="otp-timer" aria-live="polite">
      {isRunning && timeLeft > 0 ?
      `Expired in: ${timeLeft} seconds` : !isRunning && otp ? "OTP expired. Click button to get a new code." : ""}
    </p>
    <button className="otp-btn" onClick={generatePassword} disabled={isRunning}>Generate OTP</button>
   
  </div>)
}
export default OTPGenerator;