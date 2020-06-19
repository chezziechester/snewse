document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', onclick, false)

  function onclick () {
    const limit = prompt("How many articles are you reading today?");
    if (limit < 10) {
      document.getElementById("max").innerHTML = "0" + limit;
    } else if (limit >= 10) {
        document.getElementById("max").innerHTML = limit;
    }

  }
}, false)
