"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, setActiveTab } from "../../store";

import { cn } from "@/lib/utils";

const tabs = [
  { key: "new", label: "New Pairs" },
  { key: "final", label: "Final Stretch" },
  { key: "migrated", label: "Migrated" },
];

export default function Tabs() {
  const dispatch = useDispatch();
  const activeTab = useSelector((s: RootState) => s.ui.activeTab);

  return (
    <div className="flex gap-6 border-b mb-4 text-sm">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => dispatch(setActiveTab(t.key))}
          className={cn(
            "pb-2 relative font-medium text-gray-600 transition-colors",
            activeTab === t.key && "text-black"
          )}
        >
          {t.label}

          {/* underline */}
          {activeTab === t.key && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-black rounded-full transition-all" />
          )}
        </button>
      ))}
    </div>
  );
}
