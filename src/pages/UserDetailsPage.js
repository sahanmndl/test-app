import React from "react";
import { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, View } from "react-native"
import { DataTable, Menu, ProgressBar } from "react-native-paper"
import Colors from "../utils/Colors"

const UserDetailsPage = ({route}) => {

    const { user_id } = route.params
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [orderBy, setOrderBy] = useState(null)
    const [order, setOrder] = useState('asc')
    var options = ["All", "Active", "Failed"]

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://devapi.pepcorns.com/api/test/getUserById/${user_id}`)
            const json = await response.json()
            setData([...json.response])
            setFilteredData([...json.response])
        } catch (e) {
            Alert.alert("Error!", "Cannot load data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSort = (property) => {
        const isDesc = orderBy === property && order === 'desc'
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(property)
    }

    const sortedData = orderBy
        ? [...filteredData].sort((a, b) => {
            const aValue = a[orderBy]
            const bValue = b[orderBy]
            if (aValue < bValue) return order === 'asc' ? -1 : 1
            if (aValue > bValue) return order === 'asc' ? 1 : -1
            return 0
        }) : filteredData

    const handleFilter = (event, index, option) => {
        setVisible(false)
        if (option === "All") {
            setFilteredData(data)
        } else if (option === "Active") {
            setFilteredData(data.filter((i) => {
                return i.status === 1
            }))
        } else if (option === "Failed") {
            setFilteredData(data.filter((i) => {
                return i.status === 0
            }))
        }
    }

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{alignItems: 'center'}}>
                        Pay Id
                    </DataTable.Title>
                    <DataTable.Title style={{alignItems: 'center'}}>
                        Pay Ref
                    </DataTable.Title>
                    <DataTable.Title 
                        style={{alignItems: 'center'}}
                        sortDirection={order === 'asc' ? 'ascending' : 'descending'}
                        onPress={() => handleSort('amount')}
                    >
                        Amount
                    </DataTable.Title>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <DataTable.Title style={{alignItems: 'center', justifyContent: 'flex-end'}} onPress={openMenu}>
                                Status
                            </DataTable.Title>
                        }
                    >
                        {options.map((option, index) => (
                            <Menu.Item
                                key={option}
                                title={option}
                                onPress={(event) => handleFilter(event, index, option)}
                            />
                        ))}
                    </Menu>
                </DataTable.Header>
                {loading ? (
                    <ProgressBar indeterminate color={'coral'} />
                ) : (
                    <ScrollView>
                        {sortedData.map((item) => (
                            <DataTable.Row>
                                <DataTable.Cell>
                                    {item.pay_id}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {item.pay_ref}
                                </DataTable.Cell>
                                <DataTable.Cell style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                                    {item.amount}
                                </DataTable.Cell>
                                <DataTable.Cell 
                                style={{
                                    alignItems: 'center', 
                                    justifyContent: 'flex-end'
                                }}
                                textStyle={{color: item.status === 1 ? Colors.GREEN : Colors.RED}}
                                >
                                    {item.status === 1 ? 'Active' : 'Failed'}
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </ScrollView>
                )}
            </DataTable>
        </View>
    )
}

export default UserDetailsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})