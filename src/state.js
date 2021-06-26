import { writable } from "svelte/store"

const hash = location.hash.replace("#", "").trim()
const host = hash || null

const peerID = writable(null)
const { Peer } = peerjs

const peer = new Peer()
peer.on(
    "open",
    (id) => peerID.set(id)
)

export {
    peer,
    peerID,
    host,
}
