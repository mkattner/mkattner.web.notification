//if (!jQuery)
//  alert("jQuery not loaded. Notification module will not work and throw strange errors")

// Define here your translation for the buttons.
const YES = "Yes";
const NO = "No";
const CANCEL = "Cancel";
const OK = "Ok";

/*
 * Wait() instructs the DOM to display a dialog with a message. Then the
 * returned JS Promise() instance is either resolved or rejected depending on
 * the state of the promise parameter.
 * @author: Martin Kattner <martin.kattner@gmail.com>
 * @param html A DOM string to display.
 * @param promise A JS Promise() instance.
 * @return JS Promise() instence which will be resolved or rejected.
 */
const Wait = async (html, promise) => {
  // Check if method parameters are valid.
  if (html && promise) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure
      $("body").append(() => {
        return $("<div>").attr({
            id: "popup-container"
          })
          .append(() => {
            return $('<div>').attr({
              class: "popup"
            }).append(() => {
              return $('<div>').attr({
                class: "content"
              }).html(html)
            })
          })
      });

      // We wait until the JS Promise() instance is resolved or rejected.
      // Then we resolve or reject.
      promise.then((param) => {
        $("#popup-container").remove();
        resolve(param);
      }).catch((param) => {
        $("#popup-container").remove();
        reject(param);
      });
    });
  } else {
    throw "Exception: Function Wait() needs a DOM string and a JS Promise() instance as parameter."
  }
};

/*
 * Prompt() instructs the DOM to display a dialog with a message
 * prompting the user to input some text, and to wait until the user either
 * submits the text or cancels the dialog. Then the returned JS Promise()
 * instance is either resolved or rejected wit the imput text as parameter.
 * @author: Martin Kattner <martin.kattner@gmail.com>
 * @param html A DOM string to display.
 * @return JS Promise() instence which will be resolved or rejected.
 */
const Prompt = async (html) => {
  // Check if method parameters are valid.
  if (html) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure
      $("body").append(() => {
        return $("<div>").attr({
            id: "popup-container"
          })
          .append(() => {
            return $('<div>').attr({
              class: "popup"
            }).append(() => {
              return $('<div>').attr({
                class: "content"
              }).append(() => {
                return $("<p>").html(html)
              }).append(() => {
                return $("<input>").attr({
                  id: "popup-input",
                  type: "text"
                })
              })
            }).append(() => {
              return $('<div>').attr({
                class: "buttons"
              }).append(() => {
                return $('<a>').attr({
                    href: "#",
                    class: "button"
                  }).text(CANCEL)

                  .on("click", () => {
                    let val = $("#popup-input").val();
                    $("#popup-container").remove();;
                    reject(val);
                  });
              }).append(() => {
                return $('<a>').attr({
                    href: "#",
                    class: "button"
                  }).text(OK)

                  // The user is done // TODO press enter, on submit
                  .on("click", () => {
                    let val = $("#popup-input").val();
                    $("#popup-container").remove();;
                    resolve(val);
                  })
              })
            })
          })

        // Set the focus to the input element to let the user start writing
        // instantly.
        $(".popup input[type=text]").focus();
      })
    })
  } else {
    throw "Exception: Function Wait() needs a DOM string as parameter."
  }
};

/*
 * Alert() instructs the DOM to display a dialog with a message,
 * and to wait until the user dismisses the dialog. Then the returned JS
 * Promise() instance is resolved.
 * @author: Martin Kattner <martin.kattner@gmail.com>
 * @param html A DOM string to display.
 * @return JS Promise() instence which will be resolved.
 */
const Alert = async (html) => {
  // Check if method parameters are valid.
  if (html) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure
      $("body").append(() => {
        return $("<div>").attr({
          id: "popup-container"
        }).append(() => {
          return $('<div>').attr({
            class: "popup"
          }).append(() => {
            return $('<div>').attr({
              class: "content"
            }).html(html)
          }).append(() => {
            return $('<div>').attr({
              class: "buttons"
            }).append(() => {
              return $('<a>').attr({
                href: "#",
                class: "button"
              }).text(OK).on("click", () => {
                $("#popup-container").remove();;
                resolve();
              });
            });
          });
        });
      });
    });
  } else {
    throw "Exception: Function Wait() needs a DOM string as parameter."
  }
}

/*
 * Confirm() instructs the browser to display a dialog with an optional message,
 * and to wait until the user either confirms or cancels the dialog. Then the
 * returned JS Promise() instance is either resolved or rejected.
 * @author: Martin Kattner <martin.kattner@gmail.com>
 * @param html A DOM string to display.
 * @return JS Promise() instence which will be resolved or rejected.
 */
const Confirm = async (html) => {
  // Check if method parameters are valid.
  if (html) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure
      $("body").append(() => {
        return $("<div>").attr({
          id: "popup-container"
        }).append(() => {
          return $('<div>').attr({
            class: "popup"
          }).append(() => {
            return $('<div>').attr({
              class: "content"
            }).text(html)
          }).append(() => {
            return $('<div>').attr({
              class: "buttons"
            }).append(() => {
              return $('<a>').attr({
                href: "#",
                class: "button"
              }).text(YES).on("click", () => {
                $("#popup-container").remove();
                resolve();
              });
            }).append(() => {
              return $('<a>').attr({
                href: "#",
                class: "button"
              }).text(NO).on("click", () => {
                $("#popup-container").remove();
                reject();
              })
            })
          })
        })
      })
    })
  } else {
    throw "Exception: Function Wait() needs a DOM string as parameter."
  }
};
