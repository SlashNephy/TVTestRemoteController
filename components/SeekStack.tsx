import { Button, Group } from '@mantine/core'
import { IconPlayerSkipBack, IconPlayerSkipForward } from '@tabler/icons'
import React from 'react'

export const SeekStack: React.FC = () => {
  return (
    <Group>
      <Button leftIcon={<IconPlayerSkipBack />}>-60s</Button>
      <Button leftIcon={<IconPlayerSkipBack />}>-30s</Button>
      <Button leftIcon={<IconPlayerSkipBack />}>-10s</Button>
      <Button rightIcon={<IconPlayerSkipForward />}>+30s</Button>
      <Button rightIcon={<IconPlayerSkipForward />}>+60s</Button>
    </Group>
  )
}
