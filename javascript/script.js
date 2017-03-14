/**
 * Created by avishay on 27-Feb-17.
 */

const appData = {
  lists: [],
  members: []
};

function findListByTitle(title) {
  return appData.lists.find((list)=> list.title === title);
}

function findListById(id) {
  return appData.lists.find((list)=> list.id === id);
}


window.addEventListener('hashchange', () => {
  initPageByHash();
});

function initPageByHash() {

  const hash = window.location.hash;
  if (!hash) {
    window.location.hash = '#board';
    return;
  }

  if (hash === '#board') {

    document.querySelector('main').innerHTML = '';

    for(let list of appData.lists)

      addingAList(list);



    const addListBtn = `
      <button class="btnAddAPanel" onclick="addingAList()">
        <span class="btnShaping"> add a panel </span>
      </button>
    `;
    const main = document.querySelector('main');

    //inserting panel btn to main.
    main.innerHTML += addListBtn;
    dropdownEventListener();
    catchingDeleterBtn();
    deleteListEvent();
  }

  if (hash === '#members') {

    membersPage()

  }
}

function isLoadingDone() {

  if(appData.lists.length && appData.members.length){

    return true;
  }

  else {
    return false;
  }
}

//-----------------members-------------

function membersPage() {

  const html = `
    <div class="membersMainDiv">
      <h2 class="membersH2">Members TasksBoard</h2>
      <ul class="list-group membersUl">
      
        <li class="list-group-item memberLastLi"> 
            <label for="message-text" class="control-label label-style"></label>
            <textarea class="form-control shortBoxes addNewMemberArea" placeholder="Add new member"></textarea>
             <button type="button" class="btn btn-primary btn-group">Add</button>
        </li>
      </ul>
    </div>
  `;


  //catching place that gets  div members.
  const mainDiv = document.querySelector('main');

  //inserting member div to main.
  mainDiv.innerHTML = html;

  //catching membersul.
  const memberUl = document.querySelector('.membersUl');

  //catching li.
  const memberLastLi = document.querySelector('.memberLastLi');

  appData.members.forEach((member) =>{

    //catching all members li.
    const memberLi = createElement('li', ['list-group-item','memberLi'], memberUl);

    //catching id from appdata.
    memberLi.setAttribute('unique-id', member.id);

    //inserting name from appdata to everymemberLi.
    memberLi.textContent = member.name;

    //inserting every new li after 'add member btn'.
    memberUl.insertBefore(memberLi , memberLastLi);

    //creating member edit button.
    const editBtn = createElement('button',['btn', 'btn-primary','btn-group' ,'editBtn'],memberLi);

    editBtn.textContent = 'Edit';

    //creating member delete button.
    const deleteBtn = createElement('button',['btn','delete-card-style','deleteBtn'],memberLi);

    deleteBtn.textContent = 'Delete';
  });

}

function hendelMemberId() {

}

function createMember() {

}

// -------------------Board----------------------

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

    if (obj !== undefined) {

      for (let task of obj.tasks) {


        //catch the current panel.
        const currentPanel = newDiv.querySelector('.temp');

        //target right place to insert the new card.
        const currentCardListHolder = currentPanel.querySelector(".panel-body");

        //creating element that holds div creation.
        const divHolder = document.createElement('div');

        //giving divHolder style.
        divHolder.className = "card";

        //giving every card an id.
        divHolder.setAttribute('unique-id', uuid());

        //implementing divHolder into panel's body.
        currentCardListHolder.appendChild(divHolder);

        //creating button element with every card.
        const creatingButton = document.createElement('button');

        //giving every created button some style.
        creatingButton.className += "btn btn-default btn-group-xs btn-position-style";

        //inserting task into a card.
        divHolder.innerHTML = task.text;

        //implementing a button in every card.
        divHolder.appendChild(creatingButton);

        //inserting text to the button.
        creatingButton.innerHTML = 'Edit card';

        //putting eventlistener on 'edit card' button.
        creatingButton.addEventListener('click', openModal);

        //creating element that holds div.
        const membersHolder = document.createElement('div');

        //giving memberHolder style.
        membersHolder.className += "btn-group btn-group-xs divMember";

        function memberCreater() {

          for (let member of task.members){

              //creating button element with every card.
              const MemberInitBtn = document.createElement('span');

              //giving button members style.
              MemberInitBtn.className += "memberSpan";

              //implementing button in every div member.
              membersHolder.appendChild(MemberInitBtn);

              //inserting member initial into button.
              MemberInitBtn.innerHTML += getInitials(member);

              // implementing div member into card.
              divHolder.appendChild(membersHolder);

            }
          }
        memberCreater(obj);
      }
    }

    //function that get initials.
    function getInitials(str) {

      const strArr = str.split(' ');
      const twoWordArr = [];
      for (const smallStr of strArr) {
        const letter = smallStr[0].toUpperCase();

        twoWordArr.push(letter);
      }
      return twoWordArr.join('');
    }

  }

  hendelListTitle(newList);

  //element that creates new div.
  const divHolder = document.createElement('div');

  //implementing new div in main.
  document.querySelector('main').insertBefore(divHolder,document.querySelector('.btnAddAPanel'));

  const listTemplate = `
      <div class="panel panel-default temp">  
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
      </div>
`;

  const newDiv = document.createElement('div');

  // newDiv.setAttribute("class","panel panel-default");

  divHolder.appendChild(newDiv);

  newDiv.innerHTML = listTemplate;

  // divHolder.innerHTML = listTemplate;

  //catching all header buttons
  const btns = document.querySelectorAll('.dropdown-toggle');

  //inserting eventlistener to every button.
  for (let btn of btns) {
    btn.addEventListener("click", panelActionHendler);
  }

  // When the user clicks on the button, toggle between hiding and showing the dropdown content.
  function panelActionHendler() {
    const currentBtn = event.target;

    //catching every buttens div father
    const divParent = currentBtn.closest('.dropdown');

    const ulMenu = divParent.querySelector('.dropdown-menu');

    ulMenu.classList.toggle('show');
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

function  deleteListEvent() {
  //catching diffirent "Delete List" eachtime
  const deleters = document.querySelectorAll('.deleter');

//adding eventlisteners on every 'delete list'
  for (let deleter of deleters) {
    deleter.addEventListener('click', removeList);
  }
}

//function that creates a card in parent panel.
function createACard() {

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

  //giving button some style.
  creatingButton.className += "btn btn-default btn-group-xs btn-position-style";

  //implementing a button in every card.
  divHolder.appendChild(creatingButton);

  //inserting text to the button.
  creatingButton.innerHTML = 'Edit card';

  //putting eventlistener on 'edit card' button.
  creatingButton.addEventListener('click', openModal);

}

//function that open or closes the modal.
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

//that function creates elemnt by tagname className and parent.
function createElement(tagName, className, parent) {

  const element = document.createElement(tagName);

  if (className !== undefined) {
    let classesStr = '';
    className.forEach((e) => {
      classesStr += ' ' + e;
    });
    element.className = classesStr;

  }

  if (parent !== undefined) {
    parent.appendChild(element);

  }

  return element;
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

function dropdownEventListener () {

  //catching all header buttons
  const btns = document.querySelectorAll('.dropdown-toggle');

  for (let btn of btns) {
    btn.addEventListener("click", panelActionHendler);
  }
}

// When the user clicks on the button, toggle between hiding and showing the dropdown content
function panelActionHendler() {
  const currentBtn = event.target;

  //catching every buttens div father
  const divParent = currentBtn.closest('.dropdown');

  const ulMenu = divParent.querySelector('.dropdown-menu');


  ulMenu.classList.toggle('show');
}

function  catchingDeleterBtn() {

//catching diffirent "Delete List" eachtime.
  const deleters = document.querySelectorAll('.deleter');

//adding eventlisteners on every 'delete list'.
  for (let deleter of deleters) {
    deleter.addEventListener('click', removeList);
  }
}

//function that deletes a list.
function removeList(event) {
  confirm("are you sure you want to delete?");

  //saves the event 'click'.
  const target = event.target;

  //catching closest father of 'deleter'.
  const listPanel = target.closest('.panel');

  //removing closest father of 'deleter'.
  listPanel.remove();
}

// ------------general functions-------

function addEventListeners(elements, arrayOfEvents, eventListener) {
  for (const element of elements) {
    for (const event of arrayOfEvents) {
      element.addEventListener(event, eventListener);
    }
  }
}

// -----ajax----------JSON--------

function boardDataHendler(event) {
  const target = event.target;
  JSON.parse(target.responseText);

  let data = JSON.parse(target.response);

  appData.lists = data.board;

  if (isLoadingDone()) {

    initPageByHash()

  }
}

function getBoardData() {

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", boardDataHendler);
  oReq.open("GET", "assets/board.json");
  oReq.send();
}

function membersDataHendler(event) {
  const target = event.target;
  let data = JSON.parse(target.responseText);

  appData.members = data.members;

  if (isLoadingDone()) {

    initPageByHash()

  }
}

function getMembersData() {

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", membersDataHendler);
  oReq.open("GET", "assets/members.json");
  oReq.send();

}

function getAppData() {
  getBoardData();
  getMembersData();
}

getAppData();


uuid.v1(); // -> v1 UUID
uuid.v4(); // -> v4 UUID
