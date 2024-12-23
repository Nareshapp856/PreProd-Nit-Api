#include<stdio.h>
int main{
    int a,b,rem=1,rev,c,pro=1;
    scanf("%d",&a);
    b=a;
    if(a<0)printf("Invalid input. Enter a positive number.")
    while(a){
        rem=a%10;
        rev=rev*10+rem;
        a=a/10;
        c++;
    }
    while(rev){
        rem1=rev%10;
        if(rem1){
            int ct=c;
            while(ct){
                pro=pro*rem1;
                ct--;
            }
        }
        sum=sum+pro;
        rev=rev/10;
    }
    if(sum==b){
        printf("%d is an Armstrong number",b);

    }
    else
    {
        printf("%d is not a Armstrong number",b);
    }

}