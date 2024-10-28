type TitleParams = {
  children: string
}

export default function Title({ children }: TitleParams) {
  return (
    <>
      <h1 className="text-center m-4 text-xl uppercase font-bold text-astronaut-900">{children}</h1>
    </>
  )
}
