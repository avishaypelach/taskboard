/**
 * Created by avishay on 27-Feb-17.
 */
//function that creates a new panel.
function addingAList() {

  const divHolder = document.createElement('div');

  document.getElementById("tid").appendChild(divHolder);

  const newList =

  `<div class="panel panel-default">

    <div class="panel-heading panel-size">
    
      <h3 class="panel-title">place holder</h3>
      
    </div>
   
    <div class="panel-body" id="cardList"> </div>
  
    <div class="panel-footer panel-size">
  
      <button onclick="createACard()" class="addACard">add a card...</button>
  
    </div>
  
  </div>`;

  divHolder.innerHTML = newList;
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

function divClicked() {
  const h3Holder = document.querySelector(".panel-title");
  console.log(h3Holder);

  h3Holder.addEventListener('click', function () {

  const editableText = $("<textarea />");

  editableText.valueOf(h3Holder);

  $(this).replaceWith(editableText);

  editableText.focus();

  // setup the blur event for this new textarea
  editableText.blur(editableTextBlurred);
  });
}

function editableTextBlurred() {
  const html = $(this).val();
  const viewableText = $("<h3>");
  viewableText.html(html);
  $(this).replaceWith(viewableText);
  // setup the click event for this new div
  $(viewableText).click(divClicked);
};






