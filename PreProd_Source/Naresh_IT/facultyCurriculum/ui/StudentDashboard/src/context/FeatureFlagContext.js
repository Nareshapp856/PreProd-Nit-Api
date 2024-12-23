import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const FeatureFlagContext = createContext();

export const useFeatureFlags = () => useContext(FeatureFlagContext);

export const FeatureFlagProvider = ({ children, allowUsers, userName }) => {
  const [flags, setFlags] = useState({
    myPerformance: true,
    newComponentVersion: true,
    adminsBatchTable: true,
  });

  useEffect(() => {
    setFlags((prev) => ({
      ...prev,
      myPerformance: true,
      newComponentVersion: true,
    }));
  }, [userName]);

  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
