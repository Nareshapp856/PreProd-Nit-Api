#include<stdio.h>
#include<math.h>

int main(){
    int n, power = 0,sum = 0,temp, rem;

    scanf("%d",&n);

    temp = n;

    while(temp != 0){
        temp /= 10;
        power++;
    }

    temp = n;

    while(temp != 0){
        rem = temp % 10;
        sum += round(pow(rem, digit));
        temp/=10;
    }

    if(sum == n)
    printf("%d is an Armstrong number.",n);
    else
    printf("%d is not an Armstrong number.",n);

    return 0;
}