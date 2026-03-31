"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>current number: {count}</div>
      <button onClick={() => setCount((v) => v + 1)}>+</button>
      <button onClick={() => setCount((v) => v - 1)}>-</button>
      <div>there are {users.length} users;</div>
    </div>
  );
}
