type PageTitleProps = {
  title: string
  subTitle: string
}

const PageTitle = ({ title, subTitle }: PageTitleProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <h1 className="leading-none font-semibold">{title}</h1>
      <p className="text-muted-foreground text-sm whitespace-pre-line">
        {subTitle}
      </p>
    </div>
  )
}

export default PageTitle
