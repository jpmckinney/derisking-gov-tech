// Add your custom javascript here
console.log("Hi from Federalist");

var sidenav = document.querySelector('.usa-sidenav');
var collectLinks = false; //turn off link collection for now, do via front matter

window.addEventListener('scroll',setCurrentLink);

// console.log(sidenav);
if (sidenav && collectLinks) {
  var headings = document.querySelectorAll('h2');
  parentSection = null;
  headings.forEach(function(heading){
    if(heading.tagName === "H2"){
      addTocItem(heading, sidenav);
      parentSection = heading;
    }
    else if (heading.tagName === "H3" && !parentSection.innerText.includes("Appendix")) {
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


/**
 * Find the most recently passed heading and adds a usa-currentl
 * class to the correspoing link in the sidenav subnav
 */
function setCurrentLink(){
  if (sidenav) {
    let h3s = document.querySelectorAll('h3');
    let scrollPos = document.documentElement.scrollTop;
    let topHead = h3s[0];
    let i = 0;
    let found = false;
    while (!found && i < h3s.length) {
        if (scrollPos < h3s[i].offsetTop){
          found = true;
        }
        else {
          topHead = h3s[i];
        }
        i++;
    }
    let href = topHead.id;
    let oldLink = document.querySelector('.usa-sidenav__sublist .usa-current');
    if (oldLink) {
      oldLink.classList.remove('usa-current');
    }
    let currentLink = document.querySelector('.usa-sidenav__sublist [href="#'+href+'"]').parentElement;
    currentLink.classList.add('usa-current');

  }
}
