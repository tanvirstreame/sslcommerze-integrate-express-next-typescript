
class PaymentService {

    sslCommerzRequest = (data: object) => {
        return fetch('http://localhost:8080/ssl-request', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
        
        
    }

}
export default new PaymentService()