#include<stdio.h>
int main(){
    int n,c=0;
    // printf("Enter a no:\n");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        if(n%i==0)c++;
    }
        if(c==2)printf("%d is a prime number.",n);break;
        
            printf("%d is not a prime number.",n);
    
    
    return 0; 
}