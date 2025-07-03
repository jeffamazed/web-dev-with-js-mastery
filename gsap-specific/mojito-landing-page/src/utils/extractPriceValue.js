const extractPriceValue = (price) => {
  const normalized = price.replace(",", ".");
  const match = normalized.match(/[\d.]+/);
  return match ? match[0] : "";
};
export default extractPriceValue;
