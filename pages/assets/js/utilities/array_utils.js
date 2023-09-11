class ArrayUtils {
    static sortByKey(inputArray, key, ascending = true) {
        function compareByKey(a, b) {
            const dateA = new Date(a[key]);
            const dateB = new Date(b[key]);

            if (dateA < dateB) {
                return ascending ? -1 : 1;
            }
            if (dateA > dateB) {
                return ascending ? 1 : -1;
            }
            return 0;
        }

        inputArray.sort(compareByKey);

        return inputArray;
    }

    static convertArrayToObjects(dataArray) {
        const [headerRow, ...rows] = dataArray; // Extract header row and rest of the rows
        const headerKeys = headerRow.map(String); // Ensure header keys are strings

        const objectsArray = rows.map(row => {
            const obj = {};
            row.forEach((value, index) => {
                obj[headerKeys[index]] = value;
            });
            return obj;
        });

        return objectsArray;
    }
}

export default ArrayUtils;
