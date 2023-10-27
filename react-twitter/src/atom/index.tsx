import { atom } from "recoil";

export type languageType = "ko" | "en";

export const languageState = atom<languageType>({
    key: "language",
    default: (localStorage.getItem("language") as languageType) || "ko",
});
