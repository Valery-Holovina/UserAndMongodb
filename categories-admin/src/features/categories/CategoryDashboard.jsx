
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../auth/authSlice'
import {
  clearCategories,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from './categoriesSlice'
import CategoryForm from './CategoryForm'
import CategoryList from './CategoryList'

export default function CategoryDashboard() {
  const dispatch = useDispatch()

  const { items, status, error, errorStatus } = useSelector(
    (state) => state.categories
  )

  const [search, setSearch] = useState('')
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const filteredItems = items.filter((category) =>
    category.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  )

  const handleSubmit = async (form) => {
    const category = {
      name: form.name.trim(),
      imageSrc: form.imageSrc.trim()
    }

    try {
      if (editingCategory) {
        await dispatch(
          updateCategory({
            ...editingCategory,
            ...category
          })
        ).unwrap()
      } else {
        await dispatch(createCategory(category)).unwrap()
      }

      setEditingCategory(null)
    } catch (error) {
      console.error('Category operation failed:', error)
    }
  }

  const handleDelete = (category) => {
    const confirmed = window.confirm(
      `Видалити категорію «${category.name}»?`
    )

    if (confirmed) {
      dispatch(deleteCategory(category._id))
    }
  }

  const handleLogout = () => {
    dispatch(clearCategories())
    dispatch(logout())
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">CATEGORY ADMIN</p>
          <h1>Категорії</h1>
          <p>Створюйте, редагуйте та керуйте категоріями.</p>
        </div>

        <button
          className="button button-secondary"
          type="button"
          onClick={handleLogout}
        >
          Вийти
        </button>
      </header>

      {errorStatus === 401 ? (
        <section className="message error-message">
          <p>
            Сесія завершилася або токен недійсний. Увійдіть знову.
          </p>
          <button
            className="button"
            type="button"
            onClick={handleLogout}
          >
            До входу
          </button>
        </section>
      ) : (
        <>
          {error && (
            <p className="message error-message" role="alert">
              {error}
            </p>
          )}

          <div className="dashboard-grid">
            <section className="panel">
              <div className="section-heading">
                <div>
                  <h2>Усі категорії</h2>
                  <p>{filteredItems.length} категорій</p>
                </div>
              </div>

              <input
                className="search-input"
                type="search"
                placeholder="Пошук за назвою..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              {status === 'loading' && (
                <p className="message">
                  Завантаження категорій...
                </p>
              )}

              {status !== 'loading' && status !== 'failed' && (
                <CategoryList
                  items={filteredItems}
                  onEdit={setEditingCategory}
                  onDelete={handleDelete}
                />
              )}

              {status === 'failed' && errorStatus !== 401 && (
                <button
                  className="button"
                  type="button"
                  onClick={() => dispatch(fetchCategories())}
                >
                  Спробувати ще раз
                </button>
              )}
            </section>

            <CategoryForm
              key={editingCategory?._id || 'new-category'}
              editingCategory={editingCategory}
              onSubmit={handleSubmit}
              onCancel={() => setEditingCategory(null)}
            />
          </div>
        </>
      )}
    </main>
  )
}
