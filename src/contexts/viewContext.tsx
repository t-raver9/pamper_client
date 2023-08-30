import React, { createContext, useContext, useState, ReactNode } from "react";

interface BusinessViewContextType {
  isBusinessView: boolean;
  toggleBusinessView: () => void;
  setBusinessView: (value: boolean) => void;
}

const BusinessViewContext = createContext<BusinessViewContextType | undefined>(
  undefined
);

interface BusinessViewProviderProps {
  children: ReactNode;
}

export const useBusinessView = (): BusinessViewContextType => {
  const context = useContext(BusinessViewContext);
  if (!context) {
    throw new Error(
      "useBusinessView must be used within a BusinessViewProvider"
    );
  }
  return context;
};

export const BusinessViewProvider: React.FC<BusinessViewProviderProps> = ({
  children,
}) => {
  const [isBusinessView, setIsBusinessView] = useState<boolean>(
    localStorage.getItem("isBusinessView") === "true"
  );

  const toggleBusinessView = () => {
    setIsBusinessView((prev) => !prev);
    localStorage.setItem("isBusinessView", String(!isBusinessView));
  };

  const setBusinessView = (value: boolean) => {
    setIsBusinessView(value);
    localStorage.setItem("isBusinessView", String(value));
  };

  return (
    <BusinessViewContext.Provider
      value={{ isBusinessView, toggleBusinessView, setBusinessView }}
    >
      {children}
    </BusinessViewContext.Provider>
  );
};
