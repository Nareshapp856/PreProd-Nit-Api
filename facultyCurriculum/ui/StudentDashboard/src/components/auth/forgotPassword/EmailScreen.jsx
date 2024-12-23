import clsx from "clsx";

function EmailScreen({ setEmail, faildToSendOtp, email }) {
  return (
    <div className={clsx("w-full flex flex-col")}>
      {faildToSendOtp && (
        <p className="text-sm text-red-700 text-center">
          Failed to send otp to your email.
        </p>
      )}
      <label htmlFor="email" className="text-sm font-semibold mb-1">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email@mymail.com"
        className="p-2 py-3 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none"
      />
    </div>
  );
}

export default EmailScreen;
