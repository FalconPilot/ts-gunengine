import { store } from '$front/store/provider'

export * from './gun'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
