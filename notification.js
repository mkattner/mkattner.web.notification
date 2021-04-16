const Wait = async (msg) => {
  $("#popup-container").remove(); // just to be sure
  $("body").append(() => {
    return $("<div>").attr({
        id: "popup-container"
      })
      .append(() => {
        return $('<div class="popup">').append(() => {
          return $('<div class = "content">').text(msg)
        })
      })
  })
};

const Prompt = async (msg) => {
  return new Promise((resolve, reject) => {
    $("#popup-container").remove(); // just to be sure
    $("body").append(() => {
      return $("<div>").attr({
          id: "popup-container"
        })
        .append(() => {
          return $('<div class="popup">').append(() => {
            return $('<div class = "content">').append(() => {
              return $("<p>").text(msg)
            }).append(() => {
              return $("<input>").attr({
                id: "popup-input",
                type: "text"
              })
            })
          }).append(() => {
            return $('<div class="buttons">').append(() => {
              return $('<a class="button">').text("Cancel").on("click", () => {
                $("#popup-container").remove();;
                reject();
              });
            }).append(() => {
              return $('<a class="button">').text("Ok").on("click", () => {
                let val = $("#popup-input").val();

                $("#popup-container").remove();;
                resolve(val);
              })
            })
          })
        })
      $(".popup input[type=text]").focus();
    })
  })

};


const Alert = async (msg) => {
  return new Promise((resolve, reject) => {
    $("#popup-container").remove(); // just to be sure
    $("body").append(() => {
      return $("<div>").attr({
        id: "popup-container"

      }).append(() => {
        return $('<div class="popup">').append(() => {
          return $('<div class = "content">').text(msg)
        }).append(() => {
          return $('<div class="buttons">').append(() => {
            return $('<a class="button">').text("Ok").on("click", () => {
              $("#popup-container").remove();;
              resolve();
            });
          })
        })
      })
    })
  })
}

const Confirm = async (msg) => {
  return new Promise((resolve, reject) => {
    $("#popup-container").remove(); // just to be sure
    $("body").append(() => {
      return $("<div>").attr({
        id: "popup-container"

      }).append(() => {
        return $('<div class="popup">').append(() => {
          return $('<div class = "content">').text(msg)
        }).append(() => {
          return $('<div class="buttons">').append(() => {
            return $('<a class="button">').text("Yes").on("click", () => {
              $("#popup-container").remove();
              resolve();
            });
          }).append(() => {
            return $('<a class="button">').text("No").on("click", () => {
              $("#popup-container").remove();
              reject();
            })
          })
        })
      })
    })
  })
};
