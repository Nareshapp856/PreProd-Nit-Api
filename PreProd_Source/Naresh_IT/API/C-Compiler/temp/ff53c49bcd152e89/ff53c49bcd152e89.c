// Online C compiler to run C program online
#include <stdio.h>
int main()
{
    int sub1,sub2,sub3,sub4,sub5;
    float total,per;
    
    scanf("%d",&sub1);
    
    scanf("%d",&sub2);
   
    scanf("%d",&sub3);
   
    scanf("%d",&sub4);
  
    scanf("%d",&sub5);
    if(sub1<35 || sub2<35 || sub3<35 || sub4<35 || sub5<35)printf("Fail");
    else{
        total=sub1+sub2+sub3+sub4+sub5;
        printf("Total Marks:%.0f\n",total);
        per=total/500*100;
        printf("Percentage:.2f %\n",per%);
        if(per>90 || per<100)printf("Grade: A");
        else if(per<89 || per>75)printf("Grade:B");
        else if(per<74 || per>50)printf("Grade:C");
        else printf("Fail");
    }
}

  