export type ResourceKey = "bwb" | "dibs" | "wbf"
export interface Resource {
  key: ResourceKey
  color: string
  displayName: string
}

export const resources: Record<ResourceKey, Resource> = {
  bwb: { key: "bwb", color: "blue", displayName: "Bayerisches Wörterbuch" },
  dibs: {
    key: "dibs",
    color: "yellow",
    displayName: "Dialektologisches Informationssystem von Bayerisch-Schwaben",
  },
  wbf: { key: "wbf", color: "red", displayName: "Fränkisches Wörterbuch" },
}
