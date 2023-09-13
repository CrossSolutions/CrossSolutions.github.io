class ArrayUtils {
    static convertArrayToObjects(dataArray) {
        const [headerRow, ...rows] = dataArray; // Extract header row and rest of the rows
        const headerKeys = headerRow.map(String); // Ensure header keys are strings

        const objectsArray = rows.map(row => {
            const obj = {};
            row.forEach((value, index) => {
                // Check data types and convert values accordingly
                if (value === "TRUE" || value === "FALSE") {
                    obj[headerKeys[index]] = value === "TRUE"; // Convert to boolean
                } else if (!isNaN(value) && !isNaN(parseFloat(value))) {
                    const floatValue = parseFloat(value);
                    obj[headerKeys[index]] = Number.isInteger(floatValue) ? parseInt(value) : floatValue; // Convert to integer or float
                } else {
                    obj[headerKeys[index]] = value; // Keep as string
                }
            });
            return obj;
        });

        return objectsArray;
    }
}

export default ArrayUtils;
