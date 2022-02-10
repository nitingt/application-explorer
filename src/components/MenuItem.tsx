import { useState } from "react";
import { NavigationItem } from "../common/types";

interface MenuItemProps {
  item: NavigationItem;
  handleNavigationChange: Function;
}

const MenuItem = (props: MenuItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const clickHandler = (item: string) => {
    props.handleNavigationChange(item);
    setExpanded(!expanded);
  };

  return (
    <div key={props.item.title}>
      <div>
        <div onClick={() => clickHandler(props.item.title)}>
          <div style={styles.container}>
            {!props.item.children ? (
              <div style={styles.item}></div>
            ) : (
              <div style={expanded ? styles.downArrow : styles.upArrow}></div>
            )}
            <div>{props.item.title}</div>
          </div>
        </div>
        {expanded && props.item.children?.length && (
          <ul>
            {expanded &&
              props.item.children.map((item: NavigationItem, i) => (
                <MenuItem
                  key={`${item.title}:${i}`}
                  item={item}
                  handleNavigationChange={props.handleNavigationChange}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
  downArrow: {
    display: "flex",
    margin: "5px",
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: "5px solid #2f2f2f",
  },
  upArrow: {
    display: "flex",
    margin: "5px",
    width: 0,
    height: 0,
    borderLeft: "5px solid #2f2f2f",
    borderRight: "5px solid transparent",
    borderTop: "5px solid transparent",
    borderBottom: "5px solid transparent",
  },
  item: {
    margin: "5px",
    width: "5px",
    height: "5px",
    background: "black",
    borderRadius: "50%",
  },
} as const;
export default MenuItem;
