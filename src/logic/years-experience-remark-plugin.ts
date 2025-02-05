import type { Root } from "mdast";
import { findAndReplace } from "mdast-util-find-and-replace";
import { experienceYears } from "./years-experience";

export default function remarkYearsExperienceReplacement() {
  return (tree: Root) => {
    findAndReplace(tree, [
      /\{\{yearsExperience\}\}/g,
      (...args) => {
        return experienceYears().toFixed(0);
      },
    ]);
  };
}
