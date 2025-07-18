// Example of how to import and use JSON data in your React components

// Import JSON data directly (works for static data)
import exampleData from "../data/example-data.json";

// Function to get data (useful for more complex data loading logic)
export const getExampleData = () => {
  return exampleData;
};

// Example of how to use this in a React component:
/*
import { getExampleData } from '../utils/dataLoader';

function MyComponent() {
  const data = getExampleData();
  
  return (
    <div>
      <h2>{data.sample.message}</h2>
      <ul>
        {data.properties.map(property => (
          <li key={property.id}>
            {property.address} - €{property.rent}
          </li>
        ))}
      </ul>
    </div>
  );
}
*/
