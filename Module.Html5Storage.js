const HTML5_STORAGE_GET_PARSED = (key) => {
  return HTML5_STORAGE_PARSE_VALUE(window.localStorage.getItem(key));
};

const HTML5_STORAGE_GET = (key) => {
  return window.localStorage.getItem(key);
};

const HTML5_STORAGE_SET = (key, value) => {
  return window.localStorage.setItem(key, value);
};

const HTML5_STORAGE_PARSE_VALUE = (value) => {
  switch (value) {
    // is true?
    case "true":
      value = true;
      break;

      // is false?
    case "false":
      value = false;
      break;

      // is null?
    case "null":
      value = null;
      break;

    default:


      if (/^(\+|\-){0,1}([0-9])+$/.test(value)) {


        value = parseInt(value);
      } else if (/^(\+|\-){0,1}([0-9])+(\.){1}([0-9])+$/.test(value)) {


        value = parseFloat(value);
      } else {



      }
      // is float?

      break;
  }


  return value;
};
