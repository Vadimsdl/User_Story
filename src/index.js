let count = 0; //how many items are in the list already ??

/* function for adding an item to the list */
function clickAddElem(event) {
  const nameTask = event.target.previousElementSibling; //here I get my input for entering text, in order to further work with this variable
  /* creating all the buttons and list items we need */
  const li = document.createElement("li");
  const span = document.createElement("span");
  let btnDel = document.createElement("button");
  let btnAdd = document.createElement("button");
  let aUp = document.createElement("button");
  let aDown = document.createElement("button");

  if (nameTask.value !== "") {
    count += 1;

    li.className = "task";

    span.className = "text-li";
    span.innerText = nameTask.value;

    aUp.className = "up updown-btn";
    aUp.type = "button";
    aUp.innerText = "up";

    aDown.className = "down updown-btn";
    aDown.type = "button";
    aDown.innerText = "down";

    /* if this is the first element of the list, I hide its buttons, if not, then I show */
    if (count === 1) {
      aDown.style = aUp.style = "display: none";
    } else if (count === 2) {
      document.querySelectorAll(
        ".updown-btn"
      )[0].style = document.querySelectorAll(".updown-btn")[1].style =
        "display: inline-block";
    }

    btnDel.className = "remove-btn";
    btnDel.type = "button";
    btnDel.innerText = "Remove";

    btnAdd.className = "add-btn-sublist";
    btnAdd.type = "button";
    btnAdd.innerText = "Add Sublist";

    nameTask.value = "";
    nameTask.focus();

    /* I will insert all the created elements into the DOM */
    nameTask.parentElement.before(li);
    li.append(aUp);
    li.append(aDown);
    li.append(span);
    li.append(btnDel);
    li.append(btnAdd);

    /* each button receives its own event */
    btnDel.addEventListener("click", clickRemoveElem);
    btnAdd.addEventListener("click", clickAddSublist);
    aUp.addEventListener("click", clickUp);
    aDown.addEventListener("click", clickDown);
  }
}

/* deleting all nested and non-nested lists */
function clickRemoveElem(event) {
  /* deleting the list item LI */
  event.target.parentElement.remove();
  count = document.querySelector(".main-list").childNodes.length - 3;

  /* if this is the first element of the list, I hide its buttons */
  if (count === 1) {
    document.querySelectorAll(
      ".updown-btn"
    )[0].style = document.querySelectorAll(".updown-btn")[1].style =
      "display: none";
  }
}

/* creating the items in the nested list and creating UL */
function clickAddSublist(event) {
  let ul;

  /* if we do not have a UL then we create it, if there is just add a new LI */
  if (event.target.nextElementSibling === null) {
    ul = document.createElement("ul");
    ul.className = "listul";
  } else {
    ul = event.target.nextElementSibling;
  }

  const li = document.createElement("li");
  const text = document.createElement("input");
  let btnAdd = document.createElement("button");
  let btnRemoveSublist = document.createElement("button");

  text.type = "text";
  text.className = "task-name-write";

  btnAdd.className = "add-btn";
  btnAdd.type = "button";
  btnAdd.innerText = "add";

  btnRemoveSublist.className = "remove-sublist-btn";
  btnRemoveSublist.type = "button";
  btnRemoveSublist.innerText = "Remove Sublist";

  btnRemoveSublist.addEventListener("click", clickRemoveSublist);
  btnAdd.addEventListener("click", clickAddElem);

  event.target.parentElement.append(btnRemoveSublist);
  event.target.parentElement.append(ul);
  ul.append(li);
  li.append(text);
  li.append(btnAdd);

  /* remove button "ADD Sublist" */
  event.target.remove();
}

/* remove sublist in the list items */
function clickRemoveSublist(event) {
  event.target.nextElementSibling.remove();

  let btnAdd = document.createElement("button");

  btnAdd.className = "add-btn-sublist";
  btnAdd.type = "button";
  btnAdd.innerText = "Add Sublist";

  event.target.parentElement.append(btnAdd);

  btnAdd.addEventListener("click", clickAddSublist);

  event.target.remove();
}

function clickUp(event) {
  const wrapper = event.target.parentElement;

  if (wrapper.previousElementSibling)
    wrapper.parentNode.insertBefore(wrapper, wrapper.previousElementSibling);
}

function clickDown(event) {
  const wrapper = event.target.parentElement;

  if (wrapper.nextElementSibling)
    wrapper.parentNode.insertBefore(wrapper.nextElementSibling, wrapper);
}

const btnAdd = document.querySelector(".add-btn");
btnAdd.addEventListener("click", clickAddElem);
