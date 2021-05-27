//if (!jQuery)
//  alert("jQuery not loaded. Notification module will not work and throw strange errors")

// Define here your translation for the buttons.
const YES = "Yes";
const NO = "No";
const CANCEL = "Cancel";
const OK = "Ok";

$(document).on("keydown", function(event) {
  if ($("#popup-container").length > 0) {
    event.preventDefault();
    if (event.key == "Escape") {
      $("#popup-container").data().notification.rejectFunc();
    } else if (event.key == "Enter") {
      $("#popup-container").data().notification.resolveFunc();
    }
  }
});

class Notification {
  constructor($domElement, resolveFunc, rejectFunc) {
    this.$domElement = $domElement;
    this.resolveFunc = resolveFunc;
    this.rejectFunc = rejectFunc;
  }
}

const PromiseCondition = (condition, timeout) => {
  return new Promise((resolve, reject) => {
    var done = false;
    var timeoutId;

    if (timeout) {
      timeoutId = setTimeout(() => {
        if (!done) {
          done = true;
          reject();
        }

      }, timeout);
    }

    const loop = () => {
      //console.log("loop: " + condition())
      if (condition()) {
        if (!done) {
          done = true;
          clearTimeout(timeoutId);
          resolve();
        }
      } else if (!done) {
        setTimeout(loop, 10);
      }
    };

    setTimeout(loop, 0);
  });
}

class WrappedPromise {
  #extPromise = null;
  #resolve = null;
  #reject = null;
  #triggered = false;

  constructor(promise) {
    this.#extPromise = promise;
  }

  get promise() {
    return new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;

      this.#extPromise
        .then((param) => {
          if (!this.#triggered) {
            this.#triggered = true;
            this.#resolve(param);
          }
        })
        .catch((param) => {
          if (!this.#triggered) {
            this.#triggered = true;
            this.#reject(param);
          }
        });
    });
  }

  resolve(param) {
    if (!this.#triggered) {
      this.#triggered = true;
      this.#resolve(param);
    }
  }

  reject(param) {
    if (!this.#triggered) {
      this.#triggered = true;
      this.#resolve(param);
    }
  }

}

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
  if ($("#popup-container").length > 0) {
    alert("ERROR! DEBUG: only one popup is allowed! Program continues but it's dirty!")
  }

  var triggered = false;
  // Check if method parameters are valid.
  if (html && promise) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      const resolveFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          resolve(param);
        }
      };

      const rejectFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          reject(param);
        }
      };

      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure

      const $domElement =
        $("<div>").attr({
          id: "popup-container"
        })
        .append(() => {
          return $('<div>').attr({
              class: "popup"
            })
            .append(() => {
              return $('<div>').attr({
                class: "content"
              }).html(html)
            });
        });

      $domElement.data({
        notification: new Notification($domElement, resolveFunc, rejectFunc)
      });

      $("body")
        .append($domElement);

      // We wait until the JS Promise() instance is resolved or rejected.
      // Then we resolve or reject.
      promise.then(resolveFunc).catch(rejectFunc);
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
const Prompt = async (html, resolveMsg, rejectMsg, promise, defaultValue) => {
  if ($("#popup-container").length > 0) {
    alert("ERROR! DEBUG: only one popup is allowed! Program continues but it's dirty!")
  }

  var triggered = false;
  resolveMsg = resolveMsg || OK;
  rejectMsg = rejectMsg || CANCEL;

  // Check if method parameters are valid.
  if (html) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      const resolveFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          resolve(param);
        }
      };

      const rejectFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          reject(param);
        }
      };

      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure

      const $domElement = $("<div>").attr({
          id: "popup-container"
        })
        .append(() => {
          return $('<div>').attr({
              class: "popup"
            })
            .append(() => {
              return $('<div>').attr({
                  class: "content"
                })
                .append(() => {
                  return $("<p>").html(html)
                })
                .append(() => {
                  return $("<input>").attr({
                    id: "popup-input",
                    type: "text"
                  }).val(defaultValue || false)
                })
            })
            .append(() => {
              return $('<div>').attr({
                  class: "buttons"
                })
                .append(() => {
                  return $('<a>').attr({
                      href: "#",
                      class: "button reject"
                    }).text(rejectMsg)

                    .on("click", () => {
                      let val = $("#popup-input").val();
                      $("#popup-container").remove();;
                      rejectFunc(val);
                    });
                })

                .append(() => {
                  return $('<a>').attr({
                      href: "#",
                      class: "button resolve default"
                    }).text(resolveMsg)

                    // The user is done // TODO press enter, on submit
                    .on("click", () => {
                      let val = $("#popup-input").val();
                      $("#popup-container").remove();;
                      resolveFunc(val);
                    });
                });
            });
        });

      $domElement.data({
        notification: new Notification($domElement, resolveFunc, rejectFunc)
      });

      $("body").append($domElement);

      // Set the focus to the input element to let the user start writing
      // instantly.
      $(".popup input[type=text]").focus();

      // If the JS Promise() instance is resolved or rejected.
      // Then we resolve or reject.
      if (promise)
        promise.then(resolveFunc).catch(rejectFunc);
    });
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
const Alert = async (html, resolveMsg, promise, rejectDefault) => {
  if ($("#popup-container").length > 0) {
    alert("ERROR! DEBUG: only one popup is allowed! Program continues but it's dirty!")
  }

  var triggered = false;
  resolveMsg = resolveMsg || OK;
  // Check if method parameters are valid.
  if (html) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      const resolveFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          resolve(param);
        }
      };

      const rejectFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          reject(param);
        }
      };

      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure

      const $domElement = $("<div>").attr({
          id: "popup-container"
        })
        .append(() => {
          return $('<div>').attr({
              class: "popup"
            })
            .append(() => {
              return $('<div>').attr({
                  class: "content"
                })
                .append(() => {
                  if (html instanceof jQuery) {
                    return html;
                  } else {
                    return $("<p>").html(html)
                  }
                })
            })
            .append(() => {
              return $('<div>').attr({
                  class: "buttons"
                })
                .append(() => {
                  return $('<a>').attr({
                    href: "#",
                    class: "button " + ((rejectDefault) ? "reject" : "resolve")
                  }).text(resolveMsg).on("click", () => {
                    $("#popup-container").remove();
                    if (rejectDefault === true) {
                      rejectFunc();
                    } else {
                      resolveFunc();
                    }
                  });
                });
            });
        });

      $domElement.data({
        notification: new Notification($domElement, resolveFunc, rejectFunc)
      });

      $("body")
        .append($domElement);

      // If the JS Promise() instance is resolved or rejected.
      // Then we resolve or reject.
      if (promise)
        promise.then(resolveFunc).catch(rejectFunc);
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
const Confirm = async (html, resolveMsg, rejectMsg, promise) => {
  if ($("#popup-container").length > 0) {
    alert("ERROR! DEBUG: only one popup is allowed! Program continues but it's dirty!")
  }

  var triggered = false;
  resolveMsg = resolveMsg || YES;
  rejectMsg = rejectMsg || NO;
  // Check if method parameters are valid.
  if (html) {
    // Return a new JS Promise() instance.
    return new Promise((resolve, reject) => {
      const resolveFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          resolve(param);
        }
      };

      const rejectFunc = (param) => {
        if (!triggered) {
          triggered = true;
          $("#popup-container").remove();
          reject(param);
        }
      };

      // Let's create the popup in the DOM.
      $("#popup-container").remove(); // just to be sure

      const $domElement = $("<div>").attr({
          id: "popup-container"
        })
        .append(() => {
          return $('<div>').attr({
              class: "popup"
            })
            .append(() => {
              return $('<div>').attr({
                  class: "content"
                })
                .append(() => {
                  if (html instanceof jQuery) {
                    return html;
                  } else {
                    return $("<p>").html(html)
                  }
                })
            })
            .append(() => {
              return $('<div>').attr({
                  class: "buttons"
                })
                .append(() => {
                  return $('<a>').attr({
                    href: "#",
                    class: "button reject"
                  }).text(rejectMsg).on("click", () => {
                    $("#popup-container").remove();
                    rejectFunc();
                  });
                })
                .append(() => {
                  return $('<a>').attr({
                    href: "#",
                    class: "button resolve default"
                  }).text(resolveMsg).on("click", () => {
                    $("#popup-container").remove();
                    resolveFunc();
                  });
                });
            });
        });

      $domElement.data({
        notification: new Notification($domElement, resolveFunc, rejectFunc)
      });

      $("body")
        .append($domElement);

      // If the JS Promise() instance is resolved or rejected.
      // Then we resolve or reject.
      if (promise)
        promise.then(resolveFunc).catch(rejectFunc);
    });
  } else {
    throw "Exception: Function Wait() needs a DOM string as parameter."
  }
};
