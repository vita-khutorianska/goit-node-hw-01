const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join("./db/contact.json");

const getListContact = () => {
  return fs.readFile(contactsPath, "utf8");
};
const writeToJson = (data) => {
  return fs.writeFile(contactsPath, data);
};
async function listContacts() {
  try {
    const listContact = await getListContact();
    console.table(JSON.parse(listContact));
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const listContact = await getListContact();
    const contact = JSON.parse(listContact);
    const contactById = contact.find(({ id }) => id.toString() === contactId);
    console.log(contactById);
    return contactById;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const listContact = await fs.readFile(contactsPath, "utf8");
    const contact = JSON.parse(listContact);
    const idDeleteList = contact.filter(
      ({ id }) => id.toString() !== contactId
    );
    const contactsList = JSON.stringify(idDeleteList);
    await writeToJson(contactsList);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const listContact = await fs.readFile(contactsPath, "utf8");
    const contact = JSON.parse(listContact);
    const contactNew = { id: shortid.generate(), name, email, phone };
    const contactsList = JSON.stringify([contactNew, ...contact], null, "\t");
    await writeToJson(contactsList);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
