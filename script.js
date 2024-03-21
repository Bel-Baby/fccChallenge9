/*
const getMean = (array) => {
    //The mean is the average value of all numbers in a list. The first step in calculating the mean is to take the sum of all numbers in the list. Arrays have another method, called .reduce(), which is perfect for this situation. The .reduce() method takes an array and applies a callback function to condense the array into a single value.Declare a sum variable and assign array.reduce() to it.
    const sum = array.reduce((acc, el) => //Like the other methods, .reduce() takes a callback. This callback, however, takes at least two parameters. The first is the accumulator, and the second is the current element in the array. The return value for the callback becomes the value of the accumulator on the next iteration.For your sum variable, pass a callback to .reduce() that takes the accumulator and the current element as parameters. The callback should return the sum of the accumulator and the current element.
        acc + el, 0 //The .reduce() method takes a second argument that is used as the initial value of the accumulator. Without a second argument, the .reduce() method uses the first element of the array as the accumulator, which can lead to unexpected results.To be safe, it's best to set an initial value.Set the initial value of the accumulator to 0.
    );
    //The next step in calculating the mean is to divide the sum of numbers by the count of numbers in the list.Declare a mean variable and assign it the value of sum divided by the length of array.
    const mean = sum / array.length;
    return mean;
};
*/
//You can actually cleanup the logic above a bit. Using the implicit return of an arrow function, you can directly return the value of the .reduce() method divided by the length of the array, without having to assign any variables.Update your getMean function as described.
const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
    //The first step in calculating the median is to ensure the list of numbers is sorted from least to greatest. Once again, there is an array method ideal for this – the .sort() method.Declare a sorted variable and assign array.sort() to it. There is one last thing to fix. The .sort() method mutates the array it's called on. It is generally bad practice to mutate a function parameter, which array is.To fix this, add an empty .slice() call before your .sort() method. The empty .slice() call will make a shallow copy of the array, which you are free to mutate.
    const sorted = array.slice().sort((a, b) => //By default, the .sort() method converts the elements of an array into strings, then sorts them alphabetically. This works well for strings, but not so well for numbers. For example, 10 comes before 2 when sorted as strings, but 2 comes before 10 when sorted as numbers.To fix this, you can pass in a callback function to the .sort() method. This function takes two arguments, which represent the two elements being compared. The function should return a value less than 0 if the first element should come before the second element, a value greater than 0 if the first element should come after the second element, and 0 if the two elements should remain in their current positions.To sort your numbers from smallest to largest, pass a callback function that takes parameters a and b, and returns the result of subtracting b from a. 
        a - b);

    //The next step is to find the number in the middle of the list. If the list has an odd number of numbers, the middle number is the median. If the list has an even number of numbers, the median is the average of the two middle numbers.You can check if a number is even or odd with the modulus operator, which is represented by the % symbol. This operator returns the remainder of the division of two numbers. If the remainder is 0, the number is even. If the remainder is 1, the number is odd:Declare a median variable. Using the ternary operator, check if the length of array is even. If the length of array is even, find the two middle numbers and calculate the mean of those numbers. If the length of array is odd, find the middle number and assign it to the median variable.
    const median = array.length % 2 === 0 ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]]) : sorted[Math.floor(array.length / 2)];

    //Finally, return the value of median.
    return median; //Like the getMean function, you could condense this code into one line and reduce the number of variables you instantiate. However, it is important to remember that shorter code is not always better code. In this case, reducing the lines of code would make the code harder to read and understand, impacting future maintainability.
}

const getMode = (array) => {
    const counts = {}
    //Use the .forEach() method to loop through the array. In the callback, use the el parameter to access the counts object and increment the count for each number.
    array.forEach((el) => {
        counts[el] = (counts[el] || 0) + 1;
    });

    //There are a few edge cases to account for when calculating the mode of a dataset. First, if every value appears the same number of times, there is no mode.To calculate this, you will use a Set. A Set is a data structure that only allows unique values. If you pass an array into the Set constructor, it will remove any duplicate values.Start by creating an if statement. In the condition, create a Set with new Set() and pass it the Object.values() of your counts object. If the size property of this Set is equal to 1, that tells you every value appears the same number of times. In this case, return null from your function.
    if (new Set(Object.values(counts)).size === 1) {
        return null;
    }

    //Now you need to find the value that occurs with the highest frequency. You'll use the Object.keys() method for this.Start by declaring a highest variable, and assigning it the value of the counts object's Object.keys() method.
    const highest = Object.keys(counts).sort((a, b) =>//Now you need to sort the values properly. Chain the .sort() method to your Object.keys() call.For the callback, you'll need to use the counts object to compare the values of each key. You can use the a and b parameters to access the keys. Then, return the value of counts[b] minus the value of counts[a].Finally, access the first element in the array using bracket notation to complete your highest variable.
        counts[b] - counts[a])[0];

    //If multiple numbers in a series occur at the same highest frequency, they are all considered the mode. Otherwise, the mode is the number that occurs most often, that single number is the mode.Thankfully, you can handle both of these cases at once with the .filter() method. Start by declaring a mode variable and assigning it the value of Object.keys(counts).
    const mode = Object.keys(counts).filter((el) => { //Now chain the filter method to your latest Object.keys() call. The callback function should return whether the value of counts[el] is equal to your counts[highest].
        return counts[el] === counts[highest];
    });
    //mode is an array, so return it as a string with the .join() method. Separate the elements with a comma followed by a space.
    return mode.join(", ");
}

//Declare a getRange function that takes the same array parameter you have been using. Using Math.min(), Math.max(), and the spread operator, return the difference between the largest and smallest numbers in the list.
const getRange = ([...array]) => {
    return Math.max(...array) - Math.min(...array);
}

//The variance of a series represents how much the data deviates from the mean, and can be used to determine how spread out the data are. The variance is calculated in a few steps.Start by declaring a getVariance function that takes an array parameter. Within that function, declare a mean variable and assign it the value of the getMean function, passing array as the argument.
const getVariance = (array) => {
    const mean = getMean(array);
    //Calculate how far each element is from the mean. Declare a differences variable, and assign it the value of array.map(). For the callback, return the value of el minus mean.
    //const differences = array.map(el => el - mean);

    //The next step is to square each of the differences. To square a value, you can use the ** operator. For example, 3 ** 2 would return 9.Declare a squaredDifferences variable, and assign it the value of differences.map(). For the callback, return the value of el squared.
    //const squaredDifferences = differences.map(el => el ** 2);

    //Declare a sumSquaredDifferences variable, and assign it the value of squaredDifferences.reduce(). For the callback, return the sum of acc and el. Remember to set the initial value to 0.
    //const sumSquaredDifferences = squaredDifferences.reduce(
    //(acc, el) => acc + el, 0
    //);

    //With two .map() calls and a .reduce() call, you're creating extra arrays and iterating more times than needed. You should move all of the logic into the .reduce() call to save time and memory.Remove the differences, squaredDifferences, and sumSquaredDifferences variables (and their values). Declare a variance variable, and assign it the value of array.reduce(). For the callback, pass in your standard acc and el parameters, but leave the function body empty for now. Don't forget to set the initial value to 0.
    const variance = array.reduce((acc, el) => {
        //Within your empty .reduce() callback, declare a variable difference and set it to the value of el minus mean. Then declare a squared variable, and set it to the value of difference to the power of 2. Finally, return the value of acc plus squared.
        const difference = el - mean;
        const squared = difference ** 2;
        return acc + squared;
    }, 0) / array.length; //The final step in calculating the variance is to divide the sum of the squared differences by the count of numbers.Divide your .reduce() call by the length of the array (in your variance declaration). Then, return variance.
    return variance;
}

//Your final calculation is the standard deviation, which is the square root of the variance.Begin by declaring a getStandardDeviation function, with the array parameter. In the function body, declare a variance variable and assign it the variance of the array.
const getStandardDeviation = (array) => {
    const variance = getVariance(array);
    //To calculate a root exponent, such as  x−−√n, you can use an inverted exponent  x1/n.Declare a standardDeviation variable, and use the Math.pow() function to assign it the value of  variance1/2.
    //const standardDeviation = Math.pow(variance, 1/2);

    //The Math object has a .sqrt() method specifically for finding the square root of a number.Change your standardDeviation variable to use this method instead of Math.pow().
    const standardDeviation = Math.sqrt(variance);

    return standardDeviation;
}

const calculate = () => {
    const value = document.querySelector("#numbers").value;
    //Use the /,\s*/g regex to split the value string by commas. You can tweak it based on the number of spaces separating your values. Store the array in an array variable.
    const array = value.split(/,\s*/g);

    /*
    //You need to convert this array of strings into an array of numbers. To do this, you can use the .map() method.Create a numbers variable and assign it the value of array.map(). Remember that .map() creates a new array, instead of mutating the original array.
    const numbers = array.map(el =>
        //Add a callback function to your .map() method that converts each element to a number.
        Number(el)
    )
    //A user could put any text they want into the input box. You want to make sure that you are only working with numbers. The Number() constructor will return NaN (which stands for "not a number") if the value passed to it cannot be converted to a number.You need to filter these values out – thankfully, arrays have a method specifically for this. The .filter() method will allow you to filter elements out of an array, creating a new array in the process.
    const filtered = numbers.filter(el => 
        //Much like the .map() method, the .filter() method takes a callback function. The callback function takes the current element as its first argument.The callback function needs to return a Boolean value, which indicates whether the element should be included in the new array. In this case, you want to return true if the element is not NaN (not a number).However, you cannot check for equality here, because NaN is not equal to itself. Instead, you can use the isNaN() method, which returns true if the argument is NaN.
        !isNaN(el));
    */

    //Array methods can often be chained together to perform multiple operations at once.Remove your filtered variable, and chain your .filter() call to your .map() call above. Do not remove either of the callback functions.
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

    //Now you need to use your new getMean function. In your calculate function, declare a mean variable and assign it the value of getMean(numbers).
    const mean = getMean(numbers);
    //Like you did with your getMean function, you need to add your getMedian function to your calculate logic.Declare a variable median and assign it the value of getMedian(numbers).
    const median = getMedian(numbers);

    //Add your getMode() function to your calculate logic
    const mode = getMode(numbers);

    const range = getRange(numbers);

    const variance = getVariance(numbers);

    const standardDeviation = getStandardDeviation(numbers);

    //To display the value of mean, your app has a #mean element ready to go.Use a .querySelector to find that element, and then set its .textContent to the value of mean.
    document.querySelector("#mean").textContent = mean;
    //query the DOM for the #median element and set the textContent to median.    
    document.querySelector("#median").textContent = median;

    //update the getMode() HTML element.
    document.querySelector("#mode").textContent = mode;

    document.querySelector("#range").textContent = range;

    document.querySelector("#variance").textContent = variance;

    document.querySelector("#standardDeviation").textContent = standardDeviation;
}