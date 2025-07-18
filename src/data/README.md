# Data Folder

This folder contains JSON files with data used throughout the application.

## How to Use

1. **Add your JSON files here** - Place any static data files in this folder
2. **Import in components** - Use ES6 imports to load JSON data
3. **Access via utilities** - Use the dataLoader utility for consistent data access

## Examples

### Direct Import
```javascript
import myData from '../data/my-data.json';
```

### Using Data Loader Utility
```javascript
import { getExampleData } from '../utils/dataLoader';
const data = getExampleData();
```

## File Naming Convention

- Use kebab-case for file names: `rental-properties.json`
- Be descriptive: `paris-rent-data.json` rather than `data.json`
- Keep files focused on a single data type or domain

## Structure Recommendations

- Keep JSON files flat when possible
- Use consistent property naming (camelCase)
- Include IDs for list items to help with React keys
- Consider data validation for production apps 