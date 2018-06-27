//email reg expression
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//called with string containing emails from user
export default emails => {
  //take string and split on comma character
  //return array of emails
  //map through each email - for each email run trim to remove space
  //filter - pass each email - inside function check whether email is valid
  //if valid return false - if invalid return true
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  //if invalid emails exist return this
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  //else return null
  return;
};
