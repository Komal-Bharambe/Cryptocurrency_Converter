import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, Select } from 'antd';

function Converter() {

    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

    const defaultFirstSelectvalue = "Bitcoin";
    const defaultSecondSelectvalue = "Ether";

    const [cryptolist, setcryptolist] = useState([]);
    const[inputvalue, setinputvalue] = useState(0);
    const[firstselect, setfirstselect] = useState(defaultFirstSelectvalue);
    const[secendselect, setsecendselect] = useState(defaultSecondSelectvalue);
    const[result, setresult] = useState(0);

    const names = [
        {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'disabled',
            disabled: true,
            label: 'Disabled',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          }
    ]

    useEffect(() =>{
        fetchData();
    },[]);

    async function fetchData(){
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        console.log(jsonData);
        const data = jsonData.rates;

        console.log(data);
        // now it is converted to array converted object into two part Object.entries(data) ne


        // const tempArray = [];
        // Object.entries(data).forEach(item =>{
        //     const tempObj = {
        //         value: item[1].name,
        //         label: item[1].name,
        //         rate: item[1].value
        //     }
        //     tempArray.push(tempObj)
        // })

        const tempArray = Object.entries(data).map(item =>{
            return{
            value: item[1].name,
            label: item[1].name,
            rate: item[1].value
            }
        })
        console.log(tempArray)

        setcryptolist(tempArray);
        
    }

    useEffect(() =>{
        //console.log(inputvalue, firstselect, secendselect)

        if(cryptolist.length == 0){
            return;
        }
        const firstrate = cryptolist.find((item1) =>{
            return item1.value === firstselect
        }).rate

        const secondrate = cryptolist.find((item) =>{
            return item.value ===  secendselect
        }).rate

        //console.log(firstrate, secondrate)
        const resultval = (inputvalue * secondrate)/ firstrate

        setresult(resultval.toFixed(6))


    },[inputvalue, firstselect, secendselect])

  return (
    <div className='container'>
      <Card  className='crypto-card' title={<h2>Crypto-Converter</h2>}>
        <Form size = 'large'> 
            <Form.Item>
                <Input onChange={(event) =>setinputvalue(event.target.value)}/>
            </Form.Item>
        </Form>
        <div className='select-box'>

        <Select style={{width: '200px'}} defaultValue={defaultFirstSelectvalue} options={cryptolist}
        onChange={(value) => setfirstselect(value)}/>
        
        <Select style={{width: '200px'}} defaultValue={defaultSecondSelectvalue} options={cryptolist}
        onChange={(value) => setsecendselect(value)}/>

        </div>
        <p>
        {/* 1 bitcoin = 12 either */}
            {inputvalue} {firstselect} =  {result} {secendselect}</p>
      </Card>
    </div>
  )
}

export default Converter

// math
// 1btc = 13et , 40 lt
// x = input * second / first
