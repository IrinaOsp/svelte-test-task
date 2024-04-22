import { encoded, translations } from "./data.js";

console.log("Let's rock");
// console.log(encoded, translations);

const decode = (encoded, translations) => {
  const idsRepeats = Object.fromEntries(
    Object.keys(translations).map((key) => [key, 0])
  );
  const decoded = encoded.map((item) => {
    Object.entries(item).map(([key, value]) => {
      if (key.endsWith("Id") && value !== null && key !== "groupId") {
        idsRepeats[value] = idsRepeats[value] + 1;
        return (item[key] = translations[value]);
      }
      return [key, value];
    });
    return item;
  });
  const uniqueIds = Object.keys(idsRepeats).filter(
    (key) => idsRepeats[key] === 1
  );
  console.log(`Unique ids: ${[...uniqueIds]}`);
  return decoded;
};

const decoded = decode(encoded, translations);

console.log(decoded);
