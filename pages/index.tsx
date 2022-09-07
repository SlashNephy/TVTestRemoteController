import { Container, Stack } from '@mantine/core'
import React from 'react'

import { ChannelStack } from '../components/ChannelStack'
import { ColorSchemeButton } from '../components/ColorSchemeButton'
import { ProgramStack } from '../components/ProgramStack'
import { SeekStack } from '../components/SeekStack'
import { VersionStack } from '../components/VersionStack'
import { VolumeStack } from '../components/VolumeStack'

export const Index: React.FC = () => {
  return (
    <Container>
      <Stack align="center" justify="center" spacing="sm">
        <h1>TVTest</h1>
        <ColorSchemeButton />
        <ProgramStack />
        <SeekStack />
        <VolumeStack />
        <ChannelStack />
        <VersionStack />
      </Stack>
    </Container>
  )
}
