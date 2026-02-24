export function classifyClimate(temp: number, condition: string) {
  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes("rain")) return "chuvoso";
  if (temp <= 15) return "frio";
  if (temp <= 25) return "ameno";
  return "quente";
}