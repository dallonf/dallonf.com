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
      const iconUrl = ((await iconsGlob[`./logos/${iconFile}`]()) as any)
        .default;
      return {
        name,
        iconUrl,
      };
    })
  );
}
