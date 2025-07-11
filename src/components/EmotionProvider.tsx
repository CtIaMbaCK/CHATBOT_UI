'use client';

import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';
import createEmotionCache from '@/src/utils/createEmotionCache';
import { ToastContainer } from 'react-toastify';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme();

export default function EmotionProvider({ children }: { children: ReactNode }) {
    return (
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
                <ToastContainer />
            </ThemeProvider>
        </CacheProvider>
    );
}


// khoong dung component nay nua