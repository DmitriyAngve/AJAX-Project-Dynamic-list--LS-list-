const output = document.querySelector(".output");
console.log(output);
output.textContent = "New content";
const url = "list.json";

window.addEventListener("DOMContentLoaded", () => {
  output.textContent = "Loading...";
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      console.log(data);
      output.innerHTML = "";
      data.forEach((el) => {
        makeList(el);
      });
    });
});

function makeList(item) {
  const div = document.createElement("div");
  div.innerHTML = `${item.fraction} leaded with "${item.leader}", move their "${item.unit}" on ${item.moveToReach} squares. His status is ${item.status}`;

  output.append(div);

  if (item.status) {
    div.classList.add("statusOk");
  } else {
    div.classList.add("statusNotOk");
  }

  if (item.moveToReach >= 5) {
    div.classList.add("reached");
  } else {
    div.classList.add("notReached");
  }
}
