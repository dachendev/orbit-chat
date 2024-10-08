import PropTypes from 'prop-types'
import { Button } from '@/features/ui'
import './RecipientList.css'

const RecipientList = ({ recipients, onRecipientClick }) => {
  return (
    <ul className="recipient-list">
      {recipients.map((recipient) => (
        <li key={recipient.id} className="recipient-list__item">
          <Button onClick={() => onRecipientClick(recipient)}>
            {recipient.username}
          </Button>
        </li>
      ))}
    </ul>
  )
}

RecipientList.propTypes = {
  recipients: PropTypes.array,
  onRecipientClick: PropTypes.func,
}

export default RecipientList
