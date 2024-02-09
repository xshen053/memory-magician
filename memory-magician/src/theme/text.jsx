export const memoryWithExplanation = [
  { id: -1, type: "HELP", text: "Select / Deselect all memories"},
  { id: 0, type: "DAILY", text: "Daily memory: you want to review it every day." },
  { id: 1, type: "ONETIME", text: "One-time memory: you want to record some ideas or memory and check them later, but no need to review it, e.g. a flash of inspiration, you name it!" },
  { id: 2, type: "PERIODIC", text: "Periodic memory: you want to review this memory periodically, e.g. once per 10 days." },
  { id: 3, type: "GENERAL", text: "General memory: you want to review it and memorize it efficiently according to improved Ebbinghaus's Forgetting Curve: after x days. (x = [0, 1, 5, 10, 20, 30, 45, 60, 90, 120, 150])." },
];

export const memoryWithoutExplanation = [
  { id: -1, type: "HELP", text: "Select / Deselect all memories"},
  { id: 0, type: "DAILY", text: "Daily" },
  { id: 1, type: "ONETIME", text: "One-time" },
  { id: 2, type: "PERIODIC", text: "Periodic" },
  { id: 3, type: "GENERAL", text: "General" },
];
