"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
//在 daypicker 界面选择起止日期后, 通过 onSelect 即可查看存储 range 的数据结构 -> {from, to}
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
