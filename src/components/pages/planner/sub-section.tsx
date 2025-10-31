type SubSectionProps = {
  title: string
  children: React.ReactNode
}

const SubSection = ({ title, children }: SubSectionProps) => {
  return (
    <div className="flex flex-wrap gap-4 border border-gray-200 rounded-md p-4 relative flex-[0_0_calc(25%-1rem)]">
      <p className="absolute top-0 left-[10px] -translate-y-1/2 bg-white px-2 text-sm font-semibold text-gray-900">
        {title}
      </p>

      {children}
    </div>
  )
}

export default SubSection
