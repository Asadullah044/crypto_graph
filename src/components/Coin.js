import React, { useEffect } from 'react'
import axios from 'axios';
import { server } from '../';
import { Button,Container, HStack, VStack, Image, Heading, Text, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';



function Coin() {

  const [coins, setcoins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [currency, setCurrency] = React.useState('pkr');
  const currencySymbol = currency === 'pkr' ? '₨' : currency === 'eur' ? '€' : '$';
  const btns = new Array(123).fill(1);



  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setcoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [currency, page]);
const changePage = (page)=>{
  setPage(page);
  setLoading(true)
}


  if (error) {
    return <ErrorComponent message={'Error while fetching Coins'} />
  }
  else {
    return (<Container maxW={'container.xl'} p={4} justifyContent={'center'}>
      {loading ? <Loader /> : <>
        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={'4'} >
            <Radio value='pkr'>₨ Rupee</Radio>
            <Radio value='usd'>$ Dollar</Radio>
            <Radio value='eur'>€ Euro</Radio>
          </HStack>
        </RadioGroup>

        <HStack wrap={'wrap'} m={4} justifyContent={'center'}>{
          coins.map((i) => {
            return <CoinCard
              name={i.name}
              img={i.image}
              symbol={i.symbol}
              currencySymbol={currencySymbol}
              price={i.current_price}
              id={i.id}
              key={i.id} />
          })}
        </HStack>
          <HStack w={'full'} overflowX={'auto'} p={8} >
            {
              btns.map((item , index)=>{
                return <Button 
                key={index}
                onClick={()=>{changePage(index+1)}} 
                bgColor={'blackAlpha.900'} 
                color={'white'}>
                {index + 1}  
                </Button>
              })
            }
          </HStack>
      </>}
    </Container>
    )
  }
}

//Coin Car starts here


const CoinCard = ({ id, name, price, symbol, img, currencySymbol = '₨' }) => {
  return <Link to={`/coins/${id}`} >

    <VStack w={'52'} shadow={'lg'} p={8} borderRadius={'lg'} transition={'all 0.3s'} m={4}
      css={{
        '&:hover': {
          transform: 'scale(1.1)'
        }
      }}
    >
      <Image src={img} w={10} h={10} objectFit={'contain'} alt={'exchange'} />
      <Heading size={'md'} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : 'NA'}</Text>
    </VStack>

  </Link>
}

//Coin Car end here
export default Coin