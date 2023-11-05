// @ts-ignore
import { MerkleJson } from 'merkle-json'

const mj = new MerkleJson()

export function getHash(obj: object) {
    return mj.hash(obj)
}
