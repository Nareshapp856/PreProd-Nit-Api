#include <stdio.h>
int main()
{
    int sub1,sub2,sub3,sub4,sub5,per,total;
    scanf("%d",sub1);
    scanf("%d",sub2);
    scanf("%d",sub3);
    scanf("%d",sub4);
    scanf("%d",sub5);
    if(sub1<35 || sub2<35 || sub3<35 || sub4<35 || sub5<35)printf("Fail");
    else{
        total=sub1+sub2+sub3+sub4+sub5;
        printf("Total Marks:%d",total);
        per=(float)total/500*100;
        printf("Percentage:%.1f",per);
        switch(per)
        {
            case 90...100 :printf("Grade A");
            case 75...89 :printf("Grade B");
            case 50...74 :printf("Grade C");
            case 35...49 :printf("Grade D");
            default :printf("Fail");
        }
    }
}

  