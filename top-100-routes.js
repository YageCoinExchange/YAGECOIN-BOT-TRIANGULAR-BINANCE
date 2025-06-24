// TOP 100 RUTAS MÁS RENTABLES - Generado: 2025-06-23T20:43:20.126Z
// Total rutas analizadas: 716
// Rutas rentables encontradas: 100

const TOP_100_ROUTES = [
  // 1. USDT → GUN → FDUSD → USDT - Profit: 13.3027%
  {
    route: ["USDT","GUN","FDUSD"],
    symbols: ["GUN/USDT","GUN/FDUSD","FDUSD/USDT"],
    description: "USDT → GUN → FDUSD → USDT",
    priority: 3,
    expectedProfit: 13.3027, // %
    avgSpread: 4.553, // %
  },
  // 2. USDT → ZIL → BTC → USDT - Profit: 7.4252%
  {
    route: ["USDT","ZIL","BTC"],
    symbols: ["ZIL/USDT","ZIL/BTC","BTC/USDT"],
    description: "USDT → ZIL → BTC → USDT",
    priority: 1,
    expectedProfit: 7.4252, // %
    avgSpread: 3.365, // %
  },
  // 3. USDT → FIO → BTC → USDT - Profit: 7.3069%
  {
    route: ["USDT","FIO","BTC"],
    symbols: ["FIO/USDT","FIO/BTC","BTC/USDT"],
    description: "USDT → FIO → BTC → USDT",
    priority: 1,
    expectedProfit: 7.3069, // %
    avgSpread: 5.151, // %
  },
  // 4. USDT → GALA → BTC → USDT - Profit: 7.2540%
  {
    route: ["USDT","GALA","BTC"],
    symbols: ["GALA/USDT","GALA/BTC","BTC/USDT"],
    description: "USDT → GALA → BTC → USDT",
    priority: 1,
    expectedProfit: 7.2540, // %
    avgSpread: 2.589, // %
  },
  // 5. USDT → ACH → BTC → USDT - Profit: 5.6767%
  {
    route: ["USDT","ACH","BTC"],
    symbols: ["ACH/USDT","ACH/BTC","BTC/USDT"],
    description: "USDT → ACH → BTC → USDT",
    priority: 1,
    expectedProfit: 5.6767, // %
    avgSpread: 3.939, // %
  },
  // 6. USDT → ANKR → BTC → USDT - Profit: 5.5285%
  {
    route: ["USDT","ANKR","BTC"],
    symbols: ["ANKR/USDT","ANKR/BTC","BTC/USDT"],
    description: "USDT → ANKR → BTC → USDT",
    priority: 1,
    expectedProfit: 5.5285, // %
    avgSpread: 2.588, // %
  },
  // 7. USDT → WAXP → BTC → USDT - Profit: 5.0430%
  {
    route: ["USDT","WAXP","BTC"],
    symbols: ["WAXP/USDT","WAXP/BTC","BTC/USDT"],
    description: "USDT → WAXP → BTC → USDT",
    priority: 1,
    expectedProfit: 5.0430, // %
    avgSpread: 1.771, // %
  },
  // 8. USDT → SKL → BTC → USDT - Profit: 5.0135%
  {
    route: ["USDT","SKL","BTC"],
    symbols: ["SKL/USDT","SKL/BTC","BTC/USDT"],
    description: "USDT → SKL → BTC → USDT",
    priority: 1,
    expectedProfit: 5.0135, // %
    avgSpread: 1.980, // %
  },
  // 9. USDT → IOTX → BTC → USDT - Profit: 3.6780%
  {
    route: ["USDT","IOTX","BTC"],
    symbols: ["IOTX/USDT","IOTX/BTC","BTC/USDT"],
    description: "USDT → IOTX → BTC → USDT",
    priority: 1,
    expectedProfit: 3.6780, // %
    avgSpread: 1.602, // %
  },
  // 10. USDT → NKN → BTC → USDT - Profit: 2.8623%
  {
    route: ["USDT","NKN","BTC"],
    symbols: ["NKN/USDT","NKN/BTC","BTC/USDT"],
    description: "USDT → NKN → BTC → USDT",
    priority: 1,
    expectedProfit: 2.8623, // %
    avgSpread: 1.588, // %
  },
  // 11. USDT → FLM → BTC → USDT - Profit: 2.7955%
  {
    route: ["USDT","FLM","BTC"],
    symbols: ["FLM/USDT","FLM/BTC","BTC/USDT"],
    description: "USDT → FLM → BTC → USDT",
    priority: 1,
    expectedProfit: 2.7955, // %
    avgSpread: 1.142, // %
  },
  // 12. USDT → SYS → BTC → USDT - Profit: 2.7665%
  {
    route: ["USDT","SYS","BTC"],
    symbols: ["SYS/USDT","SYS/BTC","BTC/USDT"],
    description: "USDT → SYS → BTC → USDT",
    priority: 1,
    expectedProfit: 2.7665, // %
    avgSpread: 1.283, // %
  },
  // 13. USDT → STRAX → BTC → USDT - Profit: 2.7030%
  {
    route: ["USDT","STRAX","BTC"],
    symbols: ["STRAX/USDT","STRAX/BTC","BTC/USDT"],
    description: "USDT → STRAX → BTC → USDT",
    priority: 1,
    expectedProfit: 2.7030, // %
    avgSpread: 1.734, // %
  },
  // 14. USDT → CHZ → BTC → USDT - Profit: 2.5432%
  {
    route: ["USDT","CHZ","BTC"],
    symbols: ["CHZ/USDT","CHZ/BTC","BTC/USDT"],
    description: "USDT → CHZ → BTC → USDT",
    priority: 1,
    expectedProfit: 2.5432, // %
    avgSpread: 1.020, // %
  },
  // 15. USDT → ZK → BTC → USDT - Profit: 2.3448%
  {
    route: ["USDT","ZK","BTC"],
    symbols: ["ZK/USDT","ZK/BTC","BTC/USDT"],
    description: "USDT → ZK → BTC → USDT",
    priority: 1,
    expectedProfit: 2.3448, // %
    avgSpread: 1.703, // %
  },
  // 16. USDT → DODO → BTC → USDT - Profit: 2.3090%
  {
    route: ["USDT","DODO","BTC"],
    symbols: ["DODO/USDT","DODO/BTC","BTC/USDT"],
    description: "USDT → DODO → BTC → USDT",
    priority: 1,
    expectedProfit: 2.3090, // %
    avgSpread: 1.044, // %
  },
  // 17. USDT → LTO → BTC → USDT - Profit: 2.1536%
  {
    route: ["USDT","LTO","BTC"],
    symbols: ["LTO/USDT","LTO/BTC","BTC/USDT"],
    description: "USDT → LTO → BTC → USDT",
    priority: 1,
    expectedProfit: 2.1536, // %
    avgSpread: 1.460, // %
  },
  // 18. USDT → DENT → ETH → USDT - Profit: 2.1161%
  {
    route: ["USDT","DENT","ETH"],
    symbols: ["DENT/USDT","DENT/ETH","ETH/USDT"],
    description: "USDT → DENT → ETH → USDT",
    priority: 1,
    expectedProfit: 2.1161, // %
    avgSpread: 1.570, // %
  },
  // 19. USDT → OGN → BTC → USDT - Profit: 2.0589%
  {
    route: ["USDT","OGN","BTC"],
    symbols: ["OGN/USDT","OGN/BTC","BTC/USDT"],
    description: "USDT → OGN → BTC → USDT",
    priority: 1,
    expectedProfit: 2.0589, // %
    avgSpread: 1.486, // %
  },
  // 20. USDT → FIDA → BTC → USDT - Profit: 2.0011%
  {
    route: ["USDT","FIDA","BTC"],
    symbols: ["FIDA/USDT","FIDA/BTC","BTC/USDT"],
    description: "USDT → FIDA → BTC → USDT",
    priority: 1,
    expectedProfit: 2.0011, // %
    avgSpread: 1.225, // %
  },
  // 21. USDT → COTI → BTC → USDT - Profit: 1.9829%
  {
    route: ["USDT","COTI","BTC"],
    symbols: ["COTI/USDT","COTI/BTC","BTC/USDT"],
    description: "USDT → COTI → BTC → USDT",
    priority: 1,
    expectedProfit: 1.9829, // %
    avgSpread: 0.737, // %
  },
  // 22. USDT → ARPA → BTC → USDT - Profit: 1.9690%
  {
    route: ["USDT","ARPA","BTC"],
    symbols: ["ARPA/USDT","ARPA/BTC","BTC/USDT"],
    description: "USDT → ARPA → BTC → USDT",
    priority: 1,
    expectedProfit: 1.9690, // %
    avgSpread: 1.997, // %
  },
  // 23. USDT → TFUEL → BTC → USDT - Profit: 1.9437%
  {
    route: ["USDT","TFUEL","BTC"],
    symbols: ["TFUEL/USDT","TFUEL/BTC","BTC/USDT"],
    description: "USDT → TFUEL → BTC → USDT",
    priority: 1,
    expectedProfit: 1.9437, // %
    avgSpread: 1.143, // %
  },
  // 24. USDT → RVN → BTC → USDT - Profit: 1.8189%
  {
    route: ["USDT","RVN","BTC"],
    symbols: ["RVN/USDT","RVN/BTC","BTC/USDT"],
    description: "USDT → RVN → BTC → USDT",
    priority: 1,
    expectedProfit: 1.8189, // %
    avgSpread: 2.403, // %
  },
  // 25. USDT → ALT → BTC → USDT - Profit: 1.8094%
  {
    route: ["USDT","ALT","BTC"],
    symbols: ["ALT/USDT","ALT/BTC","BTC/USDT"],
    description: "USDT → ALT → BTC → USDT",
    priority: 1,
    expectedProfit: 1.8094, // %
    avgSpread: 1.246, // %
  },
  // 26. USDT → BMT → FDUSD → USDT - Profit: 1.7763%
  {
    route: ["USDT","BMT","FDUSD"],
    symbols: ["BMT/USDT","BMT/FDUSD","FDUSD/USDT"],
    description: "USDT → BMT → FDUSD → USDT",
    priority: 3,
    expectedProfit: 1.7763, // %
    avgSpread: 0.739, // %
  },
  // 27. USDT → TST → FDUSD → USDT - Profit: 1.7644%
  {
    route: ["USDT","TST","FDUSD"],
    symbols: ["TST/USDT","TST/FDUSD","FDUSD/USDT"],
    description: "USDT → TST → FDUSD → USDT",
    priority: 3,
    expectedProfit: 1.7644, // %
    avgSpread: 1.666, // %
  },
  // 28. USDT → LOKA → BTC → USDT - Profit: 1.6961%
  {
    route: ["USDT","LOKA","BTC"],
    symbols: ["LOKA/USDT","LOKA/BTC","BTC/USDT"],
    description: "USDT → LOKA → BTC → USDT",
    priority: 1,
    expectedProfit: 1.6961, // %
    avgSpread: 0.746, // %
  },
  // 29. USDT → RARE → BTC → USDT - Profit: 1.5230%
  {
    route: ["USDT","RARE","BTC"],
    symbols: ["RARE/USDT","RARE/BTC","BTC/USDT"],
    description: "USDT → RARE → BTC → USDT",
    priority: 1,
    expectedProfit: 1.5230, // %
    avgSpread: 0.812, // %
  },
  // 30. USDT → PEOPLE → BTC → USDT - Profit: 1.5204%
  {
    route: ["USDT","PEOPLE","BTC"],
    symbols: ["PEOPLE/USDT","PEOPLE/BTC","BTC/USDT"],
    description: "USDT → PEOPLE → BTC → USDT",
    priority: 1,
    expectedProfit: 1.5204, // %
    avgSpread: 2.103, // %
  },
  // 31. USDT → NFP → BTC → USDT - Profit: 1.4753%
  {
    route: ["USDT","NFP","BTC"],
    symbols: ["NFP/USDT","NFP/BTC","BTC/USDT"],
    description: "USDT → NFP → BTC → USDT",
    priority: 1,
    expectedProfit: 1.4753, // %
    avgSpread: 0.703, // %
  },
  // 32. USDT → ASTR → BTC → USDT - Profit: 1.4700%
  {
    route: ["USDT","ASTR","BTC"],
    symbols: ["ASTR/USDT","ASTR/BTC","BTC/USDT"],
    description: "USDT → ASTR → BTC → USDT",
    priority: 1,
    expectedProfit: 1.4700, // %
    avgSpread: 1.602, // %
  },
  // 33. USDT → ENJ → BTC → USDT - Profit: 1.4291%
  {
    route: ["USDT","ENJ","BTC"],
    symbols: ["ENJ/USDT","ENJ/BTC","BTC/USDT"],
    description: "USDT → ENJ → BTC → USDT",
    priority: 1,
    expectedProfit: 1.4291, // %
    avgSpread: 0.599, // %
  },
  // 34. USDT → ATA → BTC → USDT - Profit: 1.3902%
  {
    route: ["USDT","ATA","BTC"],
    symbols: ["ATA/USDT","ATA/BTC","BTC/USDT"],
    description: "USDT → ATA → BTC → USDT",
    priority: 1,
    expectedProfit: 1.3902, // %
    avgSpread: 1.045, // %
  },
  // 35. USDT → JST → BTC → USDT - Profit: 1.2825%
  {
    route: ["USDT","JST","BTC"],
    symbols: ["JST/USDT","JST/BTC","BTC/USDT"],
    description: "USDT → JST → BTC → USDT",
    priority: 1,
    expectedProfit: 1.2825, // %
    avgSpread: 1.020, // %
  },
  // 36. USDT → BB → BTC → USDT - Profit: 1.1817%
  {
    route: ["USDT","BB","BTC"],
    symbols: ["BB/USDT","BB/BTC","BTC/USDT"],
    description: "USDT → BB → BTC → USDT",
    priority: 1,
    expectedProfit: 1.1817, // %
    avgSpread: 0.873, // %
  },
  // 37. USDT → PORTAL → BTC → USDT - Profit: 1.1623%
  {
    route: ["USDT","PORTAL","BTC"],
    symbols: ["PORTAL/USDT","PORTAL/BTC","BTC/USDT"],
    description: "USDT → PORTAL → BTC → USDT",
    priority: 1,
    expectedProfit: 1.1623, // %
    avgSpread: 1.216, // %
  },
  // 38. USDT → GLMR → BTC → USDT - Profit: 1.1608%
  {
    route: ["USDT","GLMR","BTC"],
    symbols: ["GLMR/USDT","GLMR/BTC","BTC/USDT"],
    description: "USDT → GLMR → BTC → USDT",
    priority: 1,
    expectedProfit: 1.1608, // %
    avgSpread: 0.589, // %
  },
  // 39. USDT → RIF → BTC → USDT - Profit: 1.0491%
  {
    route: ["USDT","RIF","BTC"],
    symbols: ["RIF/USDT","RIF/BTC","BTC/USDT"],
    description: "USDT → RIF → BTC → USDT",
    priority: 1,
    expectedProfit: 1.0491, // %
    avgSpread: 0.828, // %
  },
  // 40. USDT → AWE → BTC → USDT - Profit: 1.0347%
  {
    route: ["USDT","AWE","BTC"],
    symbols: ["AWE/USDT","AWE/BTC","BTC/USDT"],
    description: "USDT → AWE → BTC → USDT",
    priority: 1,
    expectedProfit: 1.0347, // %
    avgSpread: 0.659, // %
  },
  // 41. USDT → W → BTC → USDT - Profit: 0.9870%
  {
    route: ["USDT","W","BTC"],
    symbols: ["W/USDT","W/BTC","BTC/USDT"],
    description: "USDT → W → BTC → USDT",
    priority: 1,
    expectedProfit: 0.9870, // %
    avgSpread: 0.641, // %
  },
  // 42. USDT → SHELL → BTC → USDT - Profit: 0.9857%
  {
    route: ["USDT","SHELL","BTC"],
    symbols: ["SHELL/USDT","SHELL/BTC","BTC/USDT"],
    description: "USDT → SHELL → BTC → USDT",
    priority: 1,
    expectedProfit: 0.9857, // %
    avgSpread: 0.506, // %
  },
  // 43. USDT → DUSK → BTC → USDT - Profit: 0.9845%
  {
    route: ["USDT","DUSK","BTC"],
    symbols: ["DUSK/USDT","DUSK/BTC","BTC/USDT"],
    description: "USDT → DUSK → BTC → USDT",
    priority: 1,
    expectedProfit: 0.9845, // %
    avgSpread: 0.777, // %
  },
  // 44. USDT → ONT → BTC → USDT - Profit: 0.9685%
  {
    route: ["USDT","ONT","BTC"],
    symbols: ["ONT/USDT","ONT/BTC","BTC/USDT"],
    description: "USDT → ONT → BTC → USDT",
    priority: 1,
    expectedProfit: 0.9685, // %
    avgSpread: 0.624, // %
  },
  // 45. USDT → ARDR → BTC → USDT - Profit: 0.9397%
  {
    route: ["USDT","ARDR","BTC"],
    symbols: ["ARDR/USDT","ARDR/BTC","BTC/USDT"],
    description: "USDT → ARDR → BTC → USDT",
    priority: 1,
    expectedProfit: 0.9397, // %
    avgSpread: 0.468, // %
  },
  // 46. USDT → POLYX → BTC → USDT - Profit: 0.9311%
  {
    route: ["USDT","POLYX","BTC"],
    symbols: ["POLYX/USDT","POLYX/BTC","BTC/USDT"],
    description: "USDT → POLYX → BTC → USDT",
    priority: 1,
    expectedProfit: 0.9311, // %
    avgSpread: 0.597, // %
  },
  // 47. USDT → JOE → BTC → USDT - Profit: 0.9304%
  {
    route: ["USDT","JOE","BTC"],
    symbols: ["JOE/USDT","JOE/BTC","BTC/USDT"],
    description: "USDT → JOE → BTC → USDT",
    priority: 1,
    expectedProfit: 0.9304, // %
    avgSpread: 0.518, // %
  },
  // 48. USDT → LAYER → BNB → USDT - Profit: 0.9264%
  {
    route: ["USDT","LAYER","BNB"],
    symbols: ["LAYER/USDT","LAYER/BNB","BNB/USDT"],
    description: "USDT → LAYER → BNB → USDT",
    priority: 1,
    expectedProfit: 0.9264, // %
    avgSpread: 0.648, // %
  },
  // 49. USDT → ACT → EUR → USDT - Profit: 0.9123%
  {
    route: ["USDT","ACT","EUR"],
    symbols: ["ACT/USDT","ACT/EUR","EUR/USDT"],
    description: "USDT → ACT → EUR → USDT",
    priority: 3,
    expectedProfit: 0.9123, // %
    avgSpread: 0.540, // %
  },
  // 50. USDT → HOT → ETH → USDT - Profit: 0.8573%
  {
    route: ["USDT","HOT","ETH"],
    symbols: ["HOT/USDT","HOT/ETH","ETH/USDT"],
    description: "USDT → HOT → ETH → USDT",
    priority: 1,
    expectedProfit: 0.8573, // %
    avgSpread: 1.021, // %
  },
  // 51. USDT → HOME → BNB → USDT - Profit: 0.8436%
  {
    route: ["USDT","HOME","BNB"],
    symbols: ["HOME/USDT","HOME/BNB","BNB/USDT"],
    description: "USDT → HOME → BNB → USDT",
    priority: 1,
    expectedProfit: 0.8436, // %
    avgSpread: 0.360, // %
  },
  // 52. USDT → ONG → BTC → USDT - Profit: 0.8157%
  {
    route: ["USDT","ONG","BTC"],
    symbols: ["ONG/USDT","ONG/BTC","BTC/USDT"],
    description: "USDT → ONG → BTC → USDT",
    priority: 1,
    expectedProfit: 0.8157, // %
    avgSpread: 0.442, // %
  },
  // 53. USDT → BICO → BTC → USDT - Profit: 0.7998%
  {
    route: ["USDT","BICO","BTC"],
    symbols: ["BICO/USDT","BICO/BTC","BTC/USDT"],
    description: "USDT → BICO → BTC → USDT",
    priority: 1,
    expectedProfit: 0.7998, // %
    avgSpread: 0.430, // %
  },
  // 54. USDT → MAV → BTC → USDT - Profit: 0.7883%
  {
    route: ["USDT","MAV","BTC"],
    symbols: ["MAV/USDT","MAV/BTC","BTC/USDT"],
    description: "USDT → MAV → BTC → USDT",
    priority: 1,
    expectedProfit: 0.7883, // %
    avgSpread: 0.836, // %
  },
  // 55. USDT → AEVO → BTC → USDT - Profit: 0.7246%
  {
    route: ["USDT","AEVO","BTC"],
    symbols: ["AEVO/USDT","AEVO/BTC","BTC/USDT"],
    description: "USDT → AEVO → BTC → USDT",
    priority: 1,
    expectedProfit: 0.7246, // %
    avgSpread: 0.530, // %
  },
  // 56. USDT → LAYER → FDUSD → USDT - Profit: 0.7051%
  {
    route: ["USDT","LAYER","FDUSD"],
    symbols: ["LAYER/USDT","LAYER/FDUSD","FDUSD/USDT"],
    description: "USDT → LAYER → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.7051, // %
    avgSpread: 0.327, // %
  },
  // 57. USDT → RESOLV → FDUSD → USDT - Profit: 0.6857%
  {
    route: ["USDT","RESOLV","FDUSD"],
    symbols: ["RESOLV/USDT","RESOLV/FDUSD","FDUSD/USDT"],
    description: "USDT → RESOLV → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.6857, // %
    avgSpread: 0.527, // %
  },
  // 58. USDT → SC → ETH → USDT - Profit: 0.6846%
  {
    route: ["USDT","SC","ETH"],
    symbols: ["SC/USDT","SC/ETH","ETH/USDT"],
    description: "USDT → SC → ETH → USDT",
    priority: 1,
    expectedProfit: 0.6846, // %
    avgSpread: 0.565, // %
  },
  // 59. USDT → HAEDAL → BNB → USDT - Profit: 0.6692%
  {
    route: ["USDT","HAEDAL","BNB"],
    symbols: ["HAEDAL/USDT","HAEDAL/BNB","BNB/USDT"],
    description: "USDT → HAEDAL → BNB → USDT",
    priority: 1,
    expectedProfit: 0.6692, // %
    avgSpread: 0.261, // %
  },
  // 60. USDT → LISTA → BNB → USDT - Profit: 0.6598%
  {
    route: ["USDT","LISTA","BNB"],
    symbols: ["LISTA/USDT","LISTA/BNB","BNB/USDT"],
    description: "USDT → LISTA → BNB → USDT",
    priority: 1,
    expectedProfit: 0.6598, // %
    avgSpread: 0.382, // %
  },
  // 61. USDT → TIA → BTC → USDT - Profit: 0.6586%
  {
    route: ["USDT","TIA","BTC"],
    symbols: ["TIA/USDT","TIA/BTC","BTC/USDT"],
    description: "USDT → TIA → BTC → USDT",
    priority: 1,
    expectedProfit: 0.6586, // %
    avgSpread: 0.250, // %
  },
  // 62. USDT → REQ → BTC → USDT - Profit: 0.6395%
  {
    route: ["USDT","REQ","BTC"],
    symbols: ["REQ/USDT","REQ/BTC","BTC/USDT"],
    description: "USDT → REQ → BTC → USDT",
    priority: 1,
    expectedProfit: 0.6395, // %
    avgSpread: 0.610, // %
  },
  // 63. USDT → DATA → BTC → USDT - Profit: 0.6389%
  {
    route: ["USDT","DATA","BTC"],
    symbols: ["DATA/USDT","DATA/BTC","BTC/USDT"],
    description: "USDT → DATA → BTC → USDT",
    priority: 1,
    expectedProfit: 0.6389, // %
    avgSpread: 2.403, // %
  },
  // 64. USDT → GUN → BNB → USDT - Profit: 0.6303%
  {
    route: ["USDT","GUN","BNB"],
    symbols: ["GUN/USDT","GUN/BNB","BNB/USDT"],
    description: "USDT → GUN → BNB → USDT",
    priority: 1,
    expectedProfit: 0.6303, // %
    avgSpread: 0.541, // %
  },
  // 65. USDT → ICX → BTC → USDT - Profit: 0.6303%
  {
    route: ["USDT","ICX","BTC"],
    symbols: ["ICX/USDT","ICX/BTC","BTC/USDT"],
    description: "USDT → ICX → BTC → USDT",
    priority: 1,
    expectedProfit: 0.6303, // %
    avgSpread: 0.573, // %
  },
  // 66. USDT → 1INCH → BTC → USDT - Profit: 0.6292%
  {
    route: ["USDT","1INCH","BTC"],
    symbols: ["1INCH/USDT","1INCH/BTC","BTC/USDT"],
    description: "USDT → 1INCH → BTC → USDT",
    priority: 1,
    expectedProfit: 0.6292, // %
    avgSpread: 0.411, // %
  },
  // 67. USDT → USUAL → BTC → USDT - Profit: 0.5980%
  {
    route: ["USDT","USUAL","BTC"],
    symbols: ["USUAL/USDT","USUAL/BTC","BTC/USDT"],
    description: "USDT → USUAL → BTC → USDT",
    priority: 1,
    expectedProfit: 0.5980, // %
    avgSpread: 0.562, // %
  },
  // 68. USDT → BAKE → BTC → USDT - Profit: 0.5932%
  {
    route: ["USDT","BAKE","BTC"],
    symbols: ["BAKE/USDT","BAKE/BTC","BTC/USDT"],
    description: "USDT → BAKE → BTC → USDT",
    priority: 1,
    expectedProfit: 0.5932, // %
    avgSpread: 0.397, // %
  },
  // 69. USDT → NIL → BNB → USDT - Profit: 0.5692%
  {
    route: ["USDT","NIL","BNB"],
    symbols: ["NIL/USDT","NIL/BNB","BNB/USDT"],
    description: "USDT → NIL → BNB → USDT",
    priority: 1,
    expectedProfit: 0.5692, // %
    avgSpread: 0.371, // %
  },
  // 70. USDT → IO → BNB → USDT - Profit: 0.5594%
  {
    route: ["USDT","IO","BNB"],
    symbols: ["IO/USDT","IO/BNB","BNB/USDT"],
    description: "USDT → IO → BNB → USDT",
    priority: 1,
    expectedProfit: 0.5594, // %
    avgSpread: 0.319, // %
  },
  // 71. USDT → KERNEL → BNB → USDT - Profit: 0.5529%
  {
    route: ["USDT","KERNEL","BNB"],
    symbols: ["KERNEL/USDT","KERNEL/BNB","BNB/USDT"],
    description: "USDT → KERNEL → BNB → USDT",
    priority: 1,
    expectedProfit: 0.5529, // %
    avgSpread: 0.313, // %
  },
  // 72. USDT → 1000CAT → BNB → USDT - Profit: 0.5516%
  {
    route: ["USDT","1000CAT","BNB"],
    symbols: ["1000CAT/USDT","1000CAT/BNB","BNB/USDT"],
    description: "USDT → 1000CAT → BNB → USDT",
    priority: 1,
    expectedProfit: 0.5516, // %
    avgSpread: 0.370, // %
  },
  // 73. USDT → VET → BTC → USDT - Profit: 0.5469%
  {
    route: ["USDT","VET","BTC"],
    symbols: ["VET/USDT","VET/BTC","BTC/USDT"],
    description: "USDT → VET → BTC → USDT",
    priority: 1,
    expectedProfit: 0.5469, // %
    avgSpread: 1.771, // %
  },
  // 74. USDT → ILV → BTC → USDT - Profit: 0.5444%
  {
    route: ["USDT","ILV","BTC"],
    symbols: ["ILV/USDT","ILV/BTC","BTC/USDT"],
    description: "USDT → ILV → BTC → USDT",
    priority: 1,
    expectedProfit: 0.5444, // %
    avgSpread: 0.365, // %
  },
  // 75. USDT → ORDI → FDUSD → USDT - Profit: 0.5419%
  {
    route: ["USDT","ORDI","FDUSD"],
    symbols: ["ORDI/USDT","ORDI/FDUSD","FDUSD/USDT"],
    description: "USDT → ORDI → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.5419, // %
    avgSpread: 0.240, // %
  },
  // 76. USDT → QTUM → ETH → USDT - Profit: 0.5375%
  {
    route: ["USDT","QTUM","ETH"],
    symbols: ["QTUM/USDT","QTUM/ETH","ETH/USDT"],
    description: "USDT → QTUM → ETH → USDT",
    priority: 1,
    expectedProfit: 0.5375, // %
    avgSpread: 0.260, // %
  },
  // 77. USDT → PYTH → BTC → USDT - Profit: 0.5335%
  {
    route: ["USDT","PYTH","BTC"],
    symbols: ["PYTH/USDT","PYTH/BTC","BTC/USDT"],
    description: "USDT → PYTH → BTC → USDT",
    priority: 1,
    expectedProfit: 0.5335, // %
    avgSpread: 0.410, // %
  },
  // 78. USDT → SPK → BNB → USDT - Profit: 0.5279%
  {
    route: ["USDT","SPK","BNB"],
    symbols: ["SPK/USDT","SPK/BNB","BNB/USDT"],
    description: "USDT → SPK → BNB → USDT",
    priority: 1,
    expectedProfit: 0.5279, // %
    avgSpread: 0.243, // %
  },
  // 79. USDT → THE → FDUSD → USDT - Profit: 0.5069%
  {
    route: ["USDT","THE","FDUSD"],
    symbols: ["THE/USDT","THE/FDUSD","FDUSD/USDT"],
    description: "USDT → THE → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.5069, // %
    avgSpread: 0.287, // %
  },
  // 80. USDT → PARTI → FDUSD → USDT - Profit: 0.4844%
  {
    route: ["USDT","PARTI","FDUSD"],
    symbols: ["PARTI/USDT","PARTI/FDUSD","FDUSD/USDT"],
    description: "USDT → PARTI → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.4844, // %
    avgSpread: 0.488, // %
  },
  // 81. USDT → PARTI → BNB → USDT - Profit: 0.4676%
  {
    route: ["USDT","PARTI","BNB"],
    symbols: ["PARTI/USDT","PARTI/BNB","BNB/USDT"],
    description: "USDT → PARTI → BNB → USDT",
    priority: 1,
    expectedProfit: 0.4676, // %
    avgSpread: 0.488, // %
  },
  // 82. USDT → NIL → FDUSD → USDT - Profit: 0.4580%
  {
    route: ["USDT","NIL","FDUSD"],
    symbols: ["NIL/USDT","NIL/FDUSD","FDUSD/USDT"],
    description: "USDT → NIL → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.4580, // %
    avgSpread: 0.240, // %
  },
  // 83. USDT → IOTX → ETH → USDT - Profit: 0.4559%
  {
    route: ["USDT","IOTX","ETH"],
    symbols: ["IOTX/USDT","IOTX/ETH","ETH/USDT"],
    description: "USDT → IOTX → ETH → USDT",
    priority: 1,
    expectedProfit: 0.4559, // %
    avgSpread: 0.230, // %
  },
  // 84. USDT → HEI → BTC → USDT - Profit: 0.4395%
  {
    route: ["USDT","HEI","BTC"],
    symbols: ["HEI/USDT","HEI/BTC","BTC/USDT"],
    description: "USDT → HEI → BTC → USDT",
    priority: 1,
    expectedProfit: 0.4395, // %
    avgSpread: 0.251, // %
  },
  // 85. USDT → BERA → BTC → USDT - Profit: 0.4370%
  {
    route: ["USDT","BERA","BTC"],
    symbols: ["BERA/USDT","BERA/BTC","BTC/USDT"],
    description: "USDT → BERA → BTC → USDT",
    priority: 1,
    expectedProfit: 0.4370, // %
    avgSpread: 0.200, // %
  },
  // 86. USDT → LISTA → FDUSD → USDT - Profit: 0.4347%
  {
    route: ["USDT","LISTA","FDUSD"],
    symbols: ["LISTA/USDT","LISTA/FDUSD","FDUSD/USDT"],
    description: "USDT → LISTA → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.4347, // %
    avgSpread: 0.243, // %
  },
  // 87. USDT → BAT → BTC → USDT - Profit: 0.4295%
  {
    route: ["USDT","BAT","BTC"],
    symbols: ["BAT/USDT","BAT/BTC","BTC/USDT"],
    description: "USDT → BAT → BTC → USDT",
    priority: 1,
    expectedProfit: 0.4295, // %
    avgSpread: 0.318, // %
  },
  // 88. USDT → LRC → BTC → USDT - Profit: 0.4236%
  {
    route: ["USDT","LRC","BTC"],
    symbols: ["LRC/USDT","LRC/BTC","BTC/USDT"],
    description: "USDT → LRC → BTC → USDT",
    priority: 1,
    expectedProfit: 0.4236, // %
    avgSpread: 0.507, // %
  },
  // 89. USDT → FIS → BTC → USDT - Profit: 0.4220%
  {
    route: ["USDT","FIS","BTC"],
    symbols: ["FIS/USDT","FIS/BTC","BTC/USDT"],
    description: "USDT → FIS → BTC → USDT",
    priority: 1,
    expectedProfit: 0.4220, // %
    avgSpread: 0.435, // %
  },
  // 90. USDT → OP → ETH → USDT - Profit: 0.4179%
  {
    route: ["USDT","OP","ETH"],
    symbols: ["OP/USDT","OP/ETH","ETH/USDT"],
    description: "USDT → OP → ETH → USDT",
    priority: 1,
    expectedProfit: 0.4179, // %
    avgSpread: 0.359, // %
  },
  // 91. USDT → NTRN → BNB → USDT - Profit: 0.4170%
  {
    route: ["USDT","NTRN","BNB"],
    symbols: ["NTRN/USDT","NTRN/BNB","BNB/USDT"],
    description: "USDT → NTRN → BNB → USDT",
    priority: 1,
    expectedProfit: 0.4170, // %
    avgSpread: 0.284, // %
  },
  // 92. USDT → POWR → ETH → USDT - Profit: 0.4143%
  {
    route: ["USDT","POWR","ETH"],
    symbols: ["POWR/USDT","POWR/ETH","ETH/USDT"],
    description: "USDT → POWR → ETH → USDT",
    priority: 1,
    expectedProfit: 0.4143, // %
    avgSpread: 0.257, // %
  },
  // 93. USDT → PENDLE → FDUSD → USDT - Profit: 0.4140%
  {
    route: ["USDT","PENDLE","FDUSD"],
    symbols: ["PENDLE/USDT","PENDLE/FDUSD","FDUSD/USDT"],
    description: "USDT → PENDLE → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.4140, // %
    avgSpread: 0.198, // %
  },
  // 94. USDT → SPK → FDUSD → USDT - Profit: 0.4068%
  {
    route: ["USDT","SPK","FDUSD"],
    symbols: ["SPK/USDT","SPK/FDUSD","FDUSD/USDT"],
    description: "USDT → SPK → FDUSD → USDT",
    priority: 3,
    expectedProfit: 0.4068, // %
    avgSpread: 0.214, // %
  },
  // 95. USDT → SFP → BTC → USDT - Profit: 0.4053%
  {
    route: ["USDT","SFP","BTC"],
    symbols: ["SFP/USDT","SFP/BTC","BTC/USDT"],
    description: "USDT → SFP → BTC → USDT",
    priority: 1,
    expectedProfit: 0.4053, // %
    avgSpread: 0.537, // %
  },
  // 96. USDT → LRC → ETH → USDT - Profit: 0.4025%
  {
    route: ["USDT","LRC","ETH"],
    symbols: ["LRC/USDT","LRC/ETH","ETH/USDT"],
    description: "USDT → LRC → ETH → USDT",
    priority: 1,
    expectedProfit: 0.4025, // %
    avgSpread: 0.201, // %
  },
  // 97. USDT → BANANA → BTC → USDT - Profit: 0.3971%
  {
    route: ["USDT","BANANA","BTC"],
    symbols: ["BANANA/USDT","BANANA/BTC","BTC/USDT"],
    description: "USDT → BANANA → BTC → USDT",
    priority: 1,
    expectedProfit: 0.3971, // %
    avgSpread: 0.187, // %
  },
  // 98. USDT → FLUX → BTC → USDT - Profit: 0.3839%
  {
    route: ["USDT","FLUX","BTC"],
    symbols: ["FLUX/USDT","FLUX/BTC","BTC/USDT"],
    description: "USDT → FLUX → BTC → USDT",
    priority: 1,
    expectedProfit: 0.3839, // %
    avgSpread: 0.204, // %
  },
  // 99. USDT → BANANA → BNB → USDT - Profit: 0.3833%
  {
    route: ["USDT","BANANA","BNB"],
    symbols: ["BANANA/USDT","BANANA/BNB","BNB/USDT"],
    description: "USDT → BANANA → BNB → USDT",
    priority: 1,
    expectedProfit: 0.3833, // %
    avgSpread: 0.289, // %
  },
  // 100. USDT → CTK → BTC → USDT - Profit: 0.3696%
  {
    route: ["USDT","CTK","BTC"],
    symbols: ["CTK/USDT","CTK/BTC","BTC/USDT"],
    description: "USDT → CTK → BTC → USDT",
    priority: 1,
    expectedProfit: 0.3696, // %
    avgSpread: 0.176, // %
  }
];

module.exports = { TOP_100_ROUTES };