import { CallbackType } from 'src/utilities/types'

type TextInputProps = {
  value: string
  callback: (input: string) => void
  placeholder: string
}

function onChange(value: string, callback: CallbackType) {
  callback(value)
}

export const TextInput = ({
  value = '',
  callback,
  placeholder,
}: TextInputProps) => {
  return (
    <input
      className="min-h-[2rem] w-full rounded-md border-2 border-matcha bg-transparent px-2 outline-none placeholder:italic placeholder:text-whip-cream focus:border-mint"
      value={value}
      onChange={(event) => onChange(event.target.value, callback)}
      placeholder={placeholder}
    />
  )
}
