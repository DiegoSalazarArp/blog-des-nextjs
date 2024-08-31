export default function Page({ params }: { params: { tag: string } }) {
  return (
    <div>
      {params.tag}
    </div>

  )
}