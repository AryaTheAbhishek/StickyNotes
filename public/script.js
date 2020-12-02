if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.register("service-worker.js");
}
let count = Number(window.localStorage.getItem("count"));
if (!count) {
  window.localStorage.setItem("count", "0");
}
function createNote(noteTitle, noteBody) {
  document.getElementById("no-notes").classList.add("hidden");

  let li = document.createElement("li");
  let a = document.createElement("a");
  let h2 = document.createElement("h2");
  let xbutton = document.createElement("button");
  let p = document.createElement("p");

  xbutton.classList.add("delete");

  let xText = document.createTextNode("X");
  let nTitle = document.createTextNode(noteTitle);
  let nBody = document.createTextNode(noteBody);

  h2.appendChild(nTitle);
  p.appendChild(nBody);
  xbutton.appendChild(xText);

  a.appendChild(h2);
  a.appendChild(p);
  a.appendChild(xbutton);
  a.setAttribute("href", "#");

  li.appendChild(a);

  document.getElementById("notes").appendChild(li);
}

function createNoteFromInput(e) {
  e.preventDefault();
  let noteTitle = document.getElementById("newNoteTitle").value;
  let noteBody = document.getElementById("newNoteBody").value;

  document.getElementById("newNoteTitle").value = "";
  document.getElementById("newNoteBody").value = "";

  count += 1;
  window.localStorage.setItem("count", count);

  while (window.localStorage.getItem(noteTitle)) {
    noteTitle += " -1";
  }

  window.localStorage.setItem(noteTitle, noteBody);

  createNote(noteTitle, noteBody);
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure to delete.?")) {
      let li = e.target.parentElement.parentElement;
      let ul = document.getElementById("notes");
      ul.removeChild(li);
    }
  }
  count -= 1;

  window.localStorage.setItem("count", count);
  window.localStorage.removeItem(e.target.previousElementSibling.innerText);

  if (count < 1) {
    document.getElementById("no-notes").className = "";
  }
}

for (var i = 0; i < count + 1; i++) {
  let noteTitle = window.localStorage.key(i);
  let noteBody = window.localStorage.getItem(noteTitle);
  if (noteTitle !== "count" && noteTitle) {
    createNote(noteTitle, noteBody);
  }
}
document
  .getElementById("inputForm")
  .addEventListener("submit", createNoteFromInput, false);

document.getElementById("notes").addEventListener("click", removeItem);
