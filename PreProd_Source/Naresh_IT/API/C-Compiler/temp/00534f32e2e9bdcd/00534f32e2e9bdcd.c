#include<stdio.h>
int main(){
    int n=153,temp,rem,c=0,sum=0;;
   
    n=temp;
    while(n!=0){
        p=1;
        rem=n%10;//3
        n=n/10;//15
        c++;
        while(p!=3){
            e=rem*rem;
            p++;
        }
        sum=sum+e;
    }
    printf("153 is an Armstrong number.");
    return 0;


}