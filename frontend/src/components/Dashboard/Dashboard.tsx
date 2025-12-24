// src/components/Dashboard.tsx
import { useEffect, useState } from "react";

interface DashboardProps {
  jwt: string;
}

export function Dashboard({ jwt }: DashboardProps) {
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/tests", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then((res) => res.json())
      .then(setTests)
      .catch(console.error);
  }, [jwt]);

  return (
    <div>
      <h1>Tests</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>{test.name}</li>
        ))}
      </ul>
    </div>
  );
}
