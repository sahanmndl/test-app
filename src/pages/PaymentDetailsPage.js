import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Card, ProgressBar } from "react-native-paper";

const PaymentDetailsPage = ({ route }) => {

    const { pay_id } = route.params

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            const response = await fetch(`https://devapi.pepcorns.com/api/test/getPayment/${pay_id}`)
            const json = await response.json()
            setData([...json.response])
        } catch (e) {
            Alert.alert("Error!", "Cannot load data")
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            {loading ? <ProgressBar indeterminate color={'coral'} /> : (
                <Card style={{width: '100%', backgroundColor: 'white', padding: 4, borderRadius: 4}}>
                    <Card.Content>
                        {data.map((item) => (
                            <>
                                <Text style={{fontSize: 15, marginBottom: 6}}>User Id: {item.user_id}</Text>
                                <Text style={{fontSize: 15, marginBottom: 6}}>Name: {item.name}</Text>
                                <Text style={{fontSize: 15, marginBottom: 6}}>Age: {item.age}</Text>
                                <Text style={{fontSize: 15, marginBottom: 6}}>Pay Id: {item.pay_id}</Text>
                                <Text style={{fontSize: 15, marginBottom: 6}}>Pay Ref: {item.pay_ref}</Text>
                                <Text style={{fontSize: 15, marginBottom: 6}}>Amount: {item.amount}</Text>
                                <Text style={{fontSize: 15}}>
                                    Status: {item.status === 1 ? 'Active' : 'Failed'}
                                </Text>
                            </>
                        ))}
                    </Card.Content>
                </Card>
            )}
        </View>
    )
}

export default PaymentDetailsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white'
    }
})