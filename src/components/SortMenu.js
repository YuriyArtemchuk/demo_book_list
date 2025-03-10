import { Dropdown } from "react-bootstrap";

const SortMenu = ({ filter, setFilter, sortedQuantity }) => {
  return (
    <Dropdown className="dropdown" onSelect={(e) => setFilter(e)}>
      <Dropdown.Toggle variant="success">
        {filter} ({sortedQuantity})
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="Show All">Show All</Dropdown.Item>
        <Dropdown.Item eventKey="Show Active">Show Active</Dropdown.Item>
        <Dropdown.Item eventKey="Show Deactivated">
          Show Deactivated
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortMenu;
