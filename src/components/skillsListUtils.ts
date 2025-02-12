import { assert } from "@logic/assert";

export async function lookupSkillsList(
  skills: [string, string][],
  iconsGlob: Record<string, () => Promise<{ default: ImageMetadata }>>
): Promise<
  {
    name: string;
    iconUrl: string;
  }[]
> {
  return Promise.all(
    skills.map(async ([name, iconFile]) => {
      const importLogo = iconsGlob[`./logos/${iconFile}`];
      assert(importLogo);
      const iconMeta = (await importLogo()).default;
      return {
        name,
        iconUrl: iconMeta.src,
      };
    })
  );
}
