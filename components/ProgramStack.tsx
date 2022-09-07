import { Stack, Text } from '@mantine/core'
import React from 'react'

import { useFetch } from '../lib/useFetch'

type Program = {
  name: string
  service: {
    name: string
    id: number
  }
}

export const ProgramStack: React.FC = () => {
  const [program, error] = useFetch<Program>('/api/program')

  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  if (!program) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <Stack>
      <Text>
        {program.name} - {program.service.name}
      </Text>
    </Stack>
  )
}
