import LayoutDefault from "../../components/LayoutDefault";
function Faqs() {
    const shop = (typeof window !== "undefined" && localStorage.getItem("shop"));
    return (
        <LayoutDefault title="FAQs" shop={shop}>
            <div>FAQ</div>
        </LayoutDefault>
        
    )
}

export default Faqs;