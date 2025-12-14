"use client";

import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, MoreVertical } from "lucide-react";

import { RootState, toggleColumn } from "@/store";
import usePriceFeed from "@/hooks/usePriceFeed";
import Tabs from "./ui/Tabs";
import ThemeToggle from "./ui/ThemeToggle";
import TokenModal from "./ui/TokenModal";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* =======================
   TYPES
======================= */
type SortKey = "symbol" | "price" | "change";

type Token = {
  symbol: string;
  price: number;
  change: number;
  category: string;
};

export default function TokenTable() {
  const { data, loading }: { data: Token[]; loading: boolean } = usePriceFeed();

  const dispatch = useDispatch();
  const columns = useSelector((s: RootState) => s.ui.columns);
  const activeTab = useSelector((s: RootState) => s.ui.activeTab);

  const [sortKey, setSortKey] = useState<SortKey>("symbol");
  const [asc, setAsc] = useState(true);

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  /* ---------- FILTER ---------- */
  const filtered = useMemo(() => {
    return data.filter((t) => t.category === activeTab);
  }, [data, activeTab]);

  /* ---------- SORT ---------- */
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal < bVal) return asc ? -1 : 1;
      if (aVal > bVal) return asc ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, asc]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(true);
    }
  };

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
      {/* ---------- HEADER ---------- */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Live Tokens
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time crypto prices and market movement
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* ---------- TABS ---------- */}
      <Tabs />

      {/* ---------- COLUMN TOGGLES ---------- */}
      <div className="mt-4 flex gap-6 text-sm text-gray-700 dark:text-gray-300">
        {(Object.keys(columns) as Array<keyof typeof columns>).map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={columns[key]}
              onChange={() => dispatch(toggleColumn(key))}
            />
            {key}
          </label>
        ))}
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="mt-4 overflow-hidden rounded-lg border dark:border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <Th
                label="Symbol"
                sortKey="symbol"
                sortKeyState={sortKey}
                asc={asc}
                toggleSort={toggleSort}
              />

              {columns.price && (
                <Th
                  label="Price"
                  sortKey="price"
                  sortKeyState={sortKey}
                  asc={asc}
                  toggleSort={toggleSort}
                />
              )}

              {columns.change && (
                <Th
                  label="24h"
                  sortKey="change"
                  sortKeyState={sortKey}
                  asc={asc}
                  toggleSort={toggleSort}
                />
              )}

              {columns.actions && (
                <th className="px-4 py-3 text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-t dark:border-gray-800">
                  <td className="px-4 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  {columns.price && (
                    <td className="px-4 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                  )}
                  {columns.change && (
                    <td className="px-4 py-4">
                      <Skeleton className="h-4 w-14" />
                    </td>
                  )}
                  {columns.actions && (
                    <td className="px-4 py-4">
                      <Skeleton className="h-6 w-6 ml-auto" />
                    </td>
                  )}
                </tr>
              ))}

            {!loading &&
              sorted.map((t) => (
                <tr
                  key={t.symbol}
                  className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-4 font-medium">{t.symbol}</td>

                  {columns.price && (
                    <td className="px-4 py-4">
                      ${t.price.toLocaleString()}
                    </td>
                  )}

                  {columns.change && (
                    <td
                      className={cn(
                        "px-4 py-4 font-medium",
                        t.change >= 0 ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {t.change.toFixed(2)}%
                    </td>
                  )}

                  {columns.actions && (
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                          <MoreVertical size={18} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedToken(t);
                              setModalOpen(true);
                            }}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
                          <DropdownMenuItem>Open Chart</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ---------- MODAL ---------- */}
      <TokenModal
        isOpen={modalOpen}
        token={selectedToken}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

/* =======================
   SORTABLE HEADER
======================= */
function Th({
  label,
  sortKey,
  sortKeyState,
  asc,
  toggleSort,
}: {
  label: string;
  sortKey: SortKey;
  sortKeyState: SortKey;
  asc: boolean;
  toggleSort: (k: SortKey) => void;
}) {
  return (
    <th
      onClick={() => toggleSort(sortKey)}
      className="px-4 py-3 cursor-pointer select-none"
    >
      <div className="flex items-center gap-1">
        {label}
        {sortKeyState === sortKey && (
          <ChevronDown
            size={14}
            className={cn("transition-transform", asc && "rotate-180")}
          />
        )}
      </div>
    </th>
  );
}
