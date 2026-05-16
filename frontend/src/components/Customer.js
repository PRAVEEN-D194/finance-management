export default function Customer({ customer }){
    
    return <>
    <div className="customer-card">
    <div className="field"><strong>Name:</strong> {customer.name}</div>
    <div className="field"><strong>Total:</strong> {customer.totalAmount}</div>
    <div className="field"><strong>Interest:</strong> {customer.interestPercent}</div>
    <div className="field"><strong>Remaining:</strong> {customer.remainingAmount}</div>
    <div className="field"><strong>Date:</strong> {new Date(customer.createdAt).toLocaleDateString()}</div>

    <div className="actions">
        <button>Delete</button>
        <button>View</button>
    </div>
</div>
    </>
}