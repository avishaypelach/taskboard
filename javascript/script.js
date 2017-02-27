/**
 * Created by avishay on 27-Feb-17.
 */
function addingAList() {
  const listHead = document.createElement('div');
  document.getElementById("tid").appendChild(listHead);
  const html = '<div class="panel panel-default"><div class="panel-heading panel-size"><h3 class="panel-title">Backlog</h3></div><div class="panel-body" id="addingCard"></div><div class="panel-footer panel-size"><button onclick="createACard()" class="addACard">add a card...</button></div>';
  listHead.innerHTML = html;
}
function createACard() {
  const listHead = document.createElement('div');
  document.getElementById("addingCard").appendChild(listHead);
  const html = '<div class="card"></div>';
  listHead.innerHTML = html;
}

