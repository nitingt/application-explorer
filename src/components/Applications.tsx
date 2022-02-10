import { Application } from "../common/types";
import { formatToCurrency } from "../common/utils";

interface ApplicationListProps {
  data: Application[];
  selectedCapability: string;
}

const getApplications = (apps: Application[], selectedCapability: string) => {
  return (
    <div>
      <div style={styles.header}>
        {selectedCapability
          ? `Applications for ${selectedCapability}`
          : "All applications"}
      </div>
      <div style={styles.section}>
        {apps
          .sort((x, y) => x.spend - y.spend)
          .map((item: Application) => (
            <div style={styles.item} key={item.id}>
              <div style={styles.title}> {item.name} </div>
              <div>Total Spend: {formatToCurrency(item.spend)}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

function Applications(props: ApplicationListProps) {
  return (
    <div style={styles.container}>
      {props.data.length === 0
        ? "No applications found"
        : getApplications(props.data, props.selectedCapability)}
    </div>
  );
}

const styles = {
  container: {
    margin: "30px",
  },
  section: {
    display: "flex",
    flex: "row",
    flexWrap: "wrap",
    alignContent: "center",
    textAlign: "center",
  },
  item: {
    backgroundColor: "#eee",
    border: "solid black",
    borderRadius: "5em",
    flex: "grow",
    height: "40px",
    width: "130px",
    padding: "20px",
    margin: "10px",
  },
  title: {
    fontWeight: "bold",
  },
  header: {
    padding: 10,
    backgroundColor: "#eee",
    textAlign: "center",
    fontSize: "20",
    fontWeight: "bold",
    marginBottom: 20,
  },
} as const;

export default Applications;
