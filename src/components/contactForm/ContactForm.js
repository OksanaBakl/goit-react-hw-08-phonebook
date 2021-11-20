import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import selectors from "../../redux/contacts/contactsSelectors";
import contactsOperations from "../../redux/contacts/contactsOperations";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const contacts = useSelector(selectors.getContactsItems);

  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  // const checkContacts = () => {
  // 	if (contacts.find((contact) => name === contact.name)) {
  // 		setName("");
  // 		setNumber("");
  // 		return alert(`${name} already exists. Try another name`);
  // 	}
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (contacts.find((contact) => name === contact.name)) {
      setName("");
      setNumber("");
      return alert(`${name} already exists. Try another name`);
    }
    dispatch(
      contactsOperations.fetchAddContacts({ id: uuidv4(), name, number })
    );
    // checkContacts();
    // resetForm();
  };

  // const resetForm = () => {
  // 	setName("");
  // 	setNumber("");
  // };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="name Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
        required
        value={name}
        onChange={handleChangeForm}
      />

      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="The telephone number must contain numbers and may contain spaces, dashes, parentheses and may start with +"
        required
        value={number}
        onChange={handleChangeForm}
      />

      <button type="submit">Add contact</button>
    </form>
  );
}
