const Wait = (msg) => {
  $("#popup-container").remove();
  $("body").append(() => {
    return $("<div>").attr({
      id: "popup-container"
    })
  }).append(() => {
    return $('<div class="popup">').append(() => {
      return $('<div class = "content">').text(msg)
    })
  })
};

const Prompt = (msg) => {
  return new Promise((resolve, reject) => {
    $("#popup-container").remove();
    $("body").append(() => {
      return $("<div>").attr({
        id: "popup-container"
      })
    }).append(() => {
      return $('<div class="popup">').append(() => {
        return $('<div class = "content">').append(() => {
          return $("<p>").text(msg)
        }).append(() => {
          return $("<input>").attr({
            type: "text"
          }).on("input", function() {
            //alert()
            var search = FUSE.search($(this).val())

            $("#promptOutput #0").data("id", search[0].item.id).text(search[0].item.Name)
            $("#promptOutput #1").data("id", search[1].item.id).text(search[1].item.Name)
            $("#promptOutput #2").data("id", search[2].item.id).text(search[2].item.Name)

          })
        }).append(() => {
          return $("<div>").attr({
            id: "promptOutput"
          }).append(() => {
            return $("<a>").attr({
              id: "0",
              href: "#"
            }).on("click", function() {
              let id = $(this).data("id");
              $(".popup").remove();
              resolve(id);
            })
          }).append(() => {
            return $("<a>").attr({
              id: "1",
              href: "#"
            }).on("click", function() {
              let id = $(this).data("id");
              $(".popup").remove();
              resolve(id);
            })
          }).append(() => {
            return $("<a>").attr({
              id: "2",
              href: "#"
            }).on("click", function() {
              let id = $(this).data("id");
              $(".popup").remove();
              resolve(id);
            })
          })
        })
      }).append(() => {
        return $('<div class="buttons">').append(() => {
          return $('<a class="button">').text("Abbrechen").on("click", () => {
            $(".popup").remove();
            reject();
          });
        }).append(() => {
          return $('<a class="button">').text("Ok").on("click", () => {
            let id = $("#promptOutput #0").data("id");

            $(".popup").remove();
            resolve(id);
          })
        })
      })
    })
    $(".popup input[type=text]").focus();
  })

};


const Alert = (msg) => {
  return new Promise((resolve, reject) => {
    $("#popup-container").remove();
    $("body").append(() => {
      return $("<div>").attr({
        id: "popup-container"
      })
    }).append(() => {
      return $('<div class="popup">').append(() => {
        return $('<div class = "content">').text(msg)
      }).append(() => {
        return $('<div class="buttons">').append(() => {
          return $('<a class="button">').text("Ok").on("click", () => {
            $(".popup").remove();
            resolve();
          });
        })
      })
    })
  })
}

const Confirm = (msg) => {
  return new Promise((resolve, reject) => {
    $("#popup-container").remove();
    $("body").append(() => {
      return $("<div>").attr({
        id: "popup-container"
      })
    }).append(() => {
      return $('<div class="popup">').append(() => {
        return $('<div class = "content">').text(msg)
      }).append(() => {
        return $('<div class="buttons">').append(() => {
          return $('<a class="button">').text("Ja").on("click", () => {
            $(".popup").remove();
            resolve();
          });
        }).append(() => {
          return $('<a class="button">').text("Nein").on("click", () => {
            $(".popup").remove();
            reject();
          })
        })
      })
    })
  })

};
