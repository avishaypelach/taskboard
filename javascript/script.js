(function () {

  function onArrival() {


    window.addEventListener('hashchange', () => {
      initPageByHash();
    });

    let localAppData = JSON.parse(localStorage.getItem('appData'));

    if (localAppData) {
      MODEL.appDataIsLocalAppData(localAppData);
      initPageByHash();
    }

    else {
      getAppData();
    }
  }

  onArrival();

  function initPageByHash() {

    const hash = window.location.hash;
    if (!hash) {
      window.location.hash = '#board';
      return;
    }

    if (hash === '#board') {

      document.querySelector('#board-link').className = 'active';
      document.querySelector('#member-link').className = '';

      document.querySelector('main').innerHTML = '';

      for (let list of MODEL.returnListsAppData()) {
        addingAList(list);
      }

      const addListBtn = `
      <button class="btnAddAPanel">
        <span class="btnShaping"> add a panel </span>
      </button>
    `;
      const main = document.querySelector('main');

      //inserting panel btn to main.
      main.innerHTML += addListBtn;

      const addList = document.querySelector('.btnAddAPanel');

      addList.addEventListener('click', addingAList);

      dropdownEventListener();
      puttingEventListenersOnDeleteListBtn();
      initListTitles();
      addEventListenerEditClick();
      addEventListnerDeleteCard();
      addEventListnerSaveCard();
      newCardEventListener();
    }

    if (hash === '#members') {
      document.querySelector('#board-link').className = '';
      document.querySelector('#member-link').className = 'active';
      membersPage()

    }
  }

  function isLoadingDone() {

    if (MODEL.returnListsAppData().length && MODEL.returnMembersAppData().length) {
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

    MODEL.returnMembersAppData().forEach((member) => {

      //catching all members li.
      const memberLi = createElement('li', ['list-group-item', 'memberLi'], memberUl);

      //catching id from appdata.
      memberLi.setAttribute('unique-id', member.id);

      //creating input next member name holder.
      const memberInput = createElement('input', ['memberInput'], memberLi);

      //creating span where member name will be.
      const memberNameHolder = createElement('span', ['memberNameHolder'], memberLi);

      //inserting name from appdata to everymemberLi.
      memberNameHolder.textContent = member.name;

      //inserting every new li after 'add member btn'.
      memberUl.insertBefore(memberLi, memberLastLi);

      //creating member edit button.
      const editBtn = createElement('button', ['btn', 'btn-primary', 'btn-group', 'editBtn', 'seen'], memberLi);

      //putting event listener on edit btn.
      editBtn.addEventListener('click', showBtns);

      editBtn.textContent = 'Edit';

      //creating member delete button.
      const deleteBtn = createElement('button', ['btn', 'delete-card-style', 'deleteBtn', 'seen'], memberLi);

      //putting event listener on delete btn.
      deleteBtn.addEventListener('click', showBtns);

      //insert text to bottun.
      deleteBtn.textContent = 'Delete';

      //creating member delete button.
      const cancelBtn = createElement('button', ['btn', 'delete-card-style', 'cancelBtn'], memberLi);

      //putting event listener on cancel btn.
      cancelBtn.addEventListener('click', showBtns);

      //insert text to bottun.
      cancelBtn.textContent = 'Cancel';

      //creating member delete button.
      const saveBtn = createElement('button', ['btn', 'delete-card-style', 'saveBtn'], memberLi);

      //putting event listener on save btn.
      saveBtn.addEventListener('click', showBtns);

      //insert text to bottun.
      saveBtn.textContent = 'Save'
    });

    addEventLintenerNewMemberBtn();
  }

  function showBtns(event) {

    const target = event.target;

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

      editBtn.style.display = ('');

      deleteBtn.style.display = ('');

      const memberLi = cancelBtn.closest('li');

      const memberInput = memberLi.querySelector('.memberLi > input');

      memberInput.style.display = 'none';

      const memberSpan = memberLi.querySelector('.memberLi > span');

      memberSpan.style.display = 'block';

    }

    if (target.textContent === 'Save') {

      saveMember(target);

      saveBtn.style.display = ('none');

      cancelBtn.style.display = ('none');

      editBtn.style.display = ('');

      deleteBtn.style.display = ('');

    }

    if (target.textContent === 'Delete') {

      deleteMember(target);
      membersPage();
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
    MODEL.addingNewMember(newMember);

    //refreshing member page.
    membersPage();
  }

  function saveTextNewMember(event) {

    if (event.type === 'click' || event.keyCode === 13) {

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

  function saveMember(target) {

    const memberLi = target.closest('li');

    const memberInput = memberLi.querySelector('.memberLi > input');

    inputValue = memberInput.value;

    if (inputValue.length !== 0) {
      const memberSpan = memberLi.querySelector('.memberLi > span');

      memberInput.style.display = 'none';

      memberSpan.style.display = 'block';

      memberSpan.innerHTML = inputValue;
    }
    else if (inputValue.length === 0) {
      alert('please enter member name');
      memberInput.style.display = 'block';
      memberInput.focus();

      const saveBtn = event.target.closest('li').querySelector('.saveBtn');
      const cancelBtn = event.target.closest('li').querySelector('.cancelBtn');
      const editBtn = event.target.closest('li').querySelector('.editBtn');
      const deleteBtn = event.target.closest('li').querySelector('.deleteBtn');

      saveBtn.style.display = 'block';

      cancelBtn.style.display = 'block';

      editBtn.style.display = 'none';

      deleteBtn.style.display = 'none';
    }
  }

  function deleteMember(target) {

    const memberLi = target.closest('li');

    memberLiId = memberLi.getAttribute('unique-id');

    //delete member in appData.
    MODEL.deleteMember(memberLiId);
  }

// -------------------Board----------------------
  function getInitials(str) {

    const strArr = str.split(' ');
    const twoWordArr = [];
    for (const smallStr of strArr) {
      const letter = smallStr[0].toUpperCase();

      twoWordArr.push(letter);
    }
    return twoWordArr.join('');
  }

  function addingAList(newList) {

    function hendelCardPlace(list) {
      //element that creates new div.
      const divHolder = document.createElement('div');

      divHolder.className = 'card-list';

      //implementing new div in main.
      document.querySelector('main').insertBefore(divHolder, document.querySelector('.btnAddAPanel'));

      const listTitle = newList.title ? newList.title : 'New List';

      const listTemplate = `
      <div class="panel panel-default temp">  
        <div class="panel-heading panel-size">
          <input type="text" style="display:none">
          <span class="newList">` + listTitle + `</span> 

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
        <button class="addACard"> add a card... </button>
        </div>
      </div>
`;

      const newDiv = document.createElement('div');

      newDiv.className = 'list-container';

      divHolder.appendChild(newDiv);

      newDiv.innerHTML = listTemplate;

      if (newList.title === undefined) {
        const newCardBtn = newDiv.querySelector('.addACard');
        const dropDownBtn = newDiv.querySelector('.dropdown-toggle');
        const deleteListBtn = newDiv.querySelector('.deleter');
        const newListId = uuid();
        const lst = {
          title: 'New List',
          tasks: [],
          id: newListId
        };

        newCardBtn.addEventListener('click', createACard);
        dropDownBtn.addEventListener('click', panelActionHendler);
        deleteListBtn.addEventListener('click', removeList);
        divHolder.setAttribute('list-id', newListId);

        MODEL.addingNewList(lst)
      }

      if (newList.id === undefined) {
      }

      if (newList.id !== undefined) {
        divHolder.setAttribute('list-id', newList.id);
      }

      if (newList !== undefined && newList.tasks !== undefined) {
        for (let task of newList.tasks) {
          cardMaker(task, newDiv, newList);
        }
      }
    }

    const btns = document.querySelectorAll('.dropdown-toggle');

    //inserting eventlistener to every button.
    for (let btn of btns) {
      btn.addEventListener("click", panelActionHendler);
    }

    // When the user clicks on the button, toggle between hiding and showing the dropdown content.
    hendelCardPlace(newList);
    initListTitles();
  }

  //a function that deletes a list.
  function removeList(event) {

    //saves the event 'click'.
    const target = event.target;

    //catching closest father of 'deleter'.
    const listPanel = target.closest('.card-list');

    //removing closest father of 'deleter'.
    const listId = listPanel.getAttribute('list-id');

    const lists = MODEL.returnListsAppData();

    for (let list of lists) {
      if (list.id === listId) {
        confirm("are you sure you want to delete [" + list.title + "]?");

        MODEL.removeList(list);

      }
    }
  }

  function openModal(event) {

    const cardId = event.target.closest('div').getAttribute('unique-id');

    let card;
    let listTitle;

    // find card
    for (const list of MODEL.returnListsAppData())
      for (const task of list.tasks) {
        if (task.id === cardId) {
          card = task;
          listTitle = list.title;
        }

      }

    let editModal = document.querySelector('.edit-card-modal');
    editModal.setAttribute('card-id', cardId);
    let cardText = document.querySelector('.edit-modal-card-text');
    let cardMembers = document.querySelector('.edit-modal-members');
    let cardList = document.querySelector('.edit-modal-list');

    cardText.value = card.text;

    cardMembers.innerHTML = '';
    for (const member of MODEL.returnMembersAppData()) {
      let isMemberOnCard = '';
      for (const memberInCard of card.members) {
        if (memberInCard === member.name) {
          isMemberOnCard = 'checked'
        }
      }

      cardMembers.innerHTML += '<label><input type="checkbox" value="' + member.name + '" name="members"' + isMemberOnCard + '>' + member.name + '</label>';
    }
    cardList.innerHTML = '';
    for (const list of MODEL.returnListsAppData()) {
      cardList.innerHTML += '<option>' + list.title + '</option>'
    }

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
    const currentCard = document.querySelector(`[unique-id = '${cardId}']`);
    const currentList = currentCard.closest('.panel-body');

    currentList.removeChild(currentCard);
    MODEL.deleteCard(cardId);

    editModal.style.display = 'none';
  }

  function saveCard(event) {
    const editModal = document.querySelector('.edit-card-modal');
    const cardId = editModal.getAttribute('card-id');
    const currentCard = document.querySelector(`[unique-id = '${cardId}']`);
    const modalTextArea = document.querySelector('.edit-modal-card-text');
    const cardTitle = currentCard.querySelector('.card-title');
    cardTitle.innerHTML = modalTextArea.value;
    const cardMembers = currentCard.querySelector('.divMember');

    let members = [];
    for (let i = 0; i < document.getElementsByName('members').length; i++) {
      if (document.getElementsByName('members')[i].checked) {
        members.push(document.getElementsByName('members')[i].value);
      }
    }

    function memberCreator() {

      cardMembers.innerHTML = '';

      for (let member of members) {

        // check if member exist in member list
        let found = false;
        for (let m of MODEL.returnMembersAppData())
          if (m.name === member) {
            found = true;
          }

        if (!found) {
          console.info('lol');
          break;
        }

        //creating button element with every card.
        const MemberInitBtn = document.createElement('span');

        //giving button members style.
        MemberInitBtn.className += "memberSpan";

        //implementing button in every div member.
        cardMembers.appendChild(MemberInitBtn);

        //inserting member initial into button.
        MemberInitBtn.innerHTML += getInitials(member);

      }
    }

    memberCreator();

    MODEL.saveChangesOnCard(cardId, modalTextArea.value,members);
    editModal.style.display = 'none';
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

      for (let list of MODEL.returnListsAppData()) {
        if (list.title === titleElm.innerHTML) {
          list.title = value;
        }
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

  function cardMaker(task, div, list) {

    const main = document.querySelector('main');

    //catch the current panel.
    const currentPanel = div.querySelector('.temp');

    //target right place to insert the new card.
    const currentCardListHolder = currentPanel.querySelector(".panel-body");

    //creating element that holds div creation.
    const divHolder = document.createElement('div');

    //giving divHolder style.
    divHolder.className = "card";

    // allocate id if not exist
    if (task.id === undefined) {
      task.id = uuid();
    }

    //giving every card an id.
    divHolder.setAttribute('unique-id', task.id);

    //implementing divHolder into panel's body.
    currentCardListHolder.appendChild(divHolder);

    //creating button element with every card.
    const creatingButton = document.createElement('button');

    //giving every created button some style.
    creatingButton.className += "btn btn-default btn-group-xs btn-position-style edit-card-btn";

    const cardTitle = document.createElement('div');
    cardTitle.className += 'card-title';
    cardTitle.innerHTML = task.text;

    divHolder.appendChild(cardTitle);
    //inserting task into a card.
    //divHolder.innerHTML = task.text;

    //implementing a button in every card.
    divHolder.appendChild(creatingButton);

    //inserting text to the button.
    creatingButton.innerHTML = 'Edit card';

    //eventListener on 'creating card'
    creatingButton.addEventListener('click', openModal);

    //creating element that holds div.
    const membersHolder = document.createElement('div');

    //giving memberHolder style.
    membersHolder.className += "btn-group btn-group-xs divMember";

    function memberCreator() {

      for (let member of task.members) {

        // check if member exist in member list
        let found = false;
        for (let m of MODEL.returnMembersAppData())
          if (m.name === member) {
            found = true;
          }

        if (!found) {
          break;
        }

        //creating button element with every card.
        const MemberInitBtn = document.createElement('span');

        //giving button members style.
        MemberInitBtn.className += "memberSpan";

        //implementing button in every div member.
        membersHolder.appendChild(MemberInitBtn);

        //inserting member initial into button.
        MemberInitBtn.innerHTML += getInitials(member);

      }
      // implementing div member into card.
      divHolder.appendChild(membersHolder);
    }

    memberCreator();
  }

  function newCardEventListener() {

    //catching all add a card buttons
    const btns = document.querySelectorAll('.addACard');

    for (let btn of btns) {
      btn.addEventListener("click", createACard);
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

//function that creates a card in parent panel.
  function createACard(event) {
    const newCard = {
      id: uuid(),
      text: "new card",
      members: []
    };

    const target = event.target;

    const targetList = target.closest('.card-list');

    const targetListId = targetList.getAttribute('list-id');

    cardMaker(newCard, targetList);

    MODEL.addNewCardInAppData(targetListId, newCard);

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

    MODEL.sendListsToModel(data.board);

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

    MODEL.sendMembersToModel(data.members);

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


  uuid.v1(); // -> v1 UUID
  uuid.v4(); // -> v4 UUID

})();
