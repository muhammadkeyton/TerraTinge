import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function MuiServerProvider({children}:Readonly<{
    children: React.ReactNode;
}>){

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            {children}
        </AppRouterCacheProvider>
    )
}