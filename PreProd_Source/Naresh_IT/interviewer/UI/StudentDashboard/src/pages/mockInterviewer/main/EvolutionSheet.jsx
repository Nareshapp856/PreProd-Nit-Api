import React from "react";
import DataForm from "../../../components/mockInterviewer/DataForm";

function EvolutionSheetPage() {
  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-3xl font-semibold">Evolution Sheet</h1>
      </div>
      <hr className="mb-6" />

      {/** Contains All Logic */}
      <div className="space-y-4">
        <DataForm />
      </div>
    </div>
  );
}

export default EvolutionSheetPage;
