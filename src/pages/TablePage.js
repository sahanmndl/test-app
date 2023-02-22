import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, View } from "react-native"
import { DataTable, Menu, ProgressBar } from "react-native-paper"
import Colors from "../utils/Colors"

const TablePage = () => {

    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    var options = ["All", "Active", "Failed"]

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://devapi.pepcorns.com/api/test/getAllPayments`)
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
                        User Id
                    </DataTable.Title>
                    <DataTable.Title style={{alignItems: 'center'}}>
                        Name
                    </DataTable.Title>
                    <DataTable.Title style={{alignItems: 'center'}}>
                        Pay Id
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
                        {filteredData.map((item) => (
                            <DataTable.Row>
                                <DataTable.Cell
                                    textStyle={{color: Colors.BLUE}}
                                    onPress={() => requestAnimationFrame(() => {
                                        navigation.navigate('UserDetailsPage', {
                                            user_id: item.user_id
                                        })
                                    })}
                                >
                                    {item.user_id}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {item.name}
                                </DataTable.Cell>
                                <DataTable.Cell 
                                    style={{alignItems: 'center', justifyContent: 'flex-end'}}
                                    textStyle={{color: Colors.BLUE}}
                                    onPress={() => requestAnimationFrame(() => {
                                        navigation.navigate('PaymentDetailsPage', {
                                            pay_id: item.pay_id
                                        })
                                    })}
                                >
                                    {item.pay_id}
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

export default TablePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
})