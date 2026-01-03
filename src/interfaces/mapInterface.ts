import type { AddressLocation } from './addressLocationInterface'

export interface MapProperties {
    address: AddressLocation
    addresstype: string
    boundingbox: string[]
    class: string
    display_name: string
    importance: number
    lat: string
    licence: string
    lon: string
    name: string
    osm_id: number
    osm_type: string
    place_id: number
    place_rank: number
    type: string
}
