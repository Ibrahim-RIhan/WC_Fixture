// All 48 teams of the FIFA World Cup 2026
export const TEAMS = {
  MEX: { name: "Mexico", code: "MEX", flag: "🇲🇽", group: "A" },
  RSA: { name: "South Africa", code: "RSA", flag: "🇿🇦", group: "A" },
  KOR: { name: "South Korea", code: "KOR", flag: "🇰🇷", group: "A" },
  TUR: { name: "Turkey", code: "TUR", flag: "🇹🇷", group: "A" },

  CAN: { name: "Canada", code: "CAN", flag: "🇨🇦", group: "B" },
  BIH: { name: "Bosnia & Herz.", code: "BIH", flag: "🇧🇦", group: "B" },
  QAT: { name: "Qatar", code: "QAT", flag: "🇶🇦", group: "B" },
  SUI: { name: "Switzerland", code: "SUI", flag: "🇨🇭", group: "B" },

  BRA: { name: "Brazil", code: "BRA", flag: "🇧🇷", group: "C" },
  MAR: { name: "Morocco", code: "MAR", flag: "🇲🇦", group: "C" },
  HAI: { name: "Haiti", code: "HAI", flag: "🇭🇹", group: "C" },
  SCO: { name: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },

  USA: { name: "United States", code: "USA", flag: "🇺🇸", group: "D" },
  PAR: { name: "Paraguay", code: "PAR", flag: "🇵🇾", group: "D" },
  AUS: { name: "Australia", code: "AUS", flag: "🇦🇺", group: "D" },
  SWE: { name: "Sweden", code: "SWE", flag: "🇸🇪", group: "D" },

  GER: { name: "Germany", code: "GER", flag: "🇩🇪", group: "E" },
  CUW: { name: "Curaçao", code: "CUW", flag: "🇨🇼", group: "E" },
  CIV: { name: "Ivory Coast", code: "CIV", flag: "🇨🇮", group: "E" },
  ECU: { name: "Ecuador", code: "ECU", flag: "🇪🇨", group: "E" },

  NED: { name: "Netherlands", code: "NED", flag: "🇳🇱", group: "F" },
  JPN: { name: "Japan", code: "JPN", flag: "🇯🇵", group: "F" },
  CZE: { name: "Czech Republic", code: "CZE", flag: "🇨🇿", group: "F" },
  TUN: { name: "Tunisia", code: "TUN", flag: "🇹🇳", group: "F" },

  BEL: { name: "Belgium", code: "BEL", flag: "🇧🇪", group: "G" },
  EGY: { name: "Egypt", code: "EGY", flag: "🇪🇬", group: "G" },
  IRN: { name: "Iran", code: "IRN", flag: "🇮🇷", group: "G" },
  NZL: { name: "New Zealand", code: "NZL", flag: "🇳🇿", group: "G" },

  ESP: { name: "Spain", code: "ESP", flag: "🇪🇸", group: "H" },
  CPV: { name: "Cape Verde", code: "CPV", flag: "🇨🇻", group: "H" },
  KSA: { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦", group: "H" },
  URU: { name: "Uruguay", code: "URU", flag: "🇺🇾", group: "H" },

  FRA: { name: "France", code: "FRA", flag: "🇫🇷", group: "I" },
  SEN: { name: "Senegal", code: "SEN", flag: "🇸🇳", group: "I" },
  IRQ: { name: "Iraq", code: "IRQ", flag: "🇮🇶", group: "I" },
  NOR: { name: "Norway", code: "NOR", flag: "🇳🇴", group: "I" },

  ARG: { name: "Argentina", code: "ARG", flag: "🇦🇷", group: "J" },
  ALG: { name: "Algeria", code: "ALG", flag: "🇩🇿", group: "J" },
  AUT: { name: "Austria", code: "AUT", flag: "🇦🇹", group: "J" },
  JOR: { name: "Jordan", code: "JOR", flag: "🇯🇴", group: "J" },

  POR: { name: "Portugal", code: "POR", flag: "🇵🇹", group: "K" },
  COD: { name: "DR Congo", code: "COD", flag: "🇨🇩", group: "K" },
  UZB: { name: "Uzbekistan", code: "UZB", flag: "🇺🇿", group: "K" },
  COL: { name: "Colombia", code: "COL", flag: "🇨🇴", group: "K" },

  ENG: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  CRO: { name: "Croatia", code: "CRO", flag: "🇭🇷", group: "L" },
  GHA: { name: "Ghana", code: "GHA", flag: "🇬🇭", group: "L" },
  PAN: { name: "Panama", code: "PAN", flag: "🇵🇦", group: "L" },
};

export const GROUPS = {
  A: ["MEX", "RSA", "KOR", "TUR"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "SWE"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "CZE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

// Which R32 match feeds into which next match
export const FEEDS_MAP = {
  "R32-L1": ["R16-L1", 0], "R32-L2": ["R16-L1", 1],
  "R32-L3": ["R16-L2", 0], "R32-L4": ["R16-L2", 1],
  "R32-L5": ["R16-L3", 0], "R32-L6": ["R16-L3", 1],
  "R32-L7": ["R16-L4", 0], "R32-L8": ["R16-L4", 1],
  "R32-R1": ["R16-R1", 0], "R32-R2": ["R16-R1", 1],
  "R32-R3": ["R16-R2", 0], "R32-R4": ["R16-R2", 1],
  "R32-R5": ["R16-R3", 0], "R32-R6": ["R16-R3", 1],
  "R32-R7": ["R16-R4", 0], "R32-R8": ["R16-R4", 1],
  "R16-L1": ["QF-L1", 0], "R16-L2": ["QF-L1", 1],
  "R16-L3": ["QF-L2", 0], "R16-L4": ["QF-L2", 1],
  "R16-R1": ["QF-R1", 0], "R16-R2": ["QF-R1", 1],
  "R16-R3": ["QF-R2", 0], "R16-R4": ["QF-R2", 1],
  "QF-L1": ["SF-L", 0], "QF-L2": ["SF-L", 1],
  "QF-R1": ["SF-R", 0], "QF-R2": ["SF-R", 1],
  "SF-L": ["FINAL", 0], "SF-R": ["FINAL", 1],
};

export const BRACKET_COLUMNS = [
  { matches: ["R32-L1","R32-L2","R32-L3","R32-L4","R32-L5","R32-L6","R32-L7","R32-L8"], label: "Round of 32" },
  { matches: ["R16-L1","R16-L2","R16-L3","R16-L4"], label: "Round of 16" },
  { matches: ["QF-L1","QF-L2"], label: "Quarter Finals" },
  { matches: ["SF-L"], label: "Semi Finals" },
  { matches: ["FINAL"], label: "FINAL" },
  { matches: ["SF-R"], label: "Semi Finals" },
  { matches: ["QF-R1","QF-R2"], label: "Quarter Finals" },
  { matches: ["R16-R1","R16-R2","R16-R3","R16-R4"], label: "Round of 16" },
  { matches: ["R32-R1","R32-R2","R32-R3","R32-R4","R32-R5","R32-R6","R32-R7","R32-R8"], label: "Round of 32" },
];

export const R32_IDS = [
  "R32-L1","R32-L2","R32-L3","R32-L4","R32-L5","R32-L6","R32-L7","R32-L8",
  "R32-R1","R32-R2","R32-R3","R32-R4","R32-R5","R32-R6","R32-R7","R32-R8",
];
export const R16_IDS = ["R16-L1","R16-L2","R16-L3","R16-L4","R16-R1","R16-R2","R16-R3","R16-R4"];
export const QF_IDS = ["QF-L1","QF-L2","QF-R1","QF-R2"];
export const SF_IDS = ["SF-L","SF-R"];
