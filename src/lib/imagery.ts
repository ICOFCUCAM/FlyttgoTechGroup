/**
 * Centralized imagery for the FlyttGo Technologies marketing surface.
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
  // Mobility / transit
  scandinavianLogisticsTruck: '1586528116311-ad8dd3c8310d',
  scandinavianHighway: '1578575437130-527eed3abbec',
  warehouseLogistics: '1586528116022-aeda1700f3bd',
  deliveryFleet: '1591768575198-88dac53fbd0a',

  // Moves + relocation
  studentApartmentMove: '1600577916048-804c9191e36c',
  movingBoxes: '1558551649-e44c8f992010',
  apartmentInterior: '1600585154340-be6161a56a0c',

  // Offices + teams
  officeRelocation: '1497366216548-37526070297c',
  professionalOffice: '1497366754035-f200968a6e72',
  teamCollaboration: '1521737604893-d14cc237f11d',

  // Dashboards / analytics
  dispatchDashboard: '1551288049-bebda4e38f71',
  analyticsDashboard: '1460925895917-afdab827c52f',
  dataVisualization: '1556761175-5973dc0f32e7',

  // Places / contexts
  cityArchitecture: '1541872703-74c5e44368f1',
  universityCampus: '1523240795612-9a054b0db644',
  marketplaceRetail: '1556741533-6e6a62bd8b49',
  europeMap: '1524661135-423995f22d0b',

  // Identity / security
  identityBiometric: '1563013544-824ae1b704d3',
  secureAuth: '1555066931-4365d14bab8c',

  // Payments / finance
  paymentsConsole: '1554224155-6726b3ff858f',
  financeDashboard: '1518186285589-2f7649de83e0',
} as const;

export const imagery = {
  hero: {
    logistics: {
      src: photo(sceneIds.scandinavianLogisticsTruck),
      alt: 'Scandinavian logistics truck operating in an urban delivery corridor',
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
      alt: 'Platform operator reviewing deployment configuration across screens',
    },
    fleet: {
      src: photo(sceneIds.deliveryFleet),
      alt: 'Fleet telemetry dashboard visualizing live vehicle routes and operational metrics',
    },
    city: {
      src: photo(sceneIds.cityArchitecture),
      alt: 'Modern city architecture representing a government service deployment scene',
    },
  },
  platforms: {
    transify: {
      hero: photo(sceneIds.deliveryFleet),
      dashboard: photo(sceneIds.dispatchDashboard),
    },
    workverge: {
      hero: photo(sceneIds.teamCollaboration),
      dashboard: photo(sceneIds.analyticsDashboard),
    },
    civitas: {
      hero: photo(sceneIds.cityArchitecture),
      dashboard: photo(sceneIds.dataVisualization),
    },
    edupro: {
      hero: photo(sceneIds.universityCampus),
      dashboard: photo(sceneIds.analyticsDashboard),
    },
    identra: {
      hero: photo(sceneIds.identityBiometric),
      dashboard: photo(sceneIds.secureAuth),
    },
    payvera: {
      hero: photo(sceneIds.paymentsConsole),
      dashboard: photo(sceneIds.financeDashboard),
    },
    flyttgo: {
      hero: photo(sceneIds.scandinavianLogisticsTruck),
      dashboard: photo(sceneIds.dispatchDashboard),
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
