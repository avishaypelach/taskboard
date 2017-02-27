/**
 * Created by avishay on 27-Feb-17.
 */
// let i = 1;
function addingAList() {
  // mNewObj = document.createElement('div');
  // mNewObj.id = "BOX" + i;
  // mNewObj.style.backgroundColor="red";
  // mNewObj.style.visibility="show";
  // mNewObj.innerHTML = "Box " + i;
  // document.getElementById("tid").appendChild(mNewObj);
  // alert(mNewObj.innerHTML);
  // i++;
  // create the list head add it to dad and give class
  const listHead = document.createElement('div');
  document.getElementById("tid").appendChild(listHead);
  listHead.className = "panel panel-default";
}
