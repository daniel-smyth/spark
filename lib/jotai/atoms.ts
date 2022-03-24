import { atomWithHash } from "jotai/utils";

export const infoAtom = atomWithHash("modalOpen", {
  name: "",
  description: "",
  prefix: "",
  mintTo: "",
});
