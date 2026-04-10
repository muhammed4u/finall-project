"use client"
import { ReactNode, useRef } from "react"
import { AppStore, createStore, preloadedState } from '../../store/store';
import {Provider} from "react-redux"

import { SessionProvider } from "next-auth/react";

type ProvidersProps ={
    children: ReactNode,
    preloadedState: preloadedState
}
export default function Providers({children, preloadedState}:ProvidersProps) {

    const storeRef = useRef<null | AppStore>(null);
    if (!storeRef.current){
        storeRef.current = createStore(preloadedState)
    }

    return (
        <SessionProvider>
            <Provider store={storeRef.current}>
                {children}
            </Provider>
        </SessionProvider>
    )
}
