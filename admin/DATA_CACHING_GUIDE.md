# Data Caching Implementation Guide

## Overview

The admin panel now implements a centralized data caching system that prevents unnecessary API calls when navigating between pages. Data is fetched once and reused across page transitions.

## How It Works

### DataContext (`src/contexts/DataContext.jsx`)

The `DataContext` provides:

1. **Centralized State Management**: All data (gemstones, courses, equipment, videos, contact messages) is stored in a single context.

2. **Smart Caching**: Each data type has a `cached` flag. When data is requested:
   - If already cached, it returns the cached data immediately
   - If not cached, it fetches from the API and caches the result
   - You can force a refresh by passing `force: true` to any fetch function

3. **Optimistic Updates**: When creating, updating, or deleting items, the cache is immediately updated without refetching.

### Key Features

#### Automatic Caching
```javascript
// First visit to gemstones page - fetches from API
const { gemstones, fetchGemstones } = useData()
useEffect(() => {
  fetchGemstones() // Fetches from API
}, [])

// Navigate away and come back - uses cached data
// No API call is made!
```

#### Force Refresh
```javascript
// Force a refresh when needed (e.g., after error)
fetchGemstones(true) // Bypasses cache and fetches fresh data
```

#### Cache Invalidation
```javascript
// Cache is automatically cleared on logout
const { logout } = useAuth()
logout() // Clears all cached data
```

## Usage in Components

### List Components

List components now use the cached data:

```javascript
import { useData } from '../contexts/DataContext'

export default function GemstonesList() {
  const { gemstones, gemstonesLoading, fetchGemstones, deleteGemstone } = useData()
  
  useEffect(() => {
    fetchGemstones() // Only fetches if not cached
  }, [fetchGemstones])
  
  // Use gemstones, gemstonesLoading directly
}
```

### Form Components

Form components update the cache after create/update operations:

```javascript
import { useData } from '../contexts/DataContext'

export default function GemstoneForm() {
  const { addGemstone, updateGemstone } = useData()
  
  const handleSubmit = async (e) => {
    if (isEditing) {
      const updated = await gemstoneService.update(id, formData)
      updateGemstone(id, updated) // Updates cache
    } else {
      const created = await gemstoneService.create(formData)
      addGemstone(created) // Adds to cache
    }
  }
}
```

## Benefits

1. **Faster Navigation**: No loading spinners when switching between pages you've already visited
2. **Reduced Server Load**: Fewer API calls mean less server load
3. **Better UX**: Instant page transitions with cached data
4. **Consistent State**: All components see the same data
5. **Optimistic Updates**: UI updates immediately after actions

## Cache Lifecycle

1. **Initial Load**: User logs in → cache is empty
2. **First Visit**: Navigate to page → data fetched and cached
3. **Subsequent Visits**: Navigate back → cached data used instantly
4. **Updates**: Create/edit/delete → cache updated optimistically
5. **Logout**: User logs out → cache cleared completely
6. **Error Recovery**: Retry button forces fresh fetch

## API

### DataContext Methods

#### Fetch Methods
- `fetchGemstones(force?)` - Fetch gemstones (cached by default)
- `fetchCourses(force?)` - Fetch courses (cached by default)
- `fetchEquipments(force?)` - Fetch equipment (cached by default)
- `fetchVideos(force?)` - Fetch videos (cached by default)
- `fetchContactMessages(force?)` - Fetch contact messages (cached by default)

#### Update Methods
- `addGemstone(gemstone)` - Add to cache
- `updateGemstone(id, gemstone)` - Update in cache
- `deleteGemstone(id)` - Remove from cache
- Similar methods for courses, equipment, videos, and contact messages

#### Utility Methods
- `clearCache()` - Clear all cached data

### State Properties
- `gemstones`, `courses`, `equipments`, `videos`, `contactMessages` - Cached data arrays
- `gemstonesLoading`, `coursesLoading`, etc. - Loading states

## Notes

- Cache persists only during the session (not in localStorage)
- Cache is cleared on logout for security
- Each data type is cached independently
- Force refresh is available for error recovery
