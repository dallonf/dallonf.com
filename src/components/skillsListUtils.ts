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
      const iconMeta = (await iconsGlob[`./logos/${iconFile}`]()).default;
      return {
        name,
        iconUrl: iconMeta.src,
      };
    })
  );
}
