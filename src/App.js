import { useState, useEffect } from "react";
import { toppings } from "./utils/toppings";
import "./styles.css";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function App() {
  const [total, setTotal] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectAll, setSelectAll] = useState(true);

  const onSelectHandler = (e) => {
    const selectedIndex = selectedOptions.indexOf(e.target.id);
    if (selectedIndex < 0) {
      //if not available push to array
      setSelectedOptions([...selectedOptions, e.target.id]);
      setTotal(total + Number(e.target.value));
    } else {
      //if available in selectedOptions then remove
      const newSelection = selectedOptions.filter(
        (item) => item !== e.target.id
      );
      setSelectedOptions(newSelection);
      setTotal(total - Number(e.target.value));
    }
  };

  const selectAllHandler = (e) => {
    setSelectAll(!selectAll);
    if (selectAll) {
      setSelectedOptions(toppings.map((item) => item._id));
    }
    if (!selectAll) {
      setSelectedOptions([]);
    }
  };

  return (
    <div className="App">
      <h3>Select Toppings</h3>
      <div>
        <input
          type="checkbox"
          name="Select All"
          value={selectAll}
          onChange={selectAllHandler}
        />
        <label htmlFor={`custom-checkbox`}>Select All</label>
      </div>
      <ul className="toppings-list">
        {toppings.map(({ name, price, _id }, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={_id}
                    name={name}
                    value={price}
                    checked={selectedOptions.includes(_id)}
                    onChange={onSelectHandler}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
