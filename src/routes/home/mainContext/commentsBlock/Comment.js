export default function Comment({comment}) {
  const date = new Date(comment.date);
  const formatDate = date.toLocaleString('ru')

  return (
    <div>
      <div>Author: {comment.author.username}</div>
      <div>{comment.text}</div>
      <div>Date: {formatDate}</div>
    </div>
  )
}