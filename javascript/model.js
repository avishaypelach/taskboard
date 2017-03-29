/**
 * Created by avishay on 29-Mar-17.
 */
const MODEL = (function () {
  const appData = {

    lists: [],

    members: []

  };

  function returnAppData() {

    return appData;

  }

  function returnListsAppData() {
    return appData.lists;
  }

  function returnMembersAppData() {
    return appData.members;
  }

  return{
    returnAppData: returnAppData,
    returnListsAppData: returnListsAppData,
    returnMembersAppData: returnMembersAppData
  }
});


