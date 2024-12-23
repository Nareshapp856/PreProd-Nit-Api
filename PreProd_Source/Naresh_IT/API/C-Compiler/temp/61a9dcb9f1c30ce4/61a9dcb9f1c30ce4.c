#include <stdio.h>
#include <math.h>
int main() {
    int n,c=0;
    while(n!=0){
        if(n%2==0)
        c++;
        n--;
        {
       if(c==2) printf("%d is prime number",n);
            else printf("%d is not a prime numbere",n);
        }
    }
    return 0;
}#include <stdio.h>
#include<ctype.h>
#include<math.h>
int main() {
   int n,r;
   printf("Enter the number: \n");
   scanf("%d",&n);
   while (n!=0) {
   	if(n%2==0) printf("%d is not a prime number.",n);
	else  printf("%d is  a prime number.",n);
break;
}

}
