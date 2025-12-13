// src/hooks/usePriceFeed.ts
"use client";

import { useEffect, useState } from "react";
import mockData from "../lib/mockData";

export default function usePriceFeed() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // live updates every 1.5s
    const id = setInterval(() => {
      setData((d) =>
        d.map((t) => ({
          ...t,
          price: +(t.price + (Math.random() - 0.5) * 50).toFixed(2),
          change: +(t.change + (Math.random() - 0.5) * 0.5).toFixed(2),
        }))
      );
    }, 1500);

    return () => clearInterval(id);
  }, []);

  // optional refetch mock
  const refetch = () => {
    try {
      setLoading(true);
      setData(mockData);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
