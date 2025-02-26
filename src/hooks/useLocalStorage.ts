import { useState } from "react"

import { setLocalStorage, getLocalStorage } from "../lib/localStorage"

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        return getLocalStorage(key) ?? initialValue
    })

    function setStateLocalStorage(newValue: T) {
        setValue(newValue)
        setLocalStorage(key, newValue)
    }

    /* useEffect(() => {
        setLocalStorage(key, value)
    }, [value]) */

    return [value, setStateLocalStorage] as const
}