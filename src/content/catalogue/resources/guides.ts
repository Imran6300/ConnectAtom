import type { Resource } from "@/lib/catalogue/types";

const author = { name: "ConnectAtom Team", role: "Product and field team" };
const dates = { publishedAt: "2026-11-25", updatedAt: "2026-11-25", status: "live" as const };

const resources: Resource[] = [
  {
    slug: "how-to-monitor-cold-room-temperature",
    type: "guide",
    title: "How to monitor cold room temperature: probes, limits and alerts",
    answer: "Put a probe where the stock sits, set a limit and a delay, and send alerts to a person who can act. Add a power-cut alert and a door sensor, because those cause most overnight warm-ups.",
    summary: "A practical guide to monitoring a cold room: where the probe goes, what limits and delays to set, who gets the alert, and how to prove the room stayed cold.",
    sections: [
      {
        heading: "Start with what you are protecting",
        body: [
          "A cold room is not one temperature. The air near the evaporator is colder than the air near the door, and the pallet in the middle of the room lags both. Before buying anything, decide what you are protecting: the product, or the room. Product temperature changes slowly. Air temperature changes fast. Most owners care about the product but can only measure the air, so the aim is to measure air at a point that tells you the truth about the stock.",
          "Write down three things on paper first: the temperature the stock must stay at, how long it can safely be warmer than that, and who must be told. These three answers become your limit, your delay and your alert contact. Everything else in the setup follows from them.",
        ],
      },
      {
        heading: "Place the probe and the gateway",
        body: [
          "Hang the probe at about the height of the stock, in the middle of the room, away from the evaporator fan and at least an arm's length from the door. A probe taped near the door reads warm every time someone walks in, and a probe in front of the fan reads colder than the stock ever gets. The separate guide on probe placement goes through these cases in more detail.",
          "The ConnectAtom Cold Room gateway box stays outside the room, where Wi-Fi works, because thick insulated walls and metal panels block radio. The probe cable passes through the wall or door seal. If the building has no usable Wi-Fi, a 4G variant is the alternative.",
        ],
      },
      {
        heading: "Set limits, delays and contacts",
        body: [
          "A limit alone makes a noisy system. A cold room that is opened for loading will cross any sensible limit for a few minutes, so pair every limit with a delay: alert only if the room stays out of range for N minutes. Start with a delay long enough to ride out one normal loading and tighten it after a week of readings.",
        ],
        list: [
          "High limit: just above the top of the range your stock needs",
          "Delay: long enough to ignore a door held open during loading",
          "First contact: the person nearest the room or the supervisor on shift",
          "Escalation: the owner or manager if the first contact does not acknowledge",
          "Power-cut and offline alerts: always on",
        ],
      },
      {
        heading: "Cover the causes, not only the symptom",
        body: [
          "A temperature alert tells you the room is warm. It does not tell you why. Pair it with a power-cut alert, so you know the supply failed and the compressor is not running, and with a door sensor, so you know the door is the problem. The ConnectAtom Door Sensor is an add-on that is included in the plan of the parent product.",
          "When the alert reaches the phone, the person acknowledges it and enters a reason. That reason is stored with the reading, so the history later shows not only that the room warmed but what was done about it.",
        ],
      },
      {
        heading: "Keep the record and review it weekly",
        body: [
          "The readings are stored continuously. Daily, weekly and monthly PDF reports, depending on the plan, and a CSV export give you the history without a clipboard. Once a week, look at the graph for the room, not only at alerts. A room that drifts up slowly each afternoon is telling you about a dirty condenser or an overloaded room long before it trips an alarm.",
          "If you want to check the cost of a loss before deciding, the spoilage cost calculator at /tools/spoilage-cost-calculator takes your stock value and hours of exposure.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "door-open-sensor"],
    industrySlugs: ["cold-storage", "fruit-and-vegetable-trading", "ice-cream-and-frozen-foods"],
    applicationSlugs: ["whatsapp-temperature-alerts", "power-cut-alerts", "door-open-alerts"],
    relatedResourceSlugs: ["where-to-place-a-temperature-probe", "how-to-reduce-false-temperature-alarms"],
    tags: ["temperature", "cold-chain", "whatsapp", "escalation", "reports"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "where-to-place-a-temperature-probe",
    type: "guide",
    title: "Where to place a temperature probe in a cold room or fridge",
    answer: "Place the probe at stock height, in the middle of the space, clear of the door, the fan and the cooling coil. Where one reading must stand for the whole room, choose the warmest realistic spot, not the coldest.",
    summary: "Where a temperature probe belongs in a cold room, fridge or freezer, and the common spots that give false readings: near the door, in front of the fan or on a wall.",
    sections: [
      {
        heading: "Why placement changes the reading",
        body: [
          "A probe reports the temperature of the air or surface it touches, not the room's average. In a cold room the spread can be large: air coming off the evaporator is the coldest, the zone just inside the door is the warmest, and stock in the middle takes the longest to change. A probe in the wrong spot can read cold while the stock is warm, or raise an alarm every time the door opens.",
        ],
      },
      {
        heading: "Good positions",
        body: [
          "For a walk-in room, hang the probe at the height of the top of the stock, roughly in the middle of the room, and away from walls. For a medical fridge, place it on the middle shelf near the stored items, not in the door and not touching the back wall, since the back wall can be much colder than the shelf. For a freezer, put it where the packed product is, not above an empty gap.",
          "If the room is large or has several stacks, one probe cannot speak for all of them. Use two probes: one at the warmest likely spot and one near the air return. The difference between the two tells you whether the room is cooling evenly. Over a few weeks you will also learn which corner of the room is the weak one, and that is where the single probe should live if you only have one.",
        ],
      },
      {
        heading: "Spots that give false readings",
        body: [
          "Most placement mistakes are the same few. Learn them and you avoid most false alarms.",
        ],
        table: {
          head: ["Spot", "What goes wrong", "Better spot"],
          rows: [
            ["Next to the door", "Reads warm each time the door opens, so alerts fire during loading", "Inside, about an arm's length from the door"],
            ["In front of the evaporator fan", "Reads colder than the stock, so a warm room looks fine", "Mid-room, out of the direct air stream"],
            ["Touching the wall or floor", "Reads the surface, which lags and can be colder", "Hanging free in the air"],
            ["Under a light or heat source", "Reads warmer than the stock", "Away from lamps and motors"],
            ["Inside a sealed box of stock", "Reads late; air alarms come too slowly", "Use a probe in a bottle of liquid for slow-changing stock"],
          ],
        },
      },
      {
        heading: "When to use a thermal buffer",
        body: [
          "A probe in a small bottle of liquid, sometimes called a thermal buffer, changes more slowly than air. That makes it a better stand-in for stock such as vaccines, because it ignores a short door opening but follows a real warm-up. The trade-off is that it reacts later to a real failure, so many sites use an air probe for early warning and a buffered probe for the record. Whichever you choose, keep the bottle and probe where the same air reaches them each day, and do not move them around during stock-taking, or the graph will show changes that are really changes of position.",
        ],
      },
      {
        heading: "Check it after installing",
        body: [
          "After the probe is in place, watch the graph for a day. Open the door deliberately and note how far and how fast the reading moves. If a normal loading produces a large spike, move the probe farther from the door or raise the alert delay. If you have a calibrated reference thermometer, compare it to the probe reading and record the difference. ConnectAtom stores a calibration offset on the server, so a known small difference can be corrected without touching the device.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "medical-fridge-monitor", "kitchen-freezer-monitor"],
    industrySlugs: ["cold-storage", "pharmacy", "restaurant"],
    applicationSlugs: ["whatsapp-temperature-alerts", "vaccine-storage-logging"],
    relatedResourceSlugs: ["how-to-monitor-cold-room-temperature", "how-to-reduce-false-temperature-alarms"],
    tags: ["temperature", "calibration", "cold-chain", "door"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "how-to-reduce-false-temperature-alarms",
    type: "guide",
    title: "How to reduce false temperature alarms without missing real ones",
    answer: "Add a delay so short spikes are ignored, move the probe away from the door and fan, and allow for the defrost cycle. Then review each false alarm once and change one setting, instead of silencing the system.",
    summary: "Why temperature alarms fire for no reason, and how delays, probe placement, defrost windows and escalation cut the noise while keeping the alerts that matter.",
    sections: [
      {
        heading: "Why false alarms are dangerous",
        body: [
          "A false alarm is not harmless. People who get ten messages that mean nothing stop reading the eleventh, which may be the real one. The aim is not zero alerts. The aim is that every alert means something and is worth waking up for.",
        ],
      },
      {
        heading: "The usual causes",
        body: [
          "Almost every false alarm comes from one of four things. First, the probe sits where normal activity moves it, usually near the door. Second, there is a limit but no delay, so a one-minute spike counts. Third, the refrigeration plant runs a defrost cycle, which warms the evaporator area for a short time. Fourth, a loose connector or a flat battery makes the device drop out, which looks like a failure.",
          "Find out which one you have before changing anything. Look at the graph around the false alarm: a sharp narrow spike points to the door or defrost, a gap in the line points to connectivity or power at the device. A slow climb that never comes back down is not a false alarm at all: treat it as real until you have checked the compressor.",
        ],
      },
      {
        heading: "Fixes in the order to try them",
        body: [
          "Change one thing at a time, so you know what worked.",
        ],
        list: [
          "Move the probe away from the door or fan and watch for a day",
          "Add or lengthen the out-of-range delay so brief spikes are ignored",
          "If the spikes repeat at the same times each day, they are probably defrost: set the delay longer than the spike lasts",
          "Use a buffered probe for slow-changing stock, as it ignores short air swings",
          "Fix the real cause of dropouts: Wi-Fi strength at the gateway, or a 4G variant where Wi-Fi is weak",
        ],
      },
      {
        heading: "Do not fix it by widening the limit",
        body: [
          "The tempting fix is to raise the limit until the alarms stop. That hides the problem and also hides real warm-ups. A longer delay is almost always safer than a wider limit, because the stock cares about how long it stays warm as well as how warm it gets. Ask what you would do if the alert fired: if the honest answer is nothing, the setting is wrong, not the room.",
          "Where one limit really does not suit the room, use two: a warning limit with a longer delay, and a critical limit with a short delay. The warning goes to the supervisor, the critical goes to the owner.",
        ],
      },
      {
        heading: "Use escalation and acknowledgement",
        body: [
          "ConnectAtom can send the alert to a first contact and then to the next person if nobody acknowledges it. The person who acknowledges enters a reason, for example loading in progress or door left open. After a month, those reasons show which causes repeat, and you can fix the cause instead of tuning the alert.",
          "Review false alarms weekly for the first month. Most sites settle after two or three adjustments and then rarely need to touch the settings again.",
          "One more habit helps. When a new person joins the shift, show them a real alert and explain what to check first. Alerts that new staff understand are acknowledged faster, and a fast acknowledgement keeps the escalation chain quiet. If someone repeatedly acknowledges without a reason, that is a training problem, and the log will show it.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "door-open-sensor", "medical-fridge-monitor"],
    industrySlugs: ["cold-storage", "restaurant", "pharmacy"],
    applicationSlugs: ["whatsapp-temperature-alerts", "door-open-alerts"],
    relatedResourceSlugs: ["where-to-place-a-temperature-probe", "what-to-do-when-a-cold-room-alarm-goes-off"],
    tags: ["temperature", "escalation", "door", "whatsapp"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "power-cut-protection-for-cold-rooms",
    type: "guide",
    title: "Power-cut protection for cold rooms: how to know and what to do",
    answer: "A monitor that runs on its own backup battery can tell you the supply has failed even when the compressor and the Wi-Fi router are both off. Pair that alert with a written plan for who starts the generator or moves the stock.",
    summary: "How to detect a power cut in a cold room, why the monitor needs its own backup, what happens to the temperature, and the plan you should write before it happens.",
    sections: [
      {
        heading: "What a power cut does to a cold room",
        body: [
          "When the supply fails the compressor stops, and the room starts to warm. How fast depends on how full the room is, how well it is insulated, and how often the door is opened. A full room of dense stock holds cold longer than a half-empty one. A power cut at night with the door shut is slower than one during loading. Nobody can promise a number of hours, so measure your own room: the first long cut you record will show you. Also remember that the compressor does not restart instantly when supply returns; many plants wait a short time before restarting, so the room can keep warming for a few minutes after the lights come back.",
        ],
      },
      {
        heading: "Why the monitor must survive the cut",
        body: [
          "If the monitor and the Wi-Fi router lose power at the same moment as the compressor, nobody is told. For that reason the ConnectAtom gateway is designed with a battery backup, kept outside the cold zone, so it can report that mains power is lost. The router also needs power: either place it on a small backup supply, or use the 4G variant, which does not depend on the building's router.",
          "Check these details when you install, because backup battery run time is something to confirm on the unit you buy rather than assume.",
        ],
      },
      {
        heading: "Three alerts that work together",
        body: [
          "A power-cut alert tells you that the supply is gone. A temperature alert tells you the room is warming. An offline alert tells you the device itself has stopped reporting, which can mean the router or the battery has also failed. All three are available on the platform and each answers a different question.",
        ],
        list: [
          "Power cut: the supply failed, check the generator or the supplier",
          "Out of range for N minutes: the room is warming, decide whether to move stock",
          "Device offline: the monitor cannot be reached, send someone to look",
        ],
      },
      {
        heading: "Write the plan before the cut",
        body: [
          "The alert is only the first step. Write a one-page plan and keep it near the phone of whoever is on call. It should say who starts the generator, who is called if it does not start, at what temperature and after how long stock is moved, and where it is moved to. Keep the door shut: every opening lets out cold that the room cannot make back.",
          "Test the plan once. Switch off the supply on a quiet day while the owner watches the alerts arrive. You will learn whether the phone numbers are right and whether the backup lasts as long as you expected.",
          "If you run a generator, also check how long it takes to start and take the load. The gap between the supply failing and the compressor running again is the real outage, and it is usually longer than people remember. A monitor that records the power cut and the restart shows you that gap in minutes.",
        ],
      },
      {
        heading: "After the event",
        body: [
          "Once supply returns, the graph shows when it failed, how far the room warmed, and how long it took to recover. Save that report. It helps with supplier disputes, helps you size a generator, and helps you decide how long you can wait before moving stock.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "generator-monitor"],
    industrySlugs: ["cold-storage", "ice-cream-and-frozen-foods", "dairy"],
    applicationSlugs: ["power-cut-alerts", "whatsapp-temperature-alerts"],
    relatedResourceSlugs: ["what-to-do-when-a-cold-room-alarm-goes-off", "how-to-monitor-cold-room-temperature"],
    tags: ["power-cut", "battery-backup", "mains-sensing", "temperature", "generator", "4g"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "what-to-do-when-a-cold-room-alarm-goes-off",
    type: "guide",
    title: "What to do when a cold room alarm goes off: a step-by-step check",
    answer: "Confirm the reading, find out how long it has been out of range, and check the door, power and compressor in that order. Move or protect stock only after you know whether the room is recovering.",
    summary: "A calm checklist for a cold room alert: confirm the reading, check door, power and compressor, decide about stock, and record what you did in the log.",
    sections: [
      {
        heading: "Read the alert first",
        body: [
          "A good alert says what happened, how long, and what to check. Read all three before you drive to the site. An alert that says the cold room has been above its limit for twenty minutes and the door has been open for eighteen of them is a different job from one that says the room is warm and the power is on.",
        ],
      },
      {
        heading: "Check in this order",
        body: [
          "Work from the cheapest, fastest check to the most expensive one. Most alarms are explained by the first two or three steps, and you can do them from the phone before you leave home.",
        ],
        list: [
          "Open the dashboard. Is the reading still rising, flat or falling? A falling line means the room is already recovering",
          "Door: is it shut and sealing? A door sensor will show the open time",
          "Power: is there a power-cut alert, or is the compressor running?",
          "Load: was a large amount of warm stock added recently?",
          "Plant: if the compressor is on and the room still warms, call the refrigeration technician",
        ],
      },
      {
        heading: "Decide about the stock",
        body: [
          "The decision depends on temperature and time together. A short rise that is already falling usually needs no action beyond a note, though it is worth asking why it happened. A long rise that is still going up means start moving the most sensitive stock to another cold space. Keep this rule written down before the event, so that the person on shift does not have to guess at 2 a.m.",
          "If you are unsure whether the stock is still safe to sell, do not decide alone on the night. Mark it as held, record the readings, and check which rules apply to you before selling or discarding it.",
        ],
      },
      {
        heading: "Acknowledge and record",
        body: [
          "On the phone, acknowledge the alert and write the reason: door left open, power cut, compressor fault, loading. That stops the escalation to the next contact and puts your answer into the log next to the reading. If you do not acknowledge, the alert goes to the next person on the list, which is the intended behaviour.",
        ],
      },
      {
        heading: "Learn from it",
        body: [
          "After the room is stable, open the graph. How long was it out of range? What was the highest reading? What was the first sign? Write one line about what you will change: a longer door-ajar rule, a service call, a rule about loading times. Repeated alarms with the same reason are the most useful thing the system produces.",
          "Share the lesson with the whole shift, not only the owner. If the cause was a door left open after a delivery, a short note at the delivery bay does more than any setting. If the cause was a compressor that struggles in the afternoon heat, put the service visit on the calendar before the next summer, and keep the graph to show the technician.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "door-open-sensor"],
    industrySlugs: ["cold-storage", "meat-fish-and-seafood", "ice-cream-and-frozen-foods"],
    applicationSlugs: ["whatsapp-temperature-alerts", "door-open-alerts", "power-cut-alerts"],
    relatedResourceSlugs: ["power-cut-protection-for-cold-rooms", "how-to-reduce-false-temperature-alarms"],
    tags: ["temperature", "escalation", "whatsapp", "door", "power-cut"],
    author, readMinutes: 4, ...dates,
  },
  {
    slug: "how-many-sensors-does-a-godown-need",
    type: "guide",
    title: "How many sensors does a godown need? A way to work it out",
    answer: "Start with one sensor per distinct climate zone, not per square metre: the dock, the main floor, any enclosed or upper area, and any area with its own cooling or heat source. Add sensors after a week of readings shows where the spread is largest.",
    summary: "How to decide how many temperature and humidity sensors a godown needs: zones, height, doors and roofs, and how a week of readings shows where to add more.",
    sections: [
      {
        heading: "Think in zones, not floor area",
        body: [
          "There is no honest formula that turns floor area into a sensor count, because a godown is not uniform. Two sensors in a small godown with a tin roof and a loading door can show a bigger spread than ten in a well-insulated building. What matters is how many different climates the building contains. A zone is any area where conditions are likely to differ from the rest for a reason you can name.",
          "Walk the building in the afternoon, which is usually the worst time. Note where it feels hottest, where the air is still, where damp collects, and where sunlight or machinery adds heat. Those notes are your list of zones.",
        ],
      },
      {
        heading: "Typical zones to cover",
        body: [
          "Most godowns have a few zones in common. Not every building has all of them, and some have extras.",
        ],
        list: [
          "The dock or loading area, which sees outside air and sun each time the shutter opens",
          "The main floor, in the middle of the stacks at product height",
          "The upper level or the space under the roof, which is usually the warmest",
          "Any enclosed room, such as a medicine store or a packing room, with its own needs",
          "Corners and low spots where damp collects, if humidity matters for your goods",
          "Areas beside an air conditioner, a cold room wall or a machine that gives off heat",
        ],
      },
      {
        heading: "Height matters as much as position",
        body: [
          "Warm air rises. In a tall godown the top stack can sit several degrees above the floor. If goods are stacked high and heat is the risk, one sensor at product height on the top stack tells you more than three on the floor. If damp is the risk, the low corners and the area near the loading door deserve the sensor instead.",
          "The ConnectAtom Godown climate node reads temperature and humidity. A node near the roof and one at floor level in the same bay show you quickly whether the building has a vertical gradient that you need to design for.",
        ],
      },
      {
        heading: "Start small, measure, then add",
        body: [
          "A sound approach is to place sensors in the two or three zones you think are the most extreme, run for a week, and compare the graphs. If the readings track each other closely, you probably need fewer sensors than you feared. If one zone runs far from the others, add a sensor there and perhaps a second to confirm it.",
          "The product is designed so that you can add nodes to a site later without redoing the setup. Several nodes can report to the same dashboard, and you can attach each one to a named location such as dock or mezzanine, so alerts say where the problem is.",
        ],
      },
      {
        heading: "Count the cost against the stock",
        body: [
          "More sensors cost more to buy and to run, so match the count to what a bad reading would cost you. A godown of fast-moving, heat-tolerant goods may need only two or three sensors. A godown holding medicines or sensitive food ingredients that must stay within a range needs closer coverage of every zone those goods occupy. Our spoilage cost calculator at /tools/spoilage-cost-calculator helps you put a number on the stock at risk.",
          "Pricing is per godown or per device as set out on the product page, and any price you see is an indicative starting assumption, not an offer. Ask for a quote based on the zones you listed.",
          "Finally, label every sensor with its zone name when it is installed, and keep a simple sketch of the building showing where each one hangs. When someone moves a pallet stack or a partition a year later, the sketch tells you whether a sensor is now in the wrong place.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["warehouse-climate-monitor", "door-open-sensor"],
    industrySlugs: ["warehouse-and-logistics", "pharma-distributor", "fruit-and-vegetable-trading"],
    applicationSlugs: ["humidity-monitoring-godown", "whatsapp-temperature-alerts"],
    relatedResourceSlugs: ["where-to-place-a-temperature-probe", "wifi-vs-4g-vs-lora-for-monitoring"],
    tags: ["temperature", "humidity", "multi-node", "mapping", "lora"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "wifi-vs-4g-vs-lora-for-monitoring",
    type: "technical",
    title: "Wi-Fi vs 4G vs LoRa for monitoring: which link suits which site",
    answer: "Use Wi-Fi where a reliable router is close to the device, 4G where there is no building network or the router is not trusted, and LoRa where many low-data sensors are spread over a large site. Each link has a failure mode, so pick the one whose failure you can live with.",
    summary: "A plain comparison of Wi-Fi, 4G and LoRa for sensor monitoring: range, power, cost, walls and metal, and what each does when the link or the power fails.",
    sections: [
      {
        heading: "What the link has to do",
        body: [
          "A monitoring device takes a reading every so often and sends a small amount of data to a server. The data is tiny: a time, a temperature, a few status values. So the question is not speed. It is reach, reliability and what happens when the link goes down. The right link is the one that reaches the device, stays up, and keeps the data safe while it is down.",
        ],
      },
      {
        heading: "Wi-Fi: cheapest, but only as good as the router",
        body: [
          "Wi-Fi is the default for indoor sites such as kitchens, pharmacies and server rooms. There is no extra subscription and the hardware is cheap. The weakness is the network behind it. If the router is old, shared, rebooted often or on a switch that is turned off at night, the device is offline whatever the quality of the device. Thick walls and metal panels, as in a cold room, block radio, so the gateway is placed outside the room with the probe cable passing through.",
          "Wi-Fi also needs the router to have power during a power cut. If it does not, the monitor cannot report the cut unless it has another route.",
        ],
      },
      {
        heading: "4G: independent of the building",
        body: [
          "A 4G device uses a mobile data plan and does not depend on the building network. That suits godowns, chilling centres, remote sheds and any site where nobody can say who owns the router. The cost is a data plan and the dependence on the mobile signal at that spot. A basement or a deep metal-walled room can have poor signal, so test the signal at the gateway position before installing.",
          "ConnectAtom offers a 4G fallback or variant for the gateway products. Check the exact variant, data plan and signal on the site before you commit.",
        ],
      },
      {
        heading: "LoRa: range for small, low-data sensors",
        body: [
          "LoRa is a long-range, low-power radio. It suits sites where many battery sensors spread over a wide area, such as a large godown, a farm or a pond, and each sensor sends little data. A LoRa gateway collects from the nodes and sends the data on over Wi-Fi or 4G. The trade-offs are that LoRa is slower, carries only small messages, and still needs that gateway to have power and a link to the internet.",
        ],
        table: {
          head: ["Link", "Best for", "Watch out"],
          rows: [
            ["Wi-Fi", "Indoor sites with a stable router", "Router fails or loses power, and walls block signal"],
            ["4G", "Sites with no network or an untrusted one", "Data plan cost and weak signal in some spots"],
            ["LoRa", "Many sensors over a large area", "Needs a gateway; small messages only"],
          ],
        },
      },
      {
        heading: "Whatever you choose: buffering and alerts",
        body: [
          "Every link will fail sometime, so look for two behaviours. First, the device should keep readings in its own memory while the link is down and send them when it returns, so the graph has no hole. ConnectAtom devices buffer offline in this way. Second, the platform should raise an offline alert when a device stops reporting, so a dead link does not look like a quiet room.",
          "Range figures in metres depend on walls, metal, weather and antennas, and we have not confirmed them for finished units. Do a signal test at the real site before you decide.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "warehouse-climate-monitor", "server-room-monitor"],
    industrySlugs: ["cold-storage", "warehouse-and-logistics", "orchard-and-farm"],
    applicationSlugs: ["whatsapp-temperature-alerts", "power-cut-alerts"],
    relatedResourceSlugs: ["how-an-iot-monitoring-system-works", "how-many-sensors-does-a-godown-need"],
    tags: ["wifi", "4g", "lora", "offline-buffering", "multi-node"],
    author, readMinutes: 6, ...dates,
  },
  {
    slug: "how-to-keep-a-continuous-temperature-record",
    type: "guide",
    title: "How to keep a continuous temperature record you can rely on",
    answer: "Record at a steady interval, keep the readings in a place that cannot be edited by the person who checks them, and store the reason for every alert. A continuous record also needs a plan for gaps, calibration and who reviews it.",
    summary: "How to keep a continuous temperature record: sampling interval, gaps, calibration, review and export, so the log holds up when a customer or inspector asks.",
    sections: [
      {
        heading: "What makes a record worth keeping",
        body: [
          "A record is only useful if you can trust it. Three things decide that: it is continuous, so that nobody has to say what happened between two readings; it is hard to alter after the fact; and it shows what was done when something went wrong. A clipboard log filled at 8 a.m. and 6 p.m. can show none of these. It shows two moments a day. When a buyer or an inspector asks what the room did overnight, the honest answer from a paper log is that nobody knows.",
        ],
      },
      {
        heading: "Choose the interval on purpose",
        body: [
          "The interval is how often a reading is stored. A short interval catches brief events but stores more data. A long interval is lighter but can miss a short spike or hide how fast a room warmed. Match the interval to how quickly the thing you watch can change: a small fridge door can move the reading in a minute, while a large cold room changes slowly. Start with a short interval at first, look at the graph, and lengthen it if the line is smooth.",
          "If a customer or rule says how often you must record, check which rules apply to you before you fix the interval.",
        ],
      },
      {
        heading: "Plan for gaps, calibration and review",
        body: [
          "Every system has gaps sometimes. A good one buffers readings on the device during a link failure and sends them when it reconnects, and shows an offline alert so the gap is noticed. Note any gap that remains and why.",
        ],
        list: [
          "Calibration: compare the probe with a reference thermometer at set times, and record the offset. ConnectAtom stores the calibration offset on the server",
          "Review: name a person who looks at the record weekly and signs off the review",
          "Acknowledgement: every alert has a person and a reason attached",
          "Changes: when a limit or contact changes, write down who changed it and when",
        ],
      },
      {
        heading: "Reports and exports",
        body: [
          "The platform produces daily, weekly and monthly PDF reports, depending on the plan, and a CSV export for anyone who wants the raw numbers. Data retention depends on the plan, so find out how long the readings are kept and export older months before they expire if you need them longer.",
          "A report is not a certificate. It shows what the sensors read and what people did. Whether it satisfies a customer, a buyer or an inspector depends on their requirements, and it is worth asking them in advance what they want to see.",
        ],
      },
      {
        heading: "Move off paper gradually",
        body: [
          "If you now keep a paper log, you do not need to stop on day one. Run both for a few weeks. Compare the clipboard entries to the graph, and you will probably find the two agree most of the time and differ exactly when something interesting happened. That comparison is the most convincing argument for staff who doubt the new system, and it shows you whether the probe is placed well. Keep the paper sheets for the overlap period, then file them, so that nothing is lost during the change.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "medical-fridge-monitor", "kitchen-freezer-monitor"],
    industrySlugs: ["pharmacy", "restaurant", "cold-storage"],
    applicationSlugs: ["audit-ready-temperature-reports", "vaccine-storage-logging"],
    relatedResourceSlugs: ["how-to-monitor-cold-room-temperature", "where-to-place-a-temperature-probe"],
    tags: ["compliance-log", "reports", "calibration", "temperature", "offline-buffering"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "server-room-temperature-monitoring-basics",
    type: "guide",
    title: "Server room temperature monitoring basics for small offices and ISPs",
    answer: "Put a sensor at the intake side of the racks, another near the top, and a leak sensor on the floor under the air conditioner. Alert on a rising trend and a failed air conditioner, because a small room can overheat in a short time once cooling stops.",
    summary: "Basics of monitoring a small server room or ISP node: where sensors go, which readings matter, how to catch a failed AC early, and what to do as the room heats.",
    sections: [
      {
        heading: "Small rooms heat quickly",
        body: [
          "A small server room has little air and a lot of heat, so when the air conditioner stops the temperature rises quickly. The equipment may slow itself down or shut down to protect itself before it fails, which looks like an application fault, not a cooling fault. Many small offices and ISP nodes find out about the failed cooling from users, not from a sensor.",
        ],
      },
      {
        heading: "Where the sensors go",
        body: [
          "Equipment draws in cool air at the front and blows warm air out at the back. What counts is the air going in. Put a temperature sensor at the front of the rack, around the middle and upper part, because the top of a rack is usually the warmest intake. A second sensor at the room's far end shows whether the cooling reaches everything.",
          "Do not hang a sensor in the hot exhaust stream or at the AC outlet. The first reads high all the time, the second reads low, and neither tells you what the equipment feels.",
        ],
      },
      {
        heading: "Alerts that matter in this room",
        body: [
          "Three alerts cover most failures. The numbers depend on your equipment, so take them from your hardware makers, not from this page.",
        ],
        list: [
          "High temperature at the rack intake, with a short delay so a brief change is ignored",
          "A rapid rise: a fast climb over a few minutes points to a stopped air conditioner, even before the limit is reached",
          "Power loss on the room supply, so you know the UPS is carrying the load",
          "Door open on the room, because a door propped open for cooling often hides a plant problem",
        ],
      },
      {
        heading: "Water and humidity",
        body: [
          "Air conditioners drip. A blocked drain or a failed pump can put water on the floor under or near the rack. A rope-type leak sensor along the floor and at the AC drain gives early warning. ConnectAtom Leak is pilot-ready for this use. Humidity can matter too, as very dry air favours static and very damp air favours condensation, and the Server Room monitor is designed to read it alongside temperature.",
        ],
      },
      {
        heading: "Who gets called, and what they do",
        body: [
          "Decide before the first alert who is called, in what order, and what they do. A typical chain is the network administrator, then the facilities person, then the owner, with the platform escalating down the list until someone acknowledges. The first action is usually simple: check the air conditioner is running, switch to the standby unit if there is one, open the door only as a last resort, and shut down non-essential equipment if the room keeps rising.",
          "Keep a note of the temperature at which you would start shutting equipment down. Decide it calmly now, with the equipment documents in front of you, not in the middle of an outage.",
          "One more point for ISP nodes and small offices that share a building: agree with the landlord or building staff who can enter the room at night, and give them the alert phone number. The fastest fix is often a person with a key, and a sensor that raises an alarm nobody can answer has only done half the job.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["server-room-monitor", "water-leak-detector", "door-open-sensor"],
    industrySlugs: ["server-room-and-isp", "hospital", "school-and-college"],
    applicationSlugs: ["server-room-overheating-alerts", "leak-alerts", "power-cut-alerts"],
    relatedResourceSlugs: ["how-to-reduce-false-temperature-alarms", "how-an-iot-monitoring-system-works"],
    tags: ["temperature", "humidity", "leak", "door", "escalation", "power-cut"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "greenhouse-and-mushroom-room-climate-monitoring-basics",
    type: "guide",
    title: "Greenhouse and mushroom room climate monitoring basics",
    answer: "Measure temperature, humidity and, for mushrooms, carbon dioxide at crop height, in more than one spot, and alert on how long a reading stays out of range. ConnectAtom's greenhouse monitor is still in development, so treat this as the approach we are building towards and testing with early users.",
    summary: "What to measure in a greenhouse, nursery or mushroom room, where to put sensors, and which alerts help. The ConnectAtom greenhouse monitor is in development.",
    sections: [
      {
        heading: "What this guide covers, and what is not built yet",
        body: [
          "The ConnectAtom Greenhouse monitor is in development and is not for sale yet. This guide explains the ideas behind monitoring a greenhouse, nursery, hatchery or mushroom room, so you can use them with any equipment, and it describes what we are validating with early users. The exact sensors, accuracy and pricing are still to be confirmed.",
        ],
      },
      {
        heading: "Why one number is not enough",
        body: [
          "Plants and mushrooms respond to a combination of temperature, humidity and, in closed rooms, air composition. Warm air holds more water, so the same moisture reads as lower relative humidity when the room warms. A grower who watches only temperature will miss a damp spell that favours disease, and a grower who watches only humidity will miss a heat spike. Reading both at once explains a lot.",
          "In a mushroom room, carbon dioxide builds up when fresh air is limited, and the crop responds to it. A reading of carbon dioxide helps you judge ventilation, not just temperature.",
        ],
      },
      {
        heading: "Where the sensors go",
        body: [
          "Put sensors at crop height, not at the roof or door. A greenhouse roof can be much hotter than the plants beneath it, and a sensor near a vent or fogger reads a local effect. Use at least two sensors in any house that has a sunny and a shaded side, or a cooling pad at one end. In a mushroom room, place one near the fresh-air entry and one where air is stagnant, because they tell different stories.",
        ],
        list: [
          "At crop height, in shade from direct sun so the sensor does not read its own heating",
          "Away from foggers, fan outlets and doors",
          "Several spots in a large or uneven house",
          "Out of reach of spray, unless the sensor is built for it",
        ],
      },
      {
        heading: "Alerts that help",
        body: [
          "Alert on how long a reading stays outside the range your crop needs, not on a single reading. A short heat spike at noon may do nothing, while hours of high humidity overnight may matter a lot. Add a power-cut alert, because fans, foggers and pumps stop with the supply, and a device-offline alert, so that a quiet dashboard is not mistaken for a calm room.",
          "The ranges themselves come from your crop, your variety and your grower, and we do not give them here. Ask your agronomist or supplier for the range, then set it in the platform. Start with a generous delay and tighten it as you learn how the house behaves.",
        ],
      },
      {
        heading: "Use the history, not only the alerts",
        body: [
          "A graph of a few weeks shows how the house behaves: how quickly it heats in the morning, how long it takes to cool after sunset, how humidity climbs when the fogger runs. Compare that to your results. Over a season you can link a particular pattern to a good or bad batch, and that is worth more than any one alert.",
          "If you want to follow the development of this product, or help test it, tell us about your site and crop, and we will let you know what we can pilot.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["greenhouse-climate-monitor", "air-quality-monitor"],
    industrySlugs: ["greenhouse-and-nursery", "mushroom-farm", "hatchery"],
    applicationSlugs: ["greenhouse-climate-alerts", "humidity-monitoring-godown"],
    relatedResourceSlugs: ["how-an-iot-monitoring-system-works", "poultry-shed-heat-and-ammonia-monitoring-basics"],
    tags: ["temperature", "humidity", "co2", "power-cut", "multi-node"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "poultry-shed-heat-and-ammonia-monitoring-basics",
    type: "guide",
    title: "Poultry shed heat and ammonia monitoring: what to measure and why",
    answer: "Watch temperature and humidity together at bird height in several places in the shed, and watch ammonia where the litter is wettest. The ConnectAtom poultry monitor is still in development, so this guide describes the approach, not a product you can buy today.",
    summary: "What to measure in a poultry shed: heat and humidity at bird height, ammonia near litter, power for fans and water. The ConnectAtom poultry monitor is in development.",
    sections: [
      {
        heading: "Status of the product",
        body: [
          "The ConnectAtom Poultry monitor is in development. We are validating it with early users, and the sensors, accuracy, ammonia range and price are still to be confirmed. What follows is general guidance on the problem, so it stays useful whatever equipment you use.",
        ],
      },
      {
        heading: "Why heat and humidity together",
        body: [
          "Birds lose heat by panting and by moving air past their bodies. When the air is both hot and humid, they lose it less well, so a reading of temperature alone understates the stress. A shed that feels fine at one humidity can be dangerous at a higher one. Reading both, at the height of the birds, gives you a truer picture than a thermometer hung on the wall at head height.",
          "Sheds also differ along their length. The end with the cooling pad usually runs cooler than the far end, and the side facing the sun runs warmer. One sensor cannot speak for all of that, so use a few, spaced along the shed.",
        ],
      },
      {
        heading: "Ammonia and the litter",
        body: [
          "Ammonia comes from litter that is wet and warm. It irritates the eyes and lungs of birds and people, and it tends to rise when ventilation is cut back to keep a shed warm, or when water leaks onto the litter. A sensor near the litter surface, away from the fan stream, shows the build-up before a person notices the smell. Ammonia sensors need periodic checking, since the sensing element ages, and the reading should be treated as a trend and an early warning, not a laboratory measurement.",
        ],
        list: [
          "Temperature and humidity at bird height, in two or three places along the shed",
          "Ammonia near the litter, away from direct fan air",
          "Power status, since fans and pumps stop when supply fails",
          "Water: a stopped pump or empty tank in hot weather is an emergency of its own",
        ],
      },
      {
        heading: "Power and water are part of climate",
        body: [
          "In a closed shed, the fans are the climate. If power fails in hot weather, the temperature can rise very quickly, and the birds have little time. A power-cut alert, delivered by phone call or message to the farm manager, matters as much as any temperature limit. Likewise a water tank that runs dry or a pump that stops can undo the best cooling, so link your water monitoring to the same alert path.",
          "If you run a generator, check that it starts and takes the fan load. The alert that tells you power failed should also lead to a person who knows what to do next.",
        ],
      },
      {
        heading: "Set alerts that a farmer will act on",
        body: [
          "Pick the temperature and humidity ranges from your breed, age of birds and your veterinarian or supplier, not from a general chart. Use a delay long enough to ignore a brief swing but short enough to act on, and use two levels: a warning to the shed supervisor, and a critical alert that calls the owner. Keep the message plain: what happened, how long, and what to check.",
          "Review the history after each batch. A graph of hot afternoons next to the batch results often shows which sheds and which weeks need better ventilation. Tell us about your shed layout if you would like to take part in the pilot.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["poultry-shed-monitor", "water-tank-level-monitor", "generator-monitor"],
    industrySlugs: ["poultry-farm", "hatchery"],
    applicationSlugs: ["poultry-heat-stress-alerts", "power-cut-alerts"],
    relatedResourceSlugs: ["greenhouse-and-mushroom-room-climate-monitoring-basics", "how-to-monitor-water-tanks-and-pumps"],
    tags: ["temperature", "humidity", "ammonia", "power-cut", "multi-node"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "how-to-calculate-the-cost-of-spoilage",
    type: "guide",
    title: "How to calculate the cost of spoilage and what monitoring is worth",
    answer: "Multiply the value of stock at risk by the chance and size of a loss, then add the cost of lost trade and replacement effort. Compare that with the yearly cost of monitoring; if one avoided loss pays for years of service, the case is made.",
    summary: "A simple way to estimate what a warm cold room costs you: stock value, hours of exposure, hidden costs and how to weigh them against the cost of monitoring.",
    sections: [
      {
        heading: "Why do the sum at all",
        body: [
          "Most owners know the sting of a spoiled lot but have never added up what one night costs. Doing the sum once turns a vague worry into a figure you can compare with the price of a monitor. It also tells you which room or fridge deserves the first sensor.",
        ],
      },
      {
        heading: "Step 1: the stock at risk",
        body: [
          "Estimate the value of what sits in the room at its worst-case level, using purchase cost or the selling price, whichever your accounts treat as the loss. Use the fullest the room usually gets, not the average, because the bad night tends to find you with a full room. Then ask what share of that stock would be lost if the room stayed warm for several hours. This depends on the product: some products tolerate a short rise, others do not. Be honest, and use your own experience, not a figure from a brochure.",
        ],
      },
      {
        heading: "Step 2: the costs people forget",
        body: [
          "The stock is only part of the loss. Add the other costs that follow a bad night.",
        ],
        list: [
          "Disposal or reduced-price sale of affected stock",
          "Orders you could not fill, and the customers who went elsewhere",
          "Emergency cold storage rented to move stock",
          "Staff time spent sorting, counting and writing up the loss",
          "Insurance excess, or a claim that cannot be made because there is no record",
        ],
      },
      {
        heading: "Step 3: how often it happens",
        body: [
          "Think back over the last few years. How many times did a room warm up or a fridge fail? Include the small events that you caught in time. If you cannot remember, that is itself a finding: it means nobody was measuring. An honest rough rate, such as once in two years, is more useful than a precise one you invented.",
          "Multiply the loss for one event by the rate per year. This gives an expected yearly cost. It is an estimate, and a bad year can be far worse than the average.",
        ],
      },
      {
        heading: "Step 4: compare with the cost of monitoring",
        body: [
          "The ConnectAtom product pages give an indicative hardware range and a monthly figure for each product. These are starting assumptions, not offers, and the final quote depends on the site. Put the yearly cost of the monitor next to your expected yearly loss. Monitoring does not remove every loss, since some failures happen faster than anyone can respond, but it shortens the time between failure and action, and that is where most of the saving comes from.",
          "Our working calculator at /tools/spoilage-cost-calculator does the multiplication for you. Treat its answer as a way to think, not as a forecast, and keep the inputs conservative so you do not talk yourself into a purchase.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "medical-fridge-monitor", "kitchen-freezer-monitor"],
    industrySlugs: ["cold-storage", "restaurant", "meat-fish-and-seafood"],
    applicationSlugs: ["whatsapp-temperature-alerts", "power-cut-alerts"],
    relatedResourceSlugs: ["how-to-monitor-cold-room-temperature", "power-cut-protection-for-cold-rooms"],
    tags: ["temperature", "cold-chain", "power-cut", "reports"],
    author, readMinutes: 5, ...dates,
  },
  {
    slug: "how-an-iot-monitoring-system-works",
    type: "technical",
    title: "How an IoT monitoring system works, from sensor to WhatsApp alert",
    answer: "A sensor measures, a small computer on the device packages the reading, a link carries it to a server, and software on the server stores it, checks it against your rules and sends alerts. Each stage can fail on its own, so a well-built system watches itself as well as the room.",
    summary: "A plain walk through an IoT monitoring system: sensor, device, link, server, rules, alerts and reports, and where each stage can fail and how the system copes.",
    sections: [
      {
        heading: "Five stages, one chain",
        body: [
          "IoT here means a physical sensor that sends readings over a network to software. In a typical ConnectAtom setup, the chain has five stages: sense, collect, send, decide and tell. Knowing the stages helps you ask the right question when something looks wrong: did the sensor read wrongly, did the message not arrive, or did the rule not fire?",
        ],
      },
      {
        heading: "Sense and collect",
        body: [
          "A sensor turns a physical quantity into an electrical signal. A temperature probe, a humidity sensor, a door contact and a leak rope all do this in different ways. A small microcontroller on the device reads the signal at a set interval, applies a basic check, and records it. The device keeps recent readings in its own memory, so if the link fails it can send the stored readings later, which is what buffering means.",
          "The device also reads its own state, such as whether mains power is present, so it can report a power cut when running on backup.",
        ],
      },
      {
        heading: "Send",
        body: [
          "The device sends each reading over Wi-Fi, 4G or, for some sensor types, a long-range radio to a gateway. Messages are small and are usually sent using a light messaging protocol designed for devices with limited power and patchy links. The choice of link depends on the site; the guide on Wi-Fi, 4G and LoRa covers it.",
        ],
        table: {
          head: ["Stage", "What happens", "What can go wrong"],
          rows: [
            ["Sense", "Probe measures the real value", "Bad placement or a drifting sensor"],
            ["Collect", "Device records and buffers", "Flat battery, loose cable"],
            ["Send", "Reading travels to the server", "Weak Wi-Fi, router down, no 4G signal"],
            ["Decide", "Server compares readings to your rules", "Rules set too tight or too loose"],
            ["Tell", "Alert goes to people, escalates if unacknowledged", "Wrong phone number, nobody answers"],
          ],
        },
      },
      {
        heading: "Decide and tell",
        body: [
          "On the server, each reading is stored and checked against the rules you set: a limit, a delay, a schedule, a rule for a power cut or a missing device. When a rule is met, the platform sends an alert by WhatsApp, SMS, voice call or email, depending on the plan. If nobody acknowledges within the time you set, the alert goes to the next contact. The person who acknowledges can add a reason, which is saved with the reading.",
          "The same stored data feeds the live dashboard, the PDF reports and the CSV export. Calibration offsets are stored on the server, so a known probe difference can be corrected without visiting the site.",
        ],
      },
      {
        heading: "How the system watches itself",
        body: [
          "A silent system is the dangerous one. If the router fails, the server stops receiving readings and the room looks quiet. For that reason, the platform raises an offline alert when a device stops reporting, and the device raises a power alert when mains is lost. The local buzzer and light on the device give a warning at the site even if the internet is down.",
          "Honest limits remain. A sensor can be placed badly, a phone number can be wrong, and a network operator can have an outage. Good setup and a test alert at installation catch most of these, and a monthly review catches the rest.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["cold-room-monitor", "warehouse-climate-monitor", "server-room-monitor"],
    industrySlugs: ["cold-storage", "warehouse-and-logistics", "server-room-and-isp"],
    applicationSlugs: ["whatsapp-temperature-alerts", "power-cut-alerts"],
    relatedResourceSlugs: ["wifi-vs-4g-vs-lora-for-monitoring", "how-to-reduce-false-temperature-alarms"],
    tags: ["offline-buffering", "wifi", "4g", "whatsapp", "escalation", "buzzer"],
    author, readMinutes: 6, ...dates,
  },
  {
    slug: "how-to-monitor-water-tanks-and-pumps",
    type: "guide",
    title: "How to monitor water tanks and pumps and avoid dry runs",
    answer: "Measure the level in the tank, know whether the pump is running, and alert when the level is low or when the pump runs without the level rising. ConnectAtom's tank monitor is in development, so this guide covers the approach and what we are validating.",
    summary: "How to monitor overhead and sump tanks and their pumps: level sensing, dry-run and overflow alerts, power checks. The ConnectAtom tank monitor is in development.",
    sections: [
      {
        heading: "Status and scope",
        body: [
          "The ConnectAtom Water Tank Level and Pump Alert product is in development, and its sensor type, range and price are still to be confirmed. This guide describes the problem and the sensible way to monitor it, so you can plan whatever equipment you choose.",
        ],
      },
      {
        heading: "The two failures that cost money",
        body: [
          "Most trouble with tanks and pumps is one of two things. Either the tank runs empty, so people have no water, or the pump runs on with nothing to pump, which can damage it. The opposite also happens: the tank overflows because nobody switched the pump off, and water is wasted, sometimes onto a wall or a roof that suffers for it. Both come from not knowing the level at the moment it matters.",
        ],
      },
      {
        heading: "What to measure",
        body: [
          "The first measure is the level in the tank. Level can be sensed in several ways, such as a sensor that looks down from the top of the tank or a set of contacts at fixed heights, and the right way depends on the tank. The second is whether the pump is running, which can be sensed from the pump's power. Combined, they tell you far more than either alone.",
        ],
        list: [
          "Low level: warn before the tank is empty, with time to react",
          "Dry run: pump is on and level is not rising, or the pump is on and the level is already very low",
          "Overflow risk: level at the top and the pump still running",
          "Power cut: the pump cannot run, so refilling will not happen",
        ],
      },
      {
        heading: "Setting alert levels",
        body: [
          "Set the low-level warning high enough to give you time. If it takes an hour to refill the tank and your building uses a certain amount between refills, the warning must come before that point. Look at a week of level graphs: they show how fast the tank drains and how long the pump takes to restore it. A tank whose level falls overnight with no use points to a leak or a faulty valve.",
          "Send the alert to the person who can act, such as the pump operator or the building manager, and to a backup if they do not acknowledge.",
        ],
      },
      {
        heading: "Where it matters most",
        body: [
          "Apartment blocks, schools, poultry farms, pump houses and farms all rely on tanks that nobody watches continuously. The failure is rarely dramatic: it is a quiet dry run at night or an overflow on a holiday. A level graph and a few well-chosen alerts replace the habit of climbing up to look.",
          "Because the product is still being built, tell us what your tank looks like, how it is filled and what you would want in the alert, and we will use it to shape the pilot.",
        ],
      },
    ],
    sources: [],
    productSlugs: ["water-tank-level-monitor", "generator-monitor"],
    industrySlugs: ["apartment-and-township", "pump-house-and-water-utility", "poultry-farm", "school-and-college"],
    applicationSlugs: ["water-tank-level-alerts", "irrigation-alerts", "pump-and-motor-health-monitoring"],
    relatedResourceSlugs: ["poultry-shed-heat-and-ammonia-monitoring-basics", "how-an-iot-monitoring-system-works"],
    tags: ["level", "pump", "power-cut", "escalation", "mains-sensing"],
    author, readMinutes: 5, ...dates,
  },
];

export default resources;
