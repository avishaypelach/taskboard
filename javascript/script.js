/**
 * Created by avishay on 27-Feb-17.
 */


function addingAList(newList) {

  listTitle = newList || 'New List';

  function hendelListTitle(obj) {

    if (obj !== undefined) {
      return listTitle = obj.title;
    }
    else {
      return listTitle = 'New List';
    }
  }

  function hendelCardPlace(obj) {

    if (obj !== undefined){

      for (let task of obj.tasks){

        task = task.text;

        //catch the current panel.
        const currentPanel = newDiv.querySelector('.temp');

        //target right place to insert the new card.
        const currentCardListHolder = currentPanel.querySelector(".panel-body");

        //creating element that holds div creation.
        const divHolder = document.createElement('div');

        //giving divHolder style.
        divHolder.className = "card";

        //implementing divHolder into panel's body.
        currentCardListHolder.appendChild(divHolder);

        //creating button element with every card.
        const creatingButton = document.createElement('button');

        //giving every created button some style.
        creatingButton.className += "btn btn-default btn-group-xs btn-position-style";

        //inserting task into a card.
        divHolder.innerHTML = task;

        //implementing a button in every card.
        divHolder.appendChild(creatingButton);

        //inserting text to the button.
        creatingButton.innerHTML = 'Edit card';

        //putting eventlistener on 'edit card' button.
        creatingButton.addEventListener('click', openModal);
      }
    }
  }

  hendelListTitle(newList);
  //newlist->card

    //element that creates new div.
    const divHolder = document.createElement('div');

    document.getElementById("tid").appendChild(divHolder);


    const listTemplate = `
      <div class="panel panel-default temp">
      <!--<div class ="">-->
        <div class="panel-heading panel-size">
          <input type="text" style="display: none">
          <span class="newList">${listTitle}</span>

          <div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="caret"></span>
            </button>
          
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
              <li><a href="#" class="deleter">Delete List</a></li>
            </ul>
          </div>

        </div>
        <div class="panel-body">
          
        </div>

        <div class="panel-footer panel-size">
          <button onclick="createACard()" class="addACard">add a card...</button>
        </div>
      </div>`
      ;

  const newDiv = document.createElement('div');
  // newDiv.setAttribute("class","panel panel-default");
  divHolder.appendChild(newDiv);
  newDiv.innerHTML =listTemplate;

    // divHolder.innerHTML = listTemplate;
    //catching all header buttons
    const btns = document.querySelectorAll('.dropdown-toggle');

    //inserting eventlistener to every button.
    for (let btn of btns) {
      btn.addEventListener("click", panelActionHendler);
    }

    /* When the user clicks on the button,
     toggle between hiding and showing the dropdown content */
    function panelActionHendler() {
      const currentBtn = event.target;

      //catching every buttens div father
      const divParent = currentBtn.closest('.dropdown');

      const ulMenu = divParent.querySelector('.dropdown-menu');

      ulMenu.classList.toggle('show');
    }


//catching diffirent "Delete List" eachtime
    const deleters = document.querySelectorAll('.deleter');

//adding eventlisteners on every 'delete list'
    for (let deleter of deleters) {
      deleter.addEventListener('click', removeList);
    }

//a function that deletes a list.
    function removeList(event) {
      confirm("are you sure you want to delete?");

      //saves the event 'click'.
      const target = event.target;

      //catching closest father of 'deleter'.
      const listPanel = target.closest('.panel');

      //removing closest father of 'deleter'.
      listPanel.remove();
    }

    hendelCardPlace(newList);
    initListTitles();
  }


//function that creates a card in in parent panel.
  function createACard() {
  console.info('heloooo');
  //target the correct list.
  const target = event.target;

  //target the parent of the lists.
  const currentPanel = target.parentNode.parentNode;

  //target right place to insert the new card.
  const currentCardListHolder = currentPanel.querySelector(".panel-body");

  //creating element that holds div creation.
  const divHolder = document.createElement('div');

  //giving divHolder style.
  divHolder.className = "card";

  //implementing divHolder into panel's body.
  currentCardListHolder.appendChild(divHolder);

  //creating button element with every card.
  const creatingButton = document.createElement('button');
  console.info(creatingButton);

  //giving every created button some style.
  creatingButton.className += "btn btn-default btn-group-xs btn-position-style";

  //implementing a button in every card.
  divHolder.appendChild(creatingButton);

  //inserting text to the button.
  creatingButton.innerHTML = 'Edit card';

  //putting eventlistener on 'edit card' button.
  creatingButton.addEventListener('click', openModal);


}

  function openModal() {

    //catching the class of modal.
    const modalClass = document.querySelector('.modal-shown');

    //turning modal style to block.
    modalClass.style.display = 'block';

    //catching 'close' buttons.
    const closeButtons = document.querySelectorAll('.close-modal');

    //putting eventlisteners on "close" buttons.
    for (const closebutton of closeButtons) {
      closebutton.addEventListener('click', function () {
        modalClass.style.display = 'none';
      });
    }
  }

  function titleClickHandler(event) {
    const target = event.target;

    // Hide the clicked title
    target.style.display = 'none';

    // Show the input next to it
    const inputElm = target.parentNode.querySelector('input');

    inputElm.value = target.textContent;
    inputElm.style.display = 'inline-block';
    inputElm.focus();
  }

  function titleInputKeyHandler(event) {
    const target = event.target;

    // Catch Enter key only
    if (event.keyCode === 13) {
      // Take the value from the input
      const value = target.value;

      // Update the title with that value
      const titleElm = target.parentNode.querySelector('span');

      titleElm.innerHTML = value;

      // Hide the input; Show the title
      target.style.display = 'none';
      titleElm.style.display = 'inline-block';
    }
  }

  function initListTitles(targetList) {
    const targetParent = targetList === undefined ? document : targetList;

    const titleElms = targetParent.querySelectorAll('.panel-heading > span');

    for (const title of titleElms) {
      title.addEventListener('click', titleClickHandler);
    }

    const titleInputElms = targetParent.querySelectorAll('.panel-heading > input');

    for (const titleInput of titleInputElms) {
      titleInput.addEventListener('keydown', titleInputKeyHandler);
    }
  }

// function addList(event) {
//   const target = event.target;
//
//   // Create a list element
//   const list = document.createElement('div');
//
//   list.className = 'list';
//   list.innerHTML = listTemplate;
//
//   // Insert it at the end of the lists
//   const main = target.closest('main');
//
//   main.insertBefore(list, target.parentNode);
//
//   initListTitles(list);
// }


// -------------------------------------------------------------

//catching all header buttons
  const btns = document.querySelectorAll('.dropdown-toggle');


  for (let btn of btns) {
    btn.addEventListener("click", panelActionHendler);
  }

  /* When the user clicks on the button,
   toggle between hiding and showing the dropdown content */
  function panelActionHendler() {
    const currentBtn = event.target;

    //catching every buttens div father
    const divParent = currentBtn.closest('.dropdown');

    const ulMenu = divParent.querySelector('.dropdown-menu');


    ulMenu.classList.toggle('show');
  }


//catching diffirent "Delete List" eachtime
  const deleters = document.querySelectorAll('.deleter');

//adding eventlisteners on every 'delete list'
  for (let deleter of deleters) {
    deleter.addEventListener('click', removeList);
  }

//a function that deletes a list.
  function removeList(event) {
    confirm("are you sure you want to delete?");

    //saves the event 'click'.
    const target = event.target;

    //catching closest father of 'deleter'.
    const listPanel = target.closest('.panel');

    //removing closest father of 'deleter'.
    listPanel.remove();
  }

// -------------------JSON--------

  function reqListener() {
    const target = event.target;
    JSON.parse(target.responseText);

    let data = JSON.parse(target.response);

    for (let list of data.board) {

      addingAList(list);

    }
  }

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "assets/board.json");
  oReq.send();

// ----------------------------------


