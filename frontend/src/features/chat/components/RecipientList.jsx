import classNames from 'classnames'
import PropTypes from 'prop-types'
import './RecipientList.css'

const RecipientList = ({ recipients, onRecipientClick, activeRecipientId }) => {
  return (
    <ul className="recipient-list">
      {recipients.map((recipient) => {
        const buttonClasses = classNames('recipient-list__button', {
          'recipient-list__button--active': recipient.id === activeRecipientId,
        })

        return (
          <li key={recipient.id} className="recipient-list__item">
            <button
              className={buttonClasses}
              type="button"
              onClick={() => onRecipientClick(recipient)}
            >
              {recipient.username}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

RecipientList.propTypes = {
  recipients: PropTypes.array,
  onRecipientClick: PropTypes.func,
  activeRecipientId: PropTypes.string,
}

export default RecipientList
