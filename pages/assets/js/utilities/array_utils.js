class ArrayUtils {
    static customSort(inputArray) {
        function sortByIsFeaturedAndDatePosted(a, b) {
            // Compare by IsFeatured first
            if (a.IsFeatured && !b.IsFeatured) {
                return -1;
            }
            if (!a.IsFeatured && b.IsFeatured) {
                return 1;
            }

            // If both have the same IsFeatured status, compare by DatePosted
            const dateA = new Date(a.DatePosted);
            const dateB = new Date(b.DatePosted);

            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }

            return 0;
        }

        inputArray.sort(sortByIsFeaturedAndDatePosted);
        return inputArray;
    }

    static convertArrayToObjects(dataArray) {
        const [headerRow, ...rows] = dataArray; // Extract header row and rest of the rows
        const headerKeys = headerRow.map(String); // Ensure header keys are strings

        const objectsArray = rows.map(row => {
            const obj = {};
            row.forEach((value, index) => {
                // Check data types and convert values accordingly
                if (headerKeys[index] === "Tags") {
                    // Split the comma-separated string into an array of words
                    obj[headerKeys[index]] = value.split(',').map(tag => tag.trim());
                } else if (value === "TRUE" || value === "FALSE") {
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
