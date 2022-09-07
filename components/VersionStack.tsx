import { Stack } from '@mantine/core'
import React from 'react'

import { useFetch } from '../lib/useFetch'

type Version = {
  tvtest: string
  plugin: string
}

export const VersionStack: React.FC = () => {
  const [version, error] = useFetch<Version>('/api/version')

  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  if (!version) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <Stack>
      <span>
        TVTest version: {version.tvtest} / Plugin version: {version.plugin}
      </span>
    </Stack>
  )
}
