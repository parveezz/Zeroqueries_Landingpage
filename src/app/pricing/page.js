import PricingCatalog from "@/Components/Pricing/pricingCatalog";
import PricingComparison from "@/Components/Pricing/PricingComparison";
import PricingCtaBanner from "@/Components/Pricing/PricingCtaBanner";

export default function PricingPage() {
    return (
        <>
            <PricingCatalog />
            <PricingComparison />
            <PricingCtaBanner />
        </>
    );
}