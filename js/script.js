/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//select all students
const list = document.querySelectorAll(".student-item");
//students per page
const itemsPerPage = 10;

//display the students
function showPage(list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
  }
}

//create element helper function
const createElement = element => {
  const tag = document.createElement(element);
  return tag;
};

//return how many pagination links
const totalPages = list => {
  if (list.length % itemsPerPage > 0) {
    return list.length / itemsPerPage + 1;
  }
  return list.length / itemsPerPage;
};

//search for the letter in the students name
function searchList(searchInput, list) {
  let filter = searchInput.value.toLowerCase();
  let tempList = [];
  for (let i = 0; i < list.length; i++) {
    list[i].classList.remove("match");
    let h3 = list[i].getElementsByTagName("h3")[0];
    let name = h3.textContent;
    if (name.toLowerCase().indexOf(filter) > -1) {
      list[i].style.display = "block";
      tempList.push(list[i]);
    } else {
      list[i].style.display = "none";
    }
  }
  return tempList;
}

function appendPageLinks(list) {
  //create the search input and search button
  const searchInput = document.createElement("input");
  const searchButton = document.createElement("button");
  searchButton.type = "submit";
  searchButton.className = "student-search";
  searchButton.textContent = "Search";
  searchInput.className = "student-search";
  searchInput.type = "search";
  searchInput.name = "searchInput";
  document.querySelector(".page-header").appendChild(searchInput);
  document.querySelector(".page-header").appendChild(searchButton);

  //number of pages returned from totalPages()
  const numberOfPages = totalPages(list);
  //create a div element to contain the pagination links
  const div = createElement("div");
  //create a ul for the listed pagination links
  const ul = createElement("ul");
  //add a class name to the div
  div.className = "pagination";
  //append the div to the div with the class of page
  document.querySelector(".page").appendChild(div);
  //append the ul element to the div
  div.appendChild(ul);
  //take the number of pages and create the links
  function pageNumbers(page) {
    for (let i = 1; i <= page; i++) {
      const li = createElement("li");
      const a = createElement("a");
      a.href = "#";
      li.className = "links";
      ul.appendChild(li);
      a.textContent = i;
      li.appendChild(a);
    }
  }

  //show the default 1st page of students
  showPage(list, 1);
  //show the default number of page links
  pageNumbers(numberOfPages);

  //add event listener for the clisk of the pagination links
  ul.addEventListener("click", e => {
    e.preventDefault();
    const a = document.querySelectorAll("a");
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active");
      if (a[i].textContent === e.target.textContent) {
        e.target.className = "active";
        showPage(list, e.target.textContent);
      }
    }
  });

  //listen for the key release on the key board
  searchInput.addEventListener("keyup", () => {
    ul_section = document.querySelector(".student-list");
    if (searchInput.value.length <= 0) {
      //display the default list of student
      showPage(list, 1);
      //handle repeated numbers in the links
      li_dup = document.querySelectorAll(".links");
      for (let i = 0; i < li_dup.length; i++) {
        li_dup[i].remove();
      }

      //remove the h2 element if created on reset
      noMatch = document.querySelectorAll(".noMatch");
      for (let j = 0; j < noMatch.length; j++) {
        noMatch[j].remove();
        console.log("working");
      }
      //reset the pagination links
      pageNumbers(numberOfPages);
    } else {
      //get the students searched
      let info = searchList(searchInput, list);
      let number = totalPages(info);
      if (number === 0) {
        //display no matches
        const h2 = createElement("h2");
        h2.textContent = "No match Found";
        h2.className = "noMatch";
        ul_section.appendChild(h2);
      } else {
        //remove default links
        li = document.querySelectorAll(".links");
        for (let i = 0; i < li.length; i++) {
          li[i].remove();
        }
        //add new links, in result of the students displayed
        pageNumbers(number);
      }
    }
  });
}

appendPageLinks(list);