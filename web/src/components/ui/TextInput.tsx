import { CallbackType } from 'src/utilities/types'

type TextInputProps = {
  value: string
  callback: (input: string) => void
  placeholder: string
}

function onChange(value: string, callback: CallbackType) {
  callback(value)
}

export const TextInput = ({ value, callback, placeholder }: TextInputProps) => {
  return (
    <input
      className="bg-transparent border-2 border-matcha rounded-md min-h-[2rem] outline-none px-2 w-full focus:border-mint placeholder:text-whip-cream placeholder:italic"
      value={value}
      onChange={(event) => onChange(event.target.value, callback)}
      placeholder={placeholder}
    />
  )
}
