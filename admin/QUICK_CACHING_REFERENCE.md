# Quick Caching Reference

## For Developers

### Using Cached Data in Components

```javascript
import { useData } from '../contexts/DataContext'

function MyComponent() {
  const { 
    gemstones,           // Cached data array
    gemstonesLoading,    // Loading state
    fetchGemstones,      // Fetch function (cached)
    addGemstone,         // Add to cache
    updateGemstone,      // Update in cache
    deleteGemstone       // Remove from cache
  } = useData()

  useEffect(() => {
    fetchGemstones() // Fetches only if not cached
  }, [fetchGemstones])

  return <div>{/* Use gemstones */}</div>
}
```

### Available Resources

| Resource | Data | Loading | Fetch | Add | Update | Delete |
|----------|------|---------|-------|-----|--------|--------|
| Gemstones | `gemstones` | `gemstonesLoading` | `fetchGemstones()` | `addGemstone()` | `updateGemstone()` | `deleteGemstone()` |
| Courses | `courses` | `coursesLoading` | `fetchCourses()` | `addCourse()` | `updateCourse()` | `deleteCourse()` |
| Equipment | `equipments` | `equipmentsLoading` | `fetchEquipments()` | `addEquipment()` | `updateEquipment()` | `deleteEquipment()` |
| Videos | `videos` | `videosLoading` | `fetchVideos()` | `addVideo()` | `updateVideo()` | `deleteVideo()` |
| Messages | `contactMessages` | `contactMessagesLoading` | `fetchContactMessages()` | N/A | `updateContactMessage()` | `deleteContactMessage()` |

### Force Refresh

```javascript
// Force fetch from API (bypass cache)
fetchGemstones(true)
```

### Clear All Cache

```javascript
const { clearCache } = useData()
clearCache() // Clears all cached data
```

## Common Patterns

### List Component Pattern
```javascript
export default function ItemsList() {
  const { items, itemsLoading, fetchItems, deleteItem } = useData()
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchItems().catch(err => {
      setError('Failed to fetch items')
    })
  }, [fetchItems])

  const handleDelete = async (id) => {
    await itemService.delete(id)
    deleteItem(id) // Update cache
  }

  if (itemsLoading) return <Loading />
  return <div>{/* Render items */}</div>
}
```

### Form Component Pattern
```javascript
export default function ItemForm() {
  const { addItem, updateItem } = useData()
  const { id } = useParams()
  const isEditing = !!id

  const handleSubmit = async (formData) => {
    if (isEditing) {
      const updated = await itemService.update(id, formData)
      updateItem(id, updated) // Update cache
    } else {
      const created = await itemService.create(formData)
      addItem(created) // Add to cache
    }
    navigate('/items')
  }

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>
}
```

## Cache Behavior

| Action | Cache Behavior |
|--------|----------------|
| First page visit | Fetches from API, caches result |
| Revisit same page | Returns cached data instantly |
| Create item | Adds to cache, no refetch needed |
| Update item | Updates cache, no refetch needed |
| Delete item | Removes from cache, no refetch needed |
| Logout | Clears all cache |
| Force refresh | Bypasses cache, fetches fresh data |

## Tips

1. **Always use `useEffect` with `fetchData()`** to load data on mount
2. **Update cache after mutations** to keep UI in sync
3. **Handle errors gracefully** with try-catch and error states
4. **Use force refresh** only when necessary (e.g., after errors)
5. **Cache is session-based** - cleared on logout automatically

## Troubleshooting

### Data not updating after mutation
```javascript
// ❌ Wrong - doesn't update cache
await itemService.create(formData)
navigate('/items')

// ✅ Correct - updates cache
const newItem = await itemService.create(formData)
addItem(newItem)
navigate('/items')
```

### Stale data showing
```javascript
// Force refresh to get latest data
fetchItems(true)
```

### Cache not clearing on logout
```javascript
// Ensure clearDataCache is called in logout
import { clearDataCache } from '../contexts/DataContext'

const logout = () => {
  localStorage.removeItem('token')
  clearDataCache()
}
```
