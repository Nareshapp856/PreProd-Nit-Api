import OtpInput from "react-otp-input";

function OtpScreen({ otp, setOtp }) {
  return (
    <div className="w-full flex flex-col items-center mt-2">
      <label htmlFor="email" className="text-md font-semibold mb-2">
        Enter The OTP
      </label>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input style={{ width: "40px" }} {...props} />}
        inputStyle={{
          border: "1.6px solid #070707",
          borderRadius: "8px",
          width: "3rem",
          height: "3rem",
          color: "#000",
          fontWeight: "600",
          caretColor: "blue",
          backgroundColor: "rgba(30, 64, 175, .07)",
          marginInline: "4px",
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none",
        }}
        separator={<span style={{ width: "8px" }}></span>}
      />
    </div>
  );
}

export default OtpScreen;
