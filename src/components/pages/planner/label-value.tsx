type LabelValueProps = {
  label: string
  value: string
}

const LabelValue = ({ label, value }: LabelValueProps) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="w-[150px] text-md text-gray-900 font-semi">{label}</span>
      <span className="text-black text-sm">{value}</span>
    </div>
  )
}

export default LabelValue
