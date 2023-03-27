var scores = document.querySelector(".scores")
var list = document.querySelector(".scoreList")
var data = JSON.parse(localStorage.getItem("scores"))

function displayScores() {
    for(let i = 0; i < data.length; i++) {
        var listItem = document.createElement("li")
        listItem.innerHTML = data[i].initials + " - " + data[i].score + "/4"
        list.append(listItem)
    }
}

displayScores()