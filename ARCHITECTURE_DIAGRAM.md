# Data Caching Architecture

## Component Hierarchy

```
App.jsx
  └── LanguageProvider
      └── ModalProvider
          └── DataProvider ⭐ (NEW - Caches all data)
              └── Router
                  ├── Header
                  ├── Routes
                  │   ├── Home (uses: comments, videos)
                  │   ├── Services (uses: courses, equipments)
                  │   ├── GemstonesPage (uses: gemstones)
                  │   ├── Products
                  │   ├── About
                  │   └── Contact
                  └── Footer
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      DataProvider                            │
│  (Fetches once on mount, stores in React Context)          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  State:                                                      │
│  ├── comments: []                                           │
│  ├── courses: []                                            │
│  ├── equipments: []                                         │
│  ├── videos: []                                             │
│  ├── gemstones: []                                          │
│  ├── loading: { comments, courses, ... }                   │
│  └── errors: { comments, courses, ... }                    │
│                                                              │
│  Methods:                                                    │
│  ├── refreshComments()                                      │
│  ├── refreshCourses()                                       │
│  ├── refreshEquipments()                                    │
│  ├── refreshVideos()                                        │
│  └── refreshGemstones()                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ useData() hook
                            ↓
        ┌───────────────────────────────────────┐
        │                                        │
        ↓                    ↓                   ↓
   ┌─────────┐        ┌──────────┐       ┌──────────────┐
   │  Home   │        │ Services │       │  Gemstones   │
   │  Page   │        │   Page   │       │     Page     │
   └─────────┘        └──────────┘       └──────────────┘
   Uses:              Uses:               Uses:
   - comments         - courses           - gemstones
   - videos           - equipments
```

## API Service Layer

```
┌──────────────────────────────────────────────────────────┐
│                    Services Layer                         │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  commentService.js      ──→  /api/comments               │
│  courseService.js       ──→  /api/courses                │
│  equipmentService.js    ──→  /api/equipments             │
│  videoService.js        ──→  /api/videos                 │
│  gemstoneService.js     ──→  /api/gemstones              │
│                                                           │
└──────────────────────────────────────────────────────────┘
                            │
                            ↓
                    ┌───────────────┐
                    │   Backend API │
                    │  (Express.js) │
                    └───────────────┘
```

## Request Flow Comparison

### BEFORE (Without Caching):
```
User opens Home page
    ↓
Home component mounts
    ↓
Fetches comments ──→ API Call 1
Fetches videos   ──→ API Call 2
    ↓
User navigates to Services
    ↓
Services component mounts
    ↓
Fetches courses    ──→ API Call 3
Fetches equipments ──→ API Call 4
    ↓
User navigates back to Home
    ↓
Home component mounts again
    ↓
Fetches comments ──→ API Call 5 (REDUNDANT!)
Fetches videos   ──→ API Call 6 (REDUNDANT!)
```

### AFTER (With Caching):
```
User opens app
    ↓
DataProvider mounts
    ↓
Fetches ALL data in parallel:
├── comments    ──→ API Call 1
├── courses     ──→ API Call 2
├── equipments  ──→ API Call 3
├── videos      ──→ API Call 4
└── gemstones   ──→ API Call 5
    ↓
Data stored in Context
    ↓
User navigates to Home
    ↓
Home gets data from cache (NO API CALL)
    ↓
User navigates to Services
    ↓
Services gets data from cache (NO API CALL)
    ↓
User navigates to Gemstones
    ↓
Gemstones gets data from cache (NO API CALL)
    ↓
User navigates back to Home
    ↓
Home gets data from cache (NO API CALL)
```

## Cache Update Flow

```
User submits new comment
    ↓
Component calls commentService.create()
    ↓
API creates new comment
    ↓
Component calls refreshComments()
    ↓
DataProvider fetches fresh comments
    ↓
Cache updated
    ↓
All components using comments re-render automatically
```

## Key Benefits

1. **Single Source of Truth**: All data managed in one place
2. **Automatic Updates**: Components re-render when cache updates
3. **No Prop Drilling**: Any component can access data via useData()
4. **Optimized Performance**: Data fetched once, used everywhere
5. **Easy to Extend**: Add new data types by following the pattern
