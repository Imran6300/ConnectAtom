# Fixed assignments (do not change slugs, numbers or enums)

## Products (number | slug | name | brandName | modelCode | tier | phase | availability | sector | scene | device)
1 | cold-room-monitor | Cold Room Monitor | ConnectAtom Cold Room | CA-CR1 | 1 | launch | available | cold-chain | cold-room | gateway-probe
2 | medical-fridge-monitor | Medical Fridge Monitor | ConnectAtom Med Fridge | CA-MF1 | 1 | launch | available | healthcare | medical-fridge | gateway-probe
3 | kitchen-freezer-monitor | Kitchen Freezer Monitor | ConnectAtom Kitchen | CA-KT1 | 1 | launch | available | food-service | kitchen | gateway-probe
4 | warehouse-climate-monitor | Warehouse Climate Monitor | ConnectAtom Godown | CA-GD1 | 1 | launch | available | logistics | warehouse | climate-node
5 | server-room-monitor | Server Room Monitor | ConnectAtom Server Room | CA-SR1 | 1 | launch | pilot-ready | facilities | server-room | server-node
6 | door-open-sensor | Door Open Sensor | ConnectAtom Door Sensor | CA-DR1 | 1 | launch | pilot-ready | cold-chain | cold-room | door-sensor
7 | water-leak-detector | Water Leak Detector | ConnectAtom Leak | CA-LK1 | 1 | launch | pilot-ready | facilities | building | leak-rope
8 | dairy-chilling-monitor | Dairy Chilling Monitor | ConnectAtom Dairy | CA-DY1 | 1 | launch | pilot-ready | cold-chain | dairy-cooler | gateway-probe
9 | greenhouse-climate-monitor | Greenhouse, Mushroom and Hatchery Climate Monitor | ConnectAtom Greenhouse | CA-GH1 | 2 | expand | in-development | agriculture | greenhouse | climate-node
10 | poultry-shed-monitor | Poultry Shed Monitor | ConnectAtom Poultry | CA-PS1 | 2 | expand | in-development | agriculture | poultry-shed | climate-node
11 | water-tank-level-monitor | Water Tank Level and Pump Alert | ConnectAtom Tank | CA-WT1 | 2 | expand | in-development | facilities | water-tank | tank-level
12 | generator-monitor | Diesel Generator Monitor | ConnectAtom Generator | CA-DG1 | 2 | expand | in-development | facilities | building | clamp-meter
13 | air-quality-monitor | Air Quality Monitor | ConnectAtom Air | CA-AQ1 | 2 | expand | in-development | facilities | building | air-quality
14 | soil-moisture-monitor | Soil Moisture and Irrigation Alerts | ConnectAtom Soil | CA-SM1 | 2 | expand | in-development | agriculture | farm-field | soil-stake
15 | machine-downtime-tracker | Production Counter and Downtime Tracker | ConnectAtom Production | CA-PC1 | 2 | expand | in-development | industrial | factory-floor | counter-sensor
16 | vibration-monitor | Motor and Pump Vibration Monitor | ConnectAtom Vibration | CA-VB1 | 3 | later | in-development | industrial | factory-floor | vibration-puck
17 | energy-monitor | Power and Energy Monitor | ConnectAtom Energy | CA-EN1 | 3 | later | in-development | industrial | factory-floor | clamp-meter
18 | compressor-monitor | Compressor Runtime and Pressure Monitor | ConnectAtom Compressor | CA-CP1 | 3 | later | in-development | industrial | factory-floor | clamp-meter
19 | reefer-truck-tracker | Reefer Truck Tracker | ConnectAtom Reefer | CA-RT1 | 3 | later | in-development | logistics | truck | gps-tracker
20 | aquaculture-water-monitor | Aquaculture Water Monitor | ConnectAtom Aqua | CA-AW1 | 3 | later | in-development | agriculture | pond | water-probe
All products: status "live", updatedAt "2026-11-24". Product 6 is an add-on included in the parent product's plan (pricing.monthlyInr omitted, monthlyNote "Included in the parent product's plan"). Products 4 and 7 are priced per room/godown/device as the playbook footnote says.
pricing.showPublic: true for products 1-8, false for 9-20 (pricing to be confirmed with early-access customers).

## Industries (slug | name | sector | wave | scene | productSlugs in order of relevance)
cold-storage | Cold Storage | cold-chain | 1 | cold-room | cold-room-monitor, warehouse-climate-monitor, door-open-sensor, generator-monitor, energy-monitor, reefer-truck-tracker
dairy | Dairy | cold-chain | 2 | dairy-cooler | dairy-chilling-monitor, cold-room-monitor, generator-monitor, reefer-truck-tracker
ice-cream-and-frozen-foods | Ice Cream and Frozen Foods | cold-chain | 2 | cold-room | cold-room-monitor, door-open-sensor, generator-monitor
meat-fish-and-seafood | Meat, Fish and Seafood | cold-chain | 2 | cold-room | cold-room-monitor, kitchen-freezer-monitor, door-open-sensor, reefer-truck-tracker
fruit-and-vegetable-trading | Fruit and Vegetable Trading | cold-chain | 2 | cold-room | cold-room-monitor, warehouse-climate-monitor, door-open-sensor
pharmacy | Pharmacy | healthcare | 1 | medical-fridge | medical-fridge-monitor, warehouse-climate-monitor, door-open-sensor
hospital | Hospital | healthcare | 1 | hospital-ward | medical-fridge-monitor, server-room-monitor, water-leak-detector, generator-monitor, air-quality-monitor
clinic-and-diagnostic-lab | Clinic and Diagnostic Lab | healthcare | 1 | medical-fridge | medical-fridge-monitor, door-open-sensor, air-quality-monitor
blood-bank | Blood Bank | healthcare | 2 | medical-fridge | medical-fridge-monitor, generator-monitor
pharma-distributor | Pharma Distributor | healthcare | 1 | warehouse | medical-fridge-monitor, warehouse-climate-monitor, door-open-sensor, reefer-truck-tracker
restaurant | Restaurant | food-service | 1 | kitchen | kitchen-freezer-monitor, cold-room-monitor, door-open-sensor
cloud-kitchen | Cloud Kitchen | food-service | 1 | kitchen | kitchen-freezer-monitor, cold-room-monitor
bakery-and-sweet-shop | Bakery and Sweet Shop | food-service | 2 | kitchen | cold-room-monitor, kitchen-freezer-monitor
hotel-and-catering | Hotel and Catering | food-service | 2 | kitchen | kitchen-freezer-monitor, cold-room-monitor, generator-monitor, air-quality-monitor
supermarket-and-retail | Supermarket and Retail | food-service | 2 | cold-room | cold-room-monitor, kitchen-freezer-monitor, door-open-sensor, generator-monitor, energy-monitor
food-processing | Food Processing | food-service | 2 | factory-floor | cold-room-monitor, warehouse-climate-monitor, machine-downtime-tracker, energy-monitor, compressor-monitor
mushroom-farm | Mushroom Farm | agriculture | 2 | greenhouse | greenhouse-climate-monitor, air-quality-monitor
greenhouse-and-nursery | Greenhouse and Nursery | agriculture | 2 | greenhouse | greenhouse-climate-monitor, soil-moisture-monitor, water-tank-level-monitor
poultry-farm | Poultry Farm | agriculture | 2 | poultry-shed | poultry-shed-monitor, water-tank-level-monitor, generator-monitor
hatchery | Hatchery | agriculture | 3 | poultry-shed | greenhouse-climate-monitor, poultry-shed-monitor
aquaculture | Aquaculture | agriculture | 3 | pond | aquaculture-water-monitor, generator-monitor
orchard-and-farm | Orchard and Farm | agriculture | 3 | farm-field | soil-moisture-monitor, water-tank-level-monitor, generator-monitor
small-factory | Small Factory | industrial | 2 | factory-floor | machine-downtime-tracker, vibration-monitor, energy-monitor, compressor-monitor, generator-monitor
pump-house-and-water-utility | Pump House and Water Utility | industrial | 3 | water-tank | water-tank-level-monitor, vibration-monitor, energy-monitor
server-room-and-isp | Server Room and ISP | facilities | 1 | server-room | server-room-monitor, door-open-sensor, water-leak-detector, generator-monitor
school-and-college | School and College | facilities | 3 | building | server-room-monitor, water-tank-level-monitor, air-quality-monitor
apartment-and-township | Apartment and Township | facilities | 3 | building | water-tank-level-monitor, generator-monitor, water-leak-detector, air-quality-monitor
gym-and-co-working | Gym and Co-working | facilities | 3 | building | air-quality-monitor
warehouse-and-logistics | Warehouse and Logistics | logistics | 1 | warehouse | warehouse-climate-monitor, door-open-sensor, generator-monitor, energy-monitor, reefer-truck-tracker
transport-and-fleet | Transport and Fleet | logistics | 3 | truck | reefer-truck-tracker, door-open-sensor
All industries: status "live", updatedAt "2026-11-24". Wave is informational only (launch order).

## Applications (slug) - written as src/content/catalogue/applications.ts
power-cut-alerts, door-open-alerts, whatsapp-temperature-alerts, vaccine-storage-logging, audit-ready-temperature-reports, humidity-monitoring-godown, leak-alerts, fuel-theft-detection, machine-downtime-tracking, server-room-overheating-alerts, water-tank-level-alerts, poultry-heat-stress-alerts, greenhouse-climate-alerts, cold-chain-transit-monitoring, irrigation-alerts, pump-and-motor-health-monitoring, energy-demand-monitoring, milk-cooling-monitoring, pond-oxygen-alerts

## Resources (slug)  - one flat URL space: /resources/<slug>
Guides/technical (file resources/guides.ts): how-to-monitor-cold-room-temperature, where-to-place-a-temperature-probe, how-to-reduce-false-temperature-alarms, power-cut-protection-for-cold-rooms, what-to-do-when-a-cold-room-alarm-goes-off, how-many-sensors-does-a-godown-need, wifi-vs-4g-vs-lora-for-monitoring (technical), how-to-keep-a-continuous-temperature-record, server-room-temperature-monitoring-basics, greenhouse-and-mushroom-room-climate-monitoring-basics, poultry-shed-heat-and-ammonia-monitoring-basics, how-to-calculate-the-cost-of-spoilage, how-an-iot-monitoring-system-works (technical), how-to-monitor-water-tanks-and-pumps
Comparisons (file resources/comparisons.ts): diy-esp32-data-logger-vs-ready-made-monitoring, wired-vs-wireless-temperature-sensors, manual-temperature-logs-vs-automatic-monitoring
Glossary (file resources/glossary.ts; type "glossary", ONE short section of 90-160 words: definition, why it matters, an example): temperature-excursion, data-logger, hysteresis, defrost-cycle, dew-point, relative-humidity, probe-calibration, thermal-buffer-bottle, lora, mqtt, iot-gateway, escalation-policy, ct-clamp, power-factor, dissolved-oxygen, soil-moisture-sensor, ammonia-sensor, offline-buffering, mean-kinetic-temperature, cold-chain, 4g-fallback, alert-fatigue, sampling-interval, door-open-time
Resource author for all: { name: "ConnectAtom product team", role: "Product and engineering" }. No `reviewer` (not yet technically reviewed; the page says so). `sources: []` unless you cite a real, stable public URL you are certain exists; do NOT invent URLs.
Link tools: the working calculator lives at /tools/spoilage-cost-calculator (mention it in text; it is not a record).
