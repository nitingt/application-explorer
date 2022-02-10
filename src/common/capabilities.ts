import { Application } from "./types";

//Create unique capabilities hierarchical object array
export const getUniqueCapabilities = (data: Application[]) => {
  const uniqueCapabilities1 = new Set<string>();
  const uniqueCapabilities2 = new Set<string>();
  const uniqueCapabilities3 = new Set<string>();

  data.forEach((app: Application) => {
    uniqueCapabilities1.add(app.BCAP1);
    uniqueCapabilities2.add(app.BCAP2);
    uniqueCapabilities3.add(app.BCAP3);
  });

  const sortedCapabilities1: string[] = [...uniqueCapabilities1].sort();
  const sortedCapabilities2: string[] = [...uniqueCapabilities2].sort();
  const sortedCapabilities3: string[] = [...uniqueCapabilities3].sort();

  const regex = (value: string) => new RegExp(value);

  return sortedCapabilities1.map((c1: string) => ({
    title: c1,
    state: true,
    children: sortedCapabilities2
      .filter((c2) => c2.match(regex(c1)))
      .map((c2: string) => ({
        title: c2,
        state: true,
        children: sortedCapabilities3
          .filter((c3: string) => c3.match(regex(c2)))
          .map((c3: string) => ({
            title: c3,
          })),
      })),
  }));
};
