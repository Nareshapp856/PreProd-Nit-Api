#include<stdio.h>
int main(){

    int sub1,sub2,sub3,sub4,sub5,tot;
    float av;

    //printf("Enter A Five Subjects Marks :");
    scanf("%d",&sub1);
    scanf("%d",&sub2);
    scanf("%d",&sub3);
    scanf("%d",&sub4);
    scanf("%d",&sub5);
    tot=sub1+sub2+sub3+sub4+sub5;
    av=(tot)/5;
    int per=av/10;
    printf("Total Marks: %d\n",tot);
    printf("Percentage: %.2f%%\n",av);
    switch(per)
    {
        

        case 9:
          printf("Grade: A\n");
        break;

        case 6:
        printf("Grade: C\n");
        break;
        
        case 3:
        printf("Fail")
        
    }


}