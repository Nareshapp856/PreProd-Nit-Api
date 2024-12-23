#include <stdio.h>

int main() {
    int n,count=0,i=2;
    printf("enterthe value: ");scanf("%d",&n);
    while(i<=n)
    {
        if(n%i==0)count++;
        i++;
    }
    if(count!=1 && count!=2)
    {
        printf("%d is not a prime number.",n)
    }
        
  
    
    

    return 0;
}