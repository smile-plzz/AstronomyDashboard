export interface ApodData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export interface MarsRoverData {
  photos: MarsPhoto[];
}

export interface IssPosition {
  iss_position: {
    latitude: string;
    longitude: string;
  };
  timestamp: number;
  message: string;
}

export interface Astronaut {
  name: string;
  craft: string;
}

export interface CrewData {
  number: number;
  people: Astronaut[];
  message: string;
}

export interface NeoObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_second: string;
    };
    miss_distance: {
      kilometers: string;
    };
    orbiting_body: string;
  }>;
}

export interface NeoData {
  element_count: number;
  near_earth_objects: {
    [key: string]: NeoObject[];
  };
}

export interface MoonPhaseData {
  phase: number;
  name: string;
  illumination: number;
  age: number;
}

export interface SpaceNewsStory {
  title: string;
  description: string;
  source: string;
  date: string;
  url?: string;
}

export interface EpicImage {
  identifier: string;
  caption: string;
  image: string;
  date: string;
  centroid_coordinates: { lat: number; lon: number };
}

export interface TechProject {
  id: number;
  lastUpdated: string;
}

export interface SolarEvent {
  activityID: string;
  startTime: string;
  note: string;
  instruments: { displayName: string }[];
  cmeAnalyses?: { speed: number; type: string }[];
}

export interface Exoplanet {
  pl_name: string;
  hostname: string;
  discoverymethod: string;
  disc_year: number;
  pl_orbper: number;
}
