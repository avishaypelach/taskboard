/**
 * Created by avishay on 27-Feb-17.
 */


function addingAList() {

  const divHolder = document.createElement('div');

  document.getElementById("tid").appendChild(divHolder);

  const listTemplate =

`      <div class="panel panel-default">
        <div class="panel-heading panel-size">
          <input type="text" style="display: none">
          <span>New List</span>

          <div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="caret"></span>
            </button>
          
            <ul class="dropdown-menu" id="dropdownMenu2" aria-labelledby="dropdownMenu1">
              <li><a href="#">Delete List</a></li>
            </ul>
          </div>

        </div>
        <div class="panel-body">
          
        </div>

        <div class="panel-footer panel-size">
          <button onclick="createACard()" class="addACard">add a card...</button>
        </div>
      </div>`;

  divHolder.innerHTML = listTemplate;
}


//function that creates a card in in parent panel.
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

    titleElm.innerHTML = value;

    // Hide the input; Show the title
    target.style.display   = 'none';
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

// const addListBtn = document.querySelector('.addAPanel');
//
// addAPanel.addEventListener('click', addingAList);
//
// initListTitles();


// -------------------------------------------------------------

//catching all header buttons
const btns = document.querySelectorAll('.dropdown-toggle');


for (let btn of btns) {
  console.info('hi');
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
for(let deleter of deleters){
  deleter.addEventListener('click',removeList);
}


// const target = event.target;
//
// //target the parent of the lists.
// const currentPanel = target.parentNode.parentNode;
// console.info(currentPanel);



function removeList(event) {
  console.info('got event!', event);
  confirm("are you sure you want to delete?");

  const target = event.target;
  console.info(target,'hola');

  const listPanel = target.closest('.panel');

  listPanel.remove();

  // if(target.hasChildNodes())
  // {
  //   const children =[];
  //   children = target.childNodes();
  //   for( let child in children)
  //   {
  //     target.removeChild[child];
  //   }
  // }


  // const div;
  // while (div = document.getElementsByClassName('.panel')) {
  //   div.parentNode.removeChild(div);
  // }
  //
  // const child = document.getElementsByClassName('.panel');
  // console.info(child,'got the child');
  // const parent = document.getElementById('tid');
  //
  // parent.removeChild(child);

}







