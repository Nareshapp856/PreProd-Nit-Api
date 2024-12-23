#include<stdio.h>
int main()
{
    int phy,che,bio,mat,com,total;
float percent;
//printf("Enter 5 subjects marks");
scanf("%d",&phy);
scanf("%d",&che);
scanf("%d",&bio);
scanf("%d",&mat);
scanf("%d",&com);
total=phy+che+bio+mat+com;
percent=total/500;
if(phy>=0&&phy<=100&&che>=0&&che<=100&&bio>=0&&bio<=100&&mat>=0&&mat<=100&&com>=0&&com<=100)
{
switch(percent>=90)
{
    case 1:
    printf("Grade:A");
    break;
    switch(percent>=80)
    case 1:
    printf("Grade:B");
    break;
}
}
else
{
    printf(""Invalid input. Marks for each subject must be between 0 and 100."");
}
return 0;
}