import { getUniqueCapabilities } from "../common/capabilities";

import { Application } from "../common/types";
import MenuItem from "./MenuItem";

interface NavigationProps {
  data: Application[];
  handleNavigationChange: Function;
}

function Navigation(props: NavigationProps) {
  return (
    <div style={styles.container}>
      <h2>Navigation</h2>
      {getUniqueCapabilities(props.data).map((c, i) => (
        <div key={c.title}>
          <MenuItem
            key={`${c.title}:${i}`}
            item={c}
            handleNavigationChange={props.handleNavigationChange}
          />
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    cursor: "pointer",
  },
} as const;

export default Navigation;
