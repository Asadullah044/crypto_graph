import React from 'react'
import {Avatar, Box,Stack, Text, VStack} from '@chakra-ui/react'
function Footer() {
  return (
    <Box bgColor={'blackAlpha.900'} color={'white'} minH={'48'} px={'16'} py={['16','8']}>

    <Stack
    direction={['column', 'row']}
    h={'full'}
    alignItems={'center'}
    >
        <VStack w={'full'} alignItems={['center','flex-start']}>
<Text fontWeight={'bold'}>About us</Text>
<Text fontWeight={'sm'} letterSpacing={'widest'} textAlign={['center','left']}>We are the best crypto info Provider in the Pakistan</Text>
        </VStack>

        <VStack>
            <Avatar boxSize={'28'} mt={['4','0']}/>
            <Text>Our Founder</Text>
        </VStack>
    </Stack>

    </Box>
  )
}

export default Footer