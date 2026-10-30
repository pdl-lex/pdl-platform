import _ from "lodash"

export type ResourceKey = "bwb" | "dibs" | "wbf" | "dwds" | "awb"
export interface Resource {
  key: ResourceKey
  color: string
  displayName: string
  url: string
}

export const resources: Record<ResourceKey, Resource> = {
  bwb: {
    key: "bwb",
    color: "blue",
    displayName: "Bayerisches Wörterbuch",
    url: "https://bwb.badw.de/das-projekt.html",
  },
  dibs: {
    key: "dibs",
    color: "yellow",
    displayName: "Dialektologisches Informationssystem von Bayerisch-Schwaben",
    url: "https://dibs.badw.de/das-projekt.html",
  },
  wbf: {
    key: "wbf",
    color: "red",
    displayName: "Fränkisches Wörterbuch",
    url: "https://wbf.badw.de/das-projekt.html",
  },
  dwds: {
    key: "dwds",
    color: "blue",
    displayName: "Digitales Wörterbuch der deutschen Sprache",
    url: "https://www.dwds.de/",
  },
  awb: {
    key: "awb",
    color: "orange",
    displayName: "Althochdeutsches Wörterbuch",
    url: "https://awb.saw-leipzig.de/",
  },
}
