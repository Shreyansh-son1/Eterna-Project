"use client";

export default function Search({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search tokens..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
}
