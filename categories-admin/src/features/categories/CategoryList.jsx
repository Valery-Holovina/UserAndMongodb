
export default function CategoryList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <p className="empty-state">
        Категорій не знайдено. Створіть нову або змініть пошук.
      </p>
    )
  }

  return (
    <div className="category-grid">
      {items.map((category) => (
        <article className="category-card" key={category._id}>
          <img
            className="category-image"
            src={category.imageSrc}
            alt={category.name}
          />

          <div className="category-card-content">
            <h3>{category.name}</h3>

            <div className="card-actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={() => onEdit(category)}
              >
                Редагувати
              </button>

              <button
                className="button button-danger"
                type="button"
                onClick={() => onDelete(category)}
              >
                Видалити
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
