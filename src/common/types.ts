export interface Application {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
}

export interface NavigationItem {
  title: string;
  children?: NavigationItem[];
}
