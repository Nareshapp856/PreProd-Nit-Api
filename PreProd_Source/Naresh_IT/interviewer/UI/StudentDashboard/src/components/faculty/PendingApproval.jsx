import React from "react";
import PendingApprovalForm from "./pendingApproval/PendingApprovalForm";

function PendingApproval() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Pending Approval</h1>
        <hr className="mb-6 border-gray-300" />
      </div>

      <div>
        <PendingApprovalForm />
      </div>
    </div>
  );
}

export default PendingApproval;
