export default function Input({handleChange, getValue}) {
  return (
    <input
      type="text"
      onChange={handleChange}
      value={getValue()}
    />
  )
}
//(event) => handleChange(event, cell.row.original.id)