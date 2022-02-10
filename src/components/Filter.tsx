import { formatToCurrency } from "../common/utils";

import { useState } from "react";

interface FilterProps {
  handleClick: Function;
}

const minValue = 0;
const maxValue = 250000;

function Filter(props: FilterProps) {
  const [value, setValue] = useState(0);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    props.handleClick(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2>Filters </h2>
      <div>
        Spending{" "}
        <span style={styles.selectedFilter}>
          {value > 0 ? formatToCurrency(value) : ""}
        </span>
      </div>
      <div style={styles.sliderContainer}>
        <input
          style={styles.slider}
          type="range"
          step="100"
          min={minValue}
          max={maxValue}
          defaultValue={maxValue}
          onChange={(e) => handleChange(e)}
        />
        <div>
          {" "}
          <div style={styles.minFilterText}>{formatToCurrency(minValue)}</div>
          <div style={styles.maxFilterText}>{formatToCurrency(maxValue)}</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "10px",
  },
  selectedFilter: {
    backgroundColor: "#eee",
    fontWeight: "bold",
  },
  sliderContainer: {
    paddingTop: "20px",
    width: "90%",
  },
  slider: {
    width: "100%",
  },
  minFilterText: {
    float: "left",
  },
  maxFilterText: {
    float: "right",
  },
} as const;

export default Filter;
