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
    puttingEventListenersOnDeleteListBtn();
    initListTitles();
    addEventListenerEditClick();
    addEventListnerDeleteCard();
    addEventListnerSaveCard();
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
             <button type="button" class="btn btn-primary btn-group memberNewAreaBtn" >Add</button>
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

    //creating input next member name holder.
    const memberInput = createElement('input',['memberInput'],memberLi);

    //creating span where member name will be.
    const memberNameHolder = createElement('span',['memberNameHolder'],memberLi);

    //inserting name from appdata to everymemberLi.
    memberNameHolder.textContent = member.name;

    //inserting every new li after 'add member btn'.
    memberUl.insertBefore(memberLi , memberLastLi);


    //creating member edit button.
    const editBtn = createElement('button',['btn', 'btn-primary','btn-group' ,'editBtn','seen'],memberLi);

    //putting event listener on edit btn.
    editBtn.addEventListener('click', showBtns);

    editBtn.textContent = 'Edit';


    //creating member delete button.
    const deleteBtn = createElement('button',['btn','delete-card-style','deleteBtn','seen'],memberLi);

    //putting event listener on delete btn.
    deleteBtn.addEventListener('click', showBtns);

    //insert text to bottun.
    deleteBtn.textContent = 'Delete';


    //creating member delete button.
    const cancelBtn = createElement('button',['btn','delete-card-style','cancelBtn'],memberLi);

    //putting event listener on cancel btn.
    cancelBtn.addEventListener('click', showBtns);

    //insert text to bottun.
    cancelBtn.textContent = 'Cancel';


    //creating member delete button.
    const saveBtn = createElement('button',['btn','delete-card-style','saveBtn'],memberLi);

    //putting event listener on save btn.
    saveBtn.addEventListener('click', showBtns);

    //insert text to bottun.
    saveBtn.textContent = 'Save'
  });

  addEventLintenerNewMemberBtn();
}

function showBtns(event) {

  const target = event.target;
  console.info(target.textContent);

  const saveBtn = event.target.closest('li').querySelector('.saveBtn');

  const cancelBtn = event.target.closest('li').querySelector('.cancelBtn');

  const editBtn = event.target.closest('li').querySelector('.editBtn');

  const deleteBtn = event.target.closest('li').querySelector('.deleteBtn');

  if (target.textContent === 'Edit') {

    saveBtn.style.display = ('inline-block');

    cancelBtn.style.display = ('inline-block');

    editBtn.style.display = ('none');

    deleteBtn.style.display = ('none');

    editingMember(target);
  }

  if (target.textContent === 'Cancel') {

    saveBtn.style.display = ('none');

    cancelBtn.style.display = ('none');

    editBtn.style.display = ('inline-block');

    deleteBtn.style.display = ('inline-block');

    const memberLi = cancelBtn.closest('li');

    const memberInput = memberLi.querySelector('.memberLi > input');

    memberInput.style.display = 'none';

    const memberSpan = memberLi.querySelector('.memberLi > span');

    memberSpan.style.display = 'block';

  }

  if (target.textContent === 'Save') {

      saveMember(target);
    saveBtn.style.display = ('inline-block');

    cancelBtn.style.display = ('inline-block');

    editBtn.style.display = ('none');

    deleteBtn.style.display = ('none');

    }

  if (target.textContent === 'Delete'){

    deleteMember(target);

  }

}

function addEventLintenerNewMemberBtn() {
  //catching btn at add new member page.
  const newMemberAreaBtn = document.querySelector('.memberNewAreaBtn');

  //adding event listeners on the the task area.
  // addEventListeners(newMemberArea, ['click', 'keypress'], saveTextNewMember);

  newMemberAreaBtn.addEventListener('click', saveTextNewMember);

  const newMemberArea = document.querySelector('.addNewMemberArea');

  newMemberArea.addEventListener('keypress', saveTextNewMember);

}

function createMember() {

  // Take the value from the input
  const textArea = document.querySelector('.addNewMemberArea');

  //catching area text.
  const value = textArea.value;

  //creating new member object.
  const newMember = {
    id: uuid(),

    name: value
  };

  //pushing new member obj to member data.
  appData.members.push(newMember);

  //refreshing member page.
  membersPage();
}

function saveTextNewMember(event) {

  if (event.type === 'click'|| event.keyCode === 13){

    createMember()
  }
}

function editingMember(target) {

  const memberLi = target.closest('li');

  const memberSpan = memberLi.querySelector('.memberLi > span');

  memberSpan.style.display = 'none';

  spanValue = memberSpan.textContent;

  const memberInput = memberLi.querySelector('.memberLi > input');

  memberInput.style.display = 'block';

  memberInput.value = spanValue;
  memberInput.focus();

}

function saveMember(target){

  const memberLi = target.closest('li');

  const memberInput = memberLi.querySelector('.memberLi > input');

  memberInput.style.display = 'none';

  inputValue = memberInput.value;

  console.info(inputValue);

  const memberSpan = memberLi.querySelector('.memberLi > span');

  memberSpan.style.display = 'block';

  memberSpan.innerHTML = inputValue;

}

function deleteMember(target) {

  const memberLi = target.closest('li');

  memberLiId = memberLi.getAttribute('unique-id');

  for (let i = 0; i < appData.members.length; i++){

    if (memberLiId === appData.members[i].id){
      appData.members.splice(i, 1);
      membersPage();
    }
  }

}

// -------------------Board----------------------

  function addingAList(newList) {


    if (newList === undefined) {
      const lst = { id: 'New List', title: 'New List', tasks: [] };
      appData.lists.push(lst);
      initPageByHash();
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

          // allocate id if not exist
          if (task.id === undefined)
              task.id = uuid();

          //giving every card an id.
          divHolder.setAttribute('unique-id', task.id);

          //implementing divHolder into panel's body.
          currentCardListHolder.appendChild(divHolder);

          //creating button element with every card.
          const creatingButton = document.createElement('button');

          //giving every created button some style.
          creatingButton.className += "btn btn-default btn-group-xs btn-position-style edit-card-btn";

          //inserting task into a card.
          divHolder.innerHTML = task.text;

          //implementing a button in every card.
          divHolder.appendChild(creatingButton);

          //inserting text to the button.
          creatingButton.innerHTML = 'Edit card';



          //creating element that holds div.
          const membersHolder = document.createElement('div');

          //giving memberHolder style.
          membersHolder.className += "btn-group btn-group-xs divMember";

          function memberCreater() {

            for (let member of task.members) {

              // check if member exist in member list
              let found = false;
              for (let m of appData.members)
                if (m.name === member)
                    found = true;

              if (!found) break;

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


    //element that creates new div.
    const divHolder = document.createElement('div');
    divHolder.className = 'card-list';
    divHolder.setAttribute('list-id', newList.id);

    //implementing new div in main.
    document.querySelector('main').insertBefore(divHolder, document.querySelector('.btnAddAPanel'));

    const listTemplate = `
      <div class="panel panel-default temp">  
        <div class="panel-heading panel-size">
          <input type="text" style="display:none">
          <span class="newList">`+ newList.title +`</span>

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
          <button onclick="createACard('`+ newList.id + `')" class="addACard">add a card...</button>
        </div>
      </div>
`;

    const newDiv = document.createElement('div');

    divHolder.appendChild(newDiv);

    newDiv.innerHTML = listTemplate;

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

    hendelCardPlace(newList);
    initListTitles();
  }

  //a function that deletes a list.
  function removeList(event) {

  confirm("are you sure you want to delete ${``}?");

  console.info(event.target);
  //saves the event 'click'.
  const target = event.target;

  //catching closest father of 'deleter'.
  const listPanel = target.closest('.panel');

  //removing closest father of 'deleter'.
  listPanel.remove();

}

  //function that creates a card in parent panel.
  function createACard(listId) {
    console.log(event);
    const newCard = {
      id: uuid(),
      text: "new card",
      members: []
    };

    for(let list in appData.lists) {
      if (appData.lists[list].id === listId) {
        appData.lists[list].tasks.push(newCard);
        initPageByHash();
      }
    }


  }

  function openModal(event) {

    const cardId = event.target.closest('div').getAttribute('unique-id');

    let card;
    let listTitle;

    // find card
    for (const list of appData.lists)
        for (const task of list.tasks) {
          if (task.id == cardId)
          {
            card = task;
            listTitle = list.title;
          }

        }

    let editModal = document.querySelector('.edit-card-modal');
    editModal.setAttribute('card-id',cardId);
    let cardText = document.querySelector('.edit-modal-card-text');
    let cardMembers = document.querySelector('.edit-modal-members');
    let cardList = document.querySelector('.edit-modal-list');

    cardText.value = card.text;

    cardMembers.innerHTML = '';
    for (const member of appData.members) {
      let isMemberOnCard = '';
      for (const memberInCard of card.members) {
        if (memberInCard === member.name)
          isMemberOnCard = 'checked'
      }

      cardMembers.innerHTML += '<label><input type="checkbox" value="' + member.name + '" name="members"' + isMemberOnCard + '>' + member.name + '</label>';
    }
    cardList.innerHTML = '';
    for (const list of appData.lists) {
      cardList.innerHTML += '<option>'+ list.title + '</option>'
    }

    console.log(listTitle);
    cardList.value = listTitle;

    //turning modal style to block.
    editModal.style.display = 'block';

    //catching 'close' buttons.
    const closeButtons = document.querySelectorAll('.close-modal');

    //putting eventlisteners on "close" buttons.
    for (const closebutton of closeButtons) {
      closebutton.addEventListener('click', function () {
        editModal.style.display = 'none';
      });
    }
  }

  function deleteCard(event) {
    let editModal = document.querySelector('.edit-card-modal');
    const cardId = editModal.getAttribute('card-id');

    // find card
    for (const list of appData.lists)
      for (let task in list.tasks) {
        if (list.tasks[task].id === cardId){
          list.tasks.splice(task,1);
          console.log('found delete',cardId);
        }
      }

    editModal.style.display = 'none';
    initPageByHash('');
  }


function saveCard(event) {

  let editModal = document.querySelector('.edit-card-modal');
  const cardId = editModal.getAttribute('card-id');

  let cardText = document.querySelector('.edit-modal-card-text');
  let cardMembers = document.querySelector('.edit-modal-members');



  // find card
  for (const list of appData.lists)
    for (let task in list.tasks) {
      if (list.tasks[task].id === cardId){
        console.log(list.tasks[task].text,cardText.value );
        list.tasks[task].text = cardText.value ;

        let members = [];
        for (let i=0;i<document.getElementsByName('members').length;i++){
          if (document.getElementsByName('members')[i].checked)
            members.push(document.getElementsByName('members')[i].value);
        }
        list.tasks[task].members = members;

        const toList = document.getElementById("change-list").value;

        debugger;
        if (list.title != toList) {
          for (let listx of appData.lists) {
            if (listx.title === toList) {
              listx.tasks.push(list.tasks[task]);
            }
          }
          list.tasks.splice(task,1);
        }



      }
  }



  editModal.style.display = 'none';
  initPageByHash();
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

      // Update the title with that value.
      const titleElm = target.parentNode.querySelector('span');

      for (let list in appData.lists){
        if (appData.lists[list].title == titleElm.innerHTML)
          appData.lists[list].title = value;
      }

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

  function dropdownEventListener() {

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

  function puttingEventListenersOnDeleteListBtn() {

  //catching diffirent "Delete List" eachtime.
    const deleters = document.querySelectorAll('.deleter');

  //adding eventlisteners on every 'delete list'.
    for (let deleter of deleters) {
      deleter.addEventListener('click', removeList);
    }
  }

  function addEventListenerEditClick() {
    const editButtons = document.querySelectorAll('.edit-card-btn');
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', openModal, false);
    }
  }

  function addEventListnerDeleteCard() {
    const editButtons = document.querySelectorAll('.edit-modal-delete');
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', deleteCard, false);
    }
  }

  function addEventListnerSaveCard() {
    const saveButtons = document.querySelectorAll('.edit-modal-save');
    for (let i = 0; i < saveButtons.length; i++) {
      saveButtons[i].addEventListener('click', saveCard, false);
    }
  }


// ------------general functions-------

  function addEventListeners(elements, arrayOfEvents, eventListener) {
    for (const element of elements) {
      for (const event of arrayOfEvents) {
        element.addEventListener(event, eventListener);
      }
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
