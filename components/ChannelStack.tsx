import { Button, SimpleGrid } from '@mantine/core'
import React from 'react'

import { useFetch } from '../lib/useFetch'

type Channel = {
  name: string
  type: 'GR' | 'BS' | 'CS' | string
  serviceId: number
}

export const ChannelStack: React.FC = () => {
  const [channels, error] = useFetch<Channel[]>('/api/channels')

  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  if (!channels) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <SimpleGrid cols={3}>
      {channels.map((channel) => (
        <Button key={`${channel.type}_${channel.serviceId}`}>{channel.name}</Button>
      ))}
    </SimpleGrid>
  )
}
