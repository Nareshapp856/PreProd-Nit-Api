import React from "react";

function RegisterationForm({
  formData,
  errors,
  setFormData,
  setErrors,
  mobileRegex,
  emailRegex,
}) {
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // Helper function to validate fields
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        break;
      case "mobile":
        if (!value) return "Mobile number is required";
        if (!mobileRegex.test(value)) return "Mobile number must be 10 digits";
        break;
      case "email":
        if (!value) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email format";
        break;
      case "currentCompany":
        if (!value) return "Current company is required";
        break;
      case "experience":
        if (value < 0) return "Experience cannot be negative";
        break;
      default:
        return null;
    }
  };

  // Handle validation on blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  return (
    <>
      {/* Mode (Checkbox for Faculty/Interviewer) */}
      <div className="w-full flex items-center justify-end -mb-2">
        <input
          id="mode"
          type="checkbox"
          name="mode"
          checked={formData.mode === 1}
          onChange={handleInputChange}
          className="mr-2 h-4 w-4"
        />
        <label htmlFor="mode" className="select-none">
          <span>Faculty</span>
        </label>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Name */}
        <div className="w-full flex flex-col">
          <label htmlFor="name">
            <span>Name</span>
            <span className="ms-[.1rem]">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            style={{
              borderBlockEnd: errors.name
                ? "2px solid #ed2224"
                : "2px solid #070707",
            }}
            className="p-2 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none"
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>

        {/* Mobile */}
        <div className="w-full flex flex-col">
          <label htmlFor="mobile">
            <span>Mobile</span>
            <span className="ms-[.1rem]">*</span>
          </label>
          <input
            id="mobile"
            type="tel"
            name="mobile"
            placeholder="1234567890"
            value={formData.mobile}
            onChange={handleInputChange}
            onBlur={handleBlur}
            style={{
              borderBlockEnd: errors.mobile
                ? "2px solid #ed2224"
                : "2px solid #070707",
            }}
            className="p-2 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none"
          />
          {errors.mobile && (
            <span className="text-red-600">{errors.mobile}</span>
          )}
        </div>

        {/* Email */}
        <div className="w-full flex flex-col">
          <label htmlFor="email">
            <span>Email</span>
            <span className="ms-[.1rem]">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="example@domain.com"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            style={{
              borderBlockEnd: errors.email
                ? "2px solid #ed2224"
                : "2px solid #070707",
            }}
            className="p-2 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none"
          />
          {errors.email && <span className="text-red-600">{errors.email}</span>}
        </div>

        {/* Current Company */}
        <div className="w-full flex flex-col">
          <label htmlFor="currentCompany">
            <span>Current Company</span>
            <span className="ms-[.1rem]">*</span>
          </label>
          <input
            id="currentCompany"
            type="text"
            name="currentCompany"
            placeholder="Company Name"
            value={formData.currentCompany}
            onChange={handleInputChange}
            onBlur={handleBlur}
            style={{
              borderBlockEnd: errors.currentCompany
                ? "2px solid #ed2224"
                : "2px solid #070707",
            }}
            className="p-2 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none"
          />
          {errors.currentCompany && (
            <span className="text-red-600">{errors.currentCompany}</span>
          )}
        </div>

        {/* Experience */}
        <div className="w-full flex flex-col">
          <label htmlFor="experience">
            <span>Experience (years)</span>
            <span className="ms-[.1rem]">*</span>
          </label>
          <input
            id="experience"
            type="number"
            name="experience"
            placeholder="0"
            value={formData.experience}
            onChange={handleInputChange}
            onBlur={handleBlur}
            style={{
              borderBlockEnd: errors.experience
                ? "2px solid #ed2224"
                : "2px solid #070707",
            }}
            className="p-2 mt-1 bg-blue-800 bg-opacity-[.07] rounded-t outline-none"
            min="0"
          />
          {errors.experience && (
            <span className="text-red-600">{errors.experience}</span>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterationForm;
