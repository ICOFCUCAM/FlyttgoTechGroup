/**
 * Centralized imagery for the FlyttGo marketing surface.
 *
 * All scenes are licensed Unsplash photographs. Swap a single entry below
 * and every page/section that references it updates automatically.
 * `images.unsplash.com` is allowed in next.config.mjs `remotePatterns`.
 */

const UNSPLASH = 'https://images.unsplash.com';

const photo = (id: string, width = 1600, quality = 80) =>
  `${UNSPLASH}/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;

/** Scene IDs kept in one table so imagery can be curated centrally. */
const sceneIds = {
  scandinavianLogisticsTruck: '1586528116311-ad8dd3c8310d',
  scandinavianHighway: '1578575437130-527eed3abbec',
  warehouseLogistics: '1586528116022-aeda1700f3bd',
  deliveryFleet: '1591768575198-88dac53fbd0a',

  studentApartmentMove: '1600577916048-804c9191e36c',
  movingBoxes: '1558551649-e44c8f992010',
  apartmentInterior: '1600585154340-be6161a56a0c',

  officeRelocation: '1497366216548-37526070297c',
  professionalOffice: '1497366754035-f200968a6e72',

  dispatchDashboard: '1551288049-bebda4e38f71',
  analyticsDashboard: '1460925895917-afdab827c52f',
  dataVisualization: '1556761175-5973dc0f32e7',

  cityArchitecture: '1541872703-74c5e44368f1',
  universityCampus: '1523240795612-9a054b0db644',
  marketplaceRetail: '1556741533-6e6a62bd8b49',

  europeMap: '1524661135-423995f22d0b',
} as const;

export const imagery = {
  hero: {
    logistics: {
      src: photo(sceneIds.scandinavianLogisticsTruck),
      alt: 'FlyttGo logistics truck operating in a Scandinavian urban delivery corridor',
    },
    student: {
      src: photo(sceneIds.studentApartmentMove),
      alt: 'Student relocating to a new apartment with labelled moving boxes',
    },
    office: {
      src: photo(sceneIds.officeRelocation),
      alt: 'Professional office relocation in progress with commercial office equipment',
    },
    marketplace: {
      src: photo(sceneIds.dataVisualization),
      alt: 'White-label marketplace operator reviewing deployment configuration',
    },
    fleet: {
      src: photo(sceneIds.deliveryFleet),
      alt: 'Fleet telemetry dashboard visualizing live vehicle routes and operational metrics',
    },
  },
  platforms: {
    flyttgo: {
      hero: photo(sceneIds.scandinavianLogisticsTruck),
      dashboard: photo(sceneIds.dispatchDashboard),
    },
    edupro: {
      hero: photo(sceneIds.universityCampus),
      dashboard: photo(sceneIds.analyticsDashboard),
    },
    govstack: {
      hero: photo(sceneIds.cityArchitecture),
      dashboard: photo(sceneIds.dispatchDashboard),
    },
    marketstack: {
      hero: photo(sceneIds.marketplaceRetail),
      dashboard: photo(sceneIds.dataVisualization),
    },
    fleetstack: {
      hero: photo(sceneIds.deliveryFleet),
      dashboard: photo(sceneIds.analyticsDashboard),
    },
  },
  solutions: {
    government: photo(sceneIds.cityArchitecture),
    enterprise: photo(sceneIds.warehouseLogistics),
    industries: photo(sceneIds.scandinavianHighway),
    marketplace: photo(sceneIds.marketplaceRetail),
  },
  technology: photo(sceneIds.analyticsDashboard),
  dispatch: photo(sceneIds.dispatchDashboard),
  map: photo(sceneIds.europeMap, 1920, 70),
};

export type ImageryKey = keyof typeof imagery;
