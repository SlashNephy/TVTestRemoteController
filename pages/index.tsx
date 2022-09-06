import { Stack } from '@mantine/core'
import React from 'react'

import { ColorSchemeButton } from '../components/ColorSchemeButton'

export const Index: React.FC = () => {
  return (
    <>
      <Stack align="center" justify="center" spacing="sm">
        <h1>TVTest</h1>
        <ColorSchemeButton />
      </Stack>
    </>
  )
}
