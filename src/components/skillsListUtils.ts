import { getImage } from "@astrojs/image";

export async function lookupSkillsList(
  skills: [string, string][],
  iconsGlob: Record<string, () => Promise<unknown>>
): Promise<
  {
    name: string;
    iconUrl: string;
  }[]
> {
  return Promise.all(
    skills.map(async ([name, iconFile]) => {
      const iconMeta: unknown = (
        (await iconsGlob[`./logos/${iconFile}`]()) as any
      ).default;
      let iconUrl;
      if (iconFile.endsWith(".svg")) {
        iconUrl = iconMeta as string;
      } else {
        iconUrl = (await getImage(iconMeta as any)).src!;
      }
      return {
        name,
        iconUrl,
      };
    })
  );
}
