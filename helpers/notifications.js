import axios from 'axios'


const formatNewRequestyMessage = (currentUser, dataResponse, success) => {
  let stringBuilderHeader = '';
  if (success) {
    stringBuilderHeader = 'New Trash Pickup Request Alert. \nStatus: SUCCESS\n';
  } else {
    stringBuilderHeader = 'New Trash Pickup Request Alert. \nStatus: FAILED\n';
  }
  const stringBuilder = `${stringBuilderHeader}` +
                        'Source: MOBILE APP\n' +
                        `Name: ${currentUser.other.name}\n` +
                        `Zone: ${currentUser.other.zone}\n` +
                        `Location: ${currentUser.other.location}\n` +
                        `Date: ${dataResponse.date}\n` +
                        `TrashSize: ${dataResponse.trashSize}\n` +
                        `PhoneNumber: ${currentUser.phoneNumber}\n` +
                        `RequestID: ${dataResponse.id}\n` +
                        `Edit Link: aneta-dashboard.netlify.app/dashboard/edit-single-request/${dataResponse.id}`;
  return stringBuilder;
};

export const notifySlack = async (currentUser, data, status) => {
  const url = 'https://kelin-weebhook.herokuapp.com/api/notification/slack'
  try {
    const dataToSendToSlack = formatNewRequestyMessage(currentUser, data, status)
    await axios.post(url, {data: dataToSendToSlack})
  } catch (e) {
    console.log(e);
  }
}
