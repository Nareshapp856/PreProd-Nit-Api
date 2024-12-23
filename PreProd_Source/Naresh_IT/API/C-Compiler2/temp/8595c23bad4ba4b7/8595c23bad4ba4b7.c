#include <stdio.h>
#include <stdbool.h>

bool isPrime(int number) {
    if (number<=1)return false; 
    for (int i=2;i*i<= number;i++) 
    {
        if (number%i== 0)return false;
    }
    return true; 
}
int main(){
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    printf("%d ", "true":"false");
    return 0;
}
