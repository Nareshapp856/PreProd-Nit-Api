import React from "react";
import InterviewerRegisterForm from "../../../components/auth/registerInterviewer/InterviewerRegisterForm";

function RegisterInterviewer() {
  return (
    <div className="space-y-6">
      <div>
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-700">
              Register Interviewer
            </h1>
          </div>
          <hr className="mb-6 border-gray-300" />
        </div>

        <div className="">
          <InterviewerRegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterInterviewer;
