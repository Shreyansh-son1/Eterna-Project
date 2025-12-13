export function exportTokensToCSV(tokens: any[]) {
  if (!tokens || tokens.length === 0) return;

  const header = ["symbol", "price", "change", "category"];
  const rows = tokens.map((t) =>
    [t.symbol, t.price, t.change, t.category].join(",")
  );

  const csvContent = [header.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tokens_export.csv";
  a.click();

  URL.revokeObjectURL(url);
}
