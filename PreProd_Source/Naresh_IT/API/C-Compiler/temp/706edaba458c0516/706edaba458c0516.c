#include<stdio.h>
int main(){
long n, sqr,r,count,div;
// printf("No: ");
scanf("%ld",&n);
sqr=n*n;

 while(n!=0){

    r=n%10;
    count++;
    for(int j=1; j<=count; j++){
        div=div*10;
    }
    
 }
 if(sqr%div==0)printf("%ld is an automorphic number.",n);
    else printf("%ld is not an automorphic number.",n);
 return 0;

}