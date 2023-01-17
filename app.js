const output = document.querySelector(".output");

console.log(output);
const url = "list.json";
let myList = [];
let localData = localStorage.get;

window.addEventListener("DOMContentLoaded", () => {
  output.textContent = "Loading...";

  if (localData) {
    myList = JSON.parse(localStorage.getItem("myList"));
    maker();
  } else {
    fetch(url)
      .then((rep) => rep.json())
      .then((data) => {
        myList = data;
        maker();
        saveToStorage();
      });
  }
});

function maker() {
  output.innerHTML = "";
  myList.forEach((el, index) => {
    makeList(el, index);
  });
}

function makeList(item, index) {
  const div = document.createElement("div");

  div.classList.add("box");

  div.innerHTML = `${item.fraction} leaded with "${item.leader}" has "${item.unit}" with ${item.hitpoints} hitpoints. His status is ${item.status} with ${item.hitpoints} hitpoints`;
  output.append(div);

  if (item.status) {
    div.classList.add("dead");
  } else {
    div.classList.add("alive");
  }

  div.addEventListener("click", (e) => {
    div.classList.toggle("alive");
    div.classList.toggle("dead");

    if (item.hitpoints - item.damage > 0) {
      saveToStorage();
    } else {
      myList[index].status = "DEAD";
    }
    console.log(myList);

    localStorage.setItem("myList", JSON.stringify(myList));

    div.innerHTML = `${item.fraction} leaded with "${
      item.leader
    }", TAKES DAMAGE equals ${item.damage} to their "${item.unit}" with ${
      item.hitpoints
    } hitpoints. His status is ${item.status} with ${
      item.hitpoints - item.damage
    } hitpoints`;

    const span = document.createElement("span");
    span.textContent = "DELETE";
    div.append(span);
    span.addEventListener("click", (e) => {
      console.log(index);
      e.stopPropagation();
      div.remove();
      myList.splice(index, 1);
      saveToStorage();
    });
  });
}

function saveToStorage() {
  console.log(myList);
  localStorage.setItem("myList", JSON.stringify(myList));
}
