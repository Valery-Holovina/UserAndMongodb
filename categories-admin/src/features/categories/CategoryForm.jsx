
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function CategoryForm({
  editingCategory,
  onSubmit,
  onCancel
}) {
  const [form, setForm] = useState({
    name: editingCategory?.name || '',
    imageSrc: editingCategory?.imageSrc || ''
  })

  const status = useSelector((state) => state.categories.status)

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim()) return

    const succeeded = await onSubmit(form)

if (succeeded && !editingCategory) {
  setForm({
    name: '',
    imageSrc: ''
  })
}
  }

  return (
    <section className="panel form-panel">
      <h2>{editingCategory ? 'Редагувати категорію' : 'Нова категорія'}</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <label htmlFor="category-name">Назва</label>
        <input
          id="category-name"
          name="name"
          type="text"
          placeholder="Наприклад, Електроніка"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="category-image">URL зображення</label>
        <input
          id="category-image"
          name="imageSrc"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={form.imageSrc}
          onChange={handleChange}
          required
        />

        <button
          className="button"
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading'
            ? 'Зачекайте...'
            : editingCategory
              ? 'Зберегти зміни'
              : 'Створити категорію'}
        </button>

        {editingCategory && (
          <button
            className="button button-secondary"
            type="button"
            onClick={onCancel}
          >
            Скасувати редагування
          </button>
        )}
      </form>
    </section>
  )
}
