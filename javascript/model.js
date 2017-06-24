/**
 * Created by avishay on 29-Mar-17.
 */
const MODEL = (function () {


  let appData = {

    lists: [],

    members: []

  };

  function appDataIsLocalAppData(localData) {
    appData = localData
  }

  function sendListsToModel(data) {
    appData.lists = data;
  }

  function sendMembersToModel(data) {
    appData.members = data;
  }

  function returnAppData() {
    return appData;
  }

  function returnListsAppData() {
    return appData.lists;
  }

  function returnMembersAppData() {
    return appData.members;
  }

  function deleteMember(memberId) {
    for (let i = 0; i < appData.members.length; i++) {
      if (memberId === appData.members[i].id) {
        appData.members.splice(i, 1);
      }
    }

    localStorage.setItem('appData', JSON.stringify(appData));
    console.info(JSON.parse(localStorage.getItem('appData')));
  }

  function addingNewMember(newMember) {
    appData.members.push(newMember);

    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function addingNewList(newList) {
    appData.lists.push(newList);

    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function addNewCardInAppData(target, newCard) {
    for (let list of appData.lists) {
      if (list.id === target) {
        list.tasks.push(newCard);
      }
    }

    localStorage.setItem('appData', JSON.stringify(appData));
  }

  function deleteCard(cardId) {
    for (const list of appData.lists)
      for (let task in list.tasks) {
        if (list.tasks[task].id === cardId) {
          list.tasks.splice(task, 1);
        }
      }
    localStorage.setItem('appData', JSON.stringify(appData));
  }

  function saveChangesOnCard(cardId, cardText, membersArr) {
    for (const list of appData.lists)
      for (let task in list.tasks) {
        if (list.tasks[task].id === cardId) {
          list.tasks[task].text = cardText;

          list.tasks[task].members = membersArr;

          const toList = document.getElementById("change-list").value;

          if (list.title !== toList) {
            for (let listx of appData.lists) {
              if (listx.title === toList) {
                listx.tasks.push(list.tasks[task]);
              }
            }
            list.tasks.splice(task, 1);
          }
        }
      }
    localStorage.setItem('appData', JSON.stringify(appData));
  }

  function removeList(listForRemoval) {
    const targetList = appData.lists.find((list) => {
      return list.id === listForRemoval.id
    });

    const index = appData.lists.indexOf(targetList);

    appData.lists.splice(index, 1);

    localStorage.setItem('appData', JSON.stringify(appData));

  }

  return {
    returnAppData,
    returnListsAppData,
    returnMembersAppData,
    sendListsToModel,
    sendMembersToModel,
    deleteMember,
    addingNewMember,
    addingNewList,
    addNewCardInAppData,
    removeList,
    deleteCard,
    saveChangesOnCard,
    appDataIsLocalAppData
  }
})();


