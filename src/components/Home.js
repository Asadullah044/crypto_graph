import React from 'react'
import {Box ,Image, Text} from '@chakra-ui/react';
import btcsrc from '../assets/btc.png'

function Home() {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
      <Image src={btcsrc} width={'full'} h={'full'} objectFit={'contain'} filter={'grayscale(1)'}/>
      <Text 
       fontSize={'6xl'} 
       textAlign={'center'} 
       fontWeight={'thin'} 
       color={'whiteAlpha.700'} 
       mt={'-10'}>
        Cryptopedia
        </Text>
    </Box>
  )
}

export default Home