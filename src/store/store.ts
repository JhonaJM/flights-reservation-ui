import { configureStore } from '@reduxjs/toolkit'
import { originDestinationSlice } from './slice/originDestination'
import { bookSlice, reservationSlice } from './slice/reservation'

export const store = configureStore({
  reducer: {
    reservation : reservationSlice.reducer,
    originDestination : originDestinationSlice.reducer,
    book : bookSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch