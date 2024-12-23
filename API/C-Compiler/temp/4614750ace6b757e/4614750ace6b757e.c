#include<stdio.h>
#include<math.h>
int main(){
    int a,n,c,r,rev=0,p=1;
    scanf("%d",&a);
    n=a;
    if(n>=0){
    while(n!=0){
        
        c++;
        n/=10;
    }
    n=a;
    while(n!=0){
        r=n%10;
        
        rev=rev+ppw(r,c);
        n/=10;
    }
    if(rev==a){
        printf("%d is an Armstrong number.",a);
    }
    else{
        printf("%d is not an Armstrong number.",a);
    }
    }
    else{
        printf("Invalid input. Enter a positive number");
    }
return 0;
}