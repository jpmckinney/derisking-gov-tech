// Add your custom javascript here
console.log("Hi from Federalist");


var sidenav = document.querySelector('.usa-sidenav');
// var sidenav = false;
// console.log(sidenav);
if (sidenav) {
  var headings = document.querySelectorAll('h1, h2, h3, h4');

  headings.forEach(function(heading){
    currentLevel = null;

    if(heading.tagName === "H2"){
      addTocItem(heading, sidenav);
    }
    else if (heading.tagName === "H3") {
      var sublist = document.createElement("ul");
      sublist.classList.add("usa-sidenav__sublist");
      sidenav.appendChild(sublist);
      addTocItem(heading, sublist);
    }
  })
}

/**
 * Adds an item to the TOC sidebar submenu
 * @param {tag} el The heading to add to TOC
 * @param {tag} parent  The parent item to append this link to
 */
function addTocItem (el, parent) {
  var listItem = document.createElement("li")
  var listItemLink = document.createElement("a");
  var listItemLinkText = document.createTextNode(el.innerText);
  listItem.classList.add("usa-sidenav__item");
  parent.appendChild(listItem);
  listItem.appendChild(listItemLink);
  listItemLink.appendChild(listItemLinkText);
  listItemLink.href = "#" + el.id;
}
