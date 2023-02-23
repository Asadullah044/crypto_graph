import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '../';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

function CoinDetails() {

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max'];
  const [coin, setcoin] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [days, setDays] = React.useState('24h');
  const [chartArray, setChartArray] = React.useState([]);
  const [currency, setCurrency] = React.useState('pkr');
  const params = useParams();
  const currencySymbol = currency === 'pkr' ? '₨' : currency === 'eur' ? '€' : '$';


  React.useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setcoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoinDetail();
  }, [params.id, currency, days]);

  const switchChart = (key) => {
    switch (key) {

      case '24h':
        setDays('24h')
        setLoading(true)
        break;

      case '7d':
        setDays('7d')
        setLoading(true)
        break;

      case '14d':
        setDays('14d')
        setLoading(true)
        break;

      case '30d':
        setDays('30d')
        setLoading(true)
        break;

      case '60d':
        setDays('60d')
        setLoading(true)
        break;

      case '200d':
        setDays('200d')
        setLoading(true)
        break;

      case '1y':
        setDays('365d')
        setLoading(true)
        break;

      case 'max':
        setDays('max')
        setLoading(true)
        break;
      default:
        setDays('24h')
        setLoading(true);
        break;
    }
  }



  if (error) {
    return <ErrorComponent message={'Error while fetching Coins'} />
  } else {
    return <Container maxW={'container.xl'} justifyContent={'center'} p={16}>

      {loading ? <Loader /> : <>
        <Box width={'full'}>
          <Chart currency={currencySymbol} arr={chartArray} days={days} />
        </Box>



        <HStack p={4} overflowX={'scroll'}>
          {btns.map((i) => {
            return <Button key={i} onClick={() => switchChart(i)}>{i}</Button>
          })}
        </HStack>


        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={'4'} >
            <Radio value='pkr'>₨ Rupee</Radio>
            <Radio value='usd'>$ Dollar</Radio>
            <Radio value='eur'>€ Euro</Radio>
          </HStack>
        </RadioGroup>

        <VStack spacing={4} p={16} alignItems={'flex-start'} w={'full'}>
          <Text fontSize={'small'} alignSelf={'center'} opacity={0.7}>
            Last Updated on {Date(coin.market_data.last_updated).split('G')[0]}
          </Text>
          <Image src={coin.image.large} w={16} h={16} objectFit={'contain'}></Image>
          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
              {coin.market_data.price_change_percentage_24h}
            </StatHelpText>
          </Stat>

          <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
            {`#${coin.market_cap_rank}`}
          </Badge>

          <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
            low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

          <Box w={'full'} p={4} >
            <Item title={'Max Supply'} value={coin.market_data.max_supply} />
            <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
            <Item title={'Market Capital'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
            <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
            <Item title={'All Time High'} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />


          </Box>


        </VStack>
      </>
      }
    </Container>
  }
}

export default CoinDetails

const Item = ({ title, value }) => {
  return <HStack justifyContent={'space-between'} w={'full'} my={4}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
      {title}
    </Text>
    <Text>
      {value}
    </Text>
  </HStack>
}






const CustomBar = ({ high, low }) => {
  return <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} width={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme='red' />
      <Text fontSize={'sm'}>24H range</Text>
      <Badge children={high} colorScheme='green' />
    </HStack>
  </VStack>
}