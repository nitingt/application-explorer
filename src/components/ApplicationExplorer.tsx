import { useEffect, useState } from "react";

import { Application } from "../common/types";
import Applications from "./Applications";
import Error from "./Error";
import Filter from "./Filter";
import LoadingSpinner from "./LoadingSpinner";
import Navigation from "./Navigation";

function ApplicationExplorer() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState("");
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then(
        (result) => {
          //isLoaded is used to show/hide Loading spinner component
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleNavigationChange = (value: string) => {
    setSelectedCapability(value);
  };

  const filterHandler = (value: number) => {
    setFilter(value);
  };

  const applicationsToShow = () => {
    if (!selectedCapability && !filter) return data;

    let applications: Application[] = [];

    if (selectedCapability) {
      applications = data.filter(
        (x: Application) =>
          x.BCAP1 === selectedCapability ||
          x.BCAP2 === selectedCapability ||
          x.BCAP3 === selectedCapability
      );
    }

    if (filter) {
      const appsToFilter = applications.length > 0 ? applications : data;
      applications = appsToFilter.filter((a: Application) => a.spend <= filter);
    }

    return applications;
  };

  return (
    <div>
      {!isLoaded ? (
        <LoadingSpinner />
      ) : (
        <div style={styles.container}>
          <div style={styles.navigationSection}>
            <div style={styles.navigation}>
              <Navigation
                data={data}
                handleNavigationChange={handleNavigationChange}
              />
            </div>
            <div style={styles.filter}>
              <Filter handleClick={filterHandler} />
            </div>
          </div>
          <div style={styles.applicationsSection}>
            {!error ? (
              <Applications
                data={applicationsToShow()}
                selectedCapability={selectedCapability}
              />
            ) : (
              <Error error={error} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "800px",
  },
  navigationSection: {
    display: "flex",
    flex: 1.5,
    flexDirection: "column",
    borderRight: "1px solid black",
    padding: "30px",
  },
  navigation: {
    flex: 3,
    overflow: "auto",
    borderBottom: "1px solid black",
  },
  filter: {
    flex: 1,
  },
  applicationsSection: {
    display: "flex",
    flex: 3,
    overflow: "auto",
  },
} as const;

export default ApplicationExplorer;
