import './index.css'

const SalaryRangeItem = ({salaryItem, onClickSalary}) => {
  const {salaryRangeId, label} = salaryItem

  const onChangeRadio = event => {
    onClickSalary(event.target.value)
  }
  return (
    <li className="check-item-li">
      <input
        className="check-item-label"
        type="radio"
        id="optionId"
        name="options"
        value={salaryRangeId}
        onChange={onChangeRadio}
      />
      <label className="check-item-label" htmlFor="optionId">
        {label}
      </label>
    </li>
  )
}
export default SalaryRangeItem
