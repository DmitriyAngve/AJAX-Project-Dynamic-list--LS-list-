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
        localStorage.setItem("myList", JSON.stringify(myList));
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
  div.innerHTML = `${item.fraction} leaded with "${item.leader}" has "${item.unit}" with ${item.hitpoints} hitpoints. His status is ${item.status} with ${item.hitpoints} hitpoints`;
  output.append(div);

  if (item.status && item.hitpoints > 0) {
    div.classList.add("statusOk");
    div.classList.add("alive");
  } else {
    div.classList.add("statusNotOk");
    div.classList.add("dead");
  }

  div.addEventListener("click", (e) => {
    div.classList.toggle("statusOk");
    div.classList.toggle("statusNotOk");
    console.log(div.classList.contains("statusOk"));

    div.classList.toggle("alive");
    div.classList.toggle("dead");
    console.log(div.classList.contains("alive"));

    if (item.hitpoints > 0) {
      myList[index].status = "ALIVE";
      // myList[index].hitpoints =
    } else if (item.hitpoints < 0) {
      myList[index].status = "DEAD";
    }
    console.log(myList);
    localStorage.setItem("myList", JSON.stringify(myList));

    // if (item.hitpoints > 0) {
    //   myList[index].status = "ALIVE";
    // } else {
    //   myList[index].status = "DEAD";
    // }

    console.log(myList);
    localStorage.setItem("myList", JSON.stringify(myList));

    div.innerHTML = `${item.fraction} leaded with "${
      item.leader
    }", TAKES DAMAGE equals ${item.damage} to their "${item.unit}" with ${
      item.hitpoints
    } hitpoints. His status is ${item.status} with ${
      item.hitpoints - item.damage
    } hitpoints`;
  });
}
