import React, { useEffect } from 'react';
import axios from 'axios';
import { server } from '../';
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';



function Exchanges() {

  const [exchanges, setExchanges] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);


  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }

    };
    fetchExchanges();
  }, []);
  if (error) {
    return <ErrorComponent message={'Error while fetching Exchanges'} />
  }
  else {
    return (<Container maxW={'container.xl'} >
      {loading ? <Loader /> : <>
        <HStack wrap={'wrap'}  m={4} justifyContent={'center'}>{
          exchanges.map((i) => {
            return <ExchangeCard
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
              key={i.id} />
          })}
        </HStack>

      </>}
    </Container>
    )
  }
}

const ExchangeCard = ({ name, img, rank, url }) => {
  return <a href={url} target={'blank'}>

    <VStack w={'52'} shadow={'lg'} p={8} borderRadius={'lg'} transition={'all 0.3s'} m={4}
      css={{
        '&:hover': {
          transform: 'scale(1.1)'
        }
      }}
    >
      <Image src={img} w={10} h={10} objectFit={'contain'} alt={'exchange'} />
      <Heading size={'md'} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>

  </a>
}


export default Exchanges