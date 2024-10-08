import classNames from 'classnames'
import PropTypes from 'prop-types'
import './ContactList.css'

const ContactList = ({ contacts, onContactClick, activeContactId }) => {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => {
        const buttonClasses = classNames('contact-list__button', {
          'contact-list__button--active': contact.id === activeContactId,
        })

        return (
          <li key={contact.id} className="contact-list__item">
            <button
              className={buttonClasses}
              type="button"
              onClick={() => onContactClick(contact)}
            >
              {contact.username}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.array,
  onContactClick: PropTypes.func,
  activeContactId: PropTypes.string,
}

export default ContactList
