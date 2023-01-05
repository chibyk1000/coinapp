import React, {useEffect,useState} from 'react'
import { View, Text, ActivityIndicator } from "react-native";
import ActionBtns from '../components/ActionBtns';
import CheckAuth from "../components/CheckAuth";

import { DataTable } from 'react-native-paper'
import { useSelector } from 'react-redux';

const optionsPerPage = [2, 3, 4, 5, 6];
const Transactions = () => {
const { user: data } = useSelector((state) => state.userSlice);
const { isLoading, login } = useSelector((state) => state.authSlice);
  const [page, setPage] = useState(0) 
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage);

  useEffect(() => {
    setPage(0)
  })

    if (!login) {
      return <ActionBtns />;
    }
  if (isLoading) {
    
    
    return( 
      <View className="flex-1 justify-center items-center">
       <ActivityIndicator size="large" color="#4d3a7b" />  
    </View>
     );
  }
  
  let num = 1
    console.log(data?.user?.transactions)
  return (
    <CheckAuth>
      <View className="flex-1 bg-white justify-center">
        <View className="my-6">
          <Text className="text-center uppercase text-2xl font-bold my-3">
            Transaction
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>S/N</DataTable.Title>
              <DataTable.Title className="mx-2">USD</DataTable.Title>
              <DataTable.Title>BTC</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Address</DataTable.Title>
              <DataTable.Title>Type</DataTable.Title>
            </DataTable.Header>
            {data?.user?.transactions.map((transaction) => {
              const { amount, address, price, date, transactionType, _id } =
                transaction;

              return (
                <DataTable.Row key={_id}>
                  <DataTable.Cell className="">{num++}</DataTable.Cell>
                  <DataTable.Cell className="mx-2">
                    ${(amount / price).toFixed(2)}{" "}
                  </DataTable.Cell>
                  <DataTable.Cell>{amount.toFixed(2)} BTC</DataTable.Cell>
                  <DataTable.Cell>
                    {new Date(date).toUTCString()}
                  </DataTable.Cell>
                  <DataTable.Cell>{address}</DataTable.Cell>
                  <DataTable.Cell>{transactionType}</DataTable.Cell>
                </DataTable.Row>
              );
            })}

            <DataTable.Pagination
              page={page}
              numberOfPages={4}
              onPageChange={() => setPage(page)}
              setItemsPerPage={setItemsPerPage}
              showFastPaginationControls
            />
          </DataTable>
        </View>
      </View>
    </CheckAuth>
  );
}

export default Transactions