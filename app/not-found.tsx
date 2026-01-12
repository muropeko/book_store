import { EmptyBlock } from "@components/shared"

export default function NotFound() {
  return (
    //<div className="flex items-center justify-center min-h-screen">
      <EmptyBlock
        title="Сторінку не знайдено! :("
        description="Схоже, такої сторінки не існує або вона була видалена."
        actionHref="/"
        actionLabel="На головну"
        className='min-h-screen'
      />
    //</div>
  )
}
