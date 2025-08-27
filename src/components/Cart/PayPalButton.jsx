import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError, onCancel, currency = "USD" }) => {
  const validateAmount = (amt) => {
    const numAmount = parseFloat(amt);
    if (isNaN(numAmount) || numAmount <= 0) {
      console.error("Invalid amount:", amt);
      throw new Error("Amount must be a positive number");
    }
    return numAmount.toFixed(2);
  };

  return (
    <PayPalScriptProvider 
      options={{ 
        "client-id": "AUxpadXRKG56QKoNzf86gOteXMKcpmtN_LiMDK2XxRm7pbsbn3LP90zxORNKe-CtksQ-Vn_9ED1f23ol",
        currency: "USD",
        intent: "capture",
        components: "buttons"
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          try {
            const validatedAmount = validateAmount(amount);
            console.log("Creating order with amount:", validatedAmount);

            return actions.order.create({
              purchase_units: [{ 
                amount: { value: validatedAmount, currency_code: currency }
              }],
              application_context: {
                shipping_preference: "NO_SHIPPING"
              }
            });
          } catch (error) {
            console.error("Error creating order:", error);
            onError?.(error);
            throw error;
          }
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            console.log("Payment completed:", details);

            onSuccess?.({
              ...details,
              orderId: data.orderID,
              paymentId: details.id
            });
          } catch (error) {
            console.error("Payment capture failed:", error);
            onError?.(error);
          }
        }}
        onCancel={(data) => {
          console.log("Payment cancelled by user:", data);
          onCancel?.(data);
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError?.(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
