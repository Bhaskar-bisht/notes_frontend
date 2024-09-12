/** @format */

export const findFirstLetter = (name) => {
    if (!name) return "U";

    const words = name.split(" ");
    // if user provide a long name like bhaskar singh bisht
    // then the code consider only first 2 word like bhaskar singh
    // and the 2 word starting 2 letter get the function
    const firstLetters = words.slice(0, 2).map((word) => word[0]);

    const firstNameLetters = firstLetters.join("");

    return firstNameLetters.toUpperCase();
};
