fs = require('fs')

console.log(process.argv)

let toDoArr = JSON.parse(fs.readFileSync("./toDo.json", { encoding: "utf-8" }));
let id = toDoArr.length === 0 ? 0 : toDoArr[toDoArr.length - 1].id + 1;

let [, , command] = process.argv
let status = "to-do"


//node index.js add "Math"
let add = () => {
  let [, , , title] = process.argv
  toDoArr.push({ id, title, status });
  fs.writeFileSync("./toDo.json", JSON.stringify(toDoArr))
}

//node index.js list
//node index.js list -s "done"
let list = () => {
  let args = process.argv

  let statusIndex = args.indexOf("-s");
  if (statusIndex == -1) console.log(toDoArr)
  else {
    let statusValue = args[statusIndex + 1];
    let selectedToDos = toDoArr.filter((ele) => ele.status == statusValue)
    console.log(selectedToDos)
  }
}

//node index.js edit -s "done" -t "Study Algorithms" --id 0
//node index.js edit -t "Study Data Strucutre" --id 1
//node index.js edit -s "to-do" --id 1
let edit = () => {
  let args = process.argv
  let idIndex = args.indexOf("--id");
  let statusIndex = args.indexOf("-s");
  let titleIndex = args.indexOf("-t");


  let selectedID = parseInt(args[idIndex + 1]);
  let newTitle = args[titleIndex + 1];
  let newStatus = args[statusIndex + 1];


  let selectedToDo = toDoArr.find((ele) => ele.id == selectedID)
  if (!selectedToDo) {
    throw new Error("No element with this id")
  }
  if (titleIndex != -1) {
    selectedToDo.title = newTitle
  }
  if (statusIndex != -1) {
    selectedToDo.status = newStatus
  }

  fs.writeFileSync("./toDo.json", JSON.stringify(toDoArr))
}

//node index.js delete 1
let remove = () => {
  let [, , , selectedID] = process.argv
  let selectedToDoIndex = toDoArr.findIndex((ele) => ele.id == selectedID)
  if (selectedToDoIndex == -1) {
    throw new Error("No element with this id")
  }
  toDoArr.splice(selectedToDoIndex, 1)
  fs.writeFileSync("./toDo.json", JSON.stringify(toDoArr))

}

switch (command) {
  case "add":
    add();
    break;

  case "list":
    list();
    break;

  case "edit":
    edit();
    break;

  case "delete":
    remove();
    break;

  default:
    throw new Error("Enter a valid command")

}