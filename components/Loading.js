export const Loading = () => {
  return (
    <div className="bg-white mt-10 p-6 mx-auto max-w-sm rounded shadow-md flex flex-row rounded-xl space-x-4">
      <svg className="bg-pink-100 animate-pulse h-5 w-5 mr-3" viewBox="0 0 24 24">
      </svg>
      <span className="text-pink-600">
      Cargando...
      </span>
    </div>
  )
}