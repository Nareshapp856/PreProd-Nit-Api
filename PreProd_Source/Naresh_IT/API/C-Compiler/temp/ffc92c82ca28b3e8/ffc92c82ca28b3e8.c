#include <stdio.h>

int main() {
   
    float cost_price=3500, profit = 945, vat_percent = 12.7, service_charge_percent = 3.87;
    float selling_price_before_tax, profit, vat, service_charge, total_selling_price;

   
    printf("Enter the cost price of the TV set: ");
    scanf("%f", &cost_price);

   
    selling_price_before_tax = cost_price * (1 + profit / 100);

   
    profit = cost_price * (profit / 100);

   
    vat = selling_price_before_tax * (vat_percent / 100);

   
    service_charge = selling_price_before_tax * (service_charge_percent / 100);

   
    total_selling_price = selling_price_before_tax + vat + service_charge;

   
    printf("\n--- TV Selling Details ---\n");
    printf("Cost Price: Rs. %.2f\n", cost_price);
    printf("Profit: Rs. %.2f\n", profit);
    printf("Selling Price (before VAT and Service Charge): Rs. %.2f\n", selling_price_before_tax);
    printf("VAT (12.7%%): Rs. %.2f\n", vat);
    printf("Service Charge (3.87%%): Rs. %.2f\n", service_charge);
    printf("Total Selling Price: Rs. %.2f\n", total_selling_price);

    return 0;
}
