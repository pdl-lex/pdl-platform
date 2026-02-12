import _ from "lodash"

export type ResourceKey = "bwb" | "dibs" | "wbf"
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
}
