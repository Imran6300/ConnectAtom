import type { Resource } from "@/lib/catalogue/types";

const author = { name: "ConnectAtom Team", role: "Product and field team" };

const resources: Resource[] = [
  {
    slug: "diy-esp32-data-logger-vs-ready-made-monitoring",
    type: "comparison",
    title: "DIY ESP32 data logger vs ready-made monitoring: which to choose",
    answer: "A DIY ESP32 logger wins on parts cost and learning when you have the time and one or two rooms to watch. A ready-made system wins when someone else's stock depends on it, because alerts, escalation, records and support are the hard part.",
    summary: "An honest comparison of a DIY ESP32 temperature logger with a ready-made monitor: cost, time, alerts, records, upkeep and where each one is the better choice.",
    sections: [
      {
        heading: "What a DIY logger does well",
        body: [
          "An ESP32 board, a temperature sensor and a few hours of work will give you a working logger. The parts cost very little, you learn how it all works, and you can shape the logic any way you like. For a hobby fridge, a workshop or a single room that you check daily, this is a sensible project.",
          "DIY also wins when your need is unusual. If you want a custom sensor, a special reading interval or a link into your own software, a board you control is easier to bend than a finished product. Many of our own early prototypes started this way.",
        ],
      },
      {
        heading: "Where the hard part actually is",
        body: [
          "Reading a sensor is the easy 10 percent of the job. The rest is what happens at 2 am: the Wi-Fi drops, the power cuts, the sensor reads a stuck value, or the message server is down. Each of these needs design, testing and a fix that you apply on your own.",
          "A cold room monitor only earns its keep if it fails loudly. That means offline alerts, buffering readings on the device when the network drops, a backup battery so the power cut itself is reported, and escalation so the alert reaches a second person. Each is a small project of its own.",
        ],
        list: [
          "Alerts that reach a person on WhatsApp or by voice call, with escalation if nobody answers",
          "Readings kept on the device when the network drops, then uploaded",
          "A backup battery and a power-cut alert, so the cut itself is reported",
          "An offline alert when the device goes silent",
          "A record that shows who acknowledged each alert, and why",
        ],
      },
      {
        heading: "Side by side",
        body: [
          "The table lists the points that matter most in practice. It compares a typical DIY build with a ready-made monitor such as the ConnectAtom Cold Room Monitor. Your own build may do better in some rows.",
        ],
        table: {
          head: ["Point", "DIY ESP32 logger", "Ready-made monitor"],
          rows: [
            ["Up-front cost", "Lowest for the parts", "Higher: hardware plus a monthly plan"],
            ["Your time", "Many hours to build, test and maintain", "Install and set limits"],
            ["Customising", "Complete freedom", "Limited to what the product offers"],
            ["Alerts and escalation", "You build and host them", "Included, channels depend on the plan"],
            ["Power-cut and offline alerts", "You design and test them", "Included"],
            ["Reports and record", "You build them", "PDF and CSV on the platform, by plan"],
            ["Support when it fails", "You", "The vendor"],
            ["Calibration file for a probe", "You arrange it", "Depends on the product"],
          ],
        },
      },
      {
        heading: "How to choose",
        body: [
          "Choose DIY if the room is yours, the stock is cheap to replace, you enjoy the work, and a missed alert costs you little. It is also a good way to learn before buying anything.",
          "Choose ready-made if the stock belongs to others, if a missed night means a dispute or a recall, if nobody on your team will maintain a custom device, or if you will need a record to show someone. In that case you are paying for the boring parts being done and tested.",
          "A middle route works too. Many people build one DIY logger, run it beside a ready-made monitor for a month, and compare the two. The comparison is cheap, and it shows what each one catches. Our spoilage cost calculator at /tools/spoilage-cost-calculator can help you decide what a missed night is worth.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "kitchen-freezer-monitor", "warehouse-climate-monitor"],
    industrySlugs: ["restaurant", "cold-storage", "small-factory"],
    applicationSlugs: ["power-cut-alerts", "whatsapp-temperature-alerts"],
    tags: ["temperature", "wifi", "offline-buffering", "escalation", "battery-backup"],
    author,
    readMinutes: 4,
    publishedAt: "2026-11-25",
    status: "live",
    updatedAt: "2026-11-25",
  },
  {
    slug: "wired-vs-wireless-temperature-sensors",
    type: "comparison",
    title: "Wired vs wireless temperature sensors: which suits your room",
    answer: "Wired probes are steadier and need no battery, so they suit a fixed cold room or fridge. Wireless sensors are easier to place in a large godown or a hard-to-reach spot, but each one adds a battery and a radio link that someone must look after.",
    summary: "Compare wired and wireless temperature sensors for cold rooms, fridges and godowns: reliability, battery upkeep, placement, range and cost, with where each wins.",
    sections: [
      {
        heading: "The short version",
        body: [
          "A wired sensor has a cable to a node that is powered and connected. A wireless sensor is a small battery unit that sends readings by radio, such as BLE, 433 MHz or LoRa, to a gateway. Both measure temperature the same way. The difference is how the reading travels and who powers the sensor.",
          "Neither is always better. The right choice depends on where the sensor must sit, how far it is from the network, and who will look after batteries.",
        ],
      },
      {
        heading: "Where wired wins",
        body: [
          "A wired probe has no battery to run flat and no radio link to be blocked. In a metal cold room, thick walls and stacked stock weaken radio signals, while a cable passes through a small hole in the wall and the problem does not arise. This is why the ConnectAtom Cold Room Monitor uses a probe on a cable, with the gateway kept outside the cold zone.",
          "Wired also suits a medical fridge or a kitchen freezer, where the probe sits in one known place for years. You fit it once and it keeps working. The cable run is short, and the monitor can then be powered from the mains with a backup.",
          "The same reasoning is behind how we fit a door sensor. We wire it wherever a cable can reach, because the wireless version runs on a battery that needs maintenance.",
        ],
      },
      {
        heading: "Where wireless wins",
        body: [
          "A big godown is the clearest case. Running a cable to six or eight points across a large floor is costly and disruptive. Wireless nodes, or nodes with a LoRa link to a gateway, can be placed where the readings are most useful and moved after a survey.",
          "Wireless also helps in places where cabling is not allowed, or where a sensor must move with the stock, such as a pallet in transit. And a short survey, with a few sensors placed for a week, is much easier without cables.",
        ],
        list: [
          "Large or open sites where cable runs are long",
          "A temporary survey of where a godown runs hot or damp",
          "Doors or spots where a cable cannot be routed",
          "Retrofits where drilling is not possible",
        ],
      },
      {
        heading: "Side by side",
        body: [
          "This table gives the general picture. Specific products differ, and range or battery life for any ConnectAtom unit is not yet confirmed, so ask for the figure for your model.",
        ],
        table: {
          head: ["Point", "Wired", "Wireless"],
          rows: [
            ["Power", "From the node, no separate battery", "Own battery, needs changing"],
            ["Signal through metal and stock", "Not affected", "Can be weakened or blocked"],
            ["Installation effort", "Cable run needed", "Quick to place"],
            ["Placement flexibility", "Fixed by cable length", "Easy to move"],
            ["Long-term upkeep", "Low", "Battery checks, link checks"],
            ["Best fit", "Cold rooms, fridges, freezers", "Large godowns, surveys, awkward doors"],
          ],
        },
      },
      {
        heading: "How to decide",
        body: [
          "Start with the place. If the sensor will sit in one spot for years and a cable can reach it, wire it. If the area is large or the spot is awkward, use wireless, and set a low-battery alert so a dead sensor does not look like a calm room.",
          "Most real sites mix both: wired probes in the rooms that matter most, wireless nodes in the godown. The monitoring platform treats them the same, with limits, alerts and a record for each.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "warehouse-climate-monitor", "door-open-sensor", "medical-fridge-monitor"],
    industrySlugs: ["cold-storage", "warehouse-and-logistics", "pharmacy"],
    applicationSlugs: ["humidity-monitoring-godown", "door-open-alerts"],
    tags: ["temperature", "lora", "wifi", "multi-node", "battery-backup"],
    author,
    readMinutes: 4,
    publishedAt: "2026-11-25",
    status: "live",
    updatedAt: "2026-11-25",
  },
  {
    slug: "manual-temperature-logs-vs-automatic-monitoring",
    type: "comparison",
    title: "Manual temperature logs vs automatic monitoring: what each does",
    answer: "A manual log is cheap and keeps people looking at the room, but it only shows the moments someone checked. Automatic monitoring records continuously and alerts you between checks, so it fits any room where a missed night would be costly.",
    summary: "Compare a handwritten temperature log with automatic monitoring: coverage, cost, evidence, human effort and when a manual routine is still good enough.",
    sections: [
      {
        heading: "What a manual log gives you",
        body: [
          "A manual log is a sheet on the door and a pen. Someone reads a thermometer at set times and writes down the figure and their initials. It costs almost nothing, needs no network or power, and it keeps a person looking at the room, which has real value. A cracked gasket or a smell may be noticed by a person and not by any sensor.",
          "For a small shop fridge that someone opens ten times a day, a well-kept log can be perfectly reasonable. The routine itself also trains the team to care about the temperature.",
        ],
      },
      {
        heading: "What it cannot do",
        body: [
          "A log shows the temperature at the moment of reading and nothing else. If the compressor stops at 1 am and a check happens at 8 am, the log shows a warm reading in the morning and no idea when it began. A midday spike during a delivery may never be written down.",
          "A log also depends on the person. Entries get filled in from memory at the end of the shift, a busy day gets skipped, a figure is rounded to look fine. None of this is dishonest in spirit, but it makes the log weak evidence when stock is questioned.",
          "Most importantly, a log is read after the event. It cannot wake anyone up.",
        ],
      },
      {
        heading: "What automatic monitoring adds",
        body: [
          "A monitor reads at a steady interval, day and night, and stores each reading with its time. It sends an alert when the reading stays out of range for the delay you set, and it escalates if nobody answers. It also reports a power cut or a silent device.",
          "The record that results is continuous, shows every excursion with its start and end, and records who acknowledged each alert and why. Check which rules apply to you, because a record that suits one buyer or inspector may not suit another.",
        ],
        list: [
          "Readings between checks, including nights and weekends",
          "Alerts on WhatsApp, SMS or voice call, by plan",
          "Escalation to the next person when nobody answers",
          "Power-cut and offline alerts",
          "Reports and CSV export without copying figures",
        ],
      },
      {
        heading: "Side by side",
        body: [
          "The table compares a well-run manual routine with an automatic monitor. A poorly run manual routine will fare worse than shown here.",
        ],
        table: {
          head: ["Point", "Manual log", "Automatic monitoring"],
          rows: [
            ["Cost", "Almost nothing", "Hardware plus a monthly plan"],
            ["Coverage", "Only the moments someone checks", "Continuous, day and night"],
            ["Alert between checks", "None", "Yes, with escalation"],
            ["Power cut at night", "Found at the next check", "Reported within minutes"],
            ["Evidence", "Depends on the writer", "Time-stamped by the device"],
            ["Human observation", "Strong: smell, gasket, ice", "Needs a person on the alert"],
            ["Effort per day", "Several short checks", "Almost none, apart from alerts"],
          ],
        },
      },
      {
        heading: "How to choose, and a sensible mix",
        body: [
          "Keep the manual routine if your stock is low in value, you are always on site, and a missed night is a small loss. Move to automatic monitoring when stock belongs to others, when nobody is on site overnight, or when you must show a record.",
          "The best arrangement is often both. Keep a daily walk-round for the things a sensor cannot see, and let the monitor cover the hours between. Use our spoilage cost calculator at /tools/spoilage-cost-calculator to put a rupee figure on one missed night, then compare it with the monthly plan.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "medical-fridge-monitor", "kitchen-freezer-monitor"],
    industrySlugs: ["restaurant", "pharmacy", "cold-storage", "bakery-and-sweet-shop"],
    applicationSlugs: ["audit-ready-temperature-reports", "power-cut-alerts", "vaccine-storage-logging"],
    tags: ["temperature", "compliance-log", "reports", "escalation", "power-cut"],
    author,
    readMinutes: 4,
    publishedAt: "2026-11-25",
    status: "live",
    updatedAt: "2026-11-25",
  },
];
export default resources;
