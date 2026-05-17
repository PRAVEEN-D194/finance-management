export default function Payment({ payment, index }) {
  
  return (
    <div className="Payment">
      <div>{index + 1}</div>
      <div>{payment.paidAmount}</div>
      <div> {payment.Paidinterest}</div>
      <div>{payment.remainingBalance}</div>
      <div>{new Date(payment.paidDate).toLocaleDateString()}</div>
    </div>
  );
}