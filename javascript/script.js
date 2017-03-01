/**
 * Created by avishay on 27-Feb-17.
 */
// //function that creates a new panel.
// function addingAList() {
//
//   const divHolder = document.createElement('div');
//
//   document.getElementById("tid").appendChild(divHolder);
//
//   const newList =
//
//   `<div class="panel panel-default">
//
//     <div class="panel-heading panel-size">
//
//       <h3 class="panel-title">place holder</h3>
//
//     </div>
//
//     <div class="panel-body" id="cardList"> </div>
//
//     <div class="panel-footer panel-size">
//
//       <button onclick="createACard()" class="addACard">add a card...</button>
//
//     </div>
//
//   </div>`;
//
//   divHolder.innerHTML = newList;
// }
//
// function divClicked() {
//   const h3Holder = document.querySelector(".panel-title");
//   console.log(h3Holder);
//
//   h3Holder.addEventListener('click', function () {
//
//   const editableText = $("<textarea />");
//
//   editableText.valueOf(h3Holder);
//
//   $(this).replaceWith(editableText);
//
//   editableText.focus();
//
//   // setup the blur event for this new textarea
//   editableText.blur(editableTextBlurred);
//   });
// }
//
// function editableTextBlurred() {
//   const html = $(this).val();
//   const viewableText = $("<h3>");
//   viewableText.html(html);
//   $(this).replaceWith(viewableText);
//   // setup the click event for this new div
//   $(viewableText).click(divClicked);
// }

// ----------------------------------------------------


function addingAList() {

  const divHolder = document.createElement('div');

  document.getElementById("tid").appendChild(divHolder);

  const listTemplate =

//     `<header class="list-title">
//     <span>New List</span>
//     <input type="text" style="display: none">
//   </header>
//   <div class="cards"></div>
//   <button class="addAPanel" onclick="addingAList()"> add a panel</button>
// ;'

`     <div class="panel panel-default">
        <div class="panel-heading panel-size">
          <!--<h3 class="panel-title"> Todo </h3>-->
          <span>New List</span>
          <input type="text" style="display: none">
        </div>
        <div class="panel-body">
          <div class="card"></div>
        </div>
        <div class="panel-footer panel-size">
           <button onclick="createACard()" class="addACard">add a card...</button>
        </div>
      </div>`;

  divHolder.innerHTML = listTemplate;
}

//function that creates a card in in parent panel.
function createACard() {

  //target the corect list.
  const target = event.target;
  console.log(target);

  //target the parent of the lists.
  const currentPanel = target.parentNode.parentNode;
  console.log(currentPanel);

  //target right place to insert the new card.
  const currentCardListHolder = currentPanel.querySelector(".panel-body");
  console.log(currentCardListHolder);

  //creating element that holds div creation.
  const divHolder = document.createElement('div');
  console.log(divHolder);

  //giving divHolder style.
  divHolder.className = "card";

  //implementing divHolder into panel's body.
  currentCardListHolder.appendChild(divHolder);
}


function titleClickHandler(event) {
  const target = event.target;

  // Hide the clicked title
  target.style.display = 'none';
  // Show the input next to it
  const inputElm       = target.parentNode.querySelector('input');

  inputElm.value         = target.textContent;
  inputElm.style.display = 'inline-block';
  inputElm.focus();
}

function titleInputKeyHandler(event) {
  const target = event.target;

  // Catch Enter key only
  if (event.keyCode === 13) {
    // Take the value from the input
    const value    = target.value;
    // Update the title with that value
    const titleElm = target.parentNode.querySelector('span');
    console.info(titleElm);

    titleElm.innerHTML = value;

    // Hide the input; Show the title
    target.style.display   = 'none';
    titleElm.style.display = 'inline-block';
  }
}

function initListTitles(targetList) {
  const targetParent = targetList === undefined ? document : targetList;

  const titleElms = targetParent.querySelectorAll('.panel-heading .panel-size span');

  for (const title of titleElms) {
    title.addEventListener('click', titleClickHandler);
  }

  const titleInputElms = targetParent.querySelectorAll('.panel-heading .panel-size input');

  for (const titleInput of titleInputElms) {
    titleInput.addEventListener('keydown', titleInputKeyHandler);
  }
}

function addList(event) {
  const target = event.target;

  // Create a list element
  const list = document.createElement('div');

  list.className = 'list';
  list.innerHTML = listTemplate;

  // Insert it at the end of the lists
  const main = target.closest('main');

  main.insertBefore(list, target.parentNode);

  initListTitles(list);
}

const addListBtn = document.querySelector('.add-list');

addListBtn.addEventListener('click', addList);

initListTitles();




