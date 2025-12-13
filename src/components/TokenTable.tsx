"use client";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, toggleColumn } from "../store";

import usePriceFeed from "../hooks/usePriceFeed";
import Tabs from "./ui/Tabs";
import TokenModal from "./ui/TokenModal";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TokenTable() {
  // ----------------------------------------------
  // FETCH PRICE FEED
  // ----------------------------------------------
  const { data, loading } = usePriceFeed();

  const dispatch = useDispatch();
  const cols = useSelector((s: RootState) => s.ui.columns);
  const activeTab = useSelector((s: RootState) => s.ui.activeTab);

  // ----------------------------------------------
  // SEARCH
  // ----------------------------------------------
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((t) => t.category === activeTab)
      .filter((t) =>
        t.symbol.toLowerCase().includes(search.toLowerCase())
      );
  }, [data, activeTab, search]);

  // ----------------------------------------------
  // SORTING LOGIC
  // ----------------------------------------------
  const [sortKey, setSortKey] = useState("symbol");
  const [asc, setAsc] = useState(true);

  function toggleSort(key: string) {
    if (key === sortKey) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(true);
    }
  }

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return asc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return asc ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, asc]);

  // ----------------------------------------------
  // PAGINATION
  // ----------------------------------------------
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  // ----------------------------------------------
  // MODAL HANDLING
  // ----------------------------------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<any>(null);

  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold tracking-tight mb-4">
        Live Tokens
      </h2>

      {/* TABS */}
      <Tabs />

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search tokens..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-4 mb-4 px-4 py-2 border rounded-lg"
      />

      {/* COLUMN TOGGLER */}
      <div className="flex gap-6 mb-4 text-sm">
        {Object.keys(cols).map((k) => (
          <label key={k} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={cols[k]}
              onChange={() => dispatch(toggleColumn(k))}
            />
            {k}
          </label>
        ))}
      </div>

      {/* TABLE */}
      <table className="w-full border-t text-sm">
        <thead>
          <tr className="text-gray-500">

            <Th label="Symbol" sortKey="symbol" active={sortKey} asc={asc} toggle={toggleSort} />

            {cols.price && (
              <Th label="Price" sortKey="price" active={sortKey} asc={asc} toggle={toggleSort} />
            )}

            {cols.change && (
              <Th label="24h" sortKey="change" active={sortKey} asc={asc} toggle={toggleSort} />
            )}

            {cols.actions && <th className="py-2 text-right pr-4">Actions</th>}
          </tr>
        </thead>

        <tbody>

          {/* LOADING */}
          {loading &&
            [...Array(4)].map((_, i) => (
              <tr key={i} className="border-t animate-pulse">
                <td className="py-3"><Skeleton className="h-4 w-14" /></td>
                {cols.price && <td className="py-3"><Skeleton className="h-4 w-20" /></td>}
                {cols.change && <td className="py-3"><Skeleton className="h-4 w-10" /></td>}
                {cols.actions && (
                  <td className="py-3 text-right pr-4">
                    <Skeleton className="h-6 w-6 ml-auto" />
                  </td>
                )}
              </tr>
            ))}

          {/* EMPTY */}
          {!loading && paginated.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                No tokens found.
              </td>
            </tr>
          )}

          {/* REAL DATA */}
          {!loading &&
            paginated.map((t) => (
              <tr key={t.symbol} className="border-t hover:bg-gray-50 transition-colors">

                <td className="py-3">{t.symbol}</td>

                {cols.price && <td className="py-3 font-medium">${t.price.toLocaleString()}</td>}

                {cols.change && (
                  <td
                    className={cn(
                      "py-3 font-medium",
                      t.change >= 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {t.change.toFixed(2)}%
                  </td>
                )}

                {cols.actions && (
                  <td className="py-3 text-right pr-4">
                    <div className="relative z-50">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 rounded hover:bg-gray-200">
                          <MoreVertical size={18} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="z-50 bg-white border shadow-md"
                        >
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
                    </div>
                  </td>
                )}

              </tr>
            ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          ← Previous
        </button>

        <span>Page {page} of {totalPages || 1}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next →
        </button>
      </div>

      {/* MODAL */}
      <TokenModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        token={selectedToken}
      />
    </div>
  );
}

/* ------------------------------------
      SORTABLE HEADER COMPONENT
------------------------------------ */
function Th({
  label,
  sortKey,
  active,
  asc,
  toggle,
}: {
  label: string;
  sortKey: string;
  active: string;
  asc: boolean;
  toggle: (x: string) => void;
}) {
  return (
    <th
      onClick={() => toggle(sortKey)}
      className="py-2 cursor-pointer select-none flex items-center gap-1"
    >
      {label}
      {active === sortKey && (
        <ChevronDown
          size={14}
          className={asc ? "rotate-180 transition-transform" : "transition-transform"}
        />
      )}
    </th>
  );
}
