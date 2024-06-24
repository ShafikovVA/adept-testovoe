declare type RootState = ReturnType<typeof import('../store/root').store.getState>;
declare type AppDispatch = typeof import('../store/root').store.dispatch;
