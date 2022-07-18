import React, { ChangeEvent, ReactNode } from 'react'
import { ThemeConfigContext } from 'src/lib/config-context'

export const ThemeConfigProvider = React.memo(
  ({
    onChange,
    children,
  }: {
    onChange: (e: ChangeEvent) => void
    children: ReactNode
  }) => {
    return (
      <ThemeConfigContext.Provider value={{ onChange }}>
        {children}
      </ThemeConfigContext.Provider>
    )
  }
)
