// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// get data from local storage
export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    
    // Check if the item exists and is not null
    if (item) {
      const parsedItem = JSON.parse(item);
      
      // Check if the parsed item is an array, otherwise return an empty array
      return Array.isArray(parsedItem) ? parsedItem : [];
    }
    
    // Return an empty array if the item doesn't exist
    return [];
  } catch (error) {
    console.error("Error parsing localStorage item:", error);
    return []; // Return an empty array in case of an error
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
