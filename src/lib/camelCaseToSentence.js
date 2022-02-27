export default function camelCaseToSentence(input) {
  if (typeof input !== "string") {
    return input;
  }

  if (input === "isTurnedOn") {
    return "Turned On";
  }

  return input
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
}
