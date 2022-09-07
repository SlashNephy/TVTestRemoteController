import { Group, Slider } from '@mantine/core'
import { IconVolume, IconVolume2 } from '@tabler/icons'
import React from 'react'

import { useFetch } from '../lib/useFetch'

type Volume = {
  volume: number
}

export const VolumeStack: React.FC = () => {
  const [volume, error] = useFetch<Volume>('/api/volume')
  const [current, setCurrent] = React.useState<number>()

  const onChangeEnd = (value?: number) => {
    // TODO: TVTest 側に POST を投げる
  }

  React.useEffect(() => {
    setCurrent(volume?.volume)
  }, [volume])

  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  if (!volume) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <Group>
      <IconVolume2 />
      <Slider size="md" my="xl" min={0} max={100} value={current} onChange={setCurrent} onChangeEnd={onChangeEnd} />
      <IconVolume />
    </Group>
  )
}
