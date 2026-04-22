"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialRange = { from: undefined, to: undefined };
export function ReservationContextProvider({ children }) {
  // DateSelector 中 user 所选择的 from(入住起始日期) 和 to(入住结束日期)
  const [range, setRange] = useState(initialRange);
  function resetRange() {
    setRange(initialRange);
  }
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
export function useReservation() {
  const contextValue = useContext(ReservationContext);
  if (contextValue === undefined) {
    throw new Error(
      `hook 'useReservation' should be used within ReservationContextProvider!`,
    );
  }
  return contextValue;
}
