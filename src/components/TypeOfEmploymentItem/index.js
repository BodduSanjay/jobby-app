import './index.css'

const TypeOfEmploymentItem = ({typeItem, onClickType}) => {
  const {label, employmentTypeId} = typeItem

  const onChangeCheck = event => {
    const {value, checked} = event.target
    onClickType(value, checked)
  }

  return (
    <li className="check-item-li">
      <input
        className="check-item-input"
        type="checkbox"
        id={`employmentType_${employmentTypeId}`}
        value={employmentTypeId}
        onChange={onChangeCheck}
      />
      <label
        className="check-item-label"
        htmlFor={`employmentType_${employmentTypeId}`}
      >
        {label}
      </label>
    </li>
  )
}

export default TypeOfEmploymentItem
