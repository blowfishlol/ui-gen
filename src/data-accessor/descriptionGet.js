import storage from "./../storage"

export default function f() {
  return storage.getState().description.descriptions
}
